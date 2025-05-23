<!--  수현 관리자 게시판 -->

<script setup>
import { ref, computed } from "vue";

const searchQuery = ref("");
const statusFilter = ref("all");
const searchFilter = ref("title");
const selectAll = ref(false);
const selected = ref([]);
const currentPage = ref(1);
const perPage = 5;

// 검색 입력 처리기
function handleInput(event) {
  searchQuery.value = event.target.value;
  search(); // 입력 시 검색 실행
}

// 검색 실행 함수 (하나만)
function search() {
  currentPage.value = 1;
  console.log("검색 실행됨: ", searchQuery.value);
}
const notices = ref([
  { id: 0, isNotice: true, title: "[필독] 제빙기 청소 기사분들을 위한 필수 인증교육 안내", date: "2025-05-13" },
  { id: 1, number: 1, title: "[안내] 필프리 소속 기사 청소 스케줄 신청 기간(25.06.20~)", date: "2025-05-10" },
  { id: 2, number: 2, title: "[안내] 필프리 소속 기사 유니폼 신청 기간 (25.05.21~)", date: "2025-05-10" },
  { id: 3, number: 3, title: "[안내] 야간 방문 기준 변경 및 사전 연락 의무화", date: "2025-05-08" },
]);

const filteredNotices = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  return notices.value
    .filter((notice) => notice.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .slice(start, end);
});

const totalPages = computed(() => {
  const count = notices.value.filter((notice) =>
    notice.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).length;
  return Math.ceil(count / perPage);
});

function toggleAll() {
  if (selectAll.value) {
    selected.value = filteredNotices.value.map((n) => n.id);
  } else {
    selected.value = [];
  }
}

function deleteSelected() {
  notices.value = notices.value.filter((n) => !selected.value.includes(n.id));
  selected.value = [];
}

