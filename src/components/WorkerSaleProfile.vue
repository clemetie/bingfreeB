<template>
  <div class="w-full max-w-6xl h-[453px] bg-white rounded-2xl shadow-md flex p-6 space-x-8 mx-auto">
    <!-- 좌측: 기사 프로필 -->
    <div class="w-1/3 flex flex-col items-center justify-center space-y-3 border-r border-gray-200 pr-4">
      <img src="/prime/workeritsub.png" alt="기사프로필" class="w-28 h-28 rounded-full object-cover" />
      <p class="text-2xl font-semibold">{{ worker.name }} 님</p>
      <div class="flex items-center text-base text-gray-600">
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
          <path d="M7.05332 0.888123C7.23796..." fill="#F99B23" />
        </svg>
        <span class="ml-1">{{ worker.star }}</span>
      </div>
      <p class="text-base text-gray-500">{{ worker.mobile }}</p>
      <p class="text-base text-gray-500">{{ worker.email }}</p>
      <p class="text-base text-gray-500">보건증: {{ worker.health ? '제출 완료' : '미제출' }}</p>
      <p class="text-base text-gray-500">
        지역: {{ Object.keys(worker.location).join(', ') }} /
        {{ Object.values(worker.location).flat().join(', ') }}
      </p>
    </div>

    <!-- 우측: 정산 관련 정보 -->
    <div class="w-2/3 flex flex-col justify-between text-base text-gray-700">
      <!-- 정산 정보 -->
      <div class="grid grid-cols-2 gap-y-3 gap-x-8">
        <div><span class="font-semibold">정산유형:</span> {{ worker.during }}</div>
        <div><span class="font-semibold">은행명:</span> {{ worker.bank }}</div>
        <div><span class="font-semibold">계좌번호:</span> {{ worker.account }}</div>
        <div><span class="font-semibold">예금주:</span> {{ worker.name }}</div>
      </div>

      <!-- 누적 정산 통계 -->
      <div class="mt-4">
        <h3 class="text-lg font-bold mb-2">누적 정산 통계</h3>
        <div class="grid grid-cols-3 gap-4">
          <div>총 청소 건수: <span class="font-semibold">{{ stats.totalCleans }}</span></div>
          <div>총 정산 횟수: <span class="font-semibold">{{ stats.totalSettlements }}</span></div>
          <div>총 정산 금액: <span class="font-semibold">{{ stats.totalAmount.toLocaleString() }}원</span></div>
          <div>총 보너스: <span class="font-semibold">{{ stats.totalBonus.toLocaleString() }}원</span></div>
          <div>총 수수료: <span class="font-semibold">{{ stats.totalFee.toLocaleString() }}원</span></div>
        </div>
      </div>

      <!-- 실시간 상태 통계 -->
      <div class="mt-4">
        <h3 class="text-lg font-bold mb-2">정산 진행 상태</h3>
        <div class="grid grid-cols-5 gap-2 text-center text-sm font-medium">
          <div class="bg-blue-100 p-3 rounded">
            전체<br /><span class="text-xl font-bold">{{ status.total }}</span>
          </div>
          <div class="bg-yellow-100 p-3 rounded">
            대기중<br /><span class="text-xl font-bold">{{ status.waiting }}</span>
          </div>
          <div class="bg-orange-100 p-3 rounded">
            진행중<br /><span class="text-xl font-bold">{{ status.inProgress }}</span>
          </div>
          <div class="bg-green-100 p-3 rounded">
            완료<br /><span class="text-xl font-bold">{{ status.completed }}</span>
          </div>
          <div class="bg-red-100 p-3 rounded">
            클레임<br /><span class="text-xl font-bold">{{ status.claim }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, toRaw, watch, reactive } from "vue";
import { fullReservationList, koreaLocations } from "@/data.mjs";
const item = fullReservationList[0];

const worker = reactive({
  name: '최수빈',
  mobile: '010-4074-1451',
  email: 'mrkim@bingfree.co.kr',
  gender: 'male',
  star: 4.8,
  bank: '국민은행',
  account: '563352-09-422616',
  during: '주간 정산(3개월)',
  health: true,
  location: {
    서울특별시: ['강남구', '마포구']
  }
});

const stats = reactive({
  totalCleans: 123,
  totalSettlements: 45,
  totalAmount: 1230000,
  totalBonus: 150000,
  totalFee: 50000
});

const status = reactive({
  total: 15,
  waiting: 5,
  inProgress: 0,
  completed: 5,
  claim: 5
});
const tab = reactive({
  value: "",
});

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
<style scoped lang="scss">
.chart-card {
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  padding: 24px;
  width: 100%;
  max-width: 838px;
  height: 453px;
}
.chart-card canvas {
  height: 92% !important;
  width: 80% !important;
  margin: auto;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .monthlyPayChart-h2 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .unit-label {
    font-size: 12px;
    color: #757575;
  }
}
</style>
