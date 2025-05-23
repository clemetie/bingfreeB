<script setup>
import Navigation from "@/components/Navigation.vue";
import { useRouter } from "vue-router";
const router = useRouter();
// '구독' 버튼 클릭시 '예약하기'로 이동
const goToReservation = () => {
  router.push("/BingprimeReservation"); // 라우터에 등록된 경로 그대로
};
// 오른쪽 사이드 고탑기능
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
// 구독 버튼 클릭시 alert창 띄우기
function issueCoupon() {
  alert("쿠폰이 발급됐습니다!💌");
}

// 버튼 위치조정
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  const button = document.querySelector(".prime-button");
  const section2 = document.querySelector(".prime-section2");

  const handleScroll = () => {
    if (!button || !section2) return;

    const section2Rect = section2.getBoundingClientRect();
    const section2Bottom = section2Rect.bottom + window.scrollY;
    const scrollY = window.scrollY;
    const buttonHeight = button.offsetHeight;

    // 구독 버튼이 section2 하단 넘지 않게 처리
    const maxScroll = section2Bottom - buttonHeight;

    if (scrollY + window.innerHeight >= section2Bottom) {
      button.style.position = "absolute";
      button.style.top = `${section2Bottom - buttonHeight}px`;
      button.style.left = "0";
      button.style.right = "0";
    } else {
      button.style.position = "fixed";
      button.style.bottom = "0";
      button.style.left = "0";
      button.style.right = "0";
      button.style.top = "auto";
    }
  };

  window.addEventListener("scroll", handleScroll);

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});
</script>
<template>
  <Navigation />
  <!-- 오른쪽 사이드 (예약, 챗봇 등) -->
  <div class="side">
    <div class="goTop main-icon-drop" @click="scrollToTop">↑</div>
  </div>
  <!-- 빙프라임 메인 -->
  <div class="prime-wrap" style="margin-top: 80px">
    <div class="prime-inner">
      <!-- 상세페이지 1 -->
      <div class="prime-section1">
        <img src="/prime/prime_img.png" alt="prime-img" />
      </div>
      <!-- 상세페이지 2 -->
      <div class="prime-section2">
        <div class="prime-section2-img">
          <!-- 배경 -->
          <img src="/prime/prime_img2.png" alt="prime-img2" />
          <div class="prime-section2-coupon">
            <!-- 쿠폰1 -->
            <button class="prime-section2-coupon1" @click="issueCoupon">
              <img src="/prime/prime_img2-1.png" alt="쿠폰1" />
            </button>
            <!-- 쿠폰2 -->
            <button class="prime-section2-coupon2" @click="issueCoupon">
              <img src="/prime/prime_img2-2.png" alt="쿠폰2" />
            </button>
          </div>
        </div>
      </div>
      <!-- '구독하기' 버튼 클릭시 빙프라임 '예약하기'로 이동 -->
      <button class="prime-button" @click="goToReservation">
        <div class="prime-button-txt">지금 바로 구독하기</div>
        <img src="/prime/prime_icon.png" alt="prime-icon" class="move-icon" />
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.prime-section2 {
  padding-bottom: 85px; // 버튼 높이만큼
  background-color: #000;
  height: auto;
  display: block;
}
// section2 쿠폰 위치 조정
.prime-section2-img {
  height: auto;
  display: block;
  position: relative;
  width: 100%;
  max-width: 1920px; // 정중앙 정렬 기준
  margin: 0 auto;

  img {
    width: 100%;
    display: block;
  }
  .prime-section2-coupon {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    flex-direction: column; // 세로 정렬
    align-items: center; // 가운데 정렬
    gap: 30px; // 쿠폰1, 쿠폰2 사이 간격
  }
}

// 구독하기 버튼
.prime-button {
  position: fixed; // ← 화면에 고정!
  bottom: 0; // ← 하단에 붙이기
  left: 0;
  width: 100%;
  z-index: 1000; // 다른 요소보다 위에 오도록
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--bingprime-point, #e9ff54);
  height: 85px;

  .prime-button-txt {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 28px;
    font-weight: 700;
    display: block;
  }

  img {
    display: block;
    width: 30px;
    height: 30px;
  }
}
// 구독하기 버튼 애니메이션 효과
.move-icon {
  animation: moveLeftRight 0.5s ease-in-out infinite alternate;
}

@keyframes moveLeftRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(10px); // 10px만큼 오른쪽 이동
  }
}
// 고탑 수정
.side .goTop {
  margin-bottom: 120%;
  cursor: pointer;
  width: 80px;
  line-height: 80px;
  background-color: #1456fd;
  color: #fff;
  text-align: center;
  border-radius: 50%;
  float: right;
  font-size: 30px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5), inset -3px -1px 10px rgba(0, 0, 0, 0.2);
}
</style>
