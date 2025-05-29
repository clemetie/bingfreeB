<!-- 효빈 관리자 예약 관리 -->
<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { fullSaleList } from "@/data.mjs";
import dayjs from "dayjs";

// 모달 에러 관련 선언

// 차트
import MonthlySalechart from "@/components/MonthlySalechart.vue";
import MonthlySalecircle from "@/components/MonthlySalecircle.vue";

const currentPage = ref(1);
const perPage = 5;

const searchType = ref("whole"); // 전체 , 일반 회원 , 구독 회원
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
const stepStates = computed(() => {
  const status = reservdetail.value?.status;

  const labels = ["배정 완료", "예정 시간", "작업 상태", "클레임 발생 시점", "클레임 상태"];
  const times = {
    waiting: ["25.03.17 14:00", "-", "-", "-"],
    assigned: ["25.03.17 14:00", "25.05.15 23:00", "-", "-"],
    done: ["25.03.17 14:00", "25.05.15 23:00", "25.05.15 00:20", "-"],
    confirmed: ["25.03.17 14:00", "25.05.15 23:00", "25.05.15 00:20", "25.05.22 14:00"],
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
  const found = fullSaleList.find((item) => item.id === id);
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
  const result = fullSaleList
    .filter((item) => {
      // date 파싱 안전 처리
      const rawDate = item?.reservinfo?.date;
      const reservDate = rawDate ? dayjs(rawDate, "YYYY.MM.DD") : null;

      const from = fromDate.value ? dayjs(fromDate.value) : null;
      const to = toDate.value ? dayjs(toDate.value) : null;

      const isInDateRange =
        !from || !to
          ? true
          : reservDate && reservDate.isAfter(from.subtract(1, "day")) && reservDate.isBefore(to.add(1, "day"));

      const statusMatched = statusFilter.value === "all" || item.status === statusFilter.value;

      const memberMatched =
        memberFilter.value === "all" ||
        (memberFilter.value === "normal" && !item.primemember) ||
        (memberFilter.value === "prime" && item.primemember);

      const shopMatched = shopFilter.value === "all" || item?.customer?.shop === shopFilter.value;

      const searchMatched = searchText.value
        ? (searchType.value === "customer" ? item?.customer?.name ?? "" : item?.worker?.name ?? "").includes(
            searchText.value
          )
        : true;

      return statusMatched && memberMatched && shopMatched && searchMatched && isInDateRange;
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

const totalPages = computed(() => Math.ceil(filteredList.value.length / perPage));

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};

// 상태별 개수 계산
const totalCount = fullSaleList.length;
const doneCount = fullSaleList.filter((item) => item.status === "done").length;
const waitingCount = fullSaleList.filter((item) => item.status === "waiting").length;
const assignedCount = fullSaleList.filter((item) => item.status === "assigned").length;
// const confirmedCount = fullSaleList.filter(
//   (item) => item.status === "confirmed"
// ).length;

// 카드에 쓸 데이터
const statusCards = [
  {
    status: "total",
    title: "전체 정산 내역",
    count: totalCount,
    desc: `이번 달 총 ${totalCount}건의 정산 내역이 있습니다.`,
    icon: `<svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.4349 10H1.41992" stroke="#4A90E2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.4349 1.99414H1.41992" stroke="#4A90E2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.4349 18.0059H1.41992" stroke="#4A90E2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    status: "waiting",
    title: "정산 대기",
    count: waitingCount,
    desc: `${waitingCount}건의 정산 요청이 현재 처리 대기 중입니다.`,
    icon: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.9352 26.0072C20.5668 26.0072 25.9427 20.6313 25.9427 13.9997C25.9427 7.36813 20.5668 1.99219 13.9352 1.99219C7.30368 1.99219 1.92773 7.36813 1.92773 13.9997C1.92773 20.6313 7.30368 26.0072 13.9352 26.0072Z" stroke="#F5A623" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.9355 6.79688V14.0014L18.7385 16.4029" stroke="#F5A623" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    status: "assigned",
    title: "정산 진행 중",
    count: assignedCount,
    desc: `${assignedCount}건의 정산이 현재 진행 중입니다.`,
    icon: `<svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.4504 12.902V14.0067C25.4489 16.596 24.6104 19.1155 23.0601 21.1894C21.5097 23.2633 19.3305 24.7805 16.8475 25.5146C14.3644 26.2488 11.7106 26.1606 9.28175 25.2633C6.85291 24.3659 4.77919 22.7075 3.36989 20.5353C1.96059 18.3631 1.29121 15.7935 1.46158 13.2097C1.63194 10.626 2.63293 8.16656 4.31526 6.19821C5.99758 4.22986 8.27111 2.85806 10.7967 2.28742C13.3224 1.71677 15.9648 1.97785 18.33 3.03171" stroke="#50E3C2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.4514 4.40039L13.444 16.42L9.8418 12.8177" stroke="#50E3C2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    status: "done",
    title: "정산 완료",
    count: doneCount,
    desc: `${doneCount}건의 정산이 완료되었습니다.`,
    icon: `<svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.062 1.9005C13.2454 1.52892 13.7753 1.52892 13.9587 1.9005L17.2773 8.62368C17.3501 8.7711 17.4907 8.87333 17.6534 8.89711L25.0755 9.98196C25.4854 10.0419 25.6488 10.5458 25.352 10.8349L19.9823 16.065C19.8643 16.1799 19.8105 16.3455 19.8383 16.5077L21.1055 23.8959C21.1755 24.3044 20.7468 24.6159 20.38 24.423L13.7431 20.9327C13.5974 20.8561 13.4233 20.8561 13.2776 20.9327L6.64077 24.423C6.27396 24.6159 5.84518 24.3044 5.91524 23.8959L7.1824 16.5077C7.21024 16.3455 7.1564 16.1799 7.03847 16.065L1.6687 10.8349C1.3719 10.5458 1.53529 10.0419 1.94525 9.98196L9.36734 8.89711C9.53002 8.87333 9.67061 8.7711 9.74338 8.62368L13.062 1.9005Z" stroke="#D0021B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
];

// 검색 필터
// 클레임 처리 모달
const viewreceipt = ref(false);
const claimStatus = ref("접수 대기");
const replies = ref([
  { date: "2025-01-25 18:55", type: "전화 회신", handler: "김무개" },
  { date: "2025-01-26 10:20", type: "문자 회신", handler: "박예시" },
  { date: "2025-01-27 14:05", type: "카카오톡 회신", handler: "이지원" },
]);

const customerReplies = ref([]);
const internalMemo = ref("");
const processedDate = ref("");

// 모달 열기/닫기
function openModal() {
  viewreceipt.value = true;
}

function closeModal() {
  viewreceipt.value = false;
}

// 저장
function save() {
  const status = claimStatus.value;
  const memo = internalMemo.value;
  const replyLog = customerReplies.value;
  const completionDate = processedDate.value;

  console.log("클레임 상태:", status);
  console.log("고객 회신 내역:", replyLog);
  console.log("처리 완료 일시:", completionDate);
  console.log("내부 메모:", memo);

  alert("저장했습니다.");
  closeModal();
}

// 취소
function cancel() {
  claimStatus.value = "상담 대기";
  customerReplies.value = [];
  internalMemo.value = "";
  processedDate.value = "";

  console.log("입력 초기화 완료");
  closeModal();
}
</script>
<template>
  <div class="adminreservation">
    <div class="dash">
      <p class="dash-name">정산 내역</p>
      <p class="dash-desc">정산 내역을 관리하고 처리 상태를 확인할 수 있습니다.</p>
    </div>
    <div class="dashboard">
      <div class="allcard" v-for="(item, index) in statusCards" :key="index" :class="item.status">
        <p class="profile-h3">
          {{ item.title }}
          <span class="card-icon" v-html="item.icon" style="margin-left: auto; display: inline"></span>
        </p>
        <p class="profile-h1">{{ item.count }} <span class="profile-h3 mbonly">개</span></p>
        <p class="card-desc" v-html="item.desc"></p>
      </div>
    </div>

    <div class="table-wrap">
      <!-- 차트 -->
      <div class="update mb-8">
        <MonthlySalechart />
        <!-- 👉 정산 막대 차트 -->
        <MonthlySalecircle />
        <!-- 👉 정산 원형 통계 -->
      </div>
      <div class="searchbox websearchbox">
        <p class="profile-h2">정산 내역 조회</p>
        <div class="namesearchbox profile-h4">
          <label>검색어</label>
          <select v-model="searchType">
            <option value="whole">전체</option>
            <option value="ordinary">거래명</option>
            <option value="subscribe">정산상태</option>
            <option value="ordinary">서비스명</option>
            <option value="subscribe">담당자</option>
            <option value="subscribe">결제수단</option>
            <option value="subscribe">정산ID</option>
            <option value="subscribe">기타</option>
          </select>
          <input v-model="searchText" type="text" placeholder="검색어를 입력하세요." @keydown.enter="applyFilters" />
        </div>
        <hr />
        <div class="searchtop profile-h4">
          <div class="memberbox">
            <label>회원등급</label>
            <label><input type="radio" v-model="memberFilter" value="all" /> 전체</label>
            <label>
              <input type="radio" v-model="memberFilter" value="normal" />
              <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.75 1.57143H0C0 4.60871 2.74258 7.07143 6.125 7.07143V10.6071C6.125 10.8232 6.32188 11 6.5625 11H7.4375C7.67812 11 7.875 10.8232 7.875 10.6071V7.07143C7.875 4.03415 5.13242 1.57143 1.75 1.57143ZM12.25 0C9.94766 0 7.94609 1.14174 6.89883 2.82857C7.65625 3.57009 8.2168 4.47121 8.51211 5.47054C11.5938 5.18326 14 2.84576 14 0H12.25Z"
                  fill="#4ECF50" />
              </svg>
              일반회원
            </label>

            <label>
              <input type="radio" v-model="memberFilter" value="prime" />
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect width="15" height="15" fill="url(#pattern0_273_887)" />
                <defs>
                  <pattern id="pattern0_273_887" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_273_887" transform="scale(0.0185185)" />
                  </pattern>
                  <image
                    id="image0_273_887"
                    width="54"
                    height="54"
                    preserveAspectRatio="none"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAACXBIWXMAAAsSAAALEgHS3X78AAAEXUlEQVRogd1aPUwUQRR+u6HCxKNZO/QSO8BISGig4OproNAsNgKNJgYSGmjhEis0EaPBaAPRAi5SYHOUHgU2GIMJ0pkc0rmFnImUu+bbn9u9vdmfmb29H76EAHO7c++b7817b96uZBgGJYGi6lkiyiaaJBzHWlG+4L2Jm5ii6n1ENEtEU0Q00RTTo1ElojIR7eEnDtHYxGxC60Q0kzqNcFRtO9bDCMYipqj6rD1ZpmXmRwMEp7SiXGZdKUfdrqj6FhFtdhgpsu35bC96A0KJ2aTa7XpR2FRUfdF/TSAxRdVXu4CUgxd+5Zh7TFH1HGRusXFJgT03rBXlCoUott41dFxkvHY3ELMlvdse2xJjUlH1YQpQjBllugiLDcTs8ihRNTE+ING31zJ9WpGpX2nLaqAialAsJzobSIDM3opk/j02QPQgJ0Xe83PTWgQsCOtzjHMuUAbu6CfGXcxmrhG9emKpBDI8uKlIdL3XWgQsSH7UJbd835oT41ELxEADsWHeGZ7OSDQ9wf3FTAzZy4rfS/fcOU8q3FNl/cT6eGdIQqp6ya5TM731c1b/8c8dWSumCSgxVTDo72U9gf4b7peea0S/NP4zY087iQGHpwbllg1zT5WOLALnvy1COwcGrX0UOwj7ibXq4FgHkFjYcAmA7Mh8PSFn/8Xdby1RbDon0fgA0Z2sRIO33HG4IAyFUlDHv5cQcR/nreDkhPyFNwbtlKNVrCuCFVXn1l0rBm/TL6dWLoqbh96VDFrbdQki3LPuHZnXTZVDUKhZ5dRYzQTyE09yfZSXzGTtuN3D5zr9OHM/h8LPdt1gE4aaYqJHlTDFRAHDc8uuKnBHuOXbUqO7BqDQ9qjIAqqRD0uySQ4AIV54l5s7OacJBBkoJQqvYk3fY14gkHhdaXzQMhzqBAGfi6hFrQr3rBB9eEq0XTZCjzcYR2HsJG4epF5S7X8Nzjv+xMzCkGDz3EtM+CwWhh1mO9MFqgxvSPeDdU6Lg9QVg+FREKneo9DW6j5NeImlEhXjuFIavREvsVR681G5KKqnEceVWUjdFVEvTgf0LBDx3i+FExdoC5gwa0X72dcfkQni1opI0NsHhnmIBPKjFuGwBI2a8facLmJWrVZMteogW7kxztAtWnVQJ0dF5DbRtgB1KjG44PyGkAvW4BBretUR5zDIApSaLOjCQcNGJbFiKHBZQOGK1lpYueSFczpuAingOHF1jwL3pGI0NDnRC0SRi9YachWi4FBWqmuDgzSuKx0R7R/FPh1H4UwrysdNiYrWCgdvdCRZHFPCrmki8C5IbY911Ok5IcynmletCH7pfwZ9FRTDw/VV5x+HWLc+c/Yi530F6aq44hwioXegI/uKHID7zWpFec9/i2x3gLsRB/YLKw2kqEsVQy2zqhXlrbCLuoUY1MEe2vLvpSD0tOIs5kHVNtCBtzmHcSeqXcQlEISeBDnsu9eQMINF3ulNCscVIXXNkCCDg97m7DgQ0X+1TJk9rcZcSQAAAABJRU5ErkJggg==" />
                </defs>
              </svg>
              구독회원
            </label>
          </div>
          <div class="shopbox">
            <label>회원유형</label>
            <label><input type="radio" value="all" v-model="shopFilter" /> 전체</label>
            <label><input type="radio" value="personal" v-model="shopFilter" /> 개인회원</label>
            <label><input type="radio" value="business" v-model="shopFilter" /> 사업자회원</label>
          </div>
        </div>
        <hr />
        <div class="searchbt profile-h4">
          <div class="statusbox">
            <label>정산상태</label>
            <label><input type="radio" value="all" v-model="statusFilter" /> 전체</label>
            <label><input type="radio" value="waiting" v-model="statusFilter" /> 정산대기</label>
            <label><input type="radio" value="assigned" v-model="statusFilter" /> 정산진행</label>
            <label><input type="radio" value="confirmed" v-model="statusFilter" /> 정산확인</label>
            <label><input type="radio" value="done" v-model="statusFilter" /> 정산완료</label>
          </div>
          <div class="searchdate">
            <div class="datepicker-box">
              <label>정산일자</label>
              <input
                type="date"
                v-model="fromDateInput"
                @change="
                  () => {
                    dateFilter = 'custom';
                    applyFilters();
                  }
                " />
              ~
              <input
                type="date"
                v-model="toDateInput"
                @change="
                  () => {
                    dateFilter = 'custom';
                    applyFilters();
                  }
                " />
            </div>
            <ul class="date-filter">
              <li style="font-size: 12px" :class="{ active: dateFilter === 'all' }" @click="dateFilter = 'all'">
                전체
              </li>
              <li style="font-size: 12px" :class="{ active: dateFilter === 'today' }" @click="dateFilter = 'today'">
                오늘
              </li>
              <li style="font-size: 12px" :class="{ active: dateFilter === 'plus7d' }" @click="dateFilter = 'plus7d'">
                7일
              </li>
              <li style="font-size: 12px" :class="{ active: dateFilter === 'plus15d' }" @click="dateFilter = 'plus15d'">
                15일
              </li>
              <li style="font-size: 12px" :class="{ active: dateFilter === 'plus1m' }" @click="dateFilter = 'plus1m'">
                1개월
              </li>
              <li style="font-size: 12px" :class="{ active: dateFilter === 'plus3m' }" @click="dateFilter = 'plus3m'">
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
      <div class="tablelist">
        <h2 class="profile-h2">정산 현황</h2>
        <table class="table">
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>정산번호</th>
              <th>기사명</th>
              <th>정산유형</th>
              <th>연락처</th>
              <th>정산기간</th>
              <th>청소건수</th>
              <th>총 금액</th>
              <th>보너스</th>
              <th>수수료</th>
              <th>상태</th>
              <th>처리일자</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedList" :key="item.id">
              <td data-label="예약번호">{{ item.number }}</td>
              <td class="customername" data-label="고객명">
                <template v-if="item.primemember">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="15" height="15" fill="url(#pattern0_273_889)" />
                    <defs>
                      <pattern id="pattern0_273_889" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#image0_273_889" transform="scale(0.0185185)" />
                      </pattern>
                      <image
                        id="image0_273_889"
                        width="54"
                        height="54"
                        preserveAspectRatio="none"
                        xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAACXBIWXMAAAsSAAALEgHS3X78AAAEXUlEQVRogd1aPUwUQRR+u6HCxKNZO/QSO8BISGig4OproNAsNgKNJgYSGmjhEis0EaPBaAPRAi5SYHOUHgU2GIMJ0pkc0rmFnImUu+bbn9u9vdmfmb29H76EAHO7c++b7817b96uZBgGJYGi6lkiyiaaJBzHWlG+4L2Jm5ii6n1ENEtEU0Q00RTTo1ElojIR7eEnDtHYxGxC60Q0kzqNcFRtO9bDCMYipqj6rD1ZpmXmRwMEp7SiXGZdKUfdrqj6FhFtdhgpsu35bC96A0KJ2aTa7XpR2FRUfdF/TSAxRdVXu4CUgxd+5Zh7TFH1HGRusXFJgT03rBXlCoUott41dFxkvHY3ELMlvdse2xJjUlH1YQpQjBllugiLDcTs8ihRNTE+ING31zJ9WpGpX2nLaqAialAsJzobSIDM3opk/j02QPQgJ0Xe83PTWgQsCOtzjHMuUAbu6CfGXcxmrhG9emKpBDI8uKlIdL3XWgQsSH7UJbd835oT41ELxEADsWHeGZ7OSDQ9wf3FTAzZy4rfS/fcOU8q3FNl/cT6eGdIQqp6ya5TM731c1b/8c8dWSumCSgxVTDo72U9gf4b7peea0S/NP4zY087iQGHpwbllg1zT5WOLALnvy1COwcGrX0UOwj7ibXq4FgHkFjYcAmA7Mh8PSFn/8Xdby1RbDon0fgA0Z2sRIO33HG4IAyFUlDHv5cQcR/nreDkhPyFNwbtlKNVrCuCFVXn1l0rBm/TL6dWLoqbh96VDFrbdQki3LPuHZnXTZVDUKhZ5dRYzQTyE09yfZSXzGTtuN3D5zr9OHM/h8LPdt1gE4aaYqJHlTDFRAHDc8uuKnBHuOXbUqO7BqDQ9qjIAqqRD0uySQ4AIV54l5s7OacJBBkoJQqvYk3fY14gkHhdaXzQMhzqBAGfi6hFrQr3rBB9eEq0XTZCjzcYR2HsJG4epF5S7X8Nzjv+xMzCkGDz3EtM+CwWhh1mO9MFqgxvSPeDdU6Lg9QVg+FREKneo9DW6j5NeImlEhXjuFIavREvsVR681G5KKqnEceVWUjdFVEvTgf0LBDx3i+FExdoC5gwa0X72dcfkQni1opI0NsHhnmIBPKjFuGwBI2a8facLmJWrVZMteogW7kxztAtWnVQJ0dF5DbRtgB1KjG44PyGkAvW4BBretUR5zDIApSaLOjCQcNGJbFiKHBZQOGK1lpYueSFczpuAingOHF1jwL3pGI0NDnRC0SRi9YachWi4FBWqmuDgzSuKx0R7R/FPh1H4UwrysdNiYrWCgdvdCRZHFPCrmki8C5IbY911Ok5IcynmletCH7pfwZ9FRTDw/VV5x+HWLc+c/Yi530F6aq44hwioXegI/uKHID7zWpFec9/i2x3gLsRB/YLKw2kqEsVQy2zqhXlrbCLuoUY1MEe2vLvpSD0tOIs5kHVNtCBtzmHcSeqXcQlEISeBDnsu9eQMINF3ulNCscVIXXNkCCDg97m7DgQ0X+1TJk9rcZcSQAAAABJRU5ErkJggg==" />
                    </defs>
                  </svg>

                  {{ item.customer.name }}
                </template>
                <template v-else>
                  <!-- 초록 나뭇잎 아이콘 -->
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.75 1.57143H0C0 4.60871 2.74258 7.07143 6.125 7.07143V10.6071C6.125 10.8232 6.32188 11 6.5625 11H7.4375C7.67812 11 7.875 10.8232 7.875 10.6071V7.07143C7.875 4.03415 5.13242 1.57143 1.75 1.57143ZM12.25 0C9.94766 0 7.94609 1.14174 6.89883 2.82857C7.65625 3.57009 8.2168 4.47121 8.51211 5.47054C11.5938 5.18326 14 2.84576 14 0H12.25Z"
                      fill="#4ECF50" />
                  </svg>
                  {{ item.customer.name }}
                </template>
              </td>
              <td data-label="정산번호">{{ item.customer.saleId }}</td>
              <td data-label="기사명">{{ item.workername }}</td>
              <td data-label="정산유형">{{ item.customer.type }}</td>
              <td data-label="연락처">{{ item.worker.mobile }}</td>
              <td data-label="정산기간">
                {{ item.customer.period }}
              </td>
              <td data-label="청소건수">
                {{ item.customer.cleannum }}
              </td>

              <td class="btnbox" data-label="총금액">
                {{ item.customer.totalPrice }}
              </td>
              <td class="btnbox" data-label="보너스">
                {{ item.customer.plusp }}
              </td>
              <td class="" data-label="수수료">
                {{ item.tex }}
              </td>

              <td data-label="상태">
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

              <td data-label="처리일자">{{ item.customer.settledAt }}</td>

              <td class="btnbox" data-label="액션">
                <button class="modal" v-on:click="openModal">정산처리</button>
                <button class="modal" @click="openDetailById(item.id)">정산내역</button>
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
              @click="goToPage(page)">
              {{ page }}
            </button>
            <button @click="goToPage(currentPage + 1)">→</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 모달 오버레이 -->
  <!-- <div
    class="overlay"
    v-show="openReservDetail || viewreceipt"
    @click="
      () => {
        openReservDetail = false;
        viewreceipt = false;
      }
    "></div> -->
  <!-- 예약 상세 모달 -->
  <div class="reservdetailmodal" v-if="openReservDetail && reservdetail">
    <div class="reservdetail-title">
      <p class="profile-h2">클레임 상세 정보</p>
      <hr />
      <div class="title" :class="`status-${reservdetail.status}`" style="font-weight: 600">
        클레임 ID: {{ reservdetail.customer.claimId }}
        <span :class="reservdetail?.status ? `statusbox-${reservdetail.status}` : ''">
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
        <p class="profile-h2" style="font-size: 16px; font-weight: 500">기본 정보</p>
        <div class="customerinfo">
          <p class="profile-h3" @click="isCustomerOpen = !isCustomerOpen">
            예약자 정보
            <span class="icon">
              <template v-if="isCustomerOpen">
                <!-- 위쪽 아이콘 (▲) -->
                <svg width="15" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 12L10.63 1.407C10.8284 1.18875 11.1716 1.18875 11.37 1.407L21 12"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round" />
                </svg>
              </template>
              <template v-else>
                <!-- 아래쪽 아이콘 (▼) -->
                <svg width="15" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 1L11.37 11.593C11.1716 11.8113 10.8284 11.8113 10.63 11.593L1 1"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round" />
                </svg>
              </template>
            </span>
          </p>

          <ul v-show="isCustomerOpen" class="profile-h4">
            <li>
              <span>이름</span>{{ reservdetail.customer.name }}{{ ` (${reservdetail.store})` }}
              <img
                :src="reservdetail.customer.avatar"
                alt="고객 이미지"
                class="w-8 h-8 rounded-full inline-block ml-2" />
            </li>

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
                <svg width="15" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 12L10.63 1.407C10.8284 1.18875 11.1716 1.18875 11.37 1.407L21 12"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round" />
                </svg>
              </template>
              <template v-else>
                <!-- 아래쪽 아이콘 (▼) -->
                <svg width="15" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 1L11.37 11.593C11.1716 11.8113 10.8284 11.8113 10.63 11.593L1 1"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round" />
                </svg>
              </template>
            </span>
          </p>

          <ul v-show="isMembershipOpen" class="profile-h4">
            <li><span>구독권</span>{{ reservdetail.membership?.name || "-" }}</li>
            <li><span>구독일</span>{{ reservdetail.membership?.date || "-" }}</li>
            <li><span>회차</span>{{ reservdetail.membership?.count || "-" }}</li>
            <li><span>주기</span>{{ reservdetail.membership?.during || "-" }}</li>
          </ul>
        </div>
        <div class="workerinfo">
          <p class="profile-h3" @click="isWorkerOpen = !isWorkerOpen">
            담당자 정보
            <span class="icon">
              <template v-if="isWorkerOpen">
                <!-- 위쪽 아이콘 (▲) -->
                <svg width="15" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 12L10.63 1.407C10.8284 1.18875 11.1716 1.18875 11.37 1.407L21 12"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round" />
                </svg>
              </template>
              <template v-else>
                <!-- 아래쪽 아이콘 (▼) -->
                <svg width="15" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 1L11.37 11.593C11.1716 11.8113 10.8284 11.8113 10.63 11.593L1 1"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round" />
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
                <svg width="18" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 12L10.63 1.407C10.8284 1.18875 11.1716 1.18875 11.37 1.407L21 12"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round" />
                </svg>
              </template>
              <template v-else>
                <!-- 아래쪽 아이콘 (▼) -->
                <svg width="18" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 1L11.37 11.593C11.1716 11.8113 10.8284 11.8113 10.63 11.593L1 1"
                    stroke="#424242"
                    stroke-width="1.4"
                    stroke-linecap="round" />
                </svg>
              </template>
            </span>
          </p>

          <ul v-show="isInquiryOpen" class="profile-h4">
            <li><span>문의유형</span>{{ reservdetail.inquiry?.type || "-" }}</li>
            <li><span>제목</span>{{ reservdetail.inquiry?.title || "-" }}</li>
            <li><span>내용</span>{{ reservdetail.inquiry?.memo || "-" }}</li>
          </ul>
        </div>
      </div>
      <div class="reservdetail-right">
        <p class="profile-h3" style="font-weight: 500">클레임 정보</p>
        <div class="reservdetailinfo">
          <button class="modal profile-h4" style="text-align: right; font-size: 14px">첨부파일보기</button>
          <ul class="profile-h4">
            <li class="firstli"><span>클레임 유형</span>{{ reservdetail.reservinfo?.type || "-" }}</li>
            <li><span>C/S 고객민감도</span>{{ reservdetail.reservinfo?.machine || "-" }}</li>
            <li><span>클레임 이력</span>{{ reservdetail.reservinfo?.address || "-" }}</li>
            <li><span>최근 클레임일</span>{{ reservdetail.reservinfo?.date || "-" }}</li>
            <li><span>클레임 메모</span>{{ reservdetail.reservinfo?.memo || "-" }}</li>
          </ul>
        </div>
        <div class="info-box-bt">
          <ul class="timeline">
            <p class="profile-h3">클레임 진행 상황</p>
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
                    reservdetail.payment?.membershipDiscount.toLocaleString("ko-KR", {
                      signDisplay: "always",
                    })
                  }}원
                </p>
              </li>
              <li>
                <p style="color: #616161">서비스 차감</p>
                <p>
                  {{
                    reservdetail.payment?.extraDiscount.toLocaleString("ko-KR", {
                      signDisplay: "always",
                    })
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
  <!-- <div class="viewreceipt" v-show="viewreceipt">
    <img src="/prime/profile_receipt.png" alt="영수증 이미지" />
    <img src="/prime/profile_receipt.png" class="print-only" alt="영수증 이미지" />

    <div class="btnbox">
      <button class="edit" style="padding: 1.5% 3%" @click="printReceipt">출력하기</button>
      <button class="fix" style="padding: 1.6% 5.5%" @click="viewreceipt = false">닫기</button>
    </div>
  </div> -->
  <div v-if="viewreceipt" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div
      class="w-[500px] h-[680px] relative bg-white rounded-[10px] shadow-[0px_4px_13px_0px_rgba(0,0,0,0.10)] overflow-hidden"
      @click.stop>
      <!-- 제목 -->
      <div class="absolute left-[25px] top-[20px] text-black text-lg font-semibold font-Pretendard">
        클레임 상세 및 처리
      </div>

      <!-- 구분선 -->
      <div class="absolute w-full h-0 top-[61px] border-t border-neutral-200"></div>
      <div class="absolute w-full h-0 top-[435px] border-t border-neutral-200"></div>
      <div class="absolute w-full h-0 top-[579px] border-t border-neutral-200"></div>

      <!-- 클레임 상태 -->
      <div class="absolute left-[25px] top-[81px] text-zinc-600 text-base font-semibold font-Pretendard">
        클레임 상태
      </div>
      <select
        v-model="claimStatus"
        class="absolute left-[176px] top-[78px] w-[120px] h-6 border border-stone-300 rounded-[5px] text-xs text-neutral-700 px-2">
        <option value="접수 대기">접수 대기</option>
        <option value="상담 대기">상담 대기</option>
        <option value="진행 중">진행 중</option>
        <option value="처리 완료">처리 완료</option>
      </select>

      <!-- 저장하기 버튼 (상태 전용) -->
      <div
        class="absolute w-20 h-6 left-[346px] top-[78px] bg-lime-600 rounded-[5px] flex items-center justify-center cursor-pointer text-white text-xs font-semibold font-Pretendard">
        저장 하기
      </div>

      <!-- 담당자 -->
      <div class="absolute left-[25px] top-[141px] text-zinc-600 text-base font-semibold font-Pretendard">
        클레임 담당자
      </div>
      <div class="absolute left-[176px] top-[141px] text-zinc-600 text-base font-semibold font-Pretendard">김무개</div>

      <!-- 고객 회신 내역 -->
      <div class="absolute left-[25px] top-[199px] text-zinc-600 text-base font-semibold font-Pretendard">
        고객 회신내역
      </div>
      <div class="absolute left-[176px] top-[198px] text-neutral-500 text-sm font-normal font-Pretendard space-y-1">
        <div v-for="(reply, index) in replies" :key="index">
          {{ reply.date }} {{ reply.type }} - {{ reply.handler }}
        </div>
      </div>

      <!-- 작업팀 전달 여부 -->
      <div class="absolute left-[25px] top-[275px] text-zinc-600 text-base font-semibold font-Pretendard">
        작업팀 전달여부
      </div>

      <div class="absolute left-[176px] top-[275px] flex items-center space-x-3">
        <div class="w-4 h-4 rounded-full border border-zinc-300 relative">
          <div class="w-3 h-3 bg-rose-500 rounded-full absolute left-[0.5px] top-[0.5px]"></div>
        </div>
        <div class="text-rose-600 text-sm font-semibold">완료</div>
      </div>

      <!-- 처리 완료 일시 -->
      <div class="absolute left-[25px] top-[3px] text-zinc-600 text-base font-semibold font-Pretendard">
        처리 완료 일시
      </div>
      <div class="absolute left-[176px] top-[300px] text-sm text-neutral-600">2025-01-30 18:55</div>

      <!-- 내부 메모 -->
      <div class="absolute left-[25px] top-[341px] text-zinc-600 text-base font-semibold font-Pretendard">
        내부 메모
      </div>
      <div
        class="absolute left-[176px] top-[341px] w-[280px] h-[80px] border border-stone-300 rounded-lg p-2 text-sm text-neutral-700 overflow-y-auto">
        - 고객 요청에 따라 자사몰 쿠폰 제공 예정입니다.<br />
        - 차기 방문 시 처리 완료 확인 요청 드림.
      </div>

      <!-- 보상 내용 -->
      <div class="absolute left-[25px] top-[470px] text-zinc-600 text-base font-semibold font-Pretendard">
        보상 내용
      </div>
      <div class="absolute left-[176px] top-[470px] text-zinc-600 text-sm font-Pretendard">
        자사몰 세제 1세트 무료 제공
      </div>

      <!-- 버튼 영역 -->
      <button
        class="absolute w-16 h-10 left-[412px] top-[615px] bg-blue-600 rounded-[50px] text-white text-base font-semibold font-Pretendard"
        @click="save">
        저장
      </button>
      <button
        class="absolute w-16 h-10 left-[333px] top-[615px] rounded-[50px] border border-orange-500 text-orange-500 text-base font-semibold font-Pretendard"
        @click="cancel">
        취소
      </button>
    </div>
  </div>
</template>
<style scoped>
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css");
</style>
