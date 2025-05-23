<script setup>
import Navigation from "@/components/Navigation.vue";
import { computed, ref, watch } from "vue";
// 탭 정의
const tabs = [
  { id: "total", label: "전체" },
  { id: "reservation", label: "예약관련" },
  { id: "service", label: "서비스관련" },
  { id: "pay", label: "결제관련" },
  { id: "cr", label: "취소/환불" },
];

// 현재 선택된 카테고리
const selectedCategory = ref("total"); // 초기값
const openIndexes = ref([]); // 아코디언 열림 상태

watch(selectedCategory, () => {
  openIndexes.value = []; // 탭 바뀌면 닫기
});

// 아코디언 질문,답변 더미데이터
const accordionItems = [
  {
    question: "예약은 어떻게 해야 하나요?",
    answer:
      "홈페이지에서 예약하기 버튼을 클릭하여 예약 폼을 작성하시면 됩니다. 예약 시 희망 날짜와 시간을 선택할 수 있습니다.",
    category: "reservation",
  },
  {
    question: "예약 변경이 가능한가요?",
    answer: "예약일 24시간 전까지는 예약 변경이 가능합니다. 마이페이지에서 예약 내역을 확인하고 변경할 수 있습니다.",
    category: "reservation",
  },
  {
    question: "청소 소요 시간은 얼마나 걸리나요?",
    answer:
      "제빙기 종류에 따라 다르지만, 일반적으로 1-2시간 정도 소요됩니다. 심층 청소의 경우 2-3시간 정도 소요될 수 있습니다.",
    category: "service",
  },
  {
    question: "청소 후 얼음을 바로 사용할 수 있나요?",
    answer:
      "청소 후 1-2시간 정도 기다린 후 사용하시는 것을 권장합니다. 이는 청소제 잔여물이 완전히 제거되기 위한 시간입니다.",
    category: "service",
  },
  {
    question: "결제방법은 어떤 것이 있나요?",
    answer: "현장에서 현금 또는 카드로 결제하실 수 있습니다. 신용카드, 체크카드 모두 사용 가능합니다.",
    category: "pay",
  },
  {
    question: "영수증 발급이 가능한가요?",
    answer: "네, 현장에서 영수증을 발급해드립니다. 필요하시다면 이메일로도 발송 가능합니다.",
    category: "pay",
  },
  {
    question: "예약 취소시 환불 규정은 어떻게 되나요?",
    answer: "예약일 24시간 전까지는 전액 환불이 가능합니다. 24시간 이내 취소 시에는 취소 수수료가 발생할 수 있습니다.",
    category: "cr",
  },
  {
    question: "기사가 방문하지 않았을 경우 어떻게 해야 하나요?",
    answer: "기사가 예약 시간에 방문하지 않을 경우, 즉시 고객센터로 연락주시면 빠른 조치를 도와드리겠습니다.",
    category: "cr",
  },
];

// 아코디언 토글함수
function toggle(index) {
  openIndexes.value = openIndexes.value[0] === index ? [] : [index];
}
// 선택된 카테고리에 따라 필터링된 아이템
const filteredItems = computed(() =>
  selectedCategory.value === "total"
    ? accordionItems
    : accordionItems.filter((item) => item.category === selectedCategory.value)
);
</script>
<template>
  <Navigation />
  <div class="wrap">
    <div class="faq_inner">
      <!-- 탭 영역 -->
      <ul class="taps_wrap">
        <li v-for="tab in tabs" :key="tab.id">
          <input type="radio" :id="tab.id" name="tap" :value="tab.id" v-model="selectedCategory" />
          <label :for="tab.id">{{ tab.label }}</label>
        </li>
        <!-- 아코디언 출력 -->
      </ul>
      <div class="accordion">
        <div class="accordion_set" v-for="(item, index) in filteredItems" :key="index">
          <div class="accordion-item" :class="{ active: openIndexes[0] === index }" @click="toggle(index)">
            <div class="accordion-header">
              <span class="question">Q</span>
              <button class="accordion-title">{{ item.question }}</button>
            </div>
            <span class="arrow-icon"></span>
          </div>
          <div class="accordion-content" v-show="openIndexes[0] === index">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
      <div class="info_sec">
        <div class="call">고객센터<span>1688-0915</span></div>
        <div class="info_bottom">
          <ul class="time">
            <li>영업시간 : 평일 오전 10시 ~ 오후 6시 (주말 및 공휴일 휴무)</li>
            <li>영업시간 내 : 유선/채팅 실시간 상담 가능</li>
            <li>영업시간 외 : 채팅 문의 또는 상담 예약 가능</li>
          </ul>
          <button class="inquiry">문의하기</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
