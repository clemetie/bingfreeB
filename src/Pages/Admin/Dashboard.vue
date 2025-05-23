<!-- 지수 관리자 대시보드 -->
<template>
  <div class="tw-space-y-6 tw-bg-white tw-text-black tw-dark:bg-black tw-dark:text-white tw-p-4 tw-rounded">
    <!-- Font Awesome CDN 추가 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

    <h1 class="tw-text-3xl tw-font-bold tw-text-gray-800 tw-dark:text-white">관리자 대시보드</h1>

    <!-- 통계 카드 -->
    <div class="tw-grid grid-cols-1 tw-sm:grid-cols-2 tw-lg:grid-cols-3 tw-gap-4 tw-md:gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow">
        <div class="tw-flex tw-items-center">
          <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
            <i class="fas fa-calendar-check text-xl md:text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">전체 예약</h3>
            <p class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">120</p>
            <span class="text-sm text-green-600 dark:text-green-400">+12%</span>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
            <i class="fas fa-users text-xl md:text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">전체 사용자</h3>
            <p class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">50</p>
            <span class="text-sm text-green-600 dark:text-green-400">+5%</span>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300">
            <i class="fas fa-star text-xl md:text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">평균 평점</h3>
            <p class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">4.8</p>
            <span class="text-sm text-green-600 dark:text-green-400">+0.2</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 예약 현황 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow text-gray-700 dark:text-gray-300">
      <!-- 검색 필터 -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between md:space-x-4">
          <!-- 날짜 선택 -->
          <div class="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">기준일</label>
            <div class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="date"
                v-model="dateRange.start"
                class="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              <span class="text-gray-500 dark:text-gray-400">~</span>
              <input
                v-model="dateRange.end"
                type="date"
                class="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
          </div>

          <!-- 접수 구분 -->
          <div class="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">접수구분</label>
            <select
              v-model="serviceType"
              class="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="all">전체</option>
              <option value="일반청소">일반청소</option>
              <option value="입주청소">입주청소</option>
              <option value="이사청소">이사청소</option>
            </select>
          </div>

          <!-- 접수 상태 -->
          <div class="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">접수상태</label>
            <select
              v-model="receiptStatus"
              class="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="all">전체</option>
              <option value="예약완료">예약완료</option>
              <option value="진행중">진행중</option>
              <option value="대기중">대기중</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 예약 목록 -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                예약번호
              </th>
              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                고객명
              </th>
              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                청소유형
              </th>
              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                예약일시
              </th>
              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                상태
              </th>
              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                담당기사
              </th>
              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                액션
              </th>
            </tr>
          </thead>
          <tbody
            v-for="reservation in paginatedReservations"
            :key="reservation.id"
            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ reservation.id }}
              </td>
              <td class="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ reservation.customerName }}
              </td>
              <td class="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ reservation.type }}
              </td>
              <td class="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ formatDate(reservation.date) }}
              </td>
              <td class="px-4 md:px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(reservation.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ reservation.status }}
                </span>
              </td>
              <td class="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ reservation.worker }}
              </td>
              <td class="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="showReservationDetails(reservation)"
                  class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3">
                  <i class="fa-solid fa-eye mr-1"></i> 상세
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 페이지네이션 -->
      <div
        class="px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 dark:border-gray-700">
        <!-- 페이지네이션 모바일 -->
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
            이전
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
            다음
          </button>
        </div>
        <!-- 페이지네이션 데스크탑 -->
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              총
              <span class="font-medium">{{ filteredReservaions.length }}</span
              >개 중 <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span
              >- <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredReservaions.length) }}</span
              >개 표시
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                <span class="sr-only">이전</span>
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
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                ]">
                {{ page }}
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                <span class="sr-only">다음</span>
                <i class="fas fa-chevron-right"></i>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- 기사 현황 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white">기사 현황</h2>
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
            v-for="worker in workers"
            :key="worker.id"
            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ worker.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ worker.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ worker.phone }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ worker.rating }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(worker.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ worker.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ worker.reservations }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="showWorkerDetails(worker)"
                  class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3">
                  <i class="fa-solid fa-eye mr-1"></i>상세
                </button>
                <button
                  @click="toggleWorkerStatus(worker)"
                  :class="[
                    worker.status === '활동중'
                      ? 'text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300'
                      : 'text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300',
                  ]">
                  <i :class="worker.status === '활동중' ? 'fa-solid fa-ban' : 'fa-solid fa-check'" class="mr-1"></i>
                  {{ worker.status === "활동중" ? "비활성화" : "활성화" }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 차트와 최근 예약 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 차트 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">예약 추이</h2>
        <div class="h-64">
          <Chart />
        </div>
      </div>

      <!-- 최근 예약 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">최근 예약</h2>
        <div class="space-y-4">
          <div
            v-for="reservation in recentReservations"
            :key="reservation.id"
            class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ reservation.customerName }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ reservation.date }}</p>
            </div>

            <span :class="getStatusClass(reservation.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
              {{ reservation.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 예약 상세 모달 -->
  <div
    v-if="selectedReservation"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop>
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">예약 상세 정보</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 기본 정보 -->
          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">기본 정보</h4>
              <div class="space-y-2">
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">기사ID</label>
                  <span class="text-sm text-gray-900 dark:text-white">{{ selectedWorker.id }}</span>
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">이름</label>
                  <input
                    v-model="selectedWorker.name"
                    type="text"
                    class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">연락처</label>
                  <input
                    v-model="selectedWorker.phone"
                    type="tel"
                    class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">평점</label>
                  <input
                    v-model="selectedWorker.rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">상태</label>
                  <select
                    v-model="selectedWorker.status"
                    class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="활동중">활동중</option>
                    <option value="비활성화">비활성화</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- 활동 정보 -->
          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">활동 정보</h4>
              <div class="space-y-2">
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">담당예약</label>
                  <span class="text-sm text-gray-900 dark:text-white">{{ selectedWorker.reservations }}</span>
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">활동지역</label>
                  <input
                    v-model="selectedWorker.area"
                    type="text"
                    class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">메모</h4>
              <textarea
                v-model="selectedWorker.memo"
                rows="3"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="기사에 대한 메모를 입력하세요"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
          닫기
        </button>
        <button
          @click="saveReservaton"
          class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          저장
        </button>
      </div>
    </div>
  </div>

  <!-- 기사 상세 모달 -->
  <div v-if="selectedWorker" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop>
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">기사 상세 정보</h3>
          <button class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 기본 정보 -->
          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">기본 정보</h4>
              <div class="space-y-2">
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">기사ID</label>
                  <span class="text-sm text-gray-900 dark:text-white">{{}}</span>
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">이름</label>
                  <input
                    type="text"
                    class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">연락처</label>
                  <input
                    type="tel"
                    class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">평점</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">상태</label>
                  <select
                    class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="활동중">활동중</option>
                    <option value="비활성화">비활성화</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- 활동 정보 -->
          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">활동 정보</h4>
              <div class="space-y-2">
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">담당예약</label>
                  <span class="text-sm text-gray-900 dark:text-white">{{}}</span>
                </div>
                <div class="flex items-center">
                  <label class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">활동지역</label>
                  <input
                    type="text"
                    class="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">메모</h4>
              <textarea
                rows="3"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="기사에 대한 메모를 입력하세요"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-3">
        <button
          @click="closeWorkermodal"
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
</template>
<script setup>
// import Chart from "./components/Chart.vue";
import { ref, computed } from "vue";
// 선택된 기사 정보
const selectedWorker = ref(null);
// 선택된 예약 정보
const selectedReservation = ref(null);
// 서비스유형
const serviceType = ref("all");
// 상태
const receiptStatus = ref("all");
// 예약 정보
const reservations = ref([
  {
    id: "#1001",
    customerName: "김철수",
    type: "일반청소",
    date: "2025-05-10 14:00",
    status: "예약완료",
    worker: "이지은",
  },
  {
    id: "#1002",
    customerName: "박영희",
    type: "입주청소",
    date: "2025-05-11 10:00",
    status: "진행중",
    worker: "최윤호",
  },
  {
    id: "#1003",
    customerName: "이민수",
    type: "이사청소",
    date: "2025-05-12 15:00",
    status: "대기중",
    worker: "-",
  },
  {
    id: "#1004",
    customerName: "정다은",
    type: "일반청소",
    date: "2025-05-13 11:00",
    status: "예약완료",
    worker: "이지은",
  },
  {
    id: "#1005",
    customerName: "최준호",
    type: "입주청소",
    date: "2025-05-14 09:00",
    status: "대기중",
    worker: "-",
  },
  {
    id: "#1006",
    customerName: "한미영",
    type: "이사청소",
    date: "2025-05-15 13:00",
    status: "예약완료",
    worker: "최윤호",
  },
  {
    id: "#1007",
    customerName: "송민준",
    type: "일반청소",
    date: "2025-05-16 15:00",
    status: "진행중",
    worker: "이지은",
  },
  {
    id: "#1008",
    customerName: "윤서연",
    type: "입주청소",
    date: "2025-05-17 10:00",
    status: "대기중",
    worker: "-",
  },
]);
// 날짜 범위 필터
const dateRange = ref({
  start: "", // 시작일
  end: "", // 종료일
});
// 필터링된 예약 목록 계산
const filteredReservaions = computed(() => {
  let result = [...reservations.value]; // 예약목록을 복사
  //    날짜를 필터링:시작일과 종료일을 지정한 경우, 해당 범위내의 예약난 필터링
  if (dateRange.value.start && dateRange.value.end) {
    result = result.filter((reservation) => {
      const resevationDate = new Date(reservation.date);
      const startDate = new Date(dateRange.value.start); //시작일
      const endDate = new Date(dateRange.value.end); //종료일
      return resevationDate >= startDate && resevationDate <= endDate;
    });
  }
  // 청소서비스 유형 필터링
  if (serviceType.value !== "all") {
    result = result.filter((reservation) => reservation.type === serviceType.value);
  }

  // 접수 상태 필터링
  if (receiptStatus.value !== "all") {
    result = result.filter((reservation) => reservation.status === receiptStatus.value);
  }

  return result;
});
// 페이지네이션 상태
const currentPage = ref(1);
const itemsPerPage = ref(5);
// 전체 페이지 수 를 계산
const totalPages = computed(() => {
  return Math.ceil(filteredReservaions.value.length / itemsPerPage.value);
});
// 페이지네이션 예약 목록 계산
const paginatedReservations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredReservaions.value.slice(start, end);
});
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
// 날짜 포맷을 변경하는 함수
// 입력된 날짜 값을 'yyyy년 MM월 dd일 (요일)' 형식으로 변환
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric", // 년도
    month: "long", // 월 (한글 월 이름)
    day: "numeric", // 일
    weekday: "long", // 요일 (한글 요일 이름)
  });
};
// 상태 css
const getStatusClass = (status) => {
  const statusClasses = {
    예약완료: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
    진행중: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300",
    대기중: "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300",
    확정: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
    대기: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300",
    취소: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
    활동중: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
  };
  return statusClasses[status] || "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300";
};

