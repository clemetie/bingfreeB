<!-- 효빈 관리자 예약 관리 -->
<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { fullReservationList } from "@/data.mjs";
import dayjs from "dayjs";

const currentPage = ref(1);
const perPage = 5;

const searchType = ref("customer"); // 고객 또는 기사
const searchText = ref("");
const memberFilter = ref("all"); // normal | prime | all
const statusFilter = ref("all"); // waiting | assigned | confirmed | done | all
const shopFilter = ref("all"); // personal | business | all
const dateFilter = ref("all"); // today | plus7d | plus15d | plus1m | plus3m | all | custom
const today = dayjs();
const fromDate = ref(null);
const toDate = ref(null);
const openReservDetail = ref(false);
const reservdetail = ref(null);
const isCustomerOpen = ref(true);
const isMembershipOpen = ref(true);
const isWorkerOpen = ref(true);
const isInquiryOpen = ref(true);
const viewreceipt = ref(false);
const clickadd = ref(false);
function printReceipt() {
  window.print();
}
const stepStates = computed(() => {
  const status = reservdetail.value?.status;

  const labels = ["배정 완료", "작업 시작", "작업 완료", "확정 완료"];
  const times = {
    waiting: ["25.03.17 14:00", "-", "-", "-"],
    assigned: ["25.03.17 14:00", "25.05.15 23:00", "-", "-"],
    done: ["25.03.17 14:00", "25.05.15 23:00", "25.05.15 00:20", "-"],
    confirmed: [
      "25.03.17 14:00",
      "25.05.15 23:00",
      "25.05.15 00:20",
      "25.05.22 14:00",
    ],
  };

  const colorPerStatus = {
    waiting: ["black", "", "", ""],
    assigned: ["black", "orange", "", ""],
    done: ["black", "black", "green", ""],
    confirmed: ["black", "black", "black", "purple"], // 확정 완료
  };

  const timeList = times[status] || ["-", "-", "-", "-"];
  const colorList = colorPerStatus[status] || ["", "", "", ""];

  return labels.map((label, i) => ({
    label,
    time: timeList[i],
    class: colorList[i],
  }));
});
function openDetailById(id) {
  const found = fullReservationList.find((item) => item.id === id);
  if (found) {
    reservdetail.value = found;
    openReservDetail.value = true;
  }
}

const fromDateInput = computed({
  get: () => (fromDate.value ? dayjs(fromDate.value).format("YYYY-MM-DD") : ""),
  set: (val) => {
    fromDate.value = val ? dayjs(val).startOf("day") : null;
  },
});
const toDateInput = computed({
  get: () => (toDate.value ? dayjs(toDate.value).format("YYYY-MM-DD") : ""),
  set: (val) => {
    toDate.value = val ? dayjs(val).endOf("day") : null;
  },
});

watch(dateFilter, (val) => {
  if (val === "today") {
    fromDate.value = today.startOf("day");
    toDate.value = today.endOf("day");
  } else if (val === "plus7d") {
    fromDate.value = today;
    toDate.value = today.add(7, "day");
  } else if (val === "plus15d") {
    fromDate.value = today;
    toDate.value = today.add(15, "day");
  } else if (val === "plus1m") {
    fromDate.value = today;
    toDate.value = today.add(1, "month");
  } else if (val === "plus3m") {
    fromDate.value = today;
    toDate.value = today.add(3, "month");
  } else if (val === "all") {
    fromDate.value = null;
    toDate.value = null;
  } else if (val === "custom") {
    // 날짜 선택 시 별도 초기화 X
    // 하지만 필터 적용은 수동으로 해야 하니 다음 라인 추가 👇
  }
  applyFilters(); // ✅ 날짜 변경 후 즉시 필터 반영
});

const dateRange = computed(() => {
  if (!fromDate.value || !toDate.value) return null;
  return [fromDate.value, toDate.value];
});

const filteredList = ref([]);

function applyFilters() {
  const result = fullReservationList
    .filter((item) => {
      const reservDate = dayjs(item.reservinfo.date, "YYYY.MM.DD"); // 이제 date만 사용!

      const isInDateRange =
        !fromDate.value || !toDate.value
          ? true
          : reservDate.isAfter(fromDate.value.subtract(1, "day")) &&
            reservDate.isBefore(toDate.value.add(1, "day"));

      const statusMatched =
        statusFilter.value === "all" || item.status === statusFilter.value;

      const memberMatched =
        memberFilter.value === "all" ||
        (memberFilter.value === "normal" && !item.primemember) ||
        (memberFilter.value === "prime" && item.primemember);

      const shopMatched =
        shopFilter.value === "all" || item.customer.shop === shopFilter.value;

      const searchMatched = searchText.value
        ? (searchType.value === "customer"
            ? item.customer.name
            : item.worker.name || ""
          ).includes(searchText.value)
        : true;

      return (
        statusMatched &&
        memberMatched &&
        shopMatched &&
        searchMatched &&
        isInDateRange
      );
    })
    .sort((a, b) => a.id - b.id);

  filteredList.value = result;
  currentPage.value = 1;
}

onMounted(() => {
  applyFilters();
});

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredList.value.slice(start, start + perPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredList.value.length / perPage)
);

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};

// 상태별 개수 계산
// const totalCount = computed(() => fullReservationList.length);
const doneCount = computed(
  () => fullReservationList.filter((item) => item.status === "done").length
);
const waitingCount = computed(
  () => fullReservationList.filter((item) => item.status === "waiting").length
);
const assignedCount = computed(
  () => fullReservationList.filter((item) => item.status === "assigned").length
);
const confirmedCount = computed(
  () => fullReservationList.filter((item) => item.status === "confirmed").length
);

