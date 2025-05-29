<!--  수현 기사 게시판 -->

<script setup>
import { ref, computed } from "vue";

// 상태 변수 선언
const searchQuery = ref(""); // 검색어 문자열 (reactive)
const searchFilter = ref("title"); // 검색 필터 (현재 'title' 고정, 확장 가능)
const statusFilter = ref("all"); // 상태 필터 (현재 사용 안함)
const currentPage = ref(1); // 현재 페이지 번호 (1부터 시작)
const postsPerPage = 2; // 페이지 당 보여줄 게시글 수 (2개)

// 체크박스 관련 상태
const selectAll = ref(false); // 전체 선택 체크박스 상태 (true/false)
const selected = ref([]); // 선택된 게시글 id 배열

// ---------------------
// 📌 자유게시판 데이터
// ---------------------
const freePosts = ref([
  {
    id: 1,
    number: 1,
    title: "5월 25일 메가커피(동성로점) 대타 가능하신 분 계실까요?",
    content:
      "급한 일정이 생겨서 대신 근무해주실 분을 찾고 있어요! 시간은 오전 10시부터 오후 5시까지입니다. 가능하신 분은 댓글 부탁드려요 🙏",
    author: "이*현",
    date: "2025-05-13",
    views: 53,
  },
  {
    id: 2,
    number: 2,
    title: "고객 응대 어려울 때 이렇게 대응합니다 (상황별 스크립트 공유)",
    content:
      "고객 불만 응대가 어려울 때, 저는 먼저 경청 후 사과하는 방식을 써요. 예: '불편을 드려 정말 죄송합니다. 바로 확인해보겠습니다.' 등 상황별로 모아봤어요!",
    author: "김*빈",
    date: "2025-05-10",
    views: 102,
  },
  {
    id: 3,
    number: 3,
    title: "현장 갔다가 감동받은 일화 공유해요🥺",
    content:
      "오늘 방문한 매장에서 사장님이 고생 많다며 따뜻한 커피를 주셨어요. 작은 배려에 너무 감동받았습니다. 이런 순간이 힘이 되네요!",
    author: "김*수",
    date: "2025-05-10",
    views: 68,
  },
  {
    id: 4,
    number: 4,
    title: "1일 3매장 돌 때 체력 아끼는 동선 조절하는 꿀팁드림",
    content:
      "지도 앱을 이용해서 동선을 미리 짜두고, 중간에 쉬는 시간도 확보하는 게 핵심이에요! 전철/버스 시간도 미리 체크하면 체력 낭비 줄일 수 있어요.",
    author: "오*연",
    date: "2025-05-23",
    views: 221,
  },
  {
    id: 5,
    number: 5,
    title: "질문있어요",
    content:
      "제빙기 세제는 어디서 사나요? 혹시 본사에서 구매해야 하나요 아니면 개별로도 구매 가능한가요?",
    author: "김*희",
    date: "2025-05-23",
    views: 102,
  },
  {
    id: 6,
    number: 6,
    title: "근무복 세탁 꿀팁 공유해요🧼",
    content:
      "기름때 잘 안 빠질 때 '베이킹소다 + 식초'로 불린 다음 세탁하면 훨씬 깨끗해져요. 저는 주 1회 몰아서 세탁해요!",
    author: "세*정",
    date: "2025-05-24",
    views: 79,
  },
  {
    id: 7,
    number: 7,
    title: "오늘 고객님이 간식 주셨어요~",
    content:
      "청소 마무리하니까 감사하다고 바나나우유랑 도넛을 주셨어요. 너무 감동이라 올려봅니다 ㅎㅎ 이런 경험들 공유해봐요~",
    author: "하*진",
    date: "2025-05-24",
    views: 91,
  },
  {
    id: 8,
    number: 8,
    title: "제빙기 청소 후기 남겨요",
    content:
      "솔직히 처음엔 걱정했는데, 정리도 깔끔하고 고객 반응도 좋아서 뿌듯했어요. 특히 세제 냄새가 안 나서 마음에 들었어요!",
    author: "현*수",
    date: "2025-05-24",
    views: 87,
  },
  {
    id: 9,
    number: 9,
    title: "구독 서비스 신청하신 분 계신가요?",
    content:
      "정기 구독하면 장비나 세제도 따로 챙겨주시나요? 경험자분들 후기 궁금합니다!",
    author: "남*정",
    date: "2025-05-25",
    views: 62,
  },
  {
    id: 10,
    number: 10,
    title: "청소하다가 발생한 에러코드, 이렇게 해결했어요",
    content:
      "얼음이 안 나와서 깜짝 놀랐는데, 알고 보니 필터 막힘이 원인이었어요. 필터 분리 후 세척하니까 정상 작동했습니다!",
    author: "김*호",
    date: "2025-05-25",
    views: 115,
  },
]);
const freeSearchQuery = ref("");
const freeStatusFilter = ref("all");
const freeCurrentPage = ref(1);
const freePostsPerPage = 3;

