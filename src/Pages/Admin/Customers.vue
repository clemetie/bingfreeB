<!-- 수현 관리자 고객 관리 -->
<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { fullReservationList } from "@/data.mjs";
import dayjs from "dayjs";

const currentPage = ref(1);
const perPage = 5;

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
          : reservDate.isAfter(fromDate.value.subtract(1, "day")) && reservDate.isBefore(toDate.value.add(1, "day"));

      const statusMatched = statusFilter.value === "all" || item.status === statusFilter.value;

      const memberMatched =
        memberFilter.value === "all" ||
        (memberFilter.value === "normal" && !item.primemember) ||
        (memberFilter.value === "prime" && item.primemember) ||
        (memberFilter.value === "vip" && item.primemember);

      const shopMatched = shopFilter.value === "all" || item.customer.shop === shopFilter.value;

      const searchMatched = searchText.value
        ? (searchType.value === "customer" ? item.customer.name : item.worker.name || "").includes(searchText.value)
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
const totalCount = fullReservationList.length;
const doneCount = fullReservationList.filter((item) => item.status === "done").length;
const waitingCount = fullReservationList.filter((item) => item.status === "waiting").length;
const assignedCount = fullReservationList.filter((item) => item.status === "assigned").length;
// const confirmedCount = fullReservationList.filter(
//   (item) => item.status === "confirmed"
// ).length;

