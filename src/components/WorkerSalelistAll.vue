<template>
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
          <td class="nowrap">{{ item.number }}</td>
          <td class="nowrap customername">{{ item.customerName }}</td>
          <td class="nowrap">{{ item.settlementId }}</td>
          <td class="nowrap">{{ item.workerName }}</td>
          <td class="nowrap">{{ item.type }}</td>
          <td class="nowrap">{{ item.contact }}</td>
          <td class="nowrap">{{ item.period }}</td>
          <td class="nowrap">{{ item.cleanCount }}</td>
          <td class="nowrap">{{ item.totalAmount.toLocaleString() }}원</td>
          <td class="nowrap">{{ item.bonus.toLocaleString() }}원</td>
          <td class="nowrap">{{ item.fee.toLocaleString() }}원</td>
          <td class="nowrap">
            <span :class="`statusbox-${item.status}`">
              {{ statusLabel(item.status) }}
            </span>
          </td>
          <td class="nowrap">{{ item.settledAt }}</td>
          <td class="btnbox nowrap">
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
</template>

<script setup>
import { ref, computed } from "vue";
import { fullSaleList } from "@/data.mjs";

const settlements = fullSaleList.map((item) => ({
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
}));

const currentPage = ref(1);
const itemsPerPage = 5;

const filteredList = computed(() => settlements);
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

const openModal = (id) => {
  console.log(`Modal open for ID: ${id}`);
};

const openDetailById = (id) => {
  console.log(`Open detail for ID: ${id}`);
};
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}
</style>