// ---------------------
// 🔍 필터 + 페이지네이션
// ---------------------
const filteredFreePosts = computed(() => {
  return freePosts.value.filter((post) => {
    const query = freeSearchQuery.value.toLowerCase();

    switch (freeStatusFilter.value) {
      case "title":
        return post.title.toLowerCase().includes(query);
      case "content":
        return post.content.toLowerCase().includes(query);
      case "date":
        return post.date.includes(query);
      case "all":
      default:
        return (
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.date.includes(query)
        );
    }
  });
});

const paginatedFreePosts = computed(() => {
  const start = (freeCurrentPage.value - 1) * freePostsPerPage;
  return filteredFreePosts.value.slice(start, start + freePostsPerPage);
});

const totalFreePages = computed(() => {
  return Math.ceil(filteredFreePosts.value.length / freePostsPerPage);
});

// ---------------------
// ✅ 검색 및 페이지 함수
// ---------------------
function handleFreeInput(event) {
  freeSearchQuery.value = event.target.value;
  searchFree();
}

function searchFree() {
  freeCurrentPage.value = 1;
}

function goToFreePage(page) {
  freeCurrentPage.value = page;
}
// ---------------------
// 📌 공지사항 게시글 데이터
// ---------------------
const noticePosts = ref([
  {
    id: 100,
    notice: true,
    title: "[안내] 제빙기 교육 일정 변경",
    date: "2025-05-26",
  },
  {
    id: 101,
    number: 1,
    title: "[안내] 빙프리 소속 기사 청소 소모품 신청 기간(25.06.20~)",
    date: "2025-05-20",
  },
  {
    id: 102,
    number: 2,
    title: "[안내] 빙프리 소속 기사 유니폼 신청 기간 (25.05.21~)",
    date: "2025-05-18",
  },
  {
    id: 103,
    number: 3,
    title: "[안내] 야간 방문 기준 변경 및 사전 연락 의무화",
    date: "2025-05-18",
  },
  {
    id: 104,
    number: 4,
    title: "[필독] 고객 응대 매뉴얼 개정판 배포 안내 (25.05.27 시행)",
    date: "2025-05-15",
  },
  {
    id: 105,
    number: 5,
    title: "[안내] 제빙기 청소 보고서 양식 최신 버전 업로드 (25.05.25)",
    date: "2025-05-09",
  },
  {
    id: 106,
    number: 6,
    title: "[필독] 방문 전 사전 안내톡 전송 필수화 (25.06.01부터)",
    date: "2025-05-08",
  },
  {
    id: 107,
    number: 7,
    title: "[안내] 고객 불만 접수 시 대응 매뉴얼 필독 요청 (상시)",
    date: "2025-05-05",
  },
  {
    id: 108,
    number: 8,
    title: "[주의] 청소 후 실내 정리 상태 점검 강화 (25.06.01부터)",
    date: "2025-05-01",
  },
]);

const noticeSearchQuery = ref("");
const noticeStatusFilter = ref("all");
const noticeCurrentPage = ref(1);
const noticePostsPerPage = 4;

