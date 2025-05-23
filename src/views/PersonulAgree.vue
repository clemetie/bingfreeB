<template>
  <div class="agree_box max-w-[860px] mx-auto py-20 px-6 bg-white">
    <!-- 제목 -->
    <h2 class="text-3xl font-bold text-center text-neutral-800 mb-16">약관동의</h2>

    <!-- 단계 표시 -->
    <div class="flex justify-center">
      <div class="w-[695px] h-24 relative rounded-[100px]">
        <div
          class="left-[3px] top-[82px] absolute justify-start text-neutral-800 text-base font-semibold font-['Pretendard']">
          약관동의
        </div>
        <div
          class="left-[215px] top-[82px] absolute justify-start text-neutral-400 text-base font-semibold font-['Pretendard']">
          회원정보
        </div>
        <div
          class="left-[424px] top-[82px] absolute justify-start text-neutral-400 text-base font-semibold font-['Pretendard']">
          구독선택
        </div>
        <div
          class="left-[635px] top-[82px] absolute justify-start text-neutral-400 text-base font-semibold font-['Pretendard']">
          가입완료
        </div>
        <div
          class="w-36 h-0 left-[65px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>
        <div
          class="w-36 h-0 left-[275px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>
        <div
          class="w-36 h-0 left-[485px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>
        <div class="w-16 h-16 left-[210px] top-0 absolute rounded-[100px] border-2 border-blue-700"></div>
        <div
          class="left-[233px] top-[15px] absolute justify-start text-blue-700 text-3xl font-semibold font-['Pretendard']">
          2
        </div>
        <div class="w-16 h-16 left-[420px] top-0 absolute rounded-[100px] border-2 border-blue-700"></div>
        <div
          class="left-[443px] top-[15px] absolute justify-start text-blue-700 text-3xl font-semibold font-['Pretendard']">
          3
        </div>
        <div class="w-16 h-16 left-[630px] top-0 absolute rounded-[100px] border-2 border-blue-700"></div>
        <div
          class="left-[653px] top-[15px] absolute justify-start text-blue-700 text-3xl font-semibold font-['Pretendard']">
          4
        </div>
        <div class="w-16 h-16 left-0 top-0 absolute bg-blue-700 rounded-[100px]"></div>
        <div
          class="left-[26px] top-[15px] absolute justify-start text-white text-3xl font-semibold font-['Pretendard']">
          1
        </div>
      </div>
    </div>

    <!-- 안내 텍스트 -->
    <div class="mb-8 mt-[70px] text-neutral-400 text-base font-semibold space-y-1 px-5">
      <p>- 필수 약관에 동의하셔야 빙프리프라임 회원가입이 가능합니다.</p>
      <p>- 선택 약관에 동의하지 않으셔도 회원가입이 가능합니다.</p>
    </div>
    <!-- 네비게이션 -->
    <div
      @click.stop="toggleCheck(index)"
      v-for="(item, index) in terms"
      :key="index"
      class="big_box mb-4 border border-gray-300 rounded-md">
      <button
        @click="toggle(index)"
        class="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 hover:bg-gray-200 focus:outline-none">
        <!-- 체크 버튼 -->
        <div @click.stop="toggleCheck(index)" class="relative w-7 h-7 flex-shrink-0">
          <div
            v-if="!item.checked"
            class="w-5 h-5 rounded-full border border-neutral-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <img
            v-else
            class="w-7 h-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src="/prime/Personal_check_blue.png"
            alt="checked" />
        </div>

        <!-- 제목 -->
        <span class="flex-1 text-left text-xl font-semibold text-neutral-800">
          {{ item.title }}
        </span>

        <!-- 화살표 아이콘 -->
        <img
          :class="{ 'rotate-180': item.open }"
          class="w-6 h-6 text-gray-600 transition-transform duration-300 ml-2"
          src="/prime/Personal_agree_plus.png"
          alt="arrow" />
      </button>

      <!-- 약관 내용 -->
      <div v-show="item.open" class="px-4 py-3 text-base text-gray-700 bg-white border-t border-gray-300">
        <p>{{ item.content }}</p>
      </div>
    </div>

    <!-- 중간 안내 텍스트 -->
    <div class="mb-12 mt=[15px] text-neutral-400 text-base font-semibold space-y-1 px-5">
      <p>- 이벤트 수신 동의 시 빙프라임에서 제공하는 다양한 쿠폰 및 할인 이벤트 등을 받아보실 수 있습니다.</p>
      <p>
        - 결제, 예약 확인, 일정 안내 등 서비스 제공에 필수적인 거래 관련 정보는 정보 수신 동의 여부와 관계없이
        발송됩니다.
      </p>
      <p class="text-blue-600">- 마켓팅 정보 수신 동의시 첫 가입 쿠폰 5000원을 드립니다.</p>
    </div>

    <!-- 체크 항목들은 추후 여기에 동적으로 렌더링 -->

    <!-- 하단 안내 -->
    <div class="mb-8 text-center text-neutral-400 text-base font-semibold">
      <p>만 14세 미만 아동은 회원가입이 제한됩니다.</p>
      <p>본인은 만 14세 이상으로 개인정보 및 약관 동의 내용을 확인하였으며, 위 내용에 동의 합니다.</p>
    </div>

    <!-- 버튼 -->
    <!-- 버튼 -->
    <div class="flex justify-center mt-10">
      <router-link
        to="/BingprimeJoin"
        class="w-[430px] h-[60px] rounded-l-lg border border-neutral-400 bg-white text-neutral-400 hover:border-blue-600 hover:text-[#262626] flex items-center justify-center font-semibold transition-colors">
        이전
      </router-link>
      <button
        @click="handleNext"
        class="w-[430px] h-[60px] rounded-r-lg border border-transparent bg-blue-600 text-white hover:border-blue-600 hover:bg-white hover:text-[#262626] flex items-center justify-center font-semibold transition-colors">
        다음
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