// 카드에 쓸 데이터
const statusCards = [
  {
    status: "total",
    title: "전체 고객",
    count: totalCount,
    desc: `이 달 신규 고객 수 ${totalCount}명 증가 했습니다.`,
    icon: `<svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.4349 10H1.41992" stroke="#893BEE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.4349 1.99414H1.41992" stroke="#893BEE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.4349 18.0059H1.41992" stroke="#893BEE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
  {
    status: "done",
    title: "활성 고객",
    count: doneCount,
    desc: `이 달 청소 서비스 이용 고객 수는 ${doneCount}명 입니다.`,
    icon: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.9352 26.0072C20.5668 26.0072 25.9427 20.6313 25.9427 13.9997C25.9427 7.36813 20.5668 1.99219 13.9352 1.99219C7.30368 1.99219 1.92773 7.36813 1.92773 13.9997C1.92773 20.6313 7.30368 26.0072 13.9352 26.0072Z" stroke="#5AB21A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.9355 6.79688V14.0014L18.7385 16.4029" stroke="#5AB21A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
  {
    status: "assigned",
    title: "신규 고객",
    count: assignedCount,
    desc: `지난 달 대비 신규 고객 수 ${assignedCount}명 증가 했습니다.`,
    icon: `<svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.4504 12.902V14.0067C25.4489 16.596 24.6104 19.1155 23.0601 21.1894C21.5097 23.2633 19.3305 24.7805 16.8475 25.5146C14.3644 26.2488 11.7106 26.1606 9.28175 25.2633C6.85291 24.3659 4.77919 22.7075 3.36989 20.5353C1.96059 18.3631 1.29121 15.7935 1.46158 13.2097C1.63194 10.626 2.63293 8.16656 4.31526 6.19821C5.99758 4.22986 8.27111 2.85806 10.7967 2.28742C13.3224 1.71677 15.9648 1.97785 18.33 3.03171" stroke="#F99B23" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.4514 4.40039L13.444 16.42L9.8418 12.8177" stroke="#F99B23" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
  {
    status: "waiting",
    title: "평균 예약",
    count: waitingCount,
    desc: `이달 평균 예약 건 수 ${waitingCount}건 입니다.`,
    icon: `<svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.062 1.9005C13.2454 1.52892 13.7753 1.52892 13.9587 1.9005L17.2773 8.62368C17.3501 8.7711 17.4907 8.87333 17.6534 8.89711L25.0755 9.98196C25.4854 10.0419 25.6488 10.5458 25.352 10.8349L19.9823 16.065C19.8643 16.1799 19.8105 16.3455 19.8383 16.5077L21.1055 23.8959C21.1755 24.3044 20.7468 24.6159 20.38 24.423L13.7431 20.9327C13.5974 20.8561 13.4233 20.8561 13.2776 20.9327L6.64077 24.423C6.27396 24.6159 5.84518 24.3044 5.91524 23.8959L7.1824 16.5077C7.21024 16.3455 7.1564 16.1799 7.03847 16.065L1.6687 10.8349C1.3719 10.5458 1.53529 10.0419 1.94525 9.98196L9.36734 8.89711C9.53002 8.87333 9.67061 8.7711 9.74338 8.62368L13.062 1.9005Z" stroke="#F20F0F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`,
  },
];
import { reactive } from "vue";

const selectAll = ref(false);

// 항목에 checked 속성 추가
const reservationList = reactive(
  fullReservationList.map((item) => ({
    ...item,
    checked: false,
  }))
);

// 전체 선택/해제
const toggleAll = () => {
  reservationList.forEach((item) => {
    item.checked = selectAll.value;
  });
};

// 개별 체크 상태 확인 후 전체 선택 상태 동기화
const checkIndividual = () => {
  selectAll.value = reservationList.every((item) => item.checked);
};
</script>
<template>
  <!-- 전체 -->
  <div class="adminreservation">
    <div class="dash">
      <p class="dash-name">고객 관리</p>
      <p class="dash-desc">전체고객을 관리할 수 있습니다.</p>
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
      <div class="searchbox websearchbox">
        <div class="search-wrap" style="display: flex; justify-content: space-between">
          <p class="profile-h2">회원 검색</p>
          <button>
            <svg width="81" height="27" viewBox="0 0 81 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.75" y="1.67188" width="79.5" height="23.7297" rx="2.25" stroke="#FF5C5C" stroke-width="1.5" />
              <path
                d="M32.8262 9.03223V20.4072H31.6201V9.03223H32.8262ZM23.4824 17.3096C24.4155 17.3032 25.4883 17.2969 26.6055 17.2588V16.1289C25.2725 15.9575 24.4092 15.1768 24.4219 14.0596C24.4092 12.7773 25.5264 11.9268 27.1768 11.9268C28.8398 11.9268 29.9824 12.7773 29.9824 14.0596C29.9824 15.1641 29.1191 15.9385 27.7988 16.1162V17.2207C28.8525 17.1763 29.9189 17.0938 30.9219 16.9668L31.0107 17.8682C28.4844 18.2871 25.7295 18.3125 23.6475 18.3125L23.4824 17.3096ZM30.668 10.3906V11.3555H23.7236V10.3906H26.6055V9.05762H27.8115V10.3906H30.668ZM27.1768 12.8662C26.2246 12.8662 25.5518 13.3359 25.5645 14.0596C25.5518 14.7832 26.2246 15.2275 27.1768 15.2275C28.1543 15.2275 28.8271 14.7832 28.8271 14.0596C28.8271 13.3359 28.1543 12.8662 27.1768 12.8662ZM44.1123 9.04492V17.665H42.9062V16.5732H40.6211V15.7227H42.9062V9.04492H44.1123ZM44.3916 19.1885V20.166H36.1777V16.8271H37.3711V19.1885H44.3916ZM34.6035 14.2373C36.7109 14.2246 39.542 14.1992 41.9668 13.8945L42.043 14.7578C41.0718 14.9165 40.0498 15.0244 39.0469 15.0879V17.3096H37.8408V15.1514C36.7363 15.2021 35.6763 15.2085 34.7559 15.2021L34.6035 14.2373ZM38.3232 9.47656C39.9863 9.47656 41.1416 10.2764 41.1416 11.4824C41.1416 12.6885 39.9863 13.4629 38.3232 13.4629C36.6348 13.4629 35.4922 12.6885 35.4922 11.4824C35.4922 10.2764 36.6348 9.47656 38.3232 9.47656ZM38.3232 10.3779C37.3076 10.3652 36.6221 10.7969 36.6348 11.4824C36.6221 12.1553 37.3076 12.5742 38.3232 12.5742C39.3008 12.5742 39.9863 12.1553 39.999 11.4824C39.9863 10.7969 39.3008 10.3652 38.3232 10.3779ZM56.2744 14.377V15.3672H45.8896V14.377H56.2744ZM55.0684 12.4092V13.3867H47.1846V9.43848H54.9922V10.4287H48.3779V12.4092H55.0684ZM51.0693 16.2559C53.5195 16.2559 54.9922 17.0049 54.9922 18.3252C54.9922 19.6455 53.5195 20.3945 51.0693 20.3818C48.6064 20.3945 47.1211 19.6455 47.1211 18.3252C47.1211 17.0049 48.6064 16.2559 51.0693 16.2559ZM51.0693 17.1826C49.3301 17.1953 48.3398 17.6016 48.3398 18.3252C48.3398 19.0488 49.3301 19.4551 51.0693 19.4551C52.7832 19.4551 53.7861 19.0488 53.7861 18.3252C53.7861 17.6016 52.7832 17.1953 51.0693 17.1826ZM67.5225 15.2402V16.2178H57.1123V15.2402H61.7207V14.1611H58.4453V11.2666H65.0088V10.251H58.4199V9.29883H66.2148V12.1553H59.6387V13.2217H66.4434V14.1611H62.9141V15.2402H67.5225ZM66.2783 17.0176V20.3184H65.0596V17.9824H58.2803V17.0176H66.2783Z"
                fill="#FF5C5C" />
              <path d="M12 13.5H18M15 16V11" stroke="#FF5C5C" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="namesearchbox profile-h4">
          <label>검색어</label>
          <select>
            <option>전체</option>
            <option>예약번호</option>
            <option>아이디</option>
            <option>이름</option>
            <option>주소</option>
            <option>연락처</option>
          </select>
          <input v-model="searchText" type="text" placeholder="이름을 입력하세요" @keydown.enter="applyFilters" />
        </div>
        <hr />
        <div class="searchtop profile-h4">
          <div class="memberbox">
            <label>회원등급</label>

            <label><input type="radio" v-model="memberFilter" value="all" /> 전체</label>
            <label
              ><input type="radio" v-model="memberFilter" value="normal" />
              <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.75 1.57143H0C0 4.60871 2.74258 7.07143 6.125 7.07143V10.6071C6.125 10.8232 6.32188 11 6.5625 11H7.4375C7.67812 11 7.875 10.8232 7.875 10.6071V7.07143C7.875 4.03415 5.13242 1.57143 1.75 1.57143ZM12.25 0C9.94766 0 7.94609 1.14174 6.89883 2.82857C7.65625 3.57009 8.2168 4.47121 8.51211 5.47054C11.5938 5.18326 14 2.84576 14 0H12.25Z"
                  fill="#4ECF50" />
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
              구독</label
            >
            <label
              ><input type="radio" v-model="memberFilter" value="vip" />
              <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.10981 0.382647L4.62988 3.22683L1.31874 3.68439C0.724961 3.76602 0.486994 4.45988 0.917601 4.85729L3.31313 7.06991L2.74655 10.1955C2.64456 10.7605 3.27234 11.1837 3.79813 10.9194L6.76025 9.44364L9.72238 10.9194C10.2482 11.1815 10.8759 10.7605 10.774 10.1955L10.2074 7.06991L12.6029 4.85729C13.0335 4.45988 12.7955 3.76602 12.2018 3.68439L8.89062 3.22683L7.4107 0.382647C7.14553 -0.124322 6.37724 -0.130766 6.10981 0.382647Z"
                  fill="#FFDF0D" />
              </svg>

              VIP</label
            >
          </div>
          <div class="shopbox">
            <label>회원구분</label>
            <label><input type="radio" value="all" v-model="shopFilter" /> 전체</label>
            <label><input type="radio" value="personal" v-model="shopFilter" /> 개인회원</label>
            <label><input type="radio" value="business" v-model="shopFilter" /> 사업자회원</label>
          </div>
        </div>
        <hr />
        <div class="searchbt profile-h4">
          <div class="statusbox">
            <label>가입승인</label>
            <label><input type="radio" value="all" v-model="statusFilter" /> 전체</label>
            <label><input type="radio" value="waiting" v-model="statusFilter" /> 승인</label>
            <label><input type="radio" value="assigned" v-model="statusFilter" /> 미승인</label>
          </div>
          <div class="searchdate">
            <div class="datepicker-box">
              <label>회원가입일</label>
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
      <div class="searchbox mbsearchbox">
        <p class="profile-h2">
          회원검색
          <button class="modal profile-h4" v-on:click="clickadd = !clickadd">상세검색</button>
        </p>
        <div class="namesearchbox profile-h4">
          <label>검색어</label>
          <select>
            <option>전체</option>
            <option>예약번호</option>
            <option>아이디</option>
            <option>이름</option>
            <option>주소</option>
            <option>연락처</option>
          </select>
          <input v-model="searchText" type="text" placeholder="이름을 입력하세요" @keydown.enter="applyFilters" />
        </div>
        <hr />
        <div class="clickadd" v-show="clickadd">
          <div class="searchtop profile-h4">
            <div class="memberbox">
              <label class="filtermb">회원등급</label>
              <div class="mbbox">
                <label><input type="radio" v-model="memberFilter" value="all" /> 전체</label>
                <label
                  ><input type="radio" v-model="memberFilter" value="normal" />
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.75 1.57143H0C0 4.60871 2.74258 7.07143 6.125 7.07143V10.6071C6.125 10.8232 6.32188 11 6.5625 11H7.4375C7.67812 11 7.875 10.8232 7.875 10.6071V7.07143C7.875 4.03415 5.13242 1.57143 1.75 1.57143ZM12.25 0C9.94766 0 7.94609 1.14174 6.89883 2.82857C7.65625 3.57009 8.2168 4.47121 8.51211 5.47054C11.5938 5.18326 14 2.84576 14 0H12.25Z"
                      fill="#4ECF50" />
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
                  구독</label
                >
              </div>
            </div>
            <div class="shopbox">
              <label class="filtermb">회원 구분</label>
              <div class="mbbox">
                <label><input type="radio" value="all" v-model="shopFilter" /> 전체</label>
                <label><input type="radio" value="personal" v-model="shopFilter" /> 개인회원</label>
                <label><input type="radio" value="business" v-model="shopFilter" /> 사업자회원</label>
              </div>
            </div>
          </div>
          <hr />
          <div class="searchbt profile-h4">
            <div class="statusbox">
              <label class="filtermb">예약상태</label>
              <label><input type="radio" value="all" v-model="statusFilter" /> 전체</label>
              <div class="mbbox">
                <label><input type="radio" value="waiting" v-model="statusFilter" /> 배정대기</label>
                <label><input type="radio" value="assigned" v-model="statusFilter" /> 청소대기</label>
                <label><input type="radio" value="confirmed" v-model="statusFilter" /> 청소완료</label>
                <label><input type="radio" value="done" v-model="statusFilter" /> 확정완료</label>
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
                <li
                  style="font-size: 12px"
                  :class="{ active: dateFilter === 'plus15d' }"
                  @click="dateFilter = 'plus15d'">
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
        </div>
        <div class="search-action" style="margin-top: 12px">
          <button class="search-button" @click="applyFilters">검색</button>
        </div>
      </div>
      <div class="tablelist">
        <div class="all-h2-wrap" style="display: flex; justify-content: space-between">
          <div class="h2-wrap" style="display: flex">
            <h2 class="profile-h2" style="width: 120px">회원 목록</h2>
            <div class="justify-start" style="margin-left: 3%; width: 100%">
              <span class="text-neutral-500 text-sm font-medium font-['Pretendard']">검색 </span>
              <span class="text-red-500 text-sm font-semibold font-['Pretendard']">0</span>
              <span class="text-neutral-500 text-sm font-medium font-['Pretendard']">명 / 전체 </span>
              <span class="text-red-500 text-sm font-semibold font-['Pretendard']">129</span>
              <span class="text-neutral-500 text-sm font-medium font-['Pretendard']">명</span>
            </div>
          </div>
          <div class="h2-wrap-toggle" style="display: flex; gap: 3%">
            <div class="toggle1">
              <select class="w-28 h-6 rounded-[5px] border border-stone-300">
                <option>전체</option>
                <option>최근 회원가입순</option>
                <option>과거 회원가입순</option>
                <option>이용금액 높은순</option>
                <option>이용금액 낮은순</option>
              </select>
            </div>
            <div class="toggle2">
              <select class="w-25 h-6 rounded-[5px] border border-stone-300">
                <option>5개씩보기</option>
                <option>20개씩보기</option>
                <option>40개씩보기</option>
                <option>80개씩보기</option>
                <option>100개씩보기</option>
              </select>
            </div>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" v-model="selectAll" @change="toggleAll" class="checkbox" />
              </th>
              <th>번호</th>
              <th>이름</th>
              <th>아이디</th>
              <th>연락처</th>
              <th>구분</th>
              <th>주소</th>
              <th>예약횟수</th>
              <th>총 이용금액</th>
              <th>가입일</th>
              <th>상태</th>
              <th>메모</th>
              <th>메일/SMS 발송</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedList" :key="item.id">
              <td>
                <input type="checkbox" v-model="item.checked" @change="checkIndividual" class="checkbox" />
              </td>
              <td data-label="예약번호">{{ item.id }}</td>
              <td class="customername" data-label="고객명">
                <template v-if="item.primemember">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="display: inline-block">
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
                  <svg
                    style="display: inline-block"
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.75 1.57143H0C0 4.60871 2.74258 7.07143 6.125 7.07143V10.6071C6.125 10.8232 6.32188 11 6.5625 11H7.4375C7.67812 11 7.875 10.8232 7.875 10.6071V7.07143C7.875 4.03415 5.13242 1.57143 1.75 1.57143ZM12.25 0C9.94766 0 7.94609 1.14174 6.89883 2.82857C7.65625 3.57009 8.2168 4.47121 8.51211 5.47054C11.5938 5.18326 14 2.84576 14 0H12.25Z"
                      fill="#4ECF50" />
                  </svg>
                  {{ item.customer.name }}
                </template>
              </td>
              <td data-label="아이디">{{ item.sh.webid }}</td>
              <td data-label="연락처">{{ item.customer.mobile }}</td>
              <td data-label="구분">{{ item.sh.business }}</td>
              <td data-label="주소">{{ item.sh.address }}</td>
              <td data-label="예약횟수">{{ item.sh.reservation }}회</td>
              <td data-label="총 이용금액">{{ item.sh.price.toLocaleString() }}원</td>
              <td data-label="가입일">{{ item.sh.joindate }}</td>
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
              <!-- 메모 -->
              <td class="memo-bt" data-label="메모">
                <button>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="20" height="20" fill="url(#pattern0_262_2953)" />
                    <defs>
                      <pattern id="pattern0_262_2953" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#image0_262_2953" transform="scale(0.00195312)" />
                      </pattern>
                      <image
                        id="image0_262_2953"
                        width="512"
                        height="512"
                        preserveAspectRatio="none"
                        xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTJGMzZENEYzMDg5MTFGMDkzQ0VBQjdCNDIxMEIyMTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTJGMzZENTAzMDg5MTFGMDkzQ0VBQjdCNDIxMEIyMTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMkYzNkQ0RDMwODkxMUYwOTNDRUFCN0I0MjEwQjIxNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMkYzNkQ0RTMwODkxMUYwOTNDRUFCN0I0MjEwQjIxNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrUDudsAAApjSURBVHja7N1Rkto4FEDRqMsbhIXCEpXqymc+0qEAC91zVjBlW3pXamZmzDl/AQAtQwAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAADABwbA9Xpd9dkoI2CbvX7Ff6j7/Z5+KWfP38O6MPCB3P42PBIOiwIgvfeJAQFg6AOIAQSAwQ9QjQEhIAAMfgAhwI6+DH8A7KFuAHy0ALgNcANg+ANgb3UD4OMEEAFuA9wAGP4AbgMQAD5EABGAAPABAogABIAPD0AEIAB8cAAiAAHgQwMQAQgAHxiACEAA+LAA7NUkA8AHBSACiN4AAAChAFCSAG4BiAWADwhABBC9AQAAQgGgHAHcAhALAB8MgAggegMAAIQCQCkCuAXADQAAsHsAKEQAtwC4AQAABAAAsF0AuBoC2J+9XgAAAAIAAMgFgCshgA57vgAAAAQAACAAAIB9A8DfggB67P0CAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAOD/HB5B3vAICJseAQIAwx6sCVGAAMDgh/h6EQIvdrlczv5HmOX9UQAY/IAQKJvV/dKPAA1/wFriTwikYk8A2LAAa4pgCAgAGxVgbREMAQFggwKsMYIhIAAA4GchIABwMgFrDbcBAgAA3AYIAJxIwJpDBAgAABABAgAARIAAAAARIAAAQAQIAAAQAQIAAESAAAAAESAAAAABAABuAQSADw2w5vCdCAAASBMAShOw1gh+LwIAANwAoDQBa4zCdyMAfGiAtUXw+xEAPjTAmiJIANiwAGsJAcCGG5fNC6wfxORfDu8j9dENjwKc+EEA2NhEAdYEvP+bW2LfFQDYAAGC/AYAAAQAAPBiS9y8CgAAcAMAAAgAAEAAAABPcfrvAAQAALgBAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAACAAAQAACAAAAABAAAIAAAAAEAACzu8AjyhkdA2PQIEAAY9mBNiAIEAAY/xNeLEEAAYPCDEIC9+BGg4Q9YSwgAbFiANYUAwEYFWFsIAGxQYI2BAAAABABOJmCtgQAAAAQATiRgzYEAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEwDamRwDWHAgAAEAAOJEA1hoIAAAQAB6BkwlgjSEAsEEB1hYCABsVYE0hALBhgbUEWzg8gsTGNTwKMPhBAAgBwOBHABDf2EQB1gQIAGyAABT4ESAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAABPcXgEecMjONX0CAABgGHvnYgCQABg8MfflxAABAAGvxAAeB4/AjT88S4BAYCBgXcKCAAMCrxbQABgQOAdAwIAABAAOBniXQMCAAAQADgR4p0DAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEADbmB6Bdw4gAAAAAeBEiHcNIAAAQAB4BE6GeMeAAMCAwLsFBAAGBd4pIAAwMPAugS0cHkFicAyPwuAHEABCAIMfEADEB4soMOwBAYABBECBHwECgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAADgQVMAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAADpABheA0COvV8AAAACAABea3oEAgAABMCJ/C0IoMOeLwAAAAEAAOQCwJUQwP7O3uv9ANANAAAIAABAAJzGnwEA9mWPFwAA8Hb+/r94AChEAKd/3AAAAJUAUIoATv9EbwB8MACG/7P4+/8HBQAAEA0AtwAATv9O/9EbABEAYPgTDAAAIBoAShLA6f8R0zP6/BsAEQBgryYYAD4sAHv0Dqd/ASACAAx/BIAPDcCe7PQvAEQAgL0YAeDDA7AH73H6X+K5ffkAAbD3ugHwIQLwyXuuv/3/0LHhB+nlAzhsEbkB8IEC2Fun59i8AXAbAOBQRfgGwIcL0NtDHfjcALgNAIgdnuzvAkAIAIQGv+crAB5+AWIAMJQ+m31cAIgBgNhJ374tAF6yIHxYgIHPtu9gzHnunBvDd7mCy+XiIQBO/28MgNvtduo/0JdvCADDv0cAAGD4v/n0LwAAwMlfAADAZsN/2R+6CQAAcAMAAE7/AgAADP9HLf3vuQsAAAx/NwAAYPjvfvoXAAAY/lH+XwAAGPyx078bAAAM/ygBAIDhHzv9CwAADH83AABg+BdO/9/8CBAAgz82/N0AAGD4R7kBAMDgj53+3QAAYPi7AQAAg79w+hcAABj8weEvAAAw+KP8BgAAwz92+ncDAIChHxz+AgAAgz9KAABg8MdO/wIAAEM/OPwFAAAGfnD4CwAADPzg8BcAAIY9UQIAwFAndvoXANhEAILD/5v/EiCJDx3AnigAACB/IBIAuAUACO6DAgAAgocgAYBbAIDg3icAADD8gwQAFgNgvxMAAGD4CwAsDAB73Jb8lwABMPjdAICFAtjTBABYMIC9TAAAgOEvALB4AFbfu+xfAgARANizEABYUIBTvwAAEQDYnwQAWGSAU78AABEAGPwCAEQAYP8RAFiEAE79AgARAGDwL8//DIhnR8D0KAAHDDcAWKwATvxuAHAbAOAAIQAQAgAGvwBg68UtAgBDXwAQX+xiAOwDCADCm4AQAAMfAYBbAcDARwBQ3zgEARj0vPIlzmmfBQABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAPzTbwEGAPqLr3PTT0NBAAAAAElFTkSuQmCC" />
                    </defs>
                  </svg>
                </button>
              </td>
              <!-- 메일/sms -->

              <td class="mail-sms-bt" data-label="메일/SMS 발송">
                <button class="mail-bt" style="margin-right: 4%">
                  <svg width="34" height="18" viewBox="0 0 34 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.3936 5.4375V7.92969H12.8438V4.52441H13.6494V13.3867H12.8438V8.62793H11.3936V11.3027H7.74121V5.4375H11.3936ZM8.53613 6.11426V10.626H10.5986V6.11426H8.53613ZM15.5723 4.32031V13.8701H14.7559V4.32031H15.5723ZM19.6006 4.6748C21.0293 4.68555 22.0713 5.54492 22.0713 6.79102C22.0713 8.03711 21.0293 8.89648 19.6006 8.89648C18.1504 8.89648 17.1191 8.03711 17.1191 6.79102C17.1191 5.54492 18.1504 4.68555 19.6006 4.6748ZM19.6006 5.38379C18.6445 5.38379 17.9355 5.96387 17.9463 6.79102C17.9355 7.62891 18.6445 8.20898 19.6006 8.20898C20.5459 8.20898 21.2549 7.62891 21.2549 6.79102C21.2549 5.96387 20.5459 5.38379 19.6006 5.38379ZM24.7783 4.32031V9.22949H23.9404V4.32031H24.7783ZM24.7783 9.69141V11.9902H19.418V13.0645H25.1221V13.7412H18.5908V11.3564H23.9404V10.3682H18.5693V9.69141H24.7783Z"
                      fill="#424242" />
                    <rect x="0.5" y="0.5" width="33" height="17" stroke="#BDBDBD" />
                  </svg>
                </button>
                <button class="sms-bt">
                  <svg width="34" height="18" viewBox="0 0 34 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.1025 7.17773C11.0166 6.41504 10.3184 5.97461 9.38379 5.97461C8.35254 5.97461 7.67578 6.51172 7.67578 7.25293C7.67578 8.06934 8.58887 8.37012 9.17969 8.52051L9.95312 8.73535C10.791 8.9502 12.1553 9.43359 12.1553 10.8838C12.1553 12.1514 11.1348 13.1396 9.33008 13.1396C7.6543 13.1396 6.6123 12.2695 6.52637 10.9805H7.51465C7.60059 11.8506 8.40625 12.2588 9.33008 12.2588C10.4043 12.2588 11.21 11.7109 11.21 10.8623C11.21 10.1104 10.4902 9.82031 9.67383 9.58398L8.71777 9.32617C7.49316 8.97168 6.74121 8.34863 6.74121 7.2959C6.74121 5.98535 7.91211 5.11523 9.41602 5.11523C10.9199 5.11523 12.0049 5.99609 12.0479 7.17773H11.1025ZM13.541 5.22266H14.7012L17.3223 11.625H17.4189L20.04 5.22266H21.2002V13H20.2871V7.12402H20.2119L17.7949 13H16.9355L14.5186 7.12402H14.4541V13H13.541V5.22266ZM27.1621 7.17773C27.0762 6.41504 26.3779 5.97461 25.4434 5.97461C24.4121 5.97461 23.7354 6.51172 23.7354 7.25293C23.7354 8.06934 24.6484 8.37012 25.2393 8.52051L26.0127 8.73535C26.8506 8.9502 28.2148 9.43359 28.2148 10.8838C28.2148 12.1514 27.1943 13.1396 25.3896 13.1396C23.7139 13.1396 22.6719 12.2695 22.5859 10.9805H23.5742C23.6602 11.8506 24.4658 12.2588 25.3896 12.2588C26.4639 12.2588 27.2695 11.7109 27.2695 10.8623C27.2695 10.1104 26.5498 9.82031 25.7334 9.58398L24.7773 9.32617C23.5527 8.97168 22.8008 8.34863 22.8008 7.2959C22.8008 5.98535 23.9717 5.11523 25.4756 5.11523C26.9795 5.11523 28.0645 5.99609 28.1074 7.17773H27.1621Z"
                      fill="#424242" />
                    <rect x="0.5" y="0.5" width="33" height="17" stroke="#BDBDBD" />
                  </svg>
                </button>
              </td>

              <td class="btnbox" data-label="액션">
                <button class="modal" @click="downloadReport">
                  <svg width="85" height="24" viewBox="0 0 85 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="85" height="24" rx="5" fill="#5AB21A" />
                    <path
                      d="M32.1758 6.44922V17.0547H30.8867V6.44922H32.1758ZM28.918 7.375V11.3477H25.2734V13.4805C26.9434 13.4688 28.3848 13.3867 30.0312 13.1055L30.1484 14.1719C28.3438 14.4883 26.7617 14.5469 24.8633 14.5469H23.9375V10.3164H27.5938V8.42969H23.9258V7.375H28.918ZM43.4023 14.7227V15.8125H33.7227V14.7227H37.8828V12.6367H34.5547V11.6055H36.043V8.44141H34.5195V7.38672H42.5586V8.44141H41.0117V11.6055H42.5234V12.6367H39.1719V14.7227H43.4023ZM37.3438 11.6055H39.7227V8.44141H37.3438V11.6055ZM52.707 12.0039V13.0352H45.2773V7.28125H52.6133V8.33594H46.6016V9.61328H52.3672V10.6328H46.6016V12.0039H52.707ZM53.7734 14.6875V15.7539H44.0938V14.6875H53.7734ZM65.6094 6.44922V10.4688H67.2383V11.5352H65.6094V17.0547H64.3086V6.44922H65.6094ZM62.7031 7.45703V8.51172H59.0469V13.375C60.6934 13.375 61.9941 13.293 63.4531 13.0352L63.6055 14.1367C61.9648 14.418 60.5352 14.4648 58.625 14.4648H57.7461V7.45703H62.7031ZM77.3516 11.6875V12.7305H73.2617V14.6758H71.9375V12.7305H67.6719V11.6875H77.3516ZM76.2852 15.7656V16.832H68.8555V13.6914H70.168V15.7656H76.2852ZM72.5 6.68359C74.7852 6.68359 76.2969 7.51562 76.2969 8.85156C76.2969 10.1875 74.7852 11.0078 72.5 11.0078C70.2148 11.0078 68.7031 10.1875 68.7031 8.85156C68.7031 7.51562 70.2148 6.68359 72.5 6.68359ZM72.5 7.71484C71.0469 7.71484 70.0977 8.125 70.1094 8.85156C70.0977 9.55469 71.0469 9.96484 72.5 9.96484C73.9648 9.96484 74.9023 9.55469 74.9023 8.85156C74.9023 8.125 73.9648 7.71484 72.5 7.71484Z"
                      fill="white" />
                    <path
                      d="M13.8333 9.45312V6H8.625C8.27865 6 8 6.27168 8 6.60938V18.3906C8 18.7283 8.27865 19 8.625 19H17.375C17.7214 19 18 18.7283 18 18.3906V10.0625H14.4583C14.1146 10.0625 13.8333 9.78828 13.8333 9.45312ZM15.5307 14.9378H13.8333V16.969C13.8333 17.1935 13.6469 17.3753 13.4167 17.3753H12.5833C12.3531 17.3753 12.1667 17.1935 12.1667 16.969V14.9378H10.4693C10.0974 14.9378 9.91172 14.4987 10.1758 14.2431L12.6867 11.8132C12.8599 11.6454 13.1396 11.6454 13.3128 11.8132L15.8237 14.2431C16.088 14.4987 15.9026 14.9378 15.5307 14.9378ZM17.8177 8.66602L15.2682 6.17773C15.151 6.06348 14.9922 6 14.8255 6H14.6667V9.25H18V9.09512C18 8.93516 17.9349 8.78027 17.8177 8.66602Z"
                      fill="white" />
                  </svg>
                </button>
                <button class="modal" @click="openDetailById(item.id)" style="margin-left: 5%">
                  <svg width="56" height="24" viewBox="0 0 56 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="56" height="24" rx="5" fill="#616161" />
                    <path
                      d="M29.1016 8.13672C29.1016 9.47266 29.9688 10.7266 31.5977 11.2422L30.8945 12.2617C29.752 11.875 28.9316 11.1016 28.4805 10.1172C28.0117 11.2422 27.1562 12.127 25.9375 12.5547L25.2344 11.5352C26.9453 10.9375 27.7891 9.53125 27.8008 8.01953V7.01172H29.1016V8.13672ZM33.707 6.44922V9.02734H35.1836V10.1055H33.707V12.7891H32.4062V6.44922H33.707ZM30.2617 13.0234C32.4531 13.0117 33.8008 13.7617 33.8125 15.0156C33.8008 16.293 32.4531 17.0312 30.2617 17.0312C28.0469 17.0312 26.6758 16.293 26.6758 15.0156C26.6758 13.7617 28.0469 13.0117 30.2617 13.0234ZM30.2617 14.043C28.8086 14.043 27.9766 14.3945 27.9766 15.0156C27.9766 15.6719 28.8086 16 30.2617 16C31.7148 16 32.5234 15.6719 32.5234 15.0156C32.5234 14.3945 31.7148 14.043 30.2617 14.043ZM39.0273 9.22656C39.0273 10.9375 39.625 12.7188 41.0547 13.6211L40.3398 14.6172C39.3848 14.043 38.7637 13.0527 38.418 11.8867C38.0312 13.1699 37.3516 14.2539 36.3555 14.8633L35.5469 13.8906C37.082 12.9531 37.7734 11.0898 37.7734 9.28516V7.38672H39.0273V9.22656ZM44.8633 6.44922V17.043H43.6094V6.44922H44.8633ZM42.6602 6.63672V16.5273H41.4297V11.1719H39.918V10.0938H41.4297V6.63672H42.6602Z"
                      fill="white" />
                    <path
                      d="M16 18C19.3137 18 22 15.3137 22 12C22 8.68629 19.3137 6 16 6C12.6863 6 10 8.68629 10 12C10 15.3137 12.6863 18 16 18Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path
                      d="M16 14.4V12"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path
                      d="M16 9.60156H16.006"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 페이지네이션 -->
        <div class="pagination">
          <!-- <span class="mr-2">총 {{ filteredList.length }}건의 예약</span> -->

          <!-- SVG 버튼 추가 -->
          <div class="customer-out">
            <svg width="110" height="25" viewBox="0 0 110 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="109" height="24" rx="0.5" stroke="#BDBDBD" />
              <path
                d="M20.6484 8.25C20.6484 9.94531 21.8789 11.5449 23.6562 12.1875L23.0547 13.0215C21.7217 12.4883 20.6621 11.4287 20.1426 10.1094C19.623 11.5791 18.5156 12.748 17.0801 13.3223L16.5059 12.4473C18.3242 11.7773 19.582 10.082 19.5957 8.20898V6.70508H20.6484V8.25ZM26.5684 5.9668V15.0723H25.4883V9.72656H22.7812V8.82422H25.4883V5.9668H26.5684ZM26.8418 16.9453V17.8477H18.707V14.0332H19.7871V16.9453H26.8418ZM33.8555 6.8418V7.74414H30.1641V9.26172H33.7188V10.1094H30.1641V11.791C31.9346 11.7842 33.042 11.7227 34.3477 11.4629L34.457 12.3516C33.0352 12.625 31.8867 12.6934 29.9043 12.6934H29.1387V6.8418H33.8555ZM38.9141 5.9668V13.3359H37.8887V10.0137H36.1797V13.2539H35.1816V6.19922H36.1797V9.13867H37.8887V5.9668H38.9141ZM38.9141 13.9648V18.1074H37.8613V14.8398H30.7246V13.9648H38.9141ZM50.3711 6.56836V7.44336H45.8457V8.75586H50.1387V9.58984H45.8457V10.998C48.2656 10.998 49.585 10.9502 51.2051 10.6836L51.3145 11.5449C49.6191 11.832 48.2383 11.873 45.6953 11.873H44.7793V6.56836H50.3711ZM53.707 5.95312V8.61914H55.5391V9.50781H53.707V12.3105H52.6406V5.95312H53.707ZM53.707 12.8984V15.7559H47.0352V17.1094H54.1582V17.9707H45.9824V14.9355H52.6406V13.7598H45.9551V12.8984H53.707ZM63.6738 11.8184V12.6934H60.9258V14.6621C62.0947 14.6074 63.2842 14.5117 64.3984 14.3477L64.4805 15.1406C61.7051 15.6465 58.7109 15.6465 56.5234 15.6602L56.373 14.7578C57.3916 14.751 58.5947 14.751 59.8594 14.7031V12.6934H57.3027V7.06055H63.6191V7.93555H58.3828V9.42578H63.3594V10.2734H58.3828V11.8184H63.6738ZM66.2715 5.95312V18.1348H65.2051V5.95312H66.2715ZM78.4805 5.95312V18.1348H77.4004V11.7363H74.7344V10.8477H77.4004V5.95312H78.4805ZM72.6016 9.91797C72.6016 11.9277 73.9688 13.8965 75.7734 14.7031L75.1582 15.5371C73.7773 14.9014 72.6289 13.5752 72.0957 11.9688C71.5625 13.6641 70.4277 15.0859 69.0469 15.7559L68.4316 14.9219C70.209 14.0879 71.5488 12.0098 71.5488 9.91797V8.94727H68.7598V8.07227H71.5488V6.18555H72.6152V8.07227H75.3633V8.94727H72.6016V9.91797ZM90.5391 5.95312V18.1348H89.4727V5.95312H90.5391ZM86.8477 7.08789V11.4082H82.3086V14.2793C84.3252 14.2793 86.123 14.1904 88.2969 13.8418L88.4062 14.7441C86.1641 15.0996 84.3184 15.1816 82.2266 15.1816H81.2148V10.5332H85.7676V7.97656H81.1875V7.08789H86.8477Z"
                fill="#616161" />
            </svg>
          </div>

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
  <div
    class="overlay"
    v-show="openReservDetail || viewreceipt"
    @click="
      () => {
        openReservDetail = false;
        viewreceipt = false;
      }
    "></div>
  <!-- 예약 상세 모달 -->
  <div class="reservdetailmodal" v-if="openReservDetail && reservdetail">
    <div class="reservdetail-title">
      <p class="profile-h2">예약 상세 정보</p>
      <hr />
      <div class="title" :class="`status-${reservdetail.status}`" style="font-weight: 600">
        예약 번호: {{ reservdetail.number }}
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
        <p class="profile-h3" style="font-weight: 500">예약 정보</p>
        <div class="reservdetailinfo">
          <button class="modal profile-h4" style="text-align: right; font-size: 14px">첨부파일보기</button>
          <ul class="profile-h4">
            <li class="firstli"><span>서비스 유형</span>{{ reservdetail.reservinfo?.type || "-" }}</li>
            <li><span>제빙기 정보</span>{{ reservdetail.reservinfo?.machine || "-" }}</li>
            <li><span>서비스 주소</span>{{ reservdetail.reservinfo?.address || "-" }}</li>
            <li><span>서비스 일시</span>{{ reservdetail.reservinfo?.date || "-" }}</li>
            <li><span>추가 서비스</span>{{ reservdetail.reservinfo?.plus || "-" }}</li>
            <li><span>요청사항</span>{{ reservdetail.reservinfo?.memo || "-" }}</li>
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
</template>
<style lang="scss">
.checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  appearance: none;
  position: relative;
}

.checkbox:checked::before {
  content: "✔";
  position: absolute;
  top: -2px;
  left: 2px;
  font-size: 14px;
  color: #000;
}
.table-wrap .tablelist .pagebox button.active {
  color: #fff;
}
</style>
