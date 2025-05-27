<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { fullReservationList } from "@/data.mjs";
import dayjs from "dayjs";

const currentPage = ref(1);
// ㄴ테이블 페이지 표시
const perPage = 5;
// ㄴ한 페이지에 5개씩 보여줌

const searchType = ref("customer");
// ㄴ고객(기본값) 또는 기사 검색
const searchText = ref("");
// ㄴ이름 검색창 내용 받아오기
const memberFilter = ref("all");
// ㄴ회원 등급 검색 normal=일반 | prime=구독 | all= 전체(기본값)
const statusFilter = ref("all");
// ㄴwaiting = 배정대기 | assigned = 배정은 받았고 청소 대기 | done = 청소 완료 | confirmed = 확정완료  | all = 전체(기본값)
const shopFilter = ref("all");
// ㄴ personal = 일반회원 | business = 사업자회원 | all = 전체(기본값)
const dateFilter = ref("today");
// ㄴ날짜 필터링 today = 오늘 | plus7d = 오늘+7일 | plus15d = +15일 | plus1m + 한달 | plus3m = +3달 | all = 전체(기본값) | custom = 날짜 선택
const today = dayjs();
// ㄴ 오늘 날짜
const fromDate = ref(null);
// ㄴ 검색 날짜 시작일 ~
const toDate = ref(null);
// ㄴ 검색 날짜 끝나는 날

// 여기부터는 안 쓰면 주석 처리 또는 삭제
const openReservDetail = ref(false);
const reservdetail = ref(null);
// ㄴ 둘 다 예약 상세 모달 띄우는 거
const isCustomerOpen = ref(true);
const isMembershipOpen = ref(true);
const isWorkerOpen = ref(true);
const isInquiryOpen = ref(true);
// 상세 모달 안에 토글
const viewreceipt = ref(false);
function printReceipt() {
  window.print();
}
// ㄴ 영수증 모달 , 출력하기 설정

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
// ㄴ 상세 모달 작업 진행 상황

function openDetailById(id) {
  const found = fullReservationList.find((item) => item.id === id);
  if (found) {
    reservdetail.value = found;
    openReservDetail.value = true;
  }
}
// ㄴ 테이블 정보 받아서 예약 모달에 넣는 함수

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
// 4개 다 날짜 필터링 관련

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
        (memberFilter.value === "prime" && item.primemember);

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
// 3개 다 필터링 관련

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredList.value.slice(start, start + perPage);
});
const totalPages = computed(() => Math.ceil(filteredList.value.length / perPage));
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};
// 페이지 네이션 관련

// 상태별 개수 계산
const totalCount = computed(() => fullReservationList.length);
// 대시보드 전체 예약 보기
const doneCount = computed(() => fullReservationList.filter((item) => item.status === "done").length);
// 대시 보드 청소 완료 보기
// const waitingCount = computed(
//   () => fullReservationList.filter((item) => item.status === "waiting").length
// );
// 대시 보드 배정 대기 보기
const assignedCount = computed(() => fullReservationList.filter((item) => item.status === "assigned").length);
// 대시 보드 청소 진행 보기
const confirmedCount = computed(() => fullReservationList.filter((item) => item.status === "confirmed").length);
// 대시보드 확정 완료 보기 (고객-> 확정완료 누르거나 기사-> 완료제출 누르는 거)

