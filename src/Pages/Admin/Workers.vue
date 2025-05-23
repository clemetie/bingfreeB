<!-- 지수 관리자 기사관리 -->
<template>
  <div
    class="p-4 rounded space-y-6 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
    <!-- 페이지 헤더 -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          기사 관리
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          기사 정보를 관리하고 상태를 확인할 수 있습니다.
        </p>
      </div>
    </div>

    <!-- 통계 카드 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div
            class="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
            <i class="fas fa-user-tie text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              전체 기사
            </h3>
            <p class="text-2xl font-semibold text-gray-800 dark:text-white">
              {{ workers.length }}
            </p>
            <span class="text-sm text-green-600 dark:text-green-400">+3명</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div
            class="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
            <i class="fas fa-check-circle text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              활동중
            </h3>
            <p class="text-2xl font-semibold text-gray-800 dark:text-white">
              4명
            </p>
            <span class="text-sm text-green-600 dark:text-green-400">+1명</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div
            class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300">
            <i class="fas fa-star text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              평균 평점
            </h3>
            <p class="text-2xl font-semibold text-gray-800 dark:text-white">
              4.6
            </p>
            <span class="text-sm text-green-600 dark:text-green-400">+0.1</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 검색 및 필터 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <input
              v-model="searchQuery"
              @input="handleInput"
              type="text"
              placeholder="기사명 또는 연락처로 검색..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            <i
              class="fas fa-search absolute left-3 top-3 text-gray-400 dark:text-gray-500"></i>
          </div>
        </div>
        <div class="flex gap-2">
          <select
            v-model="statusFilter"
            class="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="">전체 상태</option>
            <option value="활동중">활동중</option>
            <option value="비활성화">비활성화</option>
          </select>
          <select
            v-model="ratingFilter"
            class="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="">전체 평점</option>
            <option value="4">4점 이상</option>
            <option value="3">3점 이상</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 기사 목록 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
          기사 목록
        </h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                기사ID
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                이름
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                연락처
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                평점
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                현재상태
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                담당예약
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                액션
              </th>
            </tr>
          </thead>
          <tbody
            v-for="worker in paginatedWorkers"
            :key="worker.id"
            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ worker.id }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ worker.name }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ worker.phone }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                <div class="flex items-center">
                  <span class="text-yellow-400 mr-1">
                    <i class="fas fa-star"></i>
                  </span>
                  {{ worker.rating }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(worker.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ worker.status }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ worker.reservations }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="showWorkerDetails(worker)"
                  class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3">
                  <i class="fas fa-eye mr-1"></i>상세
                </button>
                <button
                  @click="toggleWorkerStatus(worker)"
                  class="mr-3"
                  :class="[
                    worker.status === '활동중'
                      ? 'text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300'
                      : 'text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300',
                  ]">
                  <i
                    :class="
                      worker.status === '활동중' ? 'fas fa-ban' : 'fas fa-check'
                    "
                    class="mr-1"></i>
                  {{ worker.status === "활동중" ? "비활성화" : "활성화" }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div
      class="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div class="text-sm text-gray-700 dark:text-gray-300">
        총 <span class="font-medium">{{ filteredWorkers.length }}</span
        >명의 기사
      </div>
      <div class="flex gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          @click="goToPage(page)"
          v-for="page in totalPages"
          :key="page"
          :class="[
            currentPage === page
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
          ]"
          class="px-3 py-1 border rounded">
          {{ page }}
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- 기사 상세 모달 -->
    <div
      v-if="selectedWorker"
      class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop>
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              기사 상세 정보
            </h3>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 기본 정보 -->
            <div class="space-y-6">
              <div>
                <h4
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  기본 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >기사ID</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white">{{
                      selectedWorker.id
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >이름</label
                    >
                    <input
                      type="text"
                      v-model="selectedWorker.name"
                      class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >연락처</label
                    >
                    <input
                      v-model="selectedWorker.phone"
                      type="tel"
                      class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >평점</label
                    >
                    <input
                      v-model="selectedWorker.rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >상태</label
                    >
                    <select
                      v-model="selectedWorker.status"
                      class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option value="활동중">활동중</option>
                      <option value="비활성화">비활성화</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- 담당 예약 정보 -->
              <div>
                <h4
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  담당 예약
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >현재 예약</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white">{{
                      selectedWorker.reservations
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >총 예약</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white"
                      >15건</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- 추가 정보 -->
            <div class="space-y-6">
              <div>
                <h4
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  활동 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >가입일</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white">{{
                      selectedWorker.joinDate
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >마지막 활동</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white">{{
                      selectedWorker.lastActivity
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >활동 지역</label
                    >
                    <input
                      v-model="selectedWorker.area"
                      type="text"
                      class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                  </div>
                </div>
              </div>

              <div>
                <h4
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  메모
                </h4>
                <textarea
                  v-model="selectedWorker.memo"
                  rows="3"
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="기사에 대한 메모를 입력하세요"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div
          class="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-3">
          <button
            @click="closeModal"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
            닫기
          </button>
          <button
            @click="saveWorker"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            저장
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
// 필터링 관련 상태 추가
// 검색어
const searchQuery = ref("");
// 상태필터링
const statusFilter = ref("");
// 평점 필터링
const ratingFilter = ref("");
const selectedWorker = ref(null);
// 기사목록 더미데이터
const workers = ref([
  {
    id: "#C001",
    name: "이지은",
    phone: "010-1234-5678",
    rating: 4.8,
    status: "활동중",
    reservations: "2건",
    memo: "",
    joinDate: "2024-01-15",
    lastActivity: "2024-04-10",
    area: "서울, 경기",
  },
  {
    id: "#C002",
    name: "최윤호",
    phone: "010-8765-4321",
    rating: 3.5,
    status: "활동중",
    reservations: "1건",
    memo: "",
    joinDate: "2024-01-20",
    lastActivity: "2024-04-09",
    area: "인천",
  },
  {
    id: "#C003",
    name: "박민수",
    phone: "010-5555-6666",
    rating: 4.2,
    status: "비활성화",
    reservations: "0건",
    memo: "",
    joinDate: "2024-01-25",
    lastActivity: "2024-03-15",
    area: "부산",
  },
  {
    id: "#C004",
    name: "정지은",
    phone: "010-7777-8888",
    rating: 4.9,
    status: "활동중",
    reservations: "3건",
    memo: "",
    joinDate: "2024-02-01",
    lastActivity: "2024-04-11",
    area: "서울",
  },
  {
    id: "#C005",
    name: "김동현",
    phone: "010-9999-0000",
    rating: 4.6,
    status: "활동중",
    reservations: "1건",
    memo: "",
    joinDate: "2024-02-05",
    lastActivity: "2024-04-08",
    area: "경기",
  },
  {
    id: "#C006",
    name: "강민지",
    phone: "010-1111-2222",
    rating: 4.7,
    status: "활동중",
    reservations: "2건",
    memo: "",
    joinDate: "2024-02-10",
    lastActivity: "2024-04-07",
    area: "서울, 인천",
  },
  {
    id: "#C007",
    name: "송준호",
    phone: "010-3333-4444",
    rating: 4.4,
    status: "활동중",
    reservations: "1건",
    memo: "",
    joinDate: "2024-02-15",
    lastActivity: "2024-04-06",
    area: "경기",
  },
  {
    id: "#C008",
    name: "한지원",
    phone: "010-5555-7777",
    rating: 4.8,
    status: "활동중",
    reservations: "3건",
    memo: "",
    joinDate: "2024-02-20",
    lastActivity: "2024-04-05",
    area: "서울",
  },
  {
    id: "#C009",
    name: "임성민",
    phone: "010-7777-9999",
    rating: 4.3,
    status: "비활성화",
    reservations: "0건",
    memo: "",
    joinDate: "2024-02-25",
    lastActivity: "2024-03-20",
    area: "부산",
  },
  {
    id: "#C010",
    name: "조유진",
    phone: "010-9999-1111",
    rating: 4.9,
    status: "활동중",
    reservations: "2건",
    memo: "",
    joinDate: "2024-03-01",
    lastActivity: "2024-04-04",
    area: "서울, 경기",
  },
  {
    id: "#C011",
    name: "윤서연",
    phone: "010-2222-3333",
    rating: 4.5,
    status: "활동중",
    reservations: "1건",
    memo: "",
    joinDate: "2024-03-05",
    lastActivity: "2024-04-03",
    area: "인천",
  },
  {
    id: "#C012",
    name: "장현우",
    phone: "010-4444-5555",
    rating: 4.7,
    status: "활동중",
    reservations: "2건",
    memo: "",
    joinDate: "2024-03-10",
    lastActivity: "2024-04-02",
    area: "서울",
  },
  {
    id: "#C013",
    name: "오지훈",
    phone: "010-6666-7777",
    rating: 4.2,
    status: "비활성화",
    reservations: "0건",
    memo: "",
    joinDate: "2024-03-15",
    lastActivity: "2024-03-25",
    area: "부산",
  },
  {
    id: "#C014",
    name: "신지원",
    phone: "010-8888-9999",
    rating: 4.8,
    status: "활동중",
    reservations: "3건",
    memo: "",
    joinDate: "2024-03-20",
    lastActivity: "2024-04-01",
    area: "서울, 경기",
  },
  {
    id: "#C015",
    name: "권민준",
    phone: "010-0000-1111",
    rating: 4.6,
    status: "활동중",
    reservations: "1건",
    memo: "",
    joinDate: "2024-03-25",
    lastActivity: "2024-03-31",
    area: "인천",
  },
]);
// 필터링된 기사 목록
const filteredWorkers = computed(() => {
  let result = [...workers.value];

  //   검색어 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (worker) =>
        worker.name.toLowerCase().includes(query) ||
        worker.phone.includes(query)
    );
  }
  // 상태 필터링
  if (statusFilter.value) {
    result = result.filter((worker) => worker.status === statusFilter.value);
  }
  // 평점 필터링
  if (ratingFilter.value) {
    result = result.filter(
      (worker) => worker.rating >= parseInt(ratingFilter.value) //최소평점 이상
    );
  }
  return result;
});
// 페이지네이션 관련 기능
const currentPage = ref(1);
const itemsPerPage = ref(5);
// 전체 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(filteredWorkers.value.length / itemsPerPage.value);
});
// 현재 페이지에 표시할 기사 목록 계산
const paginatedWorkers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredWorkers.value.slice(start, end);
});
// 페이지 이동함수
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page; //현재 페이지 값을 해당 페이지로 변경
  }
};
// 다음페이지로 이동 함수
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
// 이전페이지로 이동 함수
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
// 상태 css
const getStatusClass = (status) => {
  const statusClasses = {
    활동중: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
    비활성화: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
  };
  return (
    statusClasses[status] ||
    "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300"
  );
};
// 기사 상태 토글 함수
const toggleWorkerStatus = (worker) => {
  // workers배열에서 전달받은 worker의 id와 일치하는 기사의 인덱스를 찾음
  const index = workers.value.findIndex((w) => w.id === worker.id);
  //   기사를 찾았다면 (index가 -1이 아니라면)
  if (index !== -1) {
    // 상태가 "활동중" 이면 "비활성화"로 바꾸고
    // "비활성화"면 다시 "활동중"으로 바꿈(토글기능)
    workers.value[index].status =
      worker.status === "활동중" ? "비활성화" : "활동중";
  }
};
// 한글이슈
function handleInput(event) {
  searchQuery.value = event.target.value; //입력된 값을 searchQuery에 반영
}
// 기사상세 모달
const showWorkerDetails = (worker) => {
  selectedWorker.value = { ...worker };
};
// 모달닫기
const closeModal = () => {
  selectedWorker.value = null;
};
// 기사정보 저장 함수
const saveWorker = () => {
  // 입력값 유효성검사 :이름과 연락처는 필수
  if (!selectedWorker.value.name || !selectedWorker.value.phone) {
    alert("이름과 연락처는 필수 입력 항목입니다.");
    return;
  }
  //   기존 기사 목록에서 해당 ID기사 찾기
  const index = workers.value.findIndex(
    (w) => w.id === selectedWorker.value.id
  );
  if (index !== -1) {
    workers.value[index] = { ...selectedWorker.value };
  }
  closeModal();
};
</script>