function goToPage(page) {
  currentPage.value = page;
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
</script>

<template>
  <div class="board-page">
    <!-- 페이지 헤더 -->
    <div class="board-header">
      <h1 class="board-title">게시판</h1>
    </div>

    <!-- 게시판 -->
    <div class="board-section">
      <!-- 게시판 제목 -->
      <div class="board-section-header">
        <!-- 큰제목 -->
        <h2 class="board-subtitle">나에게 필요한 안전교육</h2>
        &nbsp;
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <rect width="18" height="18" fill="url(#pattern0_656_530)" />
          <defs>
            <pattern id="pattern0_656_530" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_656_530" transform="scale(0.0169492)" />
            </pattern>
            <image
              id="image0_656_530"
              width="59"
              height="59"
              preserveAspectRatio="none"
              xlink:href="data:image/png;base64,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" />
          </defs></svg
        >&nbsp; &nbsp; &nbsp;
        <!-- 서브 제목 -->
        <div class="board-subtxtwrap">
          <div class="board-subtxtbg">
            <p class="board-subtxt">나와 고객의 안전을 위한 첫걸음,</p>
          </div>
          &nbsp;
          <p class="board-subtxt2">지금 바로 안전교육 이수하세요.</p>
        </div>
      </div>
      <!-- 검색 및 필터 -->
      <div class="board-filter">
        <div class="board-filter-controls">
          <!-- 상태 필터 -->
          <div class="status-select">
            <select v-model="statusFilter">
              <option value="all">전체</option>
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="date">등록일</option>
            </select>
          </div>
          <!-- 검색 입력 -->
          <div class="search-input">
            <input v-model="searchQuery" @input="handleInput" type="text" placeholder="검색어를 입력하세요." />
            <svg
              @click="search"
              class="cursor-pointer"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.5 16C12.6421 16 16 12.6421 16 8.5C16 4.35786 12.6421 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 12.6421 4.35786 16 8.5 16Z"
                stroke="#757575"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round" />
              <path
                d="M18 18L14 14"
                stroke="#757575"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <!-- 글쓰기 -->
          <button class="write-box">글쓰기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.board-page {
  padding: 1.5rem;
  color: #2d3748;
  background-color: #f9fafb;

  .dark & {
    background-color: #1a202c;
    color: #e2e8f0;
  }

  .board-header {
    display: flex;
    justify-content: space-between;

    align-items: center;

    .board-title {
      font-size: 1.5rem;
      font-weight: bold;

      .dark & {
        color: #ffffff;
      }
    }
  }
  //  게시판 서브제목
  .board-subtxtwrap {
    display: flex;
    align-items: flex-end;
    .board-subtxt {
      color: #fe9209;
      font-family: Pretendard;
      font-style: normal;
      font-weight: 600;
      line-height: 23px; /* 191.667% */
    }
    .board-subtxtbg {
      width: 200px;
      height: 15px;
      background-color: #efff81;
      display: flex;
      align-items: flex-end;
    }
    .board-subtxt2 {
      color: #616161;
      font-family: Pretendard;
      font-style: normal;
      font-weight: 600;
      line-height: 23px; /* 191.667% */
    }
  }
  .board-section {
    background-color: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    margin-top: 2%;
    display: flex;
    justify-content: space-between;

    .dark & {
      background-color: #2d3748;
    }

    .board-section-header {
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;

      .dark & {
        border-color: #4a5568;
      }

      .board-subtitle {
        font-size: 1.125rem;
        font-weight: 600;
        color: #00ab4c;

        .dark & {
          color: #ffffff;
        }
      }
    }

    .board-filter {
      padding: 1rem;

      .board-filter-controls {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        @media (min-width: 768px) {
          flex-direction: row;
        }
        // 검색어를 입력하세요.
        .search-input {
          position: relative;
          flex: 1;

          input {
            width: 100%;
            padding: 0.5rem 5rem 0.5rem 1.5rem;
            border-radius: 22px;
            border: 1.5px solid #f5f5f5;
            background: #fff;
            color: #1a202c;
            display: flex;

            &:focus {
              outline: none;
              border-color: #5a67d8;
              box-shadow: 0 0 0 2px rgba(90, 103, 216, 0.4);
            }

            .dark & {
              background-color: #4a5568;
              color: #ffffff;
              border-color: #718096;
            }
          }
          svg {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            color: #aaa;
            pointer-events: none;
          }
        }
        // 카테고리 선택
        .status-select {
          select {
            padding: 0.5rem 1rem;
            border-radius: 22px;
            border: 1.5px solid #f5f5f5;
            width: 160px;
            height: 38px;
            flex-shrink: 0;
            background: #fff;
            color: #1a202c;

            &:focus {
              outline: none;
              border-color: #5a67d8;
              box-shadow: 0 0 0 2px rgba(90, 103, 216, 0.4);
            }

            .dark & {
              background-color: #4a5568;
              color: #ffffff;
              border-color: #718096;
            }
          }
        }
        .write-box {
          width: 100px;
          height: auto;
          flex-shrink: 0;
          background: #f5f5f5;
        }
      }
    }
  }
  //   글내용
  .notice-board {
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    font-size: 14px;
    color: #333;

    .notice-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .notice-search {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;

      .notice-search-box {
        display: flex;
        gap: 8px;

        select,
        input {
          padding: 6px 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }

        button {
          padding: 6px 16px;
          background: #333;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background: #555;
          }
        }
      }

      .notice-write-btn {
        background: #000;
        color: #fff;
        padding: 6px 16px;
        border-radius: 4px;
        font-size: 14px;
        border: none;
        cursor: pointer;

        &:hover {
          background: #222;
        }
      }
    }

    .notice-table {
      width: 100%;
      border-collapse: collapse;
      border-top: 2px solid #ddd;

      thead {
        background: #f9f9f9;

        th {
          text-align: left;
          padding: 10px;
          font-weight: 600;
        }
      }

      tbody {
        tr {
          border-top: 1px solid #eee;

          td {
            padding: 10px;

            &.title {
              font-weight: 500;
              color: #111;
            }

            &.date {
              color: #666;
            }
          }

          .tag-notice {
            background: #333;
            color: #fff;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
          }
        }
      }
    }

    .notice-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;

      .btn-delete {
        background: #eee;
        color: #555;
        padding: 6px 16px;
        border-radius: 4px;
        border: none;
        cursor: pointer;

        &:hover {
          background: #ddd;
        }
      }

      .pagination {
        display: flex;
        gap: 4px;

        button {
          border: none;
          background: none;
          padding: 4px 8px;
          color: #666;
          cursor: pointer;

          &.active {
            font-weight: bold;
            color: #000;
          }

          &:disabled {
            color: #ccc;
            cursor: not-allowed;
          }
        }
      }
    }
  }
}
</style>