// 카드에 쓸 데이터
const statusCards = computed(() => [
  {
    status: "waiting",
    title: "배정 대기",
    count: waitingCount.value,
    desc: `${waitingCount.value}개의 예약이 배정 대기 중입니다.`,
    icon: `<svg width="50" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="16" cy="16" r="16" fill="#FF0000"/>
<path d="M14.6719 6.40234V9.46875H12.2109V10.3965H15.6973V11.2754H7.65039V10.3965H11.1172V9.46875H8.66602V6.40234H14.6719ZM9.7207 7.25195V8.60938H13.5977V7.25195H9.7207ZM14.7109 12.0176V14.8691H13.627V12.877H8.53906V12.0176H14.7109ZM24.3496 10.8164V11.6953H16.2832V10.8164H19.7793V10.084H17.3086V7.74023H22.2695V7.08594H17.2793V6.23633H23.3535V8.53125H18.3828V9.23438H23.5293V10.084H20.8535V10.8164H24.3496ZM23.4023 12.252V14.8105H22.3086V13.1113H17.1816V12.252H23.4023ZM15.7168 24.916V25.8047H7.65039V24.916H11.127V23.1973H8.53906V18.627H9.62305V20.0723H13.7148V18.627H14.7988V23.1973H12.2012V24.916H15.7168ZM9.62305 22.3184H13.7148V20.9414H9.62305V22.3184ZM23.666 18.041V26.8691H22.5723V18.041H23.666ZM21.0293 18.9785C21.0293 21.6055 20.0137 23.8418 16.918 25.3066L16.3516 24.4375C18.6611 23.3389 19.7354 21.8447 19.9258 19.8379H16.8008V18.9785H21.0293Z" fill="white"/>
</svg>

`,
  },
  {
    status: "done",
    title: "완료 대기",
    count: doneCount.value,
    desc: `${doneCount.value}개의 예약이 완료 대기 중입니다.`,
    icon: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.9352 26.0072C20.5668 26.0072 25.9427 20.6313 25.9427 13.9997C25.9427 7.36813 20.5668 1.99219 13.9352 1.99219C7.30368 1.99219 1.92773 7.36813 1.92773 13.9997C1.92773 20.6313 7.30368 26.0072 13.9352 26.0072Z" stroke="#5AB21A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.9355 6.79688V14.0014L18.7385 16.4029" stroke="#5AB21A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
  {
    status: "assigned",
    title: "청소 대기",
    count: assignedCount.value,
    desc: `${assignedCount.value}개의 예약이 청소 대기 중입니다.`,
    icon: `<svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.4504 12.902V14.0067C25.4489 16.596 24.6104 19.1155 23.0601 21.1894C21.5097 23.2633 19.3305 24.7805 16.8475 25.5146C14.3644 26.2488 11.7106 26.1606 9.28175 25.2633C6.85291 24.3659 4.77919 22.7075 3.36989 20.5353C1.96059 18.3631 1.29121 15.7935 1.46158 13.2097C1.63194 10.626 2.63293 8.16656 4.31526 6.19821C5.99758 4.22986 8.27111 2.85806 10.7967 2.28742C13.3224 1.71677 15.9648 1.97785 18.33 3.03171" stroke="#F99B23" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.4514 4.40039L13.444 16.42L9.8418 12.8177" stroke="#F99B23" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },

  {
    status: "confirmed",
    title: "확정 완료",
    count: confirmedCount.value,
    desc: `이 달 ${confirmedCount.value}개의 청소가 완료되었습니다.`,
    icon: `<svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.015 10.0059H2" stroke="#0F71F2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.015 2H2" stroke="#0F71F2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.015 18.0117H2" stroke="#0F71F2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`,
  },
]);

//처리상태 버튼 모음짐
const accept = (item) => {
  item.status = "assigned";
  alert("수락 되었습니다");
};

const complete = ref(false);
function opencompleteById(id) {
  const found = fullReservationList.find((item) => item.id === id);
  if (found) {
    reservdetail.value = found;
    complete.value = true;
  }
}
// 보고서 제출 모달
const title = ref("");
const content = ref("");
const file = ref(null);

const handleFileUpload = (e) => {
  file.value = e.target.files[0];
};

const submitInquiry = () => {
  if (!file.value || !title.value || !content.value) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  alert("제출 되었습니다");
  reservdetail.value.status = "confirmed";
  // paymentmodal.value = false;
  // openReview.value = false;
  // reservdetailmodal.value = false;
  complete.value = false;
};

// 배정 대기 목록 모달
const waitinglist = ref(false);

const selectedItem = ref(null);

const waitingListOnly = computed(() =>
  filteredList.value.filter((item) => item.status === "waiting")
);
</script>
<template>
  <div class="workerreservation">
    <div class="dash">
      <p class="dash-name">작업 관리</p>
      <p class="dash-desc">오늘의 작업현항과 일정을 확인할 수 있습니다.</p>
    </div>
    <div class="dashboard">
      <div
        class="allcard"
        v-for="card in statusCards"
        :key="card.status"
        :class="card.status"
        @click="
          card.status === 'waiting'
            ? (waitinglist = true)
            : card.status === 'assigned'
            ? null
            : card.status === 'done'
            ? null
            : card.status === 'confirmed'
            ? null
            : null
        "
      >
        <p class="profile-h3">
          {{ card.title }}
          <span
            class="card-icon"
            v-html="card.icon"
            style="margin-left: auto; display: inline"
          ></span>
        </p>
        <p class="profile-h1">
          {{ card.count }}
          <span class="profile-h3 mbonly">개</span>
        </p>
        <p class="card-desc" v-html="card.desc"></p>
      </div>
    </div>
    <div class="table-wrap">
      <!-- 상단 검색창 -->
      <div class="searchbox websearchbox">
        <p class="profile-h2">회원 검색</p>
        <div class="namesearchbox profile-h4">
          <label>검색어</label>
          <select v-model="searchType">
            <option value="customer">고객</option>
            <option value="worker">기사</option>
          </select>
          <input
            v-model="searchText"
            type="text"
            placeholder="이름을 입력하세요"
            @keydown.enter="applyFilters"
          />
        </div>
        <hr />
        <div class="searchtop profile-h4">
          <div class="memberbox">
            <label>회원등급</label>
            <label
              ><input type="radio" v-model="memberFilter" value="all" />
              전체</label
            >
            <label
              ><input type="radio" v-model="memberFilter" value="normal" />
              <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.75 1.57143H0C0 4.60871 2.74258 7.07143 6.125 7.07143V10.6071C6.125 10.8232 6.32188 11 6.5625 11H7.4375C7.67812 11 7.875 10.8232 7.875 10.6071V7.07143C7.875 4.03415 5.13242 1.57143 1.75 1.57143ZM12.25 0C9.94766 0 7.94609 1.14174 6.89883 2.82857C7.65625 3.57009 8.2168 4.47121 8.51211 5.47054C11.5938 5.18326 14 2.84576 14 0H12.25Z"
                  fill="#4ECF50"
                />
              </svg>
              일반</label
            >
            <label
              ><input type="radio" v-model="memberFilter" value="prime" />
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <rect width="15" height="15" fill="url(#pattern0_273_887)" />
                <defs>
                  <pattern
                    id="pattern0_273_887"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlink:href="#image0_273_887"
                      transform="scale(0.0185185)"
                    />
                  </pattern>
                  <image
                    id="image0_273_887"
                    width="54"
                    height="54"
                    preserveAspectRatio="none"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAACXBIWXMAAAsSAAALEgHS3X78AAAEXUlEQVRogd1aPUwUQRR+u6HCxKNZO/QSO8BISGig4OproNAsNgKNJgYSGmjhEis0EaPBaAPRAi5SYHOUHgU2GIMJ0pkc0rmFnImUu+bbn9u9vdmfmb29H76EAHO7c++b7817b96uZBgGJYGi6lkiyiaaJBzHWlG+4L2Jm5ii6n1ENEtEU0Q00RTTo1ElojIR7eEnDtHYxGxC60Q0kzqNcFRtO9bDCMYipqj6rD1ZpmXmRwMEp7SiXGZdKUfdrqj6FhFtdhgpsu35bC96A0KJ2aTa7XpR2FRUfdF/TSAxRdVXu4CUgxd+5Zh7TFH1HGRusXFJgT03rBXlCoUott41dFxkvHY3ELMlvdse2xJjUlH1YQpQjBllugiLDcTs8ihRNTE+ING31zJ9WpGpX2nLaqAialAsJzobSIDM3opk/j02QPQgJ0Xe83PTWgQsCOtzjHMuUAbu6CfGXcxmrhG9emKpBDI8uKlIdL3XWgQsSH7UJbd835oT41ELxEADsWHeGZ7OSDQ9wf3FTAzZy4rfS/fcOU8q3FNl/cT6eGdIQqp6ya5TM731c1b/8c8dWSumCSgxVTDo72U9gf4b7peea0S/NP4zY087iQGHpwbllg1zT5WOLALnvy1COwcGrX0UOwj7ibXq4FgHkFjYcAmA7Mh8PSFn/8Xdby1RbDon0fgA0Z2sRIO33HG4IAyFUlDHv5cQcR/nreDkhPyFNwbtlKNVrCuCFVXn1l0rBm/TL6dWLoqbh96VDFrbdQki3LPuHZnXTZVDUKhZ5dRYzQTyE09yfZSXzGTtuN3D5zr9OHM/h8LPdt1gE4aaYqJHlTDFRAHDc8uuKnBHuOXbUqO7BqDQ9qjIAqqRD0uySQ4AIV54l5s7OacJBBkoJQqvYk3fY14gkHhdaXzQMhzqBAGfi6hFrQr3rBB9eEq0XTZCjzcYR2HsJG4epF5S7X8Nzjv+xMzCkGDz3EtM+CwWhh1mO9MFqgxvSPeDdU6Lg9QVg+FREKneo9DW6j5NeImlEhXjuFIavREvsVR681G5KKqnEceVWUjdFVEvTgf0LBDx3i+FExdoC5gwa0X72dcfkQni1opI0NsHhnmIBPKjFuGwBI2a8facLmJWrVZMteogW7kxztAtWnVQJ0dF5DbRtgB1KjG44PyGkAvW4BBretUR5zDIApSaLOjCQcNGJbFiKHBZQOGK1lpYueSFczpuAingOHF1jwL3pGI0NDnRC0SRi9YachWi4FBWqmuDgzSuKx0R7R/FPh1H4UwrysdNiYrWCgdvdCRZHFPCrmki8C5IbY911Ok5IcynmletCH7pfwZ9FRTDw/VV5x+HWLc+c/Yi530F6aq44hwioXegI/uKHID7zWpFec9/i2x3gLsRB/YLKw2kqEsVQy2zqhXlrbCLuoUY1MEe2vLvpSD0tOIs5kHVNtCBtzmHcSeqXcQlEISeBDnsu9eQMINF3ulNCscVIXXNkCCDg97m7DgQ0X+1TJk9rcZcSQAAAABJRU5ErkJggg=="
                  />
                </defs>
              </svg>
              구독</label
            >
          </div>
          <div class="shopbox">
            <label>회원구분</label>
            <label
              ><input type="radio" value="all" v-model="shopFilter" />
              전체</label
            >
            <label
              ><input type="radio" value="personal" v-model="shopFilter" />
              개인회원</label
            >
            <label
              ><input type="radio" value="business" v-model="shopFilter" />
              사업자회원</label
            >
          </div>
        </div>
        <hr />
        <div class="searchbt profile-h4">
          <div class="statusbox">
            <label>예약상태</label>
            <label
              ><input type="radio" value="all" v-model="statusFilter" />
              전체</label
            >
            <label
              ><input type="radio" value="waiting" v-model="statusFilter" />
              배정대기</label
            >
            <label
              ><input type="radio" value="assigned" v-model="statusFilter" />
              청소대기</label
            >
            <label
              ><input type="radio" value="confirmed" v-model="statusFilter" />
              청소완료</label
            >
            <label
              ><input type="radio" value="done" v-model="statusFilter" />
              확정완료</label
            >
          </div>
          <div class="searchdate">
            <div class="datepicker-box">
              <label>예약일시</label>
              <input
                type="date"
                v-model="fromDateInput"
                @change="
                  () => {
                    dateFilter = 'custom';
                    applyFilters();
                  }
                "
              />
              ~
              <input
                type="date"
                v-model="toDateInput"
                @change="
                  () => {
                    dateFilter = 'custom';
                    applyFilters();
                  }
                "
              />
            </div>
            <ul class="date-filter">
              <li
                style="font-size: 12px"
                :class="{ active: dateFilter === 'all' }"
                @click="dateFilter = 'all'"
              >
                전체
              </li>
              <li
                style="font-size: 12px"
                :class="{ active: dateFilter === 'today' }"
                @click="dateFilter = 'today'"
              >
                오늘
              </li>
              <li
                style="font-size: 12px"
                :class="{ active: dateFilter === 'plus7d' }"
                @click="dateFilter = 'plus7d'"
              >
                7일
              </li>
              <li
                style="font-size: 12px"
                :class="{ active: dateFilter === 'plus15d' }"
                @click="dateFilter = 'plus15d'"
              >
                15일
              </li>
              <li
                style="font-size: 12px"
                :class="{ active: dateFilter === 'plus1m' }"
                @click="dateFilter = 'plus1m'"
              >
                1개월
              </li>
              <li
                style="font-size: 12px"
                :class="{ active: dateFilter === 'plus3m' }"
                @click="dateFilter = 'plus3m'"
              >
                3개월
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div class="search-action" style="margin-top: 12px">
          <button class="search-button" @click="applyFilters">검색</button>
        </div>
      </div>
      <div class="searchbox mbsearchbox">
        <p class="profile-h2">
          회원 검색
          <button class="modal profile-h4" v-on:click="clickadd = !clickadd">
            상세검색
          </button>
        </p>
        <div class="namesearchbox profile-h4">
          <label>검색어</label>
          <select v-model="searchType">
            <option value="customer">고객</option>
            <option value="worker">기사</option>
          </select>
          <input
            v-model="searchText"
            type="text"
            placeholder="이름을 입력하세요"
            @keydown.enter="applyFilters"
          />
        </div>
        <hr />
        <div class="clickadd" v-show="clickadd">
          <div class="searchtop profile-h4">
            <div class="memberbox">
              <label class="filtermb">회원등급</label>
              <div class="mbbox">
                <label
                  ><input type="radio" v-model="memberFilter" value="all" />
                  전체</label
                >
                <label
                  ><input type="radio" v-model="memberFilter" value="normal" />
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.75 1.57143H0C0 4.60871 2.74258 7.07143 6.125 7.07143V10.6071C6.125 10.8232 6.32188 11 6.5625 11H7.4375C7.67812 11 7.875 10.8232 7.875 10.6071V7.07143C7.875 4.03415 5.13242 1.57143 1.75 1.57143ZM12.25 0C9.94766 0 7.94609 1.14174 6.89883 2.82857C7.65625 3.57009 8.2168 4.47121 8.51211 5.47054C11.5938 5.18326 14 2.84576 14 0H12.25Z"
                      fill="#4ECF50"
                    />
                  </svg>
                  일반</label
                >
                <label
                  ><input type="radio" v-model="memberFilter" value="prime" />
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      width="15"
                      height="15"
                      fill="url(#pattern0_273_887)"
                    />
                    <defs>
                      <pattern
                        id="pattern0_273_887"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlink:href="#image0_273_887"
                          transform="scale(0.0185185)"
                        />
                      </pattern>
                      <image
                        id="image0_273_887"
                        width="54"
                        height="54"
                        preserveAspectRatio="none"
                        xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAACXBIWXMAAAsSAAALEgHS3X78AAAEXUlEQVRogd1aPUwUQRR+u6HCxKNZO/QSO8BISGig4OproNAsNgKNJgYSGmjhEis0EaPBaAPRAi5SYHOUHgU2GIMJ0pkc0rmFnImUu+bbn9u9vdmfmb29H76EAHO7c++b7817b96uZBgGJYGi6lkiyiaaJBzHWlG+4L2Jm5ii6n1ENEtEU0Q00RTTo1ElojIR7eEnDtHYxGxC60Q0kzqNcFRtO9bDCMYipqj6rD1ZpmXmRwMEp7SiXGZdKUfdrqj6FhFtdhgpsu35bC96A0KJ2aTa7XpR2FRUfdF/TSAxRdVXu4CUgxd+5Zh7TFH1HGRusXFJgT03rBXlCoUott41dFxkvHY3ELMlvdse2xJjUlH1YQpQjBllugiLDcTs8ihRNTE+ING31zJ9WpGpX2nLaqAialAsJzobSIDM3opk/j02QPQgJ0Xe83PTWgQsCOtzjHMuUAbu6CfGXcxmrhG9emKpBDI8uKlIdL3XWgQsSH7UJbd835oT41ELxEADsWHeGZ7OSDQ9wf3FTAzZy4rfS/fcOU8q3FNl/cT6eGdIQqp6ya5TM731c1b/8c8dWSumCSgxVTDo72U9gf4b7peea0S/NP4zY087iQGHpwbllg1zT5WOLALnvy1COwcGrX0UOwj7ibXq4FgHkFjYcAmA7Mh8PSFn/8Xdby1RbDon0fgA0Z2sRIO33HG4IAyFUlDHv5cQcR/nreDkhPyFNwbtlKNVrCuCFVXn1l0rBm/TL6dWLoqbh96VDFrbdQki3LPuHZnXTZVDUKhZ5dRYzQTyE09yfZSXzGTtuN3D5zr9OHM/h8LPdt1gE4aaYqJHlTDFRAHDc8uuKnBHuOXbUqO7BqDQ9qjIAqqRD0uySQ4AIV54l5s7OacJBBkoJQqvYk3fY14gkHhdaXzQMhzqBAGfi6hFrQr3rBB9eEq0XTZCjzcYR2HsJG4epF5S7X8Nzjv+xMzCkGDz3EtM+CwWhh1mO9MFqgxvSPeDdU6Lg9QVg+FREKneo9DW6j5NeImlEhXjuFIavREvsVR681G5KKqnEceVWUjdFVEvTgf0LBDx3i+FExdoC5gwa0X72dcfkQni1opI0NsHhnmIBPKjFuGwBI2a8facLmJWrVZMteogW7kxztAtWnVQJ0dF5DbRtgB1KjG44PyGkAvW4BBretUR5zDIApSaLOjCQcNGJbFiKHBZQOGK1lpYueSFczpuAingOHF1jwL3pGI0NDnRC0SRi9YachWi4FBWqmuDgzSuKx0R7R/FPh1H4UwrysdNiYrWCgdvdCRZHFPCrmki8C5IbY911Ok5IcynmletCH7pfwZ9FRTDw/VV5x+HWLc+c/Yi530F6aq44hwioXegI/uKHID7zWpFec9/i2x3gLsRB/YLKw2kqEsVQy2zqhXlrbCLuoUY1MEe2vLvpSD0tOIs5kHVNtCBtzmHcSeqXcQlEISeBDnsu9eQMINF3ulNCscVIXXNkCCDg97m7DgQ0X+1TJk9rcZcSQAAAABJRU5ErkJggg=="
                      />
                    </defs>
                  </svg>
                  구독</label
                >
              </div>
            </div>
            <div class="shopbox">
              <label class="filtermb">회원구분</label>
              <div class="mbbox">
                <label
                  ><input type="radio" value="all" v-model="shopFilter" />
                  전체</label
                >
                <label
                  ><input type="radio" value="personal" v-model="shopFilter" />
                  개인회원</label
                >
                <label
                  ><input type="radio" value="business" v-model="shopFilter" />
                  사업자회원</label
                >
              </div>
            </div>
          </div>
          <hr />
          <div class="searchbt profile-h4">
            <div class="statusbox">
              <label class="filtermb">예약상태</label>
              <label
                ><input type="radio" value="all" v-model="statusFilter" />
                전체</label
              >
              <div class="mbbox">
                <label
                  ><input type="radio" value="waiting" v-model="statusFilter" />
                  배정대기</label
                >
                <label
                  ><input
                    type="radio"
                    value="assigned"
                    v-model="statusFilter"
                  />
                  청소대기</label
                >
                <label
                  ><input
                    type="radio"
                    value="confirmed"
                    v-model="statusFilter"
                  />
                  청소완료</label
                >
                <label
                  ><input type="radio" value="done" v-model="statusFilter" />
                  확정완료</label
                >
              </div>
            </div>
            <div class="searchdate">
              <div class="datepicker-box">
                <label class="filtermb">예약일시</label>
                <div class="mbbox">
                  <input
                    type="date"
                    v-model="fromDateInput"
                    @change="
                      () => {
                        dateFilter = 'custom';
                        applyFilters();
                      }
                    "
                  />
                  ~
                  <input
                    type="date"
                    v-model="toDateInput"
                    @change="
                      () => {
                        dateFilter = 'custom';
                        applyFilters();
                      }
                    "
                  />
                </div>
              </div>
              <ul class="date-filter">
                <li
                  style="font-size: 12px"
                  :class="{ active: dateFilter === 'all' }"
                  @click="dateFilter = 'all'"
                >
                  전체
                </li>
                <li
                  style="font-size: 12px"
                  :class="{ active: dateFilter === 'today' }"
                  @click="dateFilter = 'today'"
                >
                  오늘
                </li>
                <li
                  style="font-size: 12px"
                  :class="{ active: dateFilter === 'plus7d' }"
                  @click="dateFilter = 'plus7d'"
                >
                  7일
                </li>
                <li
                  style="font-size: 12px"
                  :class="{ active: dateFilter === 'plus15d' }"
                  @click="dateFilter = 'plus15d'"
                >
                  15일
                </li>
                <li
                  style="font-size: 12px"
                  :class="{ active: dateFilter === 'plus1m' }"
                  @click="dateFilter = 'plus1m'"
                >
                  1개월
                </li>
                <li
                  style="font-size: 12px"
                  :class="{ active: dateFilter === 'plus3m' }"
                  @click="dateFilter = 'plus3m'"
                >
                  3개월
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div class="search-action" style="margin-top: 12px">
          <button class="search-button" @click="applyFilters">검색</button>
        </div>
      </div>
      <div class="tablelist">
        <h2 class="profile-h2">예약 목록</h2>
        <table class="table">
          <thead>
            <tr>
              <th>예약번호</th>
              <th>고객명</th>
              <th>고객 연락처</th>
              <th>예약일자</th>
              <th>청소일자</th>
              <th>처리상태</th>
              <th>상태</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedList" :key="item.id">
              <td data-label="예약번호">{{ item.number }}</td>
              <td class="customername" data-label="고객명">
                <template v-if="item.primemember">
                  <!-- 파란 북마크 아이콘 -->
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      width="15"
                      height="15"
                      fill="url(#pattern0_273_889)"
                    />
                    <defs>
                      <pattern
                        id="pattern0_273_889"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlink:href="#image0_273_889"
                          transform="scale(0.0185185)"
                        />
                      </pattern>
                      <image
                        id="image0_273_889"
                        width="54"
                        height="54"
                        preserveAspectRatio="none"
                        xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAACXBIWXMAAAsSAAALEgHS3X78AAAEXUlEQVRogd1aPUwUQRR+u6HCxKNZO/QSO8BISGig4OproNAsNgKNJgYSGmjhEis0EaPBaAPRAi5SYHOUHgU2GIMJ0pkc0rmFnImUu+bbn9u9vdmfmb29H76EAHO7c++b7817b96uZBgGJYGi6lkiyiaaJBzHWlG+4L2Jm5ii6n1ENEtEU0Q00RTTo1ElojIR7eEnDtHYxGxC60Q0kzqNcFRtO9bDCMYipqj6rD1ZpmXmRwMEp7SiXGZdKUfdrqj6FhFtdhgpsu35bC96A0KJ2aTa7XpR2FRUfdF/TSAxRdVXu4CUgxd+5Zh7TFH1HGRusXFJgT03rBXlCoUott41dFxkvHY3ELMlvdse2xJjUlH1YQpQjBllugiLDcTs8ihRNTE+ING31zJ9WpGpX2nLaqAialAsJzobSIDM3opk/j02QPQgJ0Xe83PTWgQsCOtzjHMuUAbu6CfGXcxmrhG9emKpBDI8uKlIdL3XWgQsSH7UJbd835oT41ELxEADsWHeGZ7OSDQ9wf3FTAzZy4rfS/fcOU8q3FNl/cT6eGdIQqp6ya5TM731c1b/8c8dWSumCSgxVTDo72U9gf4b7peea0S/NP4zY087iQGHpwbllg1zT5WOLALnvy1COwcGrX0UOwj7ibXq4FgHkFjYcAmA7Mh8PSFn/8Xdby1RbDon0fgA0Z2sRIO33HG4IAyFUlDHv5cQcR/nreDkhPyFNwbtlKNVrCuCFVXn1l0rBm/TL6dWLoqbh96VDFrbdQki3LPuHZnXTZVDUKhZ5dRYzQTyE09yfZSXzGTtuN3D5zr9OHM/h8LPdt1gE4aaYqJHlTDFRAHDc8uuKnBHuOXbUqO7BqDQ9qjIAqqRD0uySQ4AIV54l5s7OacJBBkoJQqvYk3fY14gkHhdaXzQMhzqBAGfi6hFrQr3rBB9eEq0XTZCjzcYR2HsJG4epF5S7X8Nzjv+xMzCkGDz3EtM+CwWhh1mO9MFqgxvSPeDdU6Lg9QVg+FREKneo9DW6j5NeImlEhXjuFIavREvsVR681G5KKqnEceVWUjdFVEvTgf0LBDx3i+FExdoC5gwa0X72dcfkQni1opI0NsHhnmIBPKjFuGwBI2a8facLmJWrVZMteogW7kxztAtWnVQJ0dF5DbRtgB1KjG44PyGkAvW4BBretUR5zDIApSaLOjCQcNGJbFiKHBZQOGK1lpYueSFczpuAingOHF1jwL3pGI0NDnRC0SRi9YachWi4FBWqmuDgzSuKx0R7R/FPh1H4UwrysdNiYrWCgdvdCRZHFPCrmki8C5IbY911Ok5IcynmletCH7pfwZ9FRTDw/VV5x+HWLc+c/Yi530F6aq44hwioXegI/uKHID7zWpFec9/i2x3gLsRB/YLKw2kqEsVQy2zqhXlrbCLuoUY1MEe2vLvpSD0tOIs5kHVNtCBtzmHcSeqXcQlEISeBDnsu9eQMINF3ulNCscVIXXNkCCDg97m7DgQ0X+1TJk9rcZcSQAAAABJRU5ErkJggg=="
                      />
                    </defs>
                  </svg>

                  {{ item.customer.name }}
                </template>
                <template v-else>
                  <!-- 초록 나뭇잎 아이콘 -->
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.75 1.57143H0C0 4.60871 2.74258 7.07143 6.125 7.07143V10.6071C6.125 10.8232 6.32188 11 6.5625 11H7.4375C7.67812 11 7.875 10.8232 7.875 10.6071V7.07143C7.875 4.03415 5.13242 1.57143 1.75 1.57143ZM12.25 0C9.94766 0 7.94609 1.14174 6.89883 2.82857C7.65625 3.57009 8.2168 4.47121 8.51211 5.47054C11.5938 5.18326 14 2.84576 14 0H12.25Z"
                      fill="#4ECF50"
                    />
                  </svg>
                  {{ item.customer.name }}
                </template>
              </td>
              <td class="profile-h4" data-label="고객 연락처">
                {{ item.customer.mobile }}
              </td>
              <td class="profile-h4" data-label="예약일자">
                {{ item.reservdate }}
              </td>
              <td class="profile-h4" data-label="청소일자">
                {{ item.reservinfo.date }} {{ item.reservinfo.time }}
              </td>
              <td class="profile-h4" data-label="처리상태">
                <button
                  class="modal"
                  :class="`processingbox-${item.status}`"
                  @click="
                    item.status === 'waiting'
                      ? accept(item)
                      : item.status === 'assigned'
                      ? null
                      : item.status === 'done'
                      ? opencompleteById(item.id)
                      : item.status === 'confirmed'
                      ? viewReview()
                      : null
                  "
                >
                  {{
                    item.status === "waiting"
                      ? "수락하기"
                      : item.status === "assigned"
                      ? "-"
                      : item.status === "done"
                      ? "완료하기"
                      : item.status === "confirmed"
                      ? "리뷰보기"
                      : "알수없음"
                  }}
                </button>
              </td>
              <td class="profile-h4" data-label="상태">
                <span :class="`statusbox-${item.status}`">
                  {{
                    item.status === "waiting"
                      ? "대기중"
                      : item.status === "assigned"
                      ? "진행중"
                      : item.status === "done"
                      ? "청소완료"
                      : item.status === "confirmed"
                      ? "확정완료"
                      : "알수없음"
                  }}
                </span>
              </td>
              <td class="btnbox" data-label="액션">
                <button class="modal" @click="viewreceipt = true">
                  영수증 보기
                </button>
                <button class="modal" @click="openDetailById(item.id)">
                  상세보기
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 페이지네이션 -->
        <div class="pagination">
          <span>총 {{ filteredList.length }}건의 예약</span>
          <div class="pagebox">
            <button @click="goToPage(currentPage - 1)">←</button>
            <button
              v-for="page in totalPages"
              :key="page"
              :class="{ active: currentPage === page }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
            <button @click="goToPage(currentPage + 1)">→</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 모달 오버레이 -->
  <div
    class="overlay"
    v-show="openReservDetail || viewreceipt || complete || waitinglist"
    @click="
      () => {
        openReservDetail = false;
        viewreceipt = false;
        complete = false;
        waitinglist = false;
      }
    "
  ></div>
  <!-- 예약 상세 모달 -->
  <div class="reservdetailmodal" v-if="openReservDetail && reservdetail">
    <div class="reservdetail-title">
      <p class="profile-h2">예약 상세 정보</p>
      <hr />
      <div
        class="title"
        :class="`status-${reservdetail.status}`"
        style="font-weight: 600"
      >
        예약 번호: {{ reservdetail.number }}
        <span
          :class="
            reservdetail?.status ? `statusbox-${reservdetail.status}` : ''
          "
        >
          {{
            reservdetail?.status === "waiting"
              ? "대기중"
              : reservdetail?.status === "assigned"
              ? "진행중"
              : reservdetail?.status === "done"
              ? "청소완료"
              : reservdetail?.status === "confirmed"
              ? "확정완료"
              : "알수없음"
          }}</span
        >
      </div>
    </div>
    <div class="reservdetail-info-box">
      <div class="reservdetail-left">
        <p class="profile-h2" style="font-size: 16px; font-weight: 500">
          기본 정보
        </p>
        <div class="customerinfo">
          <p class="profile-h3" @click="isCustomerOpen = !isCustomerOpen">
            예약자 정보
            <span class="icon">
              <template v-if="isCustomerOpen">
                <!-- 위쪽 아이콘 (▲) -->
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 22 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 12L10.63 1.407C10.8284 1.18875 11.1716 1.18875 11.37 1.407L21 12"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round"
                  />
                </svg>
              </template>
              <template v-else>
                <!-- 아래쪽 아이콘 (▼) -->
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 22 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 1L11.37 11.593C11.1716 11.8113 10.8284 11.8113 10.63 11.593L1 1"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round"
                  />
                </svg>
              </template>
            </span>
          </p>

          <ul v-show="isCustomerOpen" class="profile-h4">
            <li><span>이름</span>{{ reservdetail.customer.name }}</li>
            <li><span>연락처</span>{{ reservdetail.customer.mobile }}</li>
            <li><span>이메일</span>{{ reservdetail.customer.email }}</li>
            <li><span>주소</span>{{ reservdetail.customer.address }}</li>
          </ul>
        </div>
        <div class="membershipinfo">
          <p class="profile-h3" @click="isMembershipOpen = !isMembershipOpen">
            구독권 정보
            <span class="icon">
              <template v-if="isMembershipOpen">
                <!-- 위쪽 아이콘 (▲) -->
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 22 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 12L10.63 1.407C10.8284 1.18875 11.1716 1.18875 11.37 1.407L21 12"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round"
                  />
                </svg>
              </template>
              <template v-else>
                <!-- 아래쪽 아이콘 (▼) -->
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 22 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 1L11.37 11.593C11.1716 11.8113 10.8284 11.8113 10.63 11.593L1 1"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round"
                  />
                </svg>
              </template>
            </span>
          </p>

          <ul v-show="isMembershipOpen" class="profile-h4">
            <li>
              <span>구독권</span>{{ reservdetail.membership?.name || "-" }}
            </li>
            <li>
              <span>구독일</span>{{ reservdetail.membership?.date || "-" }}
            </li>
            <li>
              <span>회차</span>{{ reservdetail.membership?.count || "-" }}
            </li>
            <li>
              <span>주기</span>{{ reservdetail.membership?.during || "-" }}
            </li>
          </ul>
        </div>
        <div class="workerinfo">
          <p class="profile-h3" @click="isWorkerOpen = !isWorkerOpen">
            담당자 정보
            <span class="icon">
              <template v-if="isWorkerOpen">
                <!-- 위쪽 아이콘 (▲) -->
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 22 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 12L10.63 1.407C10.8284 1.18875 11.1716 1.18875 11.37 1.407L21 12"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round"
                  />
                </svg>
              </template>
              <template v-else>
                <!-- 아래쪽 아이콘 (▼) -->
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 22 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 1L11.37 11.593C11.1716 11.8113 10.8284 11.8113 10.63 11.593L1 1"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round"
                  />
                </svg>
              </template>
            </span>
          </p>

          <ul v-show="isWorkerOpen" class="profile-h4">
            <li><span>이름</span>{{ reservdetail.worker.name }}</li>
            <li><span>연락처</span>{{ reservdetail.worker.mobile }}</li>
            <li><span>이메일</span>{{ reservdetail.worker.email }}</li>
          </ul>
        </div>
        <div class="inquiryinfo">
          <p class="profile-h3" @click="isInquiryOpen = !isInquiryOpen">
            문의 정보
            <span class="icon">
              <template v-if="isInquiryOpen">
                <!-- 위쪽 아이콘 (▲) -->
                <svg
                  width="18"
                  height="13"
                  viewBox="0 0 22 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 12L10.63 1.407C10.8284 1.18875 11.1716 1.18875 11.37 1.407L21 12"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round"
                  />
                </svg>
              </template>
              <template v-else>
                <!-- 아래쪽 아이콘 (▼) -->
                <svg
                  width="18"
                  height="13"
                  viewBox="0 0 22 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 1L11.37 11.593C11.1716 11.8113 10.8284 11.8113 10.63 11.593L1 1"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round"
                  />
                </svg>
              </template>
            </span>
          </p>

          <ul v-show="isInquiryOpen" class="profile-h4">
            <li>
              <span>문의유형</span>{{ reservdetail.inquiry?.type || "-" }}
            </li>
            <li><span>제목</span>{{ reservdetail.inquiry?.title || "-" }}</li>
            <li><span>내용</span>{{ reservdetail.inquiry?.memo || "-" }}</li>
          </ul>
        </div>
      </div>
      <div class="reservdetail-right">
        <p class="profile-h3" style="font-weight: 500">예약 정보</p>
        <div class="reservdetailinfo">
          <button
            class="modal profile-h4"
            style="text-align: right; font-size: 14px"
          >
            첨부파일보기
          </button>
          <ul class="profile-h4">
            <li class="firstli">
              <span>서비스 유형</span>{{ reservdetail.reservinfo?.type || "-" }}
            </li>
            <li>
              <span>제빙기 정보</span
              >{{ reservdetail.reservinfo?.machine || "-" }}
            </li>
            <li>
              <span>서비스 주소</span
              >{{ reservdetail.reservinfo?.address || "-" }}
            </li>
            <li>
              <span>서비스 일시</span>{{ reservdetail.reservinfo?.date || "-" }}
            </li>
            <li>
              <span>추가 서비스</span>{{ reservdetail.reservinfo?.plus || "-" }}
            </li>
            <li>
              <span>요청사항</span>{{ reservdetail.reservinfo?.memo || "-" }}
            </li>
          </ul>
        </div>
        <div class="info-box-bt">
          <ul class="timeline">
            <p class="profile-h3">작업 진행 상황</p>
            <li v-for="(step, index) in stepStates" :key="index">
              <span class="dot" :class="step.class"></span>
              <div class="label profile-h4">
                <p>{{ step.label }}</p>
                <p>{{ step.time }}</p>
              </div>
            </li>
          </ul>
          <div class="receipt">
            <p class="profile-h3">결제 정보</p>
            <ul class="payment profile-h4">
              <li>
                <p style="color: #616161">서비스 금액</p>
                <p>{{ reservdetail.payment?.service.toLocaleString() }}원</p>
              </li>
              <li>
                <p style="color: #616161">추가 서비스</p>
                <p>{{ reservdetail.payment?.extra.toLocaleString() }}원</p>
              </li>
              <li>
                <p style="color: #616161">쿠폰 할인</p>
                <p>{{ reservdetail.payment?.coupon.toLocaleString() }}원</p>
              </li>
              <li>
                <p style="color: #616161">구독권 차감</p>
                <p>
                  {{
                    reservdetail.payment?.membershipDiscount.toLocaleString(
                      "ko-KR",
                      {
                        signDisplay: "always",
                      }
                    )
                  }}원
                </p>
              </li>
              <li>
                <p style="color: #616161">서비스 차감</p>
                <p>
                  {{
                    reservdetail.payment?.extraDiscount.toLocaleString(
                      "ko-KR",
                      {
                        signDisplay: "always",
                      }
                    )
                  }}원
                </p>
              </li>
              <hr />
              <li class="profile-h3" style="margin: 0">
                <p><strong>총 결제 금액</strong></p>
                <p style="color: red">
                  {{
                    (
                      (reservdetail.payment?.service || 0) +
                      (reservdetail.payment?.extra || 0) +
                      (reservdetail.payment?.coupon || 0) +
                      (reservdetail.payment?.membershipDiscount || 0) +
                      (reservdetail.payment?.extraDiscount || 0)
                    ).toLocaleString()
                  }}원
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <button @click="openReservDetail = false">닫기</button>
  </div>
  <!-- 영수증 보기 모달 -->
  <div class="viewreceipt" v-show="viewreceipt">
    <img src="/prime/profile_receipt.png" alt="영수증 이미지" />
    <img
      src="/prime/profile_receipt.png"
      class="print-only"
      alt="영수증 이미지"
    />

    <div class="btnbox">
      <button class="edit" style="padding: 1.5% 3%" @click="printReceipt">
        출력하기
      </button>
      <button
        class="fix"
        style="padding: 1.6% 5.5%"
        @click="viewreceipt = false"
      >
        닫기
      </button>
    </div>
  </div>
  <!-- 보고서 제출 모달  -->
  <div class="completemodal" v-if="complete && reservdetail">
    <h2 class="modal-title profile-h2">문의하기</h2>
    <ul class="form">
      <li>
        <span class="label">예약번호</span>
        <span class="value">{{ reservdetail.number }}</span>
      </li>

      <li>
        <span class="label">레포트 출력</span>
        <button class="modal" v-on:click="viewreceipt = true">
          영수증 보기
        </button>
      </li>
      <li>
        <span class="label">보고서 첨부</span>
        <input type="file" @change="handleFileUpload" />
      </li>
      <li>
        <span class="label">제목</span>
        <input type="text" v-model="title" />
      </li>
      <li>
        <span class="label memo"
          >내용<small style="color: #bdbdbd"
            >{{ content.length }}/1,000</small
          ></span
        >

        <textarea
          v-model="content"
          placeholder="내용을 입력하세요"
          maxlength="1000"
        ></textarea>
      </li>
    </ul>

    <div class="btn-box">
      <button
        style="padding: 1.5% 2.8%"
        class="cancel"
        @click="complete = false"
      >
        취소
      </button>
      <button class="fix" @click="submitInquiry">저장</button>
    </div>
  </div>
  <!-- 배정 대기 목록 모달 -->
  <div
    class="waitinglist"
    v-show="waitinglist"
    v-for="item in filteredList"
    :key="item.id"
  >
    <p class="profile-h1 title">
      배정 대기 목록
      <button class="fix" @click="waitinglist = false">닫기</button>
    </p>
    <div class="list-wrap-been">
      <div class="list-left">
        <ul class="leftlist-wrap">
          <li
            class="leftlist"
            v-for="item in waitingListOnly"
            :key="item.id"
            @click="selectedItem = item"
            :class="{ active: selectedItem?.id === item.id }"
          >
            <div class="profile-h1">{{ item.reservinfo.machine }}</div>
            <div class="profile-h4">일정 | {{ item.reservinfo.date }}</div>
            <div class="profile-h4">주소 | {{ item.reservinfo.address }}</div>
            <div class="profile-h4">
              금액 |
              {{ Math.floor(item.payment.service * 0.4).toLocaleString() }}원
            </div>
          </li>
        </ul>
      </div>
      <div class="list-right" v-if="selectedItem">
        <ul class="listright">
          <li class="profile-h1">{{ selectedItem.reservinfo.machine }}</li>
          <li class="profile-h4">일정 | {{ selectedItem.reservinfo.date }}</li>
          <li class="profile-h4">
            주소 | {{ selectedItem.reservinfo.address }}
          </li>
          <li class="profile-h4">
            금액 |
            {{
              Math.floor(selectedItem.payment.service * 0.4).toLocaleString()
            }}원
          </li>
        </ul>
        <p class="profile-h3">예약자 정보</p>
        <div class="customerinfo">
          <ul class="profile-h4">
            <li><span>이름</span>{{ selectedItem.customer?.name || "-" }}</li>
            <li>
              <span>연락처</span>{{ selectedItem.customer?.mobile || "-" }}
            </li>
            <li>
              <span>이메일</span>{{ selectedItem.customer?.email || "-" }}
            </li>
            <li>
              <span>주소</span>{{ selectedItem.customer?.address || "-" }}
            </li>
          </ul>
        </div>
        <p class="profile-h3 customerlist">
          고객 정보<button class="modal description">첨부파일보기</button>
        </p>
        <div class="reservdetailinfo">
          <ul class="profile-h4">
            <li>
              <span>서비스 유형</span>{{ selectedItem.reservinfo?.type || "-" }}
            </li>
            <li>
              <span>제빙기 정보</span
              >{{ selectedItem.reservinfo?.machine || "-" }}
            </li>
            <li>
              <span>서비스 주소</span
              >{{ selectedItem.reservinfo?.address || "-" }}
            </li>
            <li>
              <span>서비스 일시</span>{{ selectedItem.reservinfo?.date || "-" }}
            </li>
            <li>
              <span>추가 서비스</span>{{ selectedItem.reservinfo?.plus || "-" }}
            </li>
            <li>
              <span>요청사항</span>{{ selectedItem.reservinfo?.memo || "-" }}
            </li>
          </ul>
        </div>
        <div class="btnbox">
          <button
            class="edit"
            style="padding: 2% 4%"
            @click="accept(selectedItem)"
          >
            수락하기
          </button>
          <button
            class="fix"
            style="padding: 2.4% 8%"
            @click="selectedItem = null"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
