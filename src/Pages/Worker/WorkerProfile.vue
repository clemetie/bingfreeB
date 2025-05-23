<script setup>
import { ref, computed, toRaw, watch } from "vue";
import { fullReservationList, koreaLocations } from "@/data.mjs";
const item = fullReservationList[0];

const tab = ref("review");

const reviews = ref([
  {
    name: "이*현",
    img: "/prime/beenstar.png",
    text: "24시간 중 원하는 시간에 언제든 서비스 받을 수 있어 좋았어요. 기사님도 너무 친절하시고 꼼꼼하게 케어 해주셔서 믿음이 가요.",
  },
  {
    name: "김*수",
    img: "/prime/beenstar.png",
    text: "청소 끝나고 다시 얼음 만들어보니까 투명도부터 다르더라고요. 물맛도 좋고, 냉장고 안 냄새도 덜해진 느낌이에요.",
  },
  {
    name: "오*연",
    img: "/prime/beenstar.png",
    text: "보이지 않던 내부까지 다 분해해서 세척하는 걸 보고 놀랐어요. 청소 후 얼음 색도 더 맑아지고, 냄새도 완전히 사라졌습니다.",
  },
  {
    name: "김*빈",
    img: "/prime/beenstar.png",
    text: "직접 하기 어려운 부분까지 다 해주시니 너무 편했어요. 정기적으로 꼭 받아야겠다는 생각이 들었어요. 완전 추천합니다!",
  },
  {
    name: "김*리",
    img: "/prime/beenstar.png",
    text: "전문 청소 서비스를 받고 나서야, 속까지 비로소 안심이 됐습니다. 하얗게 맑아진 얼음을 보고 있으니 마음도 같이 맑아지는 기분이었어요.",
  },
  {
    name: "장*진",
    img: "/prime/beenstar.png",
    text: "청소 후엔 얼음 투명도도 확실히 좋아졌고, 잡내도 사라졌습니다.",
  },
  {
    name: "김*웅",
    img: "/prime/beenstar.png",
    text: "집에서 얼음을 자주 쓰다 보니 위생이 걱정됐는데, 전문 청소 후 얼음 맛이 확 달라졌어요. 아이들도 안심하고 마실 수 있어 만족합니다.",
  },
  {
    name: "박*호",
    img: "/prime/beenstar.png",
    text: "냉장고 청소는 해도 제빙기는 처음 맡겨봤어요. 청소 후 얼음이 맑고 깨끗해서 놀랐습니다. 이젠 마음 놓고 음료에 넣어 마실 수 있어요.",
  },
  {
    name: "강*호",
    img: "/prime/beenstar.png",
    text: "여름마다 제빙기 돌리는데 얼음 냄새가 살짝 나서 신경 쓰였거든요. 전문 청소 받고 나니 얼음도 더 맑고, 물맛도 깔끔해졌어요. 이젠 가족들 모두 안심하고 시원하게 즐기고 있어요.",
  },
]);

const currentPage = ref(1);
const perPage = 3;

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  return reviews.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(reviews.value.length / perPage));
// 지역 선택 관련
const selectedSido = ref(""); // 시/도 배열
const selectedGugun = ref({}); // 시도별 구군 배열

function toggleGugun(sido, gugun) {
  if (!selectedGugun.value[sido]) {
    selectedGugun.value[sido] = [];
  }

  const gugunList = selectedGugun.value[sido];

  if (gugunList.includes(gugun)) {
    selectedGugun.value[sido] = gugunList.filter((g) => g !== gugun);
  } else {
    selectedGugun.value[sido] = [...gugunList, gugun];
  }
}
watch(selectedSido, (newSido, oldSido) => {
  if (oldSido && selectedGugun.value[oldSido]) {
    delete selectedGugun.value[oldSido];
  }

  if (newSido && !selectedGugun.value[newSido]) {
    selectedGugun.value[newSido] = [];
  }
});
function saveLocation() {
  if (!item.worker.location) {
    item.worker.location = {};
  }

  const raw = toRaw(item.worker.location); // 기존 값

  for (const [sido, guguns] of Object.entries(selectedGugun.value)) {
    if (!raw[sido]) {
      raw[sido] = [];
    }

    const merged = new Set([...raw[sido], ...guguns]);
    raw[sido] = Array.from(merged);
  }

  item.worker.location = { ...raw }; // 반응성 유지
  alert("저장되었습니다!");
  console.log(Object.keys(item.worker.location));
  console.log(typeof Object.keys(item.worker.location));
}