// 예약관리 상세 모달
const showReservationDetails = (reservation) => {
  selectedReservation.value = { ...reservation, memo: reservation.memo || "" };
};
// 예약상세 모달 닫기
const closeModal = () => {
  selectedReservation.value = null;
};
// 예약 정보 저장 함수
const saveReservaton = () => {
  // 입력값 유효성 검사
  if (!selectedReservation.value.customerName || !selectedReservation.value.date) {
    alert("고객명과 예약일시는 필수 입력 항목입니다.");
    return;
  }
  const index = reservations.value.findIndex((r) => r.id === selectedReservation.value.id);
  if (index !== -1) {
    reservations.value[index] = { ...selectedReservation.value };
  }
  //   모달닫기
  closeModal();
};
// 기사현황
const workers = ref([
  {
    id: "#C001",
    name: "이지은",
    phone: "010-1234-5678",
    rating: 4.8,
    status: "활동중",
    reservations: "2건",
    area: "서울, 경기",
    memo: "",
  },
  {
    id: "#C002",
    name: "최윤호",
    phone: "010-8765-4321",
    rating: 4.5,
    status: "활동중",
    reservations: "1건",
    area: "인천",
    memo: "",
  },
]);
//기사상태 토글 함수
const toggleWorkerStatus = (worker) => {
  const index = workers.value.findIndex((w) => (w.id = worker.id));
  //해당 기사가 목록에 있으면
  if (index !== -1) {
    workers.value[index].status = worker.status === "활동중" ? "비활성화" : "활동중 ";
  }
};

// 기사 상세모달 관련 함수
const showWorkerDetails = (worker) => {
  selectedWorker.value = {
    ...worker,
    memo: worker.memo || "",
    area: worker.area || "",
  };
};
const closeWorkermodal = () => {
  selectedWorker.value = null;
};
const saveWorker = () => {
  //연락처랑 이름이 비어있으면 유효성 검사
  if (!selectedWorker.value.name || !selectedWorker.value.phone) {
    alert("이름과 연락처는 필수 입력 항목입니다");
    return;
  }
  //   기존기사 목록에서 현재 수정중인 기사의 인덱스를 찾음
  const index = workers.value.findIndex((w) => w.id === selectedWorker.value.id);
  if (index !== -1) {
    workers.value[index] = { ...selectedWorker.value };
  }
  closeWorkerModal();
};
//최근예약
const recentReservations = ref([
  { id: 1, customerName: "김철수", date: "2024-03-20", status: "확정" },
  { id: 2, customerName: "이영희", date: "2024-03-21", status: "대기" },
  { id: 3, customerName: "박민수", date: "2024-03-22", status: "취소" },
  { id: 4, customerName: "정지은", date: "2024-03-23", status: "확정" },
]);
</script>
