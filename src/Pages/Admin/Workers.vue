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
const waitingCount = computed(() => fullReservationList.filter((item) => item.status === "waiting").length);
// 대시 보드 배정 대기 보기
const assignedCount = computed(() => fullReservationList.filter((item) => item.status === "assigned").length);
// 대시 보드 청소 진행 보기
const confirmedCount = computed(() => fullReservationList.filter((item) => item.status === "confirmed").length);
// 대시보드 확정 완료 보기 (고객-> 확정완료 누르거나 기사-> 완료제출 누르는 거)

// 카드에 쓸 데이터 (여기에 svg바꾸면 됩니다 이름이나)
const statusCards = computed(() => [
  {
    status: "total",
    title: "전체기사",
    count: totalCount.value,
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
    count: doneCount.value,
    desc: ``,
    icon: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.9352 26.0072C20.5668 26.0072 25.9427 20.6313 25.9427 13.9997C25.9427 7.36813 20.5668 1.99219 13.9352 1.99219C7.30368 1.99219 1.92773 7.36813 1.92773 13.9997C1.92773 20.6313 7.30368 26.0072 13.9352 26.0072Z" stroke="#5AB21A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.9355 6.79688V14.0014L18.7385 16.4029" stroke="#5AB21A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
  {
    status: "confirmed",
    title: "확정 완료",
    count: confirmedCount.value,
    desc: `이 달 ${confirmedCount.value}개의 청소가 완료되었습니다.`,
    icon: `<svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.4349 10H1.41992" stroke="#893BEE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.4349 1.99414H1.41992" stroke="#893BEE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.4349 18.0059H1.41992" stroke="#893BEE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
]);

// 대시 보드 관련
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
              <td>{{ item.number }}</td>
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
    </div>
  </div>
</template>
<style></style>