// ---------------------
// 🔍 공지사항 필터 + 페이지네이션
// ---------------------
const filteredNoticePosts = computed(() => {
  return noticePosts.value.filter((post) =>
    post.title.toLowerCase().includes(noticeSearchQuery.value.toLowerCase())
  );
});

const paginatedNoticePosts = computed(() => {
  const start = (noticeCurrentPage.value - 1) * noticePostsPerPage;
  return filteredNoticePosts.value.slice(start, start + noticePostsPerPage);
});

const totalNoticePages = computed(() => {
  return Math.ceil(filteredNoticePosts.value.length / noticePostsPerPage);
});

// ---------------------
// ✅ 검색 및 페이지 함수
// ---------------------
function handleNoticeInput(event) {
  noticeSearchQuery.value = event.target.value;
  searchNotice();
}

function searchNotice() {
  noticeCurrentPage.value = 1;
}

function goToNoticePage(page) {
  noticeCurrentPage.value = page;
}

// 게시글 데이터 (reactive)
const posts = ref([
  {
    id: 0,
    notice: true,
    title: "[필독] 제빙기 청소 기사님을 위한 필수 안전·위생 교육 안내",
    date: "2025-05-13",
    content:
      "제빙기 청소 작업자는 위생과 안전이 가장 중요합니다. 본 교육은 화학세제 취급, 전기 감전 방지, 작업 전후 소독 등 현장에서 꼭 알아야 할 내용을 포함하고 있습니다. 모든 기사님은 교육을 이수 후 현장에 투입됩니다.",
  },
  {
    id: 1,
    number: 1,
    title: "화학 세제 취급 시 안전 수칙 교육",
    date: "2025-05-10",
    content:
      "세척제 및 살균제는 강한 화학 성분을 포함하고 있어, 피부 접촉 시 화상이나 호흡기 자극을 유발할 수 있습니다. 이 교육에서는 세제 희석 방법, 보호장비 착용법, 응급 대처 방법 등을 안내합니다.",
  },
  {
    id: 2,
    number: 2,
    title: "전기·기계 장비 사용 시 감전 및 끼임 사고 예방 교육",
    date: "2025-05-08",
    content:
      "제빙기는 전기와 물이 동시에 존재하는 장비로 감전 위험이 존재합니다. 또한 커버를 열고 청소할 때 손 끼임 사고가 발생할 수 있어요. 본 교육에서는 작업 전 전원 차단, 장갑 착용, 분해 시 주의사항 등을 배웁니다.",
  },
  {
    id: 3,
    number: 3,
    title: "고객 현장 방문 시 응대 매뉴얼 및 CS 교육",
    date: "2025-05-05",
    content:
      "현장에서 고객과의 커뮤니케이션은 브랜드 신뢰도에 영향을 줍니다. 교육에서는 방문 인사, 현장 설명 방법, 민원 발생 시 대처법 등 고객 응대 매너를 학습합니다.",
  },
  {
    id: 4,
    number: 4,
    title: "작업 전·후 위생관리 및 장비 체크리스트 교육",
    date: "2025-05-01",
    content:
      "청소 시작 전 장비 상태 확인, 손 소독, 장갑·마스크 착용은 기본입니다. 교육에서는 작업 후 도구 세척, 폐수 처리, 청소 리포트 작성 등 전체 프로세스를 정리합니다.",
  },
  {
    id: 5,
    number: 5,
    title: "제빙기 내부 오염 방지를 위한 주기 관리 교육",
    date: "2025-04-29",
    content:
      "제빙기는 정기적인 청소가 없으면 세균 번식의 온상이 될 수 있습니다. 이 교육에서는 오염 위험 요소, 청소 주기별 관리법, 고객에 대한 관리 안내 방법까지 배웁니다.",
  },
]);
// 필터링된 게시글 리스트: 제목에 검색어 포함된 게시글만 반환
const filteredPosts = computed(() => {
  return posts.value.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 페이지네이션 적용된 게시글 리스트: 현재 페이지에 보여줄 게시글만 반환
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  return filteredPosts.value.slice(start, start + postsPerPage);
});

