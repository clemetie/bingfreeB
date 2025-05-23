
<!--  수현 관리자 고객 관리 -->
<template>
  <div class="space-y-6 p-6 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
    <!-- 페이지 헤더 -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          고객 관리
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          고객 정보를 관리하고 상태를 확인할 수 있습니다.
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
            <i class="fas fa-users text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              전체 고객
            </h3>
            <p class="text-2xl font-semibold text-gray-800 dark:text-white">
              {{ totalCustomers }}명
            </p>
            <span class="text-sm text-green-600 dark:text-green-400">+2명</span>
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
              활성 고객
            </h3>
            <p class="text-2xl font-semibold text-gray-800 dark:text-white">
              {{ activeCustomers }}명
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
            <i class="fas fa-calendar-check text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              평균 예약
            </h3>
            <p class="text-2xl font-semibold text-gray-800 dark:text-white">
              3.2건
            </p>
            <span class="text-sm text-green-600 dark:text-green-400"
              >+0.5건</span
            >
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
              placeholder="고객명 또는 이메일로 검색"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            <i
              class="fas fa-search absolute left-3 top-3 text-gray-400 dark:text-gray-500"></i>
          </div>
        </div>
        <div class="flex gap-2">
          <select
            v-model="statusFilter"
            class="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="all">전체 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="blocked">차단</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 고객 목록 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
          고객 목록
        </h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                고객
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                연락처
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                예약
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                상태
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                액션
              </th>
            </tr>
          </thead>
          <tbody
            v-for="customer in paginatedCustomers"
            :key="customer.id"
            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="relative">
                    <img
                      :src="customer.avatar"
                      :alt="customer.name"
                      class="h-10 w-10 rounded-full object-cover" />
                    <span
                      :class="getStatusDotClass(customer.status)"
                      class="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white dark:ring-gray-800"></span>
                  </div>
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                      {{ customer.name }}
                      <!--v-if="customer.tags.includes('VIP')" tags 배열 안에 "VIP"라는 문자열이 포함되어 있는지 확인. -->
                      <span
                        v-if="customer.tags.includes('VIP')"
                        class="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full"
                        >VIP</span
                      >
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ customer.email }}
                    </div>
                    <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      가입일: {{ customer.joinDate }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ customer.phone }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  마지막 방문: {{ customer.lastVisit }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div
                  class="flex items-center text-indigo-600 dark:text-indigo-400">
                  <i class="fas fa-calendar mr-1"></i>
                  {{ customer.reservationCount }}건
                </div>
                <div class="text-sm text-gray-900 dark:text-white mt-1">
                  총 이용금액: {{ formatCurrency(customer.totalSpent) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(customer.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ getStatusText(customer.status) }}
                </span>
                <div class="mt-2 flex flex-wrap gap-1">
                  <span
                    v-for="tag in customer.tags"
                    :key="tag"
                    class="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full">
                    {{ tag }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-col space-y-2">
                  <button
                    @click="showCustomerDetails(customer)"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 flex items-center">
                    <i class="fas fa-eye mr-1"></i>상세
                  </button>
                  <button
                    @click="confirmDelete(customer)"
                    class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 flex items-center">
                    <i class="fas fa-trash mr-1"></i>삭제
                  </button>
                </div>
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
        총 <span class="font-medium">{{ filteredCustomers.length }}</span
        >명의 고객
      </div>
      <div class="flex gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 dark:text-gray-300">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            currentPage === page
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
          ]"
          class="px-3 py-1 border rounded transition-colors">
          {{ page }}
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 dark:text-gray-300">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
    <!-- 삭제 확인 모달 -->
    <div
      v-if="showDeleteModal"
      class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              고객 삭제
            </h3>
            <button
              @click="closeDeletModal"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <!-- customerToDelete?.name 구문에서 ?.는 Optional Chaining(옵셔널 체이닝) 문법입니다. 
             이 문법은 customerToDelete가 null 또는 undefined여도 오류 없이 안전하게 접근 -->
          <!-- customerToDelete가 존재하면 → customerToDelete.name 값을 출력
  
  customerToDelete가 null 또는 undefined이면 → 아무것도 출력하지 않음 (에러 발생하지 않음) -->
          <p class="text-sm text-gray-900 dark:text-white">
            정말로 {{ customerToDelete?.name }} 고객을 삭제하시겠습니까?
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            삭제된 고객 정보는 복구할 수 없습니다.
          </p>
        </div>
        <div
          class="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-3">
          <button
            @click="closeDeletModal"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
            취소
          </button>
          <button
            @click="deleteCustomer"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            삭제
          </button>
        </div>
      </div>
    </div>

    <!-- 고객 상세 보기 모달 -->
    <div
      v-if="showCustomerDetailsModal"
      class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              고객 상세
            </h3>
            <button
              @click="closeCustomerDetailsModal"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-6">
            <!-- 프로필 섹션 -->
            <div class="flex items-center space-x-4">
              <img
                :src="selectedCustomer.avatar"
                :alt="selectedCustomer.name"
                class="h-20 w-20 rounded-full object-cover border-4 border-indigo-100 dark:border-indigo-900" />
              <div>
                <h4 class="text-xl font-bold text-gray-900 dark:text-white">
                  {{ selectedCustomer.name }}
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ selectedCustomer.email }}
                </p>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span
                    v-for="tag in selectedCustomer.tags"
                    :key="tag"
                    class="px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 rounded-full">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 기본 정보 섹션 -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h5
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  연락처
                </h5>
                <input
                  v-model="selectedCustomer.phone"
                  type="tel"
                  class="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-0 text-gray-900 dark:text-white" />
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h5
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  가입일
                </h5>
                <p class="text-gray-900 dark:text-white">
                  {{ selectedCustomer.joinDate }}
                </p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h5
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  마지막 방문
                </h5>
                <p class="text-gray-900 dark:text-white">
                  {{ selectedCustomer.lastVisit }}
                </p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h5
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  상태
                </h5>
                <select
                  v-model="selectedCustomer.status"
                  class="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-0 text-gray-900 dark:text-white">
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                  <option value="blocked">차단</option>
                </select>
              </div>
            </div>

            <!-- 이용 정보 섹션 -->
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h5
                class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                이용 정보
              </h5>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    예약 건수
                  </p>
                  <p
                    class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ selectedCustomer.reservationCount }}건
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    총 이용금액
                  </p>
                  <p
                    class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ formatCurrency(selectedCustomer.totalSpent) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 선호 메뉴 섹션 -->
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h5
                class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                선호 메뉴
              </h5>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(item, index) in selectedCustomer.favoriteItems"
                  :key="index"
                  class="flex items-center gap-2">
                  <input
                    v-model="selectedCustomer.favoriteItems[index]"
                    type="text"
                    class="px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  <button
                    @click="removeFavoriteItem(index)"
                    class="text-red-500 hover:text-red-700">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <button
                  @click="addFavoriteItem"
                  class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800">
                  <i class="fas fa-plus mr-1"></i>메뉴 추가
                </button>
              </div>
            </div>

            <!-- 메모 섹션 -->
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h5
                class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                메모
              </h5>
              <textarea
                v-model="selectedCustomer.notes"
                rows="3"
                class="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"></textarea>
            </div>
          </div>
        </div>
        <div
          class="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-3">
          <button
            @click="closeCustomerDetailsModal"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
            취소
          </button>
          <button
            @click="saveCustomerDetails"
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
const showCustomerForm = ref(false);
const showDeleteModal = ref(false);
const showCustomerDetailsModal = ref(false);
const searchQuery = ref("");
const statusFilter = ref("all");
// 한글이슈
function handleInput(event) {
  searchQuery.value = event.target.value;
}
// 고객목록
const customers = ref([
  {
    id: 1,
    name: "김철수",
    email: "chulsoo@example.com",
    phone: "010-1234-5678",
    status: "active",
    reservationCount: 5,
    avatar: "/images/default-avatar.png",
    joinDate: "2024-01-15",
    lastVisit: "2024-04-10",
    totalSpent: 1500000,
    favoriteItems: ["아메리카노", "카페라떼"],
    notes: "VIP 고객, 생일 쿠폰 제공",
    tags: ["VIP", "정기방문"],
  },
  {
    id: 2,
    name: "이영희",
    email: "younghee@example.com",
    phone: "010-8765-4321",
    status: "active",
    reservationCount: 3,
    avatar: "/images/people1.png",
    joinDate: "2024-01-20",
    lastVisit: "2024-04-09",
    totalSpent: 800000,
    favoriteItems: ["카페모카", "티라미수"],
    notes: "단골 고객, 알레르기 주의",
    tags: ["단골", "알레르기"],
  },
  {
    id: 3,
    name: "박민수",
    email: "minsu@example.com",
    phone: "010-1111-2222",
    status: "inactive",
    reservationCount: 1,
    avatar: "/images/people2.png",
    joinDate: "2024-01-25",
    lastVisit: "2024-03-15",
    totalSpent: 300000,
    favoriteItems: ["에스프레소"],
    notes: "3개월 미방문",
    tags: ["휴면"],
  },
  {
    id: 4,
    name: "최지영",
    email: "jiyoung@example.com",
    phone: "010-3333-4444",
    status: "active",
    reservationCount: 7,
    avatar: "/images/people3.png",
    joinDate: "2024-02-01",
    lastVisit: "2024-04-11",
    totalSpent: 2100000,
    favoriteItems: ["바닐라라떼", "치즈케이크"],
    notes: "VIP 고객, 이벤트 참여 적극적",
    tags: ["VIP", "이벤트"],
  },
  {
    id: 5,
    name: "정민호",
    email: "minho@example.com",
    phone: "010-5555-6666",
    status: "blocked",
    reservationCount: 0,
    avatar: "/images/people4.png",
    joinDate: "2024-02-05",
    lastVisit: "2024-02-20",
    totalSpent: 0,
    favoriteItems: [],
    notes: "불량 고객, 환불 요청 다수",
    tags: ["차단"],
  },
  {
    id: 6,
    name: "한수진",
    email: "sujin@example.com",
    phone: "010-7777-8888",
    status: "active",
    reservationCount: 4,
    avatar: "/images/people3.png",
    joinDate: "2024-02-10",
    lastVisit: "2024-04-08",
    totalSpent: 1200000,
    favoriteItems: ["카라멜마끼아또", "초콜릿케이크"],
    notes: "단골 고객, 친절함",
    tags: ["단골"],
  },
  {
    id: 7,
    name: "송지훈",
    email: "jihun@example.com",
    phone: "010-9999-0000",
    status: "active",
    reservationCount: 2,
    avatar: "/images/people1.png",
    joinDate: "2024-02-15",
    lastVisit: "2024-04-07",
    totalSpent: 600000,
    favoriteItems: ["아이스티", "샌드위치"],
    notes: "새 고객, 온라인 주문 선호",
    tags: ["신규"],
  },
  {
    id: 8,
    name: "강미영",
    email: "miyoung@example.com",
    phone: "010-2222-3333",
    status: "active",
    reservationCount: 6,
    avatar: "/images/people3.png",
    joinDate: "2024-02-20",
    lastVisit: "2024-04-06",
    totalSpent: 1800000,
    favoriteItems: ["플랫화이트", "마카롱"],
    notes: "VIP 고객, 리뷰 작성 적극적",
    tags: ["VIP", "리뷰어"],
  },
  {
    id: 9,
    name: "임동현",
    email: "donghyun@example.com",
    phone: "010-4444-5555",
    status: "inactive",
    reservationCount: 1,
    avatar: "/images/people4.png",
    joinDate: "2024-02-25",
    lastVisit: "2024-03-10",
    totalSpent: 300000,
    favoriteItems: ["아메리카노"],
    notes: "2개월 미방문",
    tags: ["휴면"],
  },
  {
    id: 10,
    name: "오서연",
    email: "seoyeon@example.com",
    phone: "010-6666-7777",
    status: "active",
    reservationCount: 3,
    avatar: "/images/people5.png",
    joinDate: "2024-03-01",
    lastVisit: "2024-04-05",
    totalSpent: 900000,
    favoriteItems: ["카페라떼", "크로플"],
    notes: "단골 고객, 친구 추천",
    tags: ["단골", "추천"],
  },
]);
// 필터링 관련
const filteredCustomers = computed(() => {
  // 고객데이터 복사
  let result = [...customers.value];
  // 검색어 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) || //이름에 포함되어 있으면 통화
        customer.eamil.toLowerCase().includes(query)
    );
  }
  // 상태필더링
  if (statusFilter.value !== "all") {
    result = result.filter(
      (customer) => customer.status === statusFilter.value //상태가 선택한 값과 일치하는지 확인
    );
  }

  //최종 필터링된 고객 목록 반환
  return result;
});
// 페이네이션
const currentPage = ref(1);
const itemsPerPage = ref(5);
// 전체 페이지수 계산
const totalPages = computed(() => {
  return Math.ceil(filteredCustomers.value.length / itemsPerPage.value);
});
// 현재 페이지에 보여줄 고객목록 계산
const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCustomers.value.slice(start, end);
});
// 페이지로 이동하는 함수
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
// 다음페이지로 이동
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
// 이전페이지로 이동
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
// 숫자를 원화 동화 형식으로 포맷
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency", // 통화 형식
    currency: "KRW", // 원화(KRW)
    maximumFractionDigits: 0, // 소수점 없음
  }).format(amount);
};
// 상태글자 변환
const getStatusText = (status) => {
  const statusMap = {
    active: "활성",
    inactive: "비활성",
    blocked: "차단",
  };
  return statusMap[status] || status;
};
const getStatusClass = (status) => {
  const statusClasses = {
    active: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
    inactive:
      "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300",
    blocked: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
  };
  return (
    statusClasses[status] ||
    "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300"
  );
};
const getStatusDotClass = (status) => {
  const statusClasses = {
    active: "bg-green-400 dark:bg-green-500",
    inactive: "bg-yellow-400 dark:bg-yellow-500",
    blocked: "bg-red-400 dark:bg-red-500",
  };
  return statusClasses[status] || "bg-gray-400 dark:bg-gray-500";
};
// 고객 상세 보기 모달 열기
const selectedCustomer = ref(null);
const showCustomerDetails = (customer) => {
  selectedCustomer.value = customer; //선택된 고객 정보 저장
  showCustomerDetailsModal.value = true;
};
// 고객 상세 보기 모달 닫기
const closeCustomerDetailsModal = () => {
  showCustomerDetailsModal.value = false;
  selectedCustomer.value = null;
};
// 특정 인덱스의 선호 메뉴 항목 삭제
const removeFavoriteItem = (index) => {
  selectedCustomer.value.favoriteItems.splice(index, 1); //배열에서 제거
};
// 선호 메뉴 항목 추가
const addFavoriteItem = () => {
  if (!selectedCustomer.value.favoriteItems) {
    selectedCustomer.value.favoriteItems = []; //배열이 없으면 초기화
  }
  selectedCustomer.value.favoriteItems.push("");
};
// 고객 상세 정보 저장
const saveCustomerDetails = () => {
  // 1.고객 목록에서 현재 선택된 고객의 인덱스를 찾는다
  const index = customers.value.findIndex(
    (c) => c.id === selectedCustomer.value.id
  );
  if (index !== -1) {
    // 2.빈 문자열로 된 선호 메뉴 항목은 제거
    selectedCustomer.value.favoriteItems =
      selectedCustomer.value.favoriteItems.filter((item) => item.trim() !== "");
    //   3.수정된 고객 정보를 고객 목록에 반영
    customers.value[index] = { ...selectedCustomer.value };
    // 모달 닫기
    closeCustomerDetailsModal();
  }
};
// 고객 삭제 모달 열기
// 삭제할 고객 객체를 저장하는 변수
const customerToDelete = ref(null);
const confirmDelete = (customer) => {
  customerToDelete.value = customer; //삭제할 고객 정보 저장
  showDeleteModal.value = true; //삭제확인 모달 표시
};
// 삭제모달 닫기
const closeDeletModal = () => {
  customerToDelete.value = null;
  showDeleteModal.value = false;
};
// 실제 고객 삭제 처리
const deleteCustomer = () => {
  if (customerToDelete.value) {
    // 고객 삭제
    customers.value = customers.value.filter(
      (c) => c.id !== customerToDelete.value.id
    );
    // 삭제후 모달 닫기
    closeDeletModal();
  }
};
// 전체고객 수를 계산하는 계산 속성
const totalCustomers = computed(() => customers.value.length);
// 활성상태인 고객만 필더링하여 그수를 계산하느 계산 속성
const activeCustomers = computed(
  () =>
    customers.value.filter((customer) => customer.status === "active").length
);
</script>