const selectedBank = ref("");

const selectedPeriod = ref("month");

const banks = [
  "국민은행",
  "신한은행",
  "우리은행",
  "하나은행",
  "농협은행",
  "기업은행",
  "카카오뱅크",
  "케이뱅크",
  "토스뱅크",
  "SC제일은행",
  "씨티은행",
  "수협은행",
  "부산은행",
  "대구은행",
  "광주은행",
  "전북은행",
  "제주은행",
];
</script>
<template>
  <div class="workerprofile">
    <div class="left">
      <img src="/prime/workeritsub.png" alt="기사프로필" />
      <p class="profile-h2">{{ item.worker.name }}님</p>
      <p class="profile-h3 review9">
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.05332 0.888123C7.23796 0.521005 7.76204 0.521005 7.94668 0.888123L9.70021 4.37458C9.7737 4.52069 9.914 4.62162 10.0759 4.64485L13.9823 5.20523C14.3952 5.26445 14.5584 5.77338 14.2568 6.06159L11.443 8.75136C11.3224 8.86666 11.2672 9.03451 11.296 9.19887L11.9616 13.0075C12.0327 13.4148 11.6071 13.7275 11.2397 13.5379L7.72932 11.7261C7.58546 11.6519 7.41455 11.6519 7.27068 11.7261L3.7603 13.5379C3.39294 13.7275 2.96728 13.4148 3.03844 13.0075L3.70404 9.19887C3.73276 9.03451 3.67761 8.86666 3.557 8.75136L0.743153 6.06159C0.441648 5.77338 0.604778 5.26445 1.01765 5.20523L4.9241 4.64485C5.086 4.62162 5.2263 4.52069 5.29979 4.37458L7.05332 0.888123Z"
            fill="#F99B23"
          />
        </svg>
        {{ item.worker.star }}
      </p>
      <hr />
      <div class="basic">
        <p class="profile-h3">
          기본 정보
          <button
            class="edit"
            @click="tab = 'basic'"
            :class="{ active: tab === 'basic' }"
          >
            수정
          </button>
        </p>
        <p class="profile-h4">
          <span>이&nbsp;&nbsp;&nbsp;&nbsp;름</span> {{ item.worker.name }}님
        </p>
        <p class="profile-h4"><span>연락처</span> {{ item.worker.mobile }}</p>
        <p class="profile-h4"><span>이메일</span> {{ item.worker.email }}</p>
        <p class="profile-h4">
          <span>성&nbsp;&nbsp;&nbsp;&nbsp;별</span>
          {{ (item.worker.gender = "male" ? "남성" : "여성") }}
        </p>
        <p class="profile-h4">
          <span>보건증</span>
          {{ (item.worker.health = true ? "제출 완료" : "미제출") }}
        </p>
      </div>
      <hr />
      <div class="location" v-if="item?.worker?.location">
        <p class="profile-h3">
          지역
          <button
            class="edit"
            @click="tab = 'location'"
            :class="{ active: tab === 'location' }"
          >
            수정
          </button>
        </p>

        <!-- 시/도 한 줄 -->
        <div class="sido-line">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10.9258 19.5C12.9297 16.9922 17.5 10.9141 17.5 7.5C17.5 3.35938 14.1406 0 10 0C5.85938 0 2.5 3.35938 2.5 7.5C2.5 10.9141 7.07031 16.9922 9.07422 19.5C9.55469 20.0977 10.4453 20.0977 10.9258 19.5ZM10 5C10.663 5 11.2989 5.26339 11.7678 5.73223C12.2366 6.20107 12.5 6.83696 12.5 7.5C12.5 8.16304 12.2366 8.79893 11.7678 9.26777C11.2989 9.73661 10.663 10 10 10C9.33696 10 8.70107 9.73661 8.23223 9.26777C7.76339 8.79893 7.5 8.16304 7.5 7.5C7.5 6.83696 7.76339 6.20107 8.23223 5.73223C8.70107 5.26339 9.33696 5 10 5Z"
              fill="#9E9E9E"
            />
          </svg>
          {{ Object.keys(item.worker.location || {}).join(", ") }}
        </div>

        <!-- 구/군 한 줄 -->
        <div class="gugun-line">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M11.25 3.125C11.25 2.43359 10.6914 1.875 10 1.875C9.30859 1.875 8.75 2.43359 8.75 3.125V8.75H3.125C2.43359 8.75 1.875 9.30859 1.875 10C1.875 10.6914 2.43359 11.25 3.125 11.25H8.75V16.875C8.75 17.5664 9.30859 18.125 10 18.125C10.6914 18.125 11.25 17.5664 11.25 16.875V11.25H16.875C17.5664 11.25 18.125 10.6914 18.125 10C18.125 9.30859 17.5664 8.75 16.875 8.75H11.25V3.125Z"
              fill="#9E9E9E"
            />
          </svg>
          {{
            Object.values(item.worker.location || {})
              .flat()
              .join(", ")
          }}
        </div>
      </div>

      <hr />
      <div class="account">
        <p class="profile-h3">
          정산 계좌 정보
          <button
            class="edit"
            @click="tab = 'account'"
            :class="{ active: tab === 'account' }"
          >
            수정
          </button>
        </p>
        <p class="profile-h4"><span>은행명</span> {{ item.worker.bank }}</p>
        <p class="profile-h4"><span>예금주</span> {{ item.worker.name }}</p>
        <p class="profile-h4">
          <span>계&nbsp;&nbsp;&nbsp;&nbsp;좌</span> {{ item.worker.account }}
        </p>
        <p class="profile-h4">
          <span>주&nbsp;&nbsp;&nbsp;&nbsp;기</span> {{ item.worker.during }}
        </p>
      </div>
      <hr />
    </div>
    <div class="right">
      <nav>
        <ul>
          <li @click="tab = 'review'" :class="{ active: tab === 'review' }">
            리뷰 확인
          </li>
          <li @click="tab = 'basic'" :class="{ active: tab === 'basic' }">
            기본 정보
          </li>
          <li @click="tab = 'location'" :class="{ active: tab === 'location' }">
            위치 정보
          </li>
          <li @click="tab = 'account'" :class="{ active: tab === 'account' }">
            정산 계좌 정보
          </li>
        </ul>
      </nav>
      <div class="reviewsection" v-show="tab === 'review'">
        <div class="top">
          <ul>
            <li>
              <p>고객 총 평점</p>
              <svg
                width="190"
                height="29"
                viewBox="0 0 190 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5533 0.888122C14.738 0.521004 15.262 0.521005 15.4467 0.888123L19.5177 8.98236C19.5912 9.12847 19.7315 9.22941 19.8934 9.25263L28.9823 10.5564C29.3952 10.6157 29.5584 11.1246 29.2568 11.4128L22.693 17.6872C22.5724 17.8025 22.5172 17.9704 22.546 18.1347L24.0966 27.0075C24.1677 27.4148 23.7421 27.7275 23.3747 27.5379L15.2293 23.3339C15.0855 23.2597 14.9145 23.2597 14.7707 23.3339L6.6253 27.5379C6.25794 27.7275 5.83228 27.4148 5.90344 27.0075L7.45404 18.1347C7.48276 17.9704 7.42761 17.8025 7.307 17.6872L0.743152 11.4128C0.441647 11.1246 0.604778 10.6157 1.01765 10.5564L10.1066 9.25263C10.2685 9.22941 10.4088 9.12847 10.4823 8.98236L14.5533 0.888122Z"
                  fill="#F99B23"
                />
                <path
                  d="M54.5533 0.888122C54.738 0.521004 55.262 0.521005 55.4467 0.888123L59.5177 8.98236C59.5912 9.12847 59.7315 9.22941 59.8934 9.25263L68.9823 10.5564C69.3952 10.6157 69.5584 11.1246 69.2568 11.4128L62.693 17.6872C62.5724 17.8025 62.5172 17.9704 62.546 18.1347L64.0966 27.0075C64.1677 27.4148 63.7421 27.7275 63.3747 27.5379L55.2293 23.3339C55.0855 23.2597 54.9145 23.2597 54.7707 23.3339L46.6253 27.5379C46.2579 27.7275 45.8323 27.4148 45.9034 27.0075L47.454 18.1347C47.4828 17.9704 47.4276 17.8025 47.307 17.6872L40.7432 11.4128C40.4416 11.1246 40.6048 10.6157 41.0176 10.5564L50.1066 9.25263C50.2685 9.22941 50.4088 9.12847 50.4823 8.98236L54.5533 0.888122Z"
                  fill="#F99B23"
                />
                <path
                  d="M94.5533 0.888122C94.738 0.521004 95.262 0.521005 95.4467 0.888123L99.5177 8.98236C99.5912 9.12847 99.7315 9.22941 99.8934 9.25263L108.982 10.5564C109.395 10.6157 109.558 11.1246 109.257 11.4128L102.693 17.6872C102.572 17.8025 102.517 17.9704 102.546 18.1347L104.097 27.0075C104.168 27.4148 103.742 27.7275 103.375 27.5379L95.2293 23.3339C95.0855 23.2597 94.9145 23.2597 94.7707 23.3339L86.6253 27.5379C86.2579 27.7275 85.8323 27.4148 85.9034 27.0075L87.454 18.1347C87.4828 17.9704 87.4276 17.8025 87.307 17.6872L80.7432 11.4128C80.4416 11.1246 80.6048 10.6157 81.0176 10.5564L90.1066 9.25263C90.2685 9.22941 90.4088 9.12847 90.4823 8.98236L94.5533 0.888122Z"
                  fill="#F99B23"
                />
                <path
                  d="M134.553 0.888122C134.738 0.521004 135.262 0.521005 135.447 0.888123L139.518 8.98236C139.591 9.12847 139.732 9.22941 139.893 9.25263L148.982 10.5564C149.395 10.6157 149.558 11.1246 149.257 11.4128L142.693 17.6872C142.572 17.8025 142.517 17.9704 142.546 18.1347L144.097 27.0075C144.168 27.4148 143.742 27.7275 143.375 27.5379L135.229 23.3339C135.085 23.2597 134.915 23.2597 134.771 23.3339L126.625 27.5379C126.258 27.7275 125.832 27.4148 125.903 27.0075L127.454 18.1347C127.483 17.9704 127.428 17.8025 127.307 17.6872L120.743 11.4128C120.442 11.1246 120.605 10.6157 121.018 10.5564L130.107 9.25263C130.269 9.22941 130.409 9.12847 130.482 8.98236L134.553 0.888122Z"
                  fill="#F99B23"
                />
                <path
                  d="M174.787 1.26415C174.787 0.947965 175.213 0.846882 175.355 1.12935L179.371 9.11321C179.444 9.25932 179.584 9.36026 179.746 9.38348L188.982 10.7084C189.395 10.7676 189.558 11.2766 189.257 11.5648L182.587 17.941C182.466 18.0563 182.411 18.2241 182.439 18.3885L184.015 27.4051C184.086 27.8123 183.661 28.1251 183.293 27.9355L175.058 23.6849C174.891 23.5991 174.787 23.4277 174.787 23.2406V1.26415Z"
                  fill="#D9D9D9"
                />
                <path
                  d="M175.213 1.26415C175.213 0.947965 174.787 0.846882 174.645 1.12935L170.629 9.11321C170.556 9.25932 170.416 9.36026 170.254 9.38348L161.018 10.7084C160.605 10.7676 160.442 11.2766 160.743 11.5648L167.413 17.941C167.534 18.0563 167.589 18.2241 167.561 18.3885L165.985 27.4051C165.914 27.8123 166.339 28.1251 166.707 27.9355L174.942 23.6849C175.109 23.5991 175.213 23.4277 175.213 23.2406V1.26415Z"
                  fill="#F99B23"
                />
              </svg>
              <h2>4.5/5 <span>점</span></h2>
            </li>
            <li>
              <p>전체 리뷰 수</p>
              <svg
                width="42"
                height="31"
                viewBox="0 0 42 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29 0C36.1797 2.57703e-07 42 5.8203 42 13C42 20.1797 36.1797 26 29 26H25.124L21 31L16.876 26H13C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 2.57703e-07 13 0H29Z"
                  fill="#D9D9D9"
                />
                <circle cx="12.5" cy="13.5" r="2.5" fill="white" />
                <circle cx="21.5" cy="13.5" r="2.5" fill="white" />
                <circle cx="30.5" cy="13.5" r="2.5" fill="white" />
              </svg>
              <h2>9 <span>개</span></h2>
            </li>
            <li>
              <p>평점 비율</p>
              <ul>
                <li>
                  <span>친절해요</span
                  ><svg
                    width="360"
                    height="11"
                    viewBox="0 0 360 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 5.99805L354.999 5.01214"
                      stroke="#E0E0E0"
                      stroke-width="10"
                      stroke-linecap="round"
                    />
                    <path
                      d="M5 5.99805L284.999 5.20932"
                      stroke="#1456FD"
                      stroke-width="10"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span>4.11/5점</span>
                </li>
                <li>
                  <span>능숙해요</span
                  ><svg
                    width="360"
                    height="11"
                    viewBox="0 0 360 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 5.98438L354.999 4.99846"
                      stroke="#E0E0E0"
                      stroke-width="10"
                      stroke-linecap="round"
                    />
                    <path
                      d="M5 5.98438L304.999 5.13931"
                      stroke="#1456FD"
                      stroke-width="10"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span>4.56/5점</span>
                </li>
                <li>
                  <span>성실해요</span
                  ><svg
                    width="360"
                    height="12"
                    viewBox="0 0 360 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 6.9707L354.999 5.98479"
                      stroke="#E0E0E0"
                      stroke-width="10"
                      stroke-linecap="round"
                    />
                    <path
                      d="M5 6.9707L334.999 6.04113"
                      stroke="#1456FD"
                      stroke-width="10"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span>4.83/5점</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <ul>
            <li v-for="(review, idx) in paginatedReviews" :key="idx">
              <p>{{ review.name }}</p>
              <img :src="review.img" alt="별 이미지" />
              <p>{{ review.text }}</p>
            </li>
          </ul>

          <!-- 페이지네이션 -->
          <div class="pagination">
            <button @click="currentPage--" :disabled="currentPage === 1">
              이전
            </button>

            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="{ active: currentPage === page }"
            >
              {{ page }}
            </button>

            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
            >
              다음
            </button>
          </div>
        </div>
      </div>
      <div class="basicsection" v-show="tab === 'basic'">
        <form class="register-form">
          <div class="form-group">
            <label for="userid">아이디</label>
            <input type="text" id="userid" placeholder="아이디 입력" />
          </div>
          <hr />

          <div class="form-group">
            <label for="password">비밀번호</label>
            <div class="withsmall">
              <input
                type="password"
                id="password"
                placeholder="비밀번호 입력"
              />
              <small
                >※영문, 대소문자, 숫자, 특수문자 중 3개 이상을 조합하여 8자리
                이상 입력해 주세요.</small
              >
            </div>
          </div>
          <hr />

          <div class="form-group">
            <label for="businessotp">비밀번호 확인</label>
            <div class="withsmall">
              <input
                type="password"
                id="passwordConfirm"
                placeholder="비밀번호 재입력"
              />
              <small
                >※영문, 대소문자, 숫자, 특수문자 중 3개 이상을 조합하여 8자리
                이상 입력해 주세요.</small
              >
            </div>
          </div>
          <hr />

          <div class="form-group">
            <label for="name">이름</label>
            <input type="text" id="name" placeholder="이름 입력" />
          </div>
          <hr />

          <div class="form-group">
            <label for="phone">휴대폰 번호</label>
            <div class="inline-group">
              <input type="text" id="phone" placeholder="숫자만 입력" />
              <button v-on:click="dbcheck" type="button">중복확인</button>
            </div>
          </div>
          <hr />

          <div class="form-group">
            <label for="email">이메일</label>
            <div class="inline-group">
              <input type="email" id="email" placeholder="이메일 입력" />
              <button v-on:click="dbcheck" type="button">중복확인</button>
            </div>
          </div>
          <hr />
          <div class="form-group checkbox">
            <input type="checkbox" id="marketing" />
            <label for="marketing"> 개인 정보 수집 및 이용에 동의합니다. </label>
          </div>
          <hr style="color: #bdbdbd; height: 1px" />
          <div class="btnbox">
            <button class="cancel" v-on:click="cancelBtn">취소</button>
            <button class="fix" style="padding: 1% 2%" v-on:click="submitFix">
              저장
            </button>
          </div>
        </form>
      </div>
      <div class="locationsection" v-show="tab === 'location'">
        <h3>활동 지역 설정</h3>
        <div class="location-wrapper">
          <!-- 시/도 리스트 -->
          <div class="sido-column">
            <ul>
              <li
                v-for="sido in Object.keys(koreaLocations)"
                :key="sido"
                :class="{ active: selectedSido === sido }"
                @click="selectedSido = sido"
              >
                {{ sido }}
              </li>
            </ul>
          </div>
          <!-- 구/군 리스트 -->
          <div class="gugun-column" v-if="selectedSido">
            <h4>{{ selectedSido }} 전체 지역</h4>
            <div class="gugun-list">
              <label
                v-for="gugun in koreaLocations[selectedSido]"
                :key="gugun"
                class="gugun-item"
              >
                <input
                  type="checkbox"
                  :value="gugun"
                  :checked="selectedGugun[selectedSido]?.includes(gugun)"
                  @change="toggleGugun(selectedSido, gugun)"
                />
                {{ gugun }}
              </label>
            </div>
          </div>
        </div>
        <div class="selected-location-tags">
          <template v-for="(guguns, sido) in selectedGugun" :key="sido">
            <span
              v-if="guguns.length === koreaLocations[sido].length"
              class="location-tag"
            >
              {{ sido }}전체
              <button
                @click="
                  koreaLocations[sido].forEach((gugun) =>
                    toggleGugun(sido, gugun)
                  )
                "
              >
                ×
              </button>
            </span>
            <span
              v-else
              v-for="gugun in guguns"
              :key="`${sido}-${gugun}`"
              class="location-tag"
            >
              {{ sido }}>{{ gugun }}
              <button @click="toggleGugun(sido, gugun)">×</button>
            </span>
          </template>
        </div>

        <button class="fix" @click="saveLocation">저장</button>
      </div>

      <div class="accountsection" v-show="tab === 'account'">
        <form class="register-form">
          <div class="form-group">
            <label for="bank">은행 선택</label>
            <select v-model="selectedBank" id="bank">
              <option disabled value="">은행을 선택하세요</option>
              <option v-for="bank in banks" :key="bank" :value="bank">
                {{ bank }}
              </option>
            </select>
            <p v-if="selectedBank">{{ selectedBank }}</p>
          </div>
          <hr />

          <div class="form-group">
            <label for="password">예금주</label>
            <div class="withsmall">
              <input type="password" id="password" placeholder="예금주 입력" />
            </div>
          </div>
          <hr />

          <div class="form-group">
            <label for="businessotp">계좌번호</label>
            <div class="withsmall">
              <input
                type="password"
                id="passwordConfirm"
                placeholder="계좌번호 입력"
              />
            </div>
          </div>
          <hr />

          <div class="form-group">
            <label>정산 주기</label>
            <div class="radio-group">
              <input
                type="radio"
                name="period"
                id="week"
                value="week"
                v-model="selectedPeriod"
              />
              <label for="week">일주일</label>

              <input
                type="radio"
                name="period"
                id="month"
                value="month"
                v-model="selectedPeriod"
              />
              <label for="month">1개월</label>
            </div>
          </div>
          <hr />
          <hr />
          <div class="form-group checkbox">
            <input type="checkbox" id="marketing" />
            <label for="marketing">
              개인 정보 수집 및 이용에 동의합니다.
            </label>
          </div>
          <hr style="color: #bdbdbd; height: 1px" />
          <div class="btnbox">
            <button class="cancel" v-on:click="cancelBtn">취소</button>
            <button class="fix" style="padding: 1% 2%" v-on:click="submitFix">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style></style>