// 전체 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage);
});

// 글쓰기 모달
const clamemodal = ref(false);
const title = ref("");
const content = ref("");
const file = ref(null);
const author = ref("");
const fileInput = ref(null);
const handleFileUpload = (e) => {
  file.value = e.target.files[0];
};

//글쓰기
const submitInquiry = () => {
  if (!title.value || !content.value || !author.value) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  // 현재 날짜 yyyy-mm-dd 형식
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  // 새 글 객체 생성
  const newPost = {
    id: freePosts.value.length + 1,
    number: freePosts.value.length + 1,
    title: title.value,
    content: content.value,
    author: author.value,
    date: formattedDate,
    views: 21,
  };

  // freePosts 배열에 추가
  freePosts.value.push(newPost);

  alert("저장 되었습니다");

  // 초기화
  title.value = "";
  content.value = "";
  file.value = null;
  fileInput.value.value = "";
  author.value = "";

  // 모달 닫기
  clamemodal.value = false;
};

// 함수: 검색창 입력 이벤트 핸들러
function handleInput(event) {
  searchQuery.value = event.target.value; // 검색어 업데이트
  search(); // 검색 실행 (현재는 페이지 1로 이동)
}

// 검색 함수: 현재 페이지를 1로 초기화
function search() {
  currentPage.value = 1;
  console.log("검색 실행됨: ", searchQuery.value);
}

// 전체 선택 토글 함수
function toggleAll() {
  if (selectAll.value) {
    // 현재 페이지 게시글 모두 선택
    selected.value = paginatedPosts.value.map((post) => post.id);
  } else {
    // 선택 해제
    selected.value = [];
  }
}

// 선택된 게시글 삭제 함수
function deleteSelected() {
  posts.value = posts.value.filter((post) => !selected.value.includes(post.id));
  selected.value = [];
}

// 특정 페이지로 이동
function goToPage(page) {
  currentPage.value = page;
}

// 다음 페이지로 이동 (최대 페이지 넘지 않도록)
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