function handleNext() {
  // title에 '(필수)'가 포함된 항목만 필터링
  const requiredTerms = terms.value.filter((term) => term.title.includes("(필수)"));
  const allChecked = requiredTerms.every((term) => term.checked);

  if (!allChecked) {
    alert("필수 약관에 모두 동의하셔야 다음 단계로 진행할 수 있습니다.");
    return;
  }

  router.push("/PersonalJoin");
}
import { ref } from "vue";

const terms = ref([
  {
    title: "전체 약관동의",
    content:
      "서비스 이용약관, 개인정보 수집 및 이용, 제3자 제공, 구독 서비스 약관, 위치정보 및 주소 정보 활용에 모두 동의합니다. 또한, 선택 항목인 청소 일정 알림 및 이벤트 정보 수신에도 동의합니다.",
    open: false,
    checked: false,
  },
  {
    title: "서비스 이용약관 동의 (필수)",
    content:
      "본 약관은 제빙기 청소 예약 서비스 이용에 관한 기본적인 조건을 규정합니다. 이용자의 권리 및 의무, 서비스 제공 범위, 예약 변경 및 취소 규정 등이 포함되어 있으며, 서비스 이용 시 반드시 숙지하셔야 합니다.",
    open: false,
    checked: false,
  },
  {
    title: "개인정보 수집 및 이용 동의 (필수)",
    content:
      "고객 식별 및 서비스 제공을 위해 이름, 연락처, 주소 등 최소한의 개인정보를 수집합니다. 수집된 정보는 예약 처리와 고객 응대를 위해 사용되며, 관련 법령에 따라 안전하게 보호됩니다. 동의하지 않으실 경우 서비스 이용이 제한될 수 있습니다.",
    open: false,
    checked: false,
  },
  {
    title: "개인정보 제3자 제공 동의 (필수)",
    content:
      "청소 기사에게 고객의 이름, 연락처, 주소를 제공할 수 있습니다. 제공된 정보는 오직 서비스 수행 목적에 한해 사용되며, 관계 법령에 따라 안전하게 처리됩니다. 동의하지 않으실 경우 서비스 이용이 제한될 수 있습니다.",
    open: false,
    checked: false,
  },
  {
    title: "청소 예약 및 구독 서비스 약관 동의 (필수)",
    content:
      "구독 서비스 이용 시 요금제, 자동결제, 예약 주기, 해지 및 환불 조건 등이 적용됩니다. 반복 예약 및 자동 청구가 이루어지며, 구독 약관을 충분히 이해하고 동의하셔야 합니다.",
    open: false,
    checked: false,
  },
  {
    title: "위치 및 주소 정보 활용 동의 (필수)",
    content:
      "정확한 예약 및 기사 배정을 위해 위치 및 주소 정보를 수집·활용합니다. 수집된 정보는 서비스 제공 목적에 한해 사용되며, 외부에 공유되지 않고 관련 법령에 따라 보호됩니다.",
    open: false,
    checked: false,
  },
  {
    title: "청소 예정일 및 이벤트 정보 수신 동의 (선택)",
    content:
      "청소 예정일 알림, 할인 쿠폰, 프로모션 및 이벤트 안내를 문자 또는 이메일로 제공받습니다. 본 동의는 선택 사항이며, 거부하셔도 서비스 이용에는 제한이 없습니다.",
    open: false,
    checked: false,
  },
]);

function toggle(index) {
  terms.value[index].open = !terms.value[index].open;
}

// 전체 약관동의 체크/해제 시 모든 항목 적용
function toggleCheck(index) {
  const current = terms.value[index];
  current.checked = !current.checked;

  if (index === 0) {
    // 전체 약관동의 체크하면 나머지 전부 동기화
    for (let i = 1; i < terms.value.length; i++) {
      terms.value[i].checked = current.checked;
    }
  } else {
    // 개별 체크 해제 시 전체 체크도 해제
    if (!current.checked) {
      terms.value[0].checked = false;
    } else {
      // 모든 개별 항목이 체크되었을 때만 전체 체크 true
      const allChecked = terms.value.slice(1).every((term) => term.checked);
      terms.value[0].checked = allChecked;
    }
  }
}
</script>

<style scoped>

/* 토글 아이콘 회전 애니메이션은 SVG transform 속성으로 구현했습니다. */
</style>
