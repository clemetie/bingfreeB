<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { fullReservationList } from "@/data.mjs";
import dayjs from "dayjs";

const currentPage = ref(1);
// ㄴ테이블 페이지 표시
const perPage = 15;
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
const dateFilter = ref("all");
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
// 필터링된 결과를 담을 배열
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

      // const searchMatched = searchText.value
      //   ? (searchType.value === "customer" ? item.customer.name : item.worker.name || "").includes(searchText.value)
      //   : true;

      // --- 기사 검색 필터링 (새롭게 추가된 부분) ---
      let workerMatched = true;
      if (searchQuery.value) {
        const q = searchQuery.value.trim();
        switch (workerSearchType.value) {
          case "name":
            // '이름검색' 옵션: worker.name에 검색어 포함 여부
            workerMatched = item.worker.name?.includes(q);
            break;
          case "employeeId":
            // 사원번호(bingnb) 문자열에 검색어 포함 여부
            workerMatched = item.worker.bingnb?.toString().includes(q);
            break;
          case "phone":
            // 전화번호(mobile)에 검색어 포함 여부
            workerMatched = item.worker.mobile?.includes(q);
            break;
          default:
            // all: 이름, 사원번호, 전화번호 중 하나라도 포함되면 true
            const nameMatch = item.worker.name?.includes(q);
            const idMatch = item.worker.bingnb?.toString().includes(q);
            const phoneMatch = item.worker.mobile?.includes(q);
            workerMatched = nameMatch || idMatch || phoneMatch;
        }
      }

      return statusMatched && memberMatched && shopMatched && workerMatched && isInDateRange;
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
const doneCount = computed(() => fullReservationList.filter((item) => item.status === "confirmed" || item.status === "assigned").length);
// 대시 보드 청소 진행 보기
const confirmedCount = computed(() => fullReservationList.filter((item) => item.status === "confirmed").length);
// 대시보드 확정 완료 보기 (고객-> 확정완료 누르거나 기사-> 완료제출 누르는 거)