// 이전 페이지로 이동 (1보다 작아지지 않도록)
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
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
      <div class="board-section-1">
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
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <rect width="18" height="18" fill="url(#pattern0_656_530)" />
            <defs>
              <pattern
                id="pattern0_656_530"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlink:href="#image0_656_530"
                  transform="scale(0.0169492)"
                />
              </pattern>
              <image
                id="image0_656_530"
                width="59"
                height="59"
                preserveAspectRatio="none"
                xlink:href="data:image/png;base64,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"
              />
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
              <input
                v-model="searchQuery"
                @input="handleInput"
                type="text"
                placeholder="검색어를 입력하세요."
              />
              <svg
                @click="search"
                class="cursor-pointer"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 16C12.6421 16 16 12.6421 16 8.5C16 4.35786 12.6421 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 12.6421 4.35786 16 8.5 16Z"
                  stroke="#757575"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 18L14 14"
                  stroke="#757575"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="board-section-2">
        <div class="board-wrap">
          <table class="board-table">
            <thead>
              <tr>
                <th style="width: 10%">번호</th>
                <th style="width: 70%">제목</th>
                <th style="width: 20%">등록일</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, index) in paginatedPosts" :key="index">
                <td class="board-table-number">
                  <span v-if="post.notice" class="notice-label">공지</span>
                  <span v-else>{{ post.number }}</span>
                </td>
                <td>{{ post.title }}</td>
                <td class="board-table-date">{{ post.date }}</td>
              </tr>
            </tbody>
          </table>

          <div class="pagination">
            <button
              v-for="page in totalPages"
              :key="page"
              :class="{ active: currentPage === page }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 게시판2 -->
    <!-- 공지사항 게시판 영역 -->
    <div class="board-section">
      <div class="board-section-1">
        <!-- 게시판 제목 -->
        <div class="board-section-header">
          <h2 class="board-subtitle-2">공지사항</h2>
        </div>

        <!-- 검색 및 필터 -->
        <div class="board-filter">
          <div class="board-filter-controls">
            <div class="status-select">
              <select v-model="noticeStatusFilter">
                <option value="all">전체</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="date">등록일</option>
              </select>
            </div>
            <div class="search-input">
              <input
                v-model="noticeSearchQuery"
                @input="handleNoticeInput"
                type="text"
                placeholder="검색어를 입력하세요."
              />
              <svg
                @click="search"
                class="cursor-pointer"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 16C12.6421 16 16 12.6421 16 8.5C16 4.35786 12.6421 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 12.6421 4.35786 16 8.5 16Z"
                  stroke="#757575"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 18L14 14"
                  stroke="#757575"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="board-section-2">
        <div class="board-wrap">
          <table class="board-table">
            <thead>
              <tr>
                <th style="width: 10%">번호</th>
                <th style="width: 70%">제목</th>
                <th style="width: 20%">등록일</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, index) in paginatedNoticePosts" :key="index">
                <td class="board-table-number">
                  <span v-if="post.notice" class="notice-label-2">공지</span>
                  <span v-else>{{ post.number }}</span>
                </td>
                <td class="board-table-title">{{ post.title }}</td>
                <td class="board-table-date">{{ post.date }}</td>
              </tr>
            </tbody>
          </table>

          <div class="pagination">
            <button
              v-for="page in totalNoticePages"
              :key="page"
              :class="{ active: noticeCurrentPage === page }"
              @click="goToNoticePage(page)"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 게시판3 -->
    <!-- 자유게시판 영역 -->
    <div class="board-section">
      <div class="board-section-1">
        <!-- 게시판 제목 -->
        <div class="board-section-header">
          <h2 class="board-subtitle-2">자유게시판</h2>
        </div>

        <!-- 검색 및 필터 -->
        <div class="board-filter">
          <div class="board-filter-controls">
            <!-- 상태 필터 -->
            <div class="status-select">
              <select v-model="freeStatusFilter">
                <option value="all">전체</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="date">등록일</option>
              </select>
            </div>

            <!-- 검색 입력 -->
            <div class="search-input">
              <input
                v-model="freeSearchQuery"
                @input="handleFreeInput"
                type="text"
                placeholder="검색어를 입력하세요."
              />
              <svg
                @click="search"
                class="cursor-pointer"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 16C12.6421 16 16 12.6421 16 8.5C16 4.35786 12.6421 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 12.6421 4.35786 16 8.5 16Z"
                  stroke="#757575"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 18L14 14"
                  stroke="#757575"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <!-- 글쓰기 -->
            <button class="write-box" v-on:click="clamemodal = true">
              글쓰기
            </button>
          </div>
        </div>
      </div>

      <div class="board-section-2">
        <div class="board-wrap">
          <table class="board-table">
            <thead>
              <tr>
                <th style="width: 10%">번호</th>
                <th style="width: 40%">제목</th>
                <th style="width: 7%">글쓴이</th>
                <th style="width: 7%">등록일</th>
                <th style="width: 7%">조회수</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, index) in paginatedFreePosts" :key="index">
                <td class="board-table-number">
                  <span v-if="post.notice" class="notice-label-2">공지</span>
                  <span v-else>{{ post.number }}</span>
                </td>
                <td>{{ post.title }}</td>
                <td style="text-align: center">{{ post.author }}</td>
                <td style="text-align: center">{{ post.date }}</td>
                <td style="text-align: center">{{ post.views }}</td>
              </tr>
            </tbody>
          </table>

          <div class="pagination">
            <button
              v-for="page in totalFreePages"
              :key="page"
              :class="{ active: freeCurrentPage === page }"
              @click="goToFreePage(page)"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 글쓰기 모달 -->
  <div class="writemodal" v-show="clamemodal">
    <h2 class="modal-title profile-h2" style="">게시판 글쓰기</h2>
    <div class="writemodal-notice">
      <ul>
        <p>올바른 게시판 문화 내가 먼저 입니다 !</p>
        <li>
          ㆍ악성 게시글의 경우 관리자에 의해 바로 삭제되며, 일정 기간동안 글쓰기
          기능이 제한될 수도 있습니다.
        </li>
        <li>
          ㆍ본 게시판은 기사님들의 의견, 소통을 나누는 공간이므로 개인
          정보(전화번호, 주소 등)을 기재하지 마시고 필요시 회원 정보를
          수정해주시기 바랍니다.
        </li>
        <li>
          ㆍ개인정보, 욕설 기재 시 관리자에 의해 해당 게시물이 임의로 삭제 될 수
          있습니다.
        </li>
      </ul>
    </div>
    <ul class="form">
      <li class="form-line">
        <span class="label">이름</span>
        <input
          type="text"
          v-model="author"
          style="background-color: #f5f5f5"
          class="name-label"
        />
      </li>

      <li>
        <span class="label">제목</span>
        <input type="text" v-model="title" placeholder="제목을 입력해주세요." />
      </li>
      <li>
        <span class="label memo"
          >내용<small style="color: #bdbdbd"
            >{{ content.length }}/1,000</small
          ></span
        >

        <textarea
          v-model="content"
          placeholder="함께 나누고 싶은 이야기를 입력해주세요."
          maxlength="1000"
        ></textarea>
      </li>
      <li>
        <span class="label">파일첨부</span>
        <input type="file" ref="fileInput" @change="handleFileUpload" />
      </li>
    </ul>

    <div class="btn-box">
      <button class="cancel" @click="clamemodal = false">취소</button>
      <button class="fix" @click="submitInquiry">저장</button>
    </div>
  </div>
  <div
    class="overlay"
    v-show="clamemodal"
    @click="
      () => {
        clamemodal = false;
      }
    "
  ></div>
