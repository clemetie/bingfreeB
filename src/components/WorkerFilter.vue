<template>
  <div>
    <!-- 검색 필터 바 -->
    <div class="searchbox websearchbox">
      <!-- 그대로 사용 -->
      <!-- 생략: 위에서 주신 코드와 동일 -->
    </div>

    <!-- 정산 내역 리스트 -->
    <div class="tablelist">
      <h1 class="profile-h2">정산 현황</h1>
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
            <td class="ellipsis">{{ item.number }}</td>
            <td class="ellipsis">{{ item.customerName }}</td>
            <td class="ellipsis">{{ item.settlementId }}</td>
            <td class="ellipsis">{{ item.workerName }}</td>
            <td class="ellipsis">{{ item.type }}</td>
            <td class="ellipsis">{{ item.contact }}</td>
            <td class="ellipsis">{{ item.period }}</td>
            <td class="ellipsis">{{ item.cleanCount }}</td>
            <td class="ellipsis">{{ item.totalAmount.toLocaleString() }}원</td>
            <td class="ellipsis">{{ item.bonus.toLocaleString() }}원</td>
            <td class="ellipsis">{{ item.fee.toLocaleString() }}원</td>
            <td class="ellipsis">
              <span :class="`statusbox-${item.status}`">{{ statusLabel(item.status) }}</span>
            </td>
            <td class="ellipsis">{{ item.settledAt }}</td>
            <td class="btnbox">
              <button class="modal" @click="() => openModal(item.id)">처리하기</button>
              <button class="modal" @click="() => openDetailById(item.id)">상세보기</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <span>총 {{ filteredList.length }}건의 정산</span>
        <div class="pagebox">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">←</button>
          <button
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
            @click="goToPage(page)">
            {{ page }}
          </button>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">→</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { fullSaleList } from "@/data.mjs";

const searchType = ref("whole");
const searchText = ref("");
const memberFilter = ref("all");
const shopFilter = ref("all");
const statusFilter = ref("all");
const dateFilter = ref("all");
const fromDateInput = ref("");
const toDateInput = ref("");

const currentPage = ref(1);
const itemsPerPage = 10;

const allData = fullSaleList.map((item) => ({
  id: item.id,
  number: item.number,
  customerName: item.customer.name,
  settlementId: item.customer.saleId,
  workerName: item.workername,
  type: item.customer.type,
  contact: item.worker.mobile,
  period: item.customer.period,
  cleanCount: item.customer.cleannum,
  totalAmount: item.customer.totalPrice,
  bonus: item.customer.plusprice,
  fee: item.tex,
  settledAt: item.customer.settledAt,
  status: item.status,
  primemember: item.primemember,
  membertype: item.customer.membertype,
  shoptype: item.customer.shoptype,
}));

const filteredList = computed(() => {
  return allData.filter((item) => {
    const keyword = searchText.value.trim().toLowerCase();
    const matchesKeyword = keyword === "" || Object.values(item).some((v) => String(v).toLowerCase().includes(keyword));

    const matchesMember =
      memberFilter.value === "all" || (memberFilter.value === "prime" ? item.primemember : !item.primemember);
    const matchesShop = shopFilter.value === "all" || item.shoptype === shopFilter.value;
    const matchesStatus = statusFilter.value === "all" || item.status === statusFilter.value;

    const matchesDate = (() => {
      if (dateFilter.value === "all") return true;
      const settled = new Date(item.settledAt);
      const now = new Date();
      if (dateFilter.value === "today") return settled.toDateString() === now.toDateString();
      if (dateFilter.value === "plus7d") return settled >= new Date(now.setDate(now.getDate() - 7));
      if (dateFilter.value === "plus15d") return settled >= new Date(now.setDate(now.getDate() - 15));
      if (dateFilter.value === "plus1m") return settled >= new Date(now.setMonth(now.getMonth() - 1));
      if (dateFilter.value === "plus3m") return settled >= new Date(now.setMonth(now.getMonth() - 3));
      if (dateFilter.value === "custom") {
        if (!fromDateInput.value || !toDateInput.value) return true;
        const from = new Date(fromDateInput.value);
        const to = new Date(toDateInput.value);
        return settled >= from && settled <= to;
      }
      return true;
    })();

    return matchesKeyword && matchesMember && matchesShop && matchesStatus && matchesDate;
  });
});

const totalPages = computed(() => Math.ceil(filteredList.value.length / itemsPerPage));
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredList.value.slice(start, start + itemsPerPage);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const applyFilters = () => {
  currentPage.value = 1;
};

const statusLabel = (status) => {
  switch (status) {
    case "waiting":
      return "대기중";
    case "assigned":
      return "진행중";
    case "done":
      return "청소완료";
    case "confirmed":
      return "확정완료";
    default:
      return "알수없음";
  }
};

const openModal = (id) => console.log(`Modal for ID: ${id}`);
const openDetailById = (id) => console.log(`Detail for ID: ${id}`);
</script>

<style scoped>
.ellipsis {
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