// 카드에 쓸 데이터 (여기에 svg바꾸면 됩니다 이름이나)
const statusCards = computed(() => [
  {
    status: "total",
    title: "총 작업 수",
    count: totalCount.value,
    desc: `${totalCount.value}% 증가`,
    icon: `<svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26 10H2" stroke="#0F71F2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26 2H2" stroke="#0F71F2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26 18H2" stroke="#0F71F2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
  {
    status: "done",
    title: "완료율",
    count: doneCount.value + "%",
    desc: ``,
    icon: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26 12.9029V14.0069C25.9985 16.5946 25.1606 19.1125 23.6112 21.1851C22.0618 23.2576 19.8839 24.7738 17.4024 25.5075C14.9209 26.2412 12.2687 26.1531 9.84136 25.2564C7.41402 24.3596 5.34158 22.7022 3.93315 20.5313C2.52472 18.3605 1.85575 15.7925 2.02601 13.2104C2.19627 10.6283 3.19665 8.17046 4.87793 6.20335C6.55922 4.23625 8.83134 2.86533 11.3554 2.29504C13.8795 1.72476 16.5203 1.98567 18.884 3.03887" stroke="#5AB21A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.0001 4.40674L14.0001 16.4187L10.4001 12.8187" stroke="#5AB21A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
  {
    status: "assigned",
    title: "평균 작업 시간",
    count: assignedCount.value + "분",
    desc: `${assignedCount.value}% 감소`,
    icon: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 26C20.6274 26 26 20.6274 26 14C26 7.37258 20.6274 2 14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26Z" stroke="#893BEE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 6.7998V13.9998L18.8 16.3998" stroke="#893BEE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },

  {
    status: "confirmed",
    title: "평균 평가",
    count: confirmedCount.value,
    desc: `<svg width="65" height="12" viewBox="0 0 65 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.87605 1.22694C6.13553 0.716686 6.86446 0.716686 7.12395 1.22694L8.34343 3.62493C8.44689 3.82838 8.64306 3.96862 8.86905 4.00068L11.5621 4.38275C12.1425 4.4651 12.3707 5.18174 11.9447 5.58448L10.024 7.40022C9.85297 7.56195 9.77466 7.79885 9.81562 8.03069L10.2724 10.6155C10.3729 11.1846 9.77953 11.6236 9.26479 11.3608L6.81825 10.112C6.61835 10.0099 6.38165 10.0099 6.18175 10.112L3.73521 11.3608C3.22047 11.6236 2.62707 11.1846 2.72763 10.6155L3.18438 8.03069C3.22534 7.79885 3.14703 7.56195 2.97595 7.40022L1.05534 5.58448C0.629349 5.18174 0.857491 4.4651 1.43791 4.38275L4.13095 4.00068C4.35694 3.96862 4.55311 3.82838 4.65657 3.62493L5.87605 1.22694Z" fill="#F99B23"/>
<path d="M18.876 1.22694C19.1355 0.716686 19.8645 0.716686 20.124 1.22694L21.3434 3.62493C21.4469 3.82838 21.6431 3.96862 21.8691 4.00068L24.5621 4.38275C25.1425 4.4651 25.3707 5.18174 24.9447 5.58448L23.024 7.40022C22.853 7.56195 22.7747 7.79885 22.8156 8.03069L23.2724 10.6155C23.3729 11.1846 22.7795 11.6236 22.2648 11.3608L19.8183 10.112C19.6184 10.0099 19.3816 10.0099 19.1817 10.112L16.7352 11.3608C16.2205 11.6236 15.6271 11.1846 15.7276 10.6155L16.1844 8.03069C16.2253 7.79885 16.147 7.56195 15.9759 7.40022L14.0553 5.58448C13.6293 5.18174 13.8575 4.4651 14.4379 4.38275L17.1309 4.00068C17.3569 3.96862 17.5531 3.82838 17.6566 3.62493L18.876 1.22694Z" fill="#F99B23"/>
<path d="M31.876 1.22694C32.1355 0.716686 32.8645 0.716686 33.124 1.22694L34.3434 3.62493C34.4469 3.82838 34.6431 3.96862 34.8691 4.00068L37.5621 4.38275C38.1425 4.4651 38.3707 5.18174 37.9447 5.58448L36.024 7.40022C35.853 7.56195 35.7747 7.79885 35.8156 8.03069L36.2724 10.6155C36.3729 11.1846 35.7795 11.6236 35.2648 11.3608L32.8183 10.112C32.6184 10.0099 32.3816 10.0099 32.1817 10.112L29.7352 11.3608C29.2205 11.6236 28.6271 11.1846 28.7276 10.6155L29.1844 8.03069C29.2253 7.79885 29.147 7.56195 28.9759 7.40022L27.0553 5.58448C26.6293 5.18174 26.8575 4.4651 27.4379 4.38275L30.1309 4.00068C30.3569 3.96862 30.5531 3.82838 30.6566 3.62493L31.876 1.22694Z" fill="#F99B23"/>
<path d="M44.876 1.22694C45.1355 0.716686 45.8645 0.716686 46.124 1.22694L47.3434 3.62493C47.4469 3.82838 47.6431 3.96862 47.8691 4.00068L50.5621 4.38275C51.1425 4.4651 51.3707 5.18174 50.9447 5.58448L49.024 7.40022C48.853 7.56195 48.7747 7.79885 48.8156 8.03069L49.2724 10.6155C49.3729 11.1846 48.7795 11.6236 48.2648 11.3608L45.8183 10.112C45.6184 10.0099 45.3816 10.0099 45.1817 10.112L42.7352 11.3608C42.2205 11.6236 41.6271 11.1846 41.7276 10.6155L42.1844 8.03069C42.2253 7.79885 42.147 7.56195 41.9759 7.40022L40.0553 5.58448C39.6293 5.18174 39.8575 4.4651 40.4379 4.38275L43.1309 4.00068C43.3569 3.96862 43.5531 3.82838 43.6566 3.62493L44.876 1.22694Z" fill="#F99B23"/>
<path d="M57.876 1.22694C58.1355 0.716686 58.8645 0.716686 59.124 1.22694L60.3434 3.62493C60.4469 3.82838 60.6431 3.96862 60.8691 4.00068L63.5621 4.38275C64.1425 4.4651 64.3707 5.18174 63.9447 5.58448L62.0241 7.40022C61.853 7.56195 61.7747 7.79885 61.8156 8.03069L62.2724 10.6155C62.3729 11.1846 61.7795 11.6236 61.2648 11.3608L58.8183 10.112C58.6184 10.0099 58.3816 10.0099 58.1817 10.112L55.7352 11.3608C55.2205 11.6236 54.6271 11.1846 54.7276 10.6155L55.1844 8.03069C55.2253 7.79885 55.147 7.56195 54.9759 7.40022L53.0553 5.58448C52.6293 5.18174 52.8575 4.4651 53.4379 4.38275L56.1309 4.00068C56.3569 3.96862 56.5531 3.82838 56.6566 3.62493L57.876 1.22694Z" fill="#F99B23"/>
</svg>
`,
    icon: `<svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.0508 1.91859C13.2336 1.54478 13.7664 1.54478 13.9492 1.91859L17.2468 8.66249C17.3192 8.81056 17.46 8.91343 17.623 8.93749L25.0059 10.0268C25.4144 10.0871 25.5779 10.5885 25.2835 10.878L19.9361 16.1356C19.8195 16.2503 19.7663 16.4147 19.7937 16.5759L21.0548 23.9981C21.1243 24.4072 20.6939 24.7181 20.3274 24.5235L13.7344 21.0235C13.5878 20.9457 13.4122 20.9457 13.2656 21.0235L6.6726 24.5235C6.30607 24.7181 5.87571 24.4072 5.94522 23.9981L7.20628 16.5759C7.23367 16.4147 7.1805 16.2503 7.0639 16.1356L1.71653 10.878C1.42209 10.5885 1.5856 10.0871 1.99409 10.0268L9.37699 8.93749C9.54004 8.91343 9.68077 8.81056 9.75318 8.66249L13.0508 1.91859Z" stroke="#F99B23" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
]);

import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale } from "chart.js";
import { Line } from "vue-chartjs";
import { data } from "autoprefixer";