</template>

<style lang="scss" scoped>
.writemodal-notice {
  text-align: left;
  margin-left: 8%;
  p {
    color: #0d71ba;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 1.5%;
  }
  li {
    color: var(--bingprime-gray5-9e9e9e, #9e9e9e);
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 153.846% */
  }
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.4);
  z-index: 99;
}
.writemodal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: #fff;
  width: 950px;
  height: 620px;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  .form {
    list-style: none;
    li {
      display: flex;
      align-items: center;
      padding: 1.5% 5%;
      // border-top: 1px solid #e0e0e0;

      .label {
        display: inline-block;
        width: 100px;
        font-weight: 500;
        margin-bottom: 4px;
        color: #424242;

        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
      .memo {
        display: flex;
        flex-direction: column;
      }

      .value {
        font-weight: 600;
      }
      select,
      input[type="text"],
      textarea {
        width: 70%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
      }

      textarea {
        width: 80%;
        height: 100px;
        resize: vertical;
      }
    }
  }

  .btn-box {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
}
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
  .board-table-number,
  .board-table-date {
    text-align: center;
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
    .board-section-1 {
      width: 95%;
      margin: auto;
      overflow: hidden;
      margin: 1% 0 0 2%;
      display: flex;
      justify-content: space-between;
    }

    .dark & {
      background-color: #2d3748;
    }

    .board-section-header {
      padding: 1rem;
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
// 게시판 내용
.board-wrap {
  padding: 20px;
  font-family: "Pretendard", sans-serif;
}

.board-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.board-table thead {
  background-color: #f7f7f7;
}

.board-table th,
.board-table td {
  padding: 14px 20px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.notice-label {
  display: inline-block;
  background-color: #4caf50;
  color: #fff;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 15px;
}
.notice-label-2 {
  display: inline-block;
  background-color: #424242;
  color: #fff;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 15px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.pagination button {
  border: none;
  background-color: #f5f5f5;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #111;
  color: #fff;
}

.pagination button:hover {
  background-color: #ddd;
}
// 게시판 2
.board-subtitle-2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #424242;
}
</style>