// 카드에 쓸 데이터 (여기에 svg바꾸면 됩니다 이름이나)
const statusCards = computed(() => [
  {
    status: "total",
    title: "전체기사",
    count: totalCount.value + "명",
    desc: `+${totalCount.value}명`,
    icon: `<svg width="34" height="29" viewBox="0 0 34 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.8182 26.5454V23.8181C23.8182 22.3714 23.2435 20.9841 22.2206 19.9611C21.1976 18.9382 19.8103 18.3635 18.3636 18.3635H7.45454C6.00791 18.3635 4.62052 18.9382 3.5976 19.9611C2.57467 20.9841 2 22.3714 2 23.8181V26.5454" stroke="#0F71F2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.9091 12.9091C15.9215 12.9091 18.3636 10.467 18.3636 7.45456C18.3636 4.44209 15.9215 2 12.9091 2C9.89661 2 7.45453 4.44209 7.45453 7.45456C7.45453 10.467 9.89661 12.9091 12.9091 12.9091Z" stroke="#0F71F2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32 26.5453V23.8181C31.9991 22.6095 31.5969 21.4355 30.8564 20.4803C30.116 19.5251 29.0793 18.8429 27.9091 18.5408" stroke="#0F71F2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.4545 2.177C23.6278 2.47741 24.6678 3.15978 25.4104 4.11652C26.153 5.07326 26.5561 6.24996 26.5561 7.46111C26.5561 8.67225 26.153 9.84895 25.4104 10.8057C24.6678 11.7624 23.6278 12.4448 22.4545 12.7452" stroke="#0F71F2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
  {
    status: "done",
    title: "활동중",
    count: doneCount.value + "명",
    desc: ``,
    icon: `<svg width="31" height="28" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.6613 3.33057V11.3306H20.6613" stroke="#5AB21A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.3146 17.9974C24.4479 20.4506 22.8073 22.5557 20.6402 23.9954C18.473 25.4351 15.8966 26.1315 13.2992 25.9795C10.7018 25.8276 8.22416 24.8355 6.23963 23.153C4.2551 21.4704 2.8712 19.1884 2.29645 16.6508C1.72171 14.1133 1.98727 11.4577 3.05311 9.08417C4.11896 6.71068 5.92735 4.7479 8.20576 3.4916C10.4842 2.2353 13.1092 1.75355 15.6852 2.11894C18.2613 2.48433 20.6488 3.67706 22.488 5.51741L28.6613 11.3307" stroke="#5AB21A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
  {
    status: "confirmed",
    title: "기사 등록 요청",
    count: confirmedCount.value + "명",
    desc: ``,
    icon: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 28C22.1797 28 28 22.1797 28 15C28 7.8203 22.1797 2 15 2C7.8203 2 2 7.8203 2 15C2 22.1797 7.8203 28 15 28Z" stroke="#893BEE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 9.80005V20.2" stroke="#893BEE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.79999 15H20.2" stroke="#893BEE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
]);

// 기사관리 검색관련
const workerSearchType = ref("all"); // 선택된 필터 타입(all / employeeId / phone)
const searchQuery = ref(""); // 입력된 검색어

function handleSearch() {
  applyFilters();

  // 여기에 검색 필터링 로직 추가 가능
  // 예: 리스트.filter(item => item.phone.includes(searchQuery.value)) 등
}

function getPlaceholder(type) {
  switch (type) {
    case "name":
      return "이름을 입력하세요";
    case "employeeId":
      return "사원번호를 입력하세요";
    case "phone":
      return "전화번호를 입력하세요";
    default:
      return "검색어를 입력하세요";
  }
}
// 퇴사일
function addOneYear(item) {
  if (!item || item.status !== "done") return "-";

  const dateStr = item.reservinfo?.date;
  if (!dateStr) return "날짜 없음";

  const [year, month, day] = dateStr.split(".").map(Number);
  if (!year || !month || !day) return "-";

  const newDate = new Date(year + 1, month - 1, day);
  const yyyy = newDate.getFullYear();
  const mm = String(newDate.getMonth() + 1).padStart(2, "0");
  const dd = String(newDate.getDate()).padStart(2, "0");

  return `${yyyy}.${mm}.${dd}`;
}
</script>
<template>
  <div class="workers-wrap">
    <div class="workers">
      <p class="workers-name">기사관리</p>
      <p class="workers-desc">기사정보를 관리하고 상태를 확인할 수 있습니다.</p>
    </div>
    <div class="workers dashboard">
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
        <h2 class="today-reservation-h2">기사목록</h2>
        <div class="search-bar">
          <select v-model="workerSearchType" class="search-select mr-3">
            <option value="all">전체</option>
            <option value="name">이름</option>
            <option value="employeeId">사원번호</option>
            <option value="phone">전화번호</option>
          </select>
          <input
            v-model="searchQuery"
            type="text"
            class="search-input mr-3"
            :placeholder="getPlaceholder(workerSearchType)"
            @keyup.enter="handleSearch" />

          <button @click="handleSearch" class="search-button">검색하기</button>
          <button class="addWorker">+기사추가</button>
        </div>
        <table class="table">
          <!-- 여기서 본인이 쓸 제목으로 바꾸기! -->
          <thead>
            <tr>
              <th>사원번호</th>
              <th>이름</th>
              <th>전화번호</th>
              <th>주소</th>
              <th>입사일</th>
              <th>퇴사일</th>
              <th>상태</th>
              <th>상세보기</th>
            </tr>
          </thead>
          <!-- 여기서 내용 바꾸기 -->
          <tbody>
            <tr v-for="item in paginatedList" :key="item.id">
              <td data-label="사원번호" class="profile-h4">{{ item.worker.bingnb }}</td>
              <td data-label="이름" class="profile-h4">{{ item.worker.name }}</td>
              <!-- 데이터 바꾸려면 data.mjs 참고해서 사용하기
            ex) 고객 주소 사용할 거면 {{ item.customer.mobile }} => {{ item.customer.address }}
            기사 이메일 사용할 거면 {{ item.worker.name || "-" }} => {{ item.worker.email || "-" }}
             -->
              <td data-label="전화번호" class="profile-h4">{{ item.worker.mobile }}</td>
              <td data-label="주소" class="profile-h4">{{ item.customer.address }}</td>
              <td data-label="입사일" class="profile-h4">{{ item.reservinfo.date }}</td>
              <td data-label="퇴사일" class="profile-h4">{{ addOneYear(item) }}</td>
              <td data-label="상태" class="profile-h4">
                <span :class="`wkstatusbox-${item.status}`">
                  {{
                    item.status === "waiting"
                      ? "off"
                      : item.status === "assigned"
                      ? "활동중"
                      : item.status === "done"
                      ? "off"
                      : item.status === "confirmed"
                      ? "활동중"
                      : "off"
                  }}
                </span>
              </td>
              <td data-label="상세보기" class="btnbox profile-h4">
                <button class="workers-detail-btn" @click="openDetailById(item.id)">
                  <img class="workers-detail-icon" src="/prime/admin-workers-btn-icon.png" alt="상세보기 아이콘" />상세
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 페이지네이션 -->
        <div class="pagination">
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
</template>
<style></style>