// Chart.js 구성 요소 등록
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale);

// 데이터 정의
const chartData = {
  labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  datasets: [
    {
      label: "청소 횟수",
      data: [45, 52, 60, 60, 65, 80, 98, 90, 68, 60, 45, 40],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
      fill: false,
      pointBackgroundColor: "#3b82f6",
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 20,
      },
    },
  },
};

// 알림 활성화 토글
import { reactive } from "vue";

const alerts = reactive([
  {
    icon: "/prime/alert-claim-icon.png",
    alt: "클레임 알림 아이콘",
    message: "클레임건이 있습니다.",
    time: "오전 10:00",
    active: true,
  },
  {
    icon: "/prime/alert-newres-icon.png",
    alt: "새로운 예약 알림 아이콘",
    message: "새로운 예약이 있습니다.",
    time: "오전 11:10",
    active: false,
  },
  {
    icon: "/prime/alert-saftytraining-icon.png",
    alt: "안전교육 알림 아이콘",
    message: "새로운 안전교육 영상을 시청해 주세요.",
    time: "오후 14:00",
    active: false,
  },
]);

function toggleAlert(index) {
  alerts[index].active = !alerts[index].active;
}
// 대시 보드 관련
</script>
<template>
  <div class="dashboard-wrap">
    <div class="dash">
      <p class="dash-name">대시보드</p>
      <p class="dash-desc">오늘의 작업현항과 일정을 확인할 수 있습니다.</p>
    </div>
    <div class="dashboard dashboard2">
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
        ">
        <p class="profile-h3">
          {{ card.title }}
          <span class="card-icon" v-html="card.icon" style="margin-left: auto; display: inline"></span>
        </p>
        <p class="profile-h1">{{ card.count }}</p>
        <p class="card-desc" v-html="card.desc"></p>
      </div>
    </div>
    <div class="table-wrap">
      <!-- 테이블 -->
      <div class="tablelist">
        <h2 class="today-schedule-h2">오늘의 작업</h2>
        <table class="table">
          <!-- 여기서 본인이 쓸 제목으로 바꾸기! -->
          <thead>
            <tr>
              <th>예약번호</th>
              <th>고객명</th>
              <th>고객 연락처</th>
              <th>예약일자</th>
              <th>청소일자</th>
              <th>담당기사</th>
              <th>담당 기사 연락처</th>
              <th>상태</th>
              <th>액션</th>
            </tr>
          </thead>
          <!-- 여기서 내용 바꾸기 -->
          <tbody>
            <tr v-for="item in paginatedList" :key="item.id">
              <td data-label="예약번호">{{ item.number }}</td>
              <td class="customername">
                <template v-if="item.primemember">
                  <!-- 파란 북마크 아이콘 -->
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

              <!-- 데이터 바꾸려면 data.mjs 참고해서 사용하기
            ex) 고객 주소 사용할 거면 {{ item.customer.mobile }} => {{ item.customer.address }}
            기사 이메일 사용할 거면 {{ item.worker.name || "-" }} => {{ item.worker.email || "-" }}
             -->
              <td class="profile-h4">{{ item.customer.mobile }}</td>
              <td class="profile-h4">{{ item.reservdate }}</td>
              <td class="profile-h4">{{ item.reservinfo.date }} {{ item.reservinfo.time }}</td>
              <td class="profile-h4">{{ item.worker.name || "-" }}</td>
              <td class="profile-h4">{{ item.worker.mobile || "-" }}</td>
              <td class="profile-h4">
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
              <td class="btnbox">
                <button class="modal" v-on:click="viewreceipt = true">영수증 보기</button>
                <button class="modal" @click="openDetailById(item.id)">상세보기</button>
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
            <span
              style="display: inline; padding: 0.5% 1% 0.5%"
              :class="reservdetail?.status ? `statusbox-${reservdetail.status}` : ''">
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
      <!-- 영수증 보기 모달 -->
      <div class="viewreceipt" v-show="viewreceipt">
        <img src="/prime/profile_receipt.png" alt="영수증 이미지" />
        <img src="/prime/profile_receipt.png" class="print-only" alt="영수증 이미지" />

        <div class="btnbox">
          <button class="edit" style="padding: 1.5% 3%" @click="printReceipt">출력하기</button>
          <button class="fix" style="padding: 1.6% 5.5%" @click="viewreceipt = false">닫기</button>
        </div>
      </div>
      <div class="alert">
        <h2 class="alert-h2">알림</h2>
        <div class="alert-box-wrap">
          <div
            v-for="(alert, index) in alerts"
            :key="index"
            class="alert-box"
            :class="{ active: alert.active }"
            @click="toggleAlert(index)">
            <div class="alert-icon">
              <img :src="alert.icon" :alt="alert.alt" />
            </div>
            <div class="alert-desc">
              <p class="alert-instructions">{{ alert.message }}</p>
              <p class="alert-time">{{ alert.time }}</p>
            </div>
            <div class="alert-state-icon">
              <img
                :src="alert.active ? '/prime/alert-state-on-icon.png' : '/prime/alert-state-off-icon.png'"
                :alt="alert.active ? '상태 활성화 아이콘' : '상태 비활성화 아이콘'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
