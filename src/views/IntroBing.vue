<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { onMounted } from "vue";
import { onBeforeUnmount } from "vue";
import Header from "@/components/Header.vue";

const introbingTab = ref("care");

function selectTab(tab) {
  introbingTab.value = tab;
}

// vue router 연결 : 예약 페이지 이동
const router = useRouter();

function goToReservation() {
  router.push("/reservation");
}
// 제빙기 케어 필요한 이유 이미지
const careList = [
  { image: "/introbing/introsub/introcare/2-1.jpg", text: "얼음 안에 이물질이 들어가 있을 때" },
  { image: "/introbing/introsub/introcare/2-2.jpg", text: "얼음에서 이상한 냄새가 날 때" },
  { image: "/introbing/introsub/introcare/2-3.jpg", text: "완전 분해 청소 이력이 없거나, 관리 주기를 초과한 경우" },
];
const careList2 = [
  { image: "/introbing/introsub/introcare/cleaning/1.jpg", text: "제품 완전분해" },
  {
    image: "/introbing/introsub/introcare/cleaning/2.jpg",
    text: "전용 친환경 약품 세척제를 통한<br>부품 세척 & 본체 세척",
  },
  { image: "/introbing/introsub/introcare/cleaning/3.jpg", text: "고압스팀 살균세척" },
  { image: "/introbing/introsub/introcare/cleaning/4.jpg", text: "친환경 UV 살균소독<br>(살균 99.99% 인증 제품)" },
  { image: "/introbing/introsub/introcare/cleaning/5.jpg", text: "제품 조립" },
  { image: "/introbing/introsub/introcare/cleaning/6.jpg", text: "얼음 도출 여부 확인 및<br>테스트 작동 후 케어 종료" },
];
// 오른쪽 사이드 고탑기능
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  console.log("✅ 현재 섹션:", currentSection.value);
};

// 스크롤 애니메이션 대상 클래스를 기준으로 자동 처리
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.3 }
  );

  // 클래스 이름이 'observe-me'인 모든 요소에 observer 적용
  const elements = document.querySelectorAll(".observe-me");
  elements.forEach((el) => observer.observe(el));
});
// 반짝빛나는효과
let observer;

const handleIntersect = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
};

onMounted(() => {
  observer = new IntersectionObserver(handleIntersect, {
    threshold: 0.3, // 30% 이상 보일 때 애니메이션 적용
  });

  // 'focus-p' 클래스를 가진 모든 <p> 태그에 observer 적용
  const elements = document.querySelectorAll(".focus-p");
  elements.forEach((el) => observer.observe(el));
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>
<template>
  <Header/>
  <!-- 오른쪽 사이드 (예약, 챗봇 등) -->
  <div class="side">
      <div>
        <router-link
          to="/reservation"
          class="sideBtn reservBtn main-icon-drop compact"
        >
          <img src="/images/calendar_blue.png" alt="캘린더" />
          <span class="text">예약하기</span>
        </router-link>
      </div>
      <div class="sideBtn main-icon-drop compact">
        <img src="/images/chabot.png" alt="챗봇이미지" />
        <span class="text">챗봇&nbsp;&nbsp;</span>
      </div>

      <div class="goTop main-icon-drop compact" @click="scrollToTop">↑</div>
    </div>
  <div class="intro-wrap">
    <div class="intro-banner">
      <img src="/public/introbing/introsub/introbanner/1.jpg" alt="banner-img" />
      <div class="intro-banner-txtbox">
        <p class="intro-banner-txt1" style="font-size: 38px; color: #fff; font-weight: 600">
          청소와 신뢰가 최우선<br />제빙기 청소는 빙프리에서.
        </p>
        <p class="intro-banner-txt2" style="font-size: 23px; color: #fff; font-weight: 400">
          Trust Bingfree, which prioritizes cleanliness.
        </p>
      </div>
    </div>
    <div class="intro-top2">
      <p class="intro-top2-txt" style="font-size: 30px; color: #fff; font-weight: 600">
        손쉽게 관리하는 제빙기 청소, 지금 바로 상담 받아보세요!
      </p>
      <div class="intro-top2-bt">
        <button class="intro-top2-txt2" @click="goToReservation">간편 예약 신청</button>
      </div>
    </div>
    <!-- 탭 -->
    <nav>
      <ul class="introbing_tab">
        <li @click="selectTab('care')" :class="{ active: introbingTab === 'care' }">제빙기 케어</li>
        <li class="divider">|</li>
        <li @click="selectTab('bingfree')" :class="{ active: introbingTab === 'bingfree' }">빙프리란?</li>
      </ul>
    </nav>
    <main>
      <div class="intromain inner">
        <!-- 빙프리-제빙기 케어 서비스 영역 -->
        <div class="care-service-container" v-show="introbingTab === 'care'">
          <!-- txt,이미지 영역 -->
          <div class="care-service-box focus-p">
            <h2 style="color: #212121; font-weight: 800; font-size: 36px; line-height: 1.2">
              빙프리<br />
              제빙기 케어 서비스
            </h2>
            <p style="color: #1456fd; font-size: 18px; font-weight: bold">빙프리의 제빙기 케어 서비스는</p>
            <p style="color: #212121; font-size: 16px; font-weight: 500">
              제빙기 내부를 깨끗하게 세척하고 성능을 최적화하여 위생적인 얼음 생산을 보장합니다.<br />
              정기 관리로 불순물과 성능 저하를 예방하고, 제빙기 수명을 연장합니다.<br />
              신선한 얼음을 언제든지, 더욱 위생적으로 만드세요.
            </p>
          </div>
          <!-- 1.제빙기 케어는 왜 필요할까요? -->
          <div class="intro-section1">
            <div class="intro-section1-title observe-me">
              <p style="color: #1456fd; font-size: 45px; font-weight: 800" class="intro-section1-p1">1.</p>
              <p style="color: #212121; font-size: 36px; font-weight: 750" class="intro-section1-p2">
                제빙기 케어는 왜 필요할까요?
              </p>
              <p style="color: #1456fd; font-size: 18px; font-weight: bold" class="intro-section1-p3">
                직접 분해하기 어려운 오염된 내부까지 세부 분해하여 완벽하게 청소해드립니다.
              </p>
            </div>
            <div class="intro-section1-desc">
              <div class="intro-section1-desc1">
                <div class="desc1-img">
                  <img src="/public/introbing/introsub/introcare/1-1.jpg" alt="img1-1" />
                </div>
                <div class="desc1-txt observe-me">
                  <p style="color: #212121; font-size: 19px; font-weight: 800; line-height: 1.3">
                    제빙기 내부는 습한 환경으로 주기적인 관리가 필수입니다.
                  </p>
                  <p style="color: #9e9e9e; font-size: 15px; font-weight: 700">
                    물기가 남아있으면 곰팡이가 발생할 수 있습니다.<br />
                    초기에는 분홍색, 나중엔 검은색 곰팡이가 생기며,<br />
                    면역력이 약한 사람에게 폐혈증, 폐렴 등을 유발할 수 있습니다.
                  </p>
                </div>
              </div>
              <div class="intro-section1-desc2">
                <div class="desc2-img">
                  <img src="/public/introbing/introsub/introcare/1-2.jpg" alt="img1-2" />
                </div>
                <div class="desc1-txt observe-me">
                  <p style="color: #212121; font-size: 19px; font-weight: 800; line-height: 1.3">
                    냉각기 니켈은 관리하지 않으면 발암물질로 변질됩니다.
                  </p>
                  <p style="color: #9e9e9e; font-size: 15px; font-weight: 700">
                    제빙기 냉각기의 니켈 도금이 벗겨지며 그 가루가 수조에 담깁니다.<br />
                    니켈은 폐암 및 신장암을 유발할 수 있어 정기적인 관리가 필요합니다.<br />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="intro-section1-desc3">
            <div class="desc3-img">
              <img src="/public/introbing/introsub/introcare/1-3.png" alt="img1-3" />
            </div>
            <div class="desc1-txt observe-me">
              <p style="color: #212121; font-size: 19px; font-weight: 800; line-height: 1.3">
                2024년 작년 검사 건수 878건으로 증가…<br />
                6월 추가 검사 예고, 식용 얼음 위생관리 강화
              </p>
              <p style="color: #616161; font-size: 15px; font-weight: 750; margin-top: 5%">
                ❗ 식약처, 식용 얼음 검사 2배 확대
              </p>
              <p style="color: #9e9e9e; font-size: 15px; font-weight: 750; margin-top: 5%">
                ㆍ2023년 483건 → 2024년 878건으로 검사 건수 2배 이상 확대<br />
                ㆍ올해 2월에만 389건 검사 진행<br />
                ㆍ6월에도 추가 점검 예정<br />
              </p>
              <p style="color: #616161; font-size: 15px; font-weight: 750; margin-top: 5%">
                ⚠ 제빙기 얼음 위생 점검 강화
              </p>
              <p style="color: #9e9e9e; font-size: 15px; font-weight: 750; margin-top: 5%">
                ㆍ대상: 커피 전문점, 음식점 제빙기 얼음 <br />
                ㆍ검사 항목: 살모넬라균, 대장균, 세균수 → 부적합 판정<br />
              </p>
              <p style="color: #616161; font-size: 15px; font-weight: 750; margin-top: 5%">✅ 식약처 발표</p>
              <p style="color: #9e9e9e; font-size: 15px; font-weight: 750; margin-top: 5%">
                “소비 트렌드에 맞춘 선제적 관리로 <br />
                안심할 수 있는 먹거리 환경 조성하겠다”
              </p>
            </div>
          </div>
          <!-- 2.제빙기 케어가 필요한 시점은? -->
          <div class="intro-section1">
            <div class="intro-section1-title observe-me">
              <p style="color: #1456fd; font-size: 45px; font-weight: 800" class="intro-section1-p1">2.</p>
              <p style="color: #212121; font-size: 36px; font-weight: 750" class="intro-section1-p2">
                제빙기 케어가 필요한 시점은?
              </p>
              <p style="color: #1456fd; font-size: 18px; font-weight: bold" class="intro-section1-p3">
                평상시: 3개월에 한 번, 여름철: 1~2개월에 한 번 완전분해 케어가 필요합니다.
              </p>
            </div>
            <div class="care-section">
              <div class="care-item" v-for="(item, index) in careList" :key="index">
                <img :src="item.image" :alt="item.text" />
                <p class="focus-p">{{ item.text }}</p>
              </div>
            </div>
          </div>
          <!-- 3.제빙기 케어 진행 과정 -->
          <div class="intro-section1">
            <div class="intro-section1-title observe-me">
              <p style="color: #1456fd; font-size: 45px; font-weight: 800" class="intro-section1-p1">3.</p>
              <p style="color: #212121; font-size: 36px; font-weight: 750" class="intro-section1-p2">
                제빙기 케어 과정
              </p>
            </div>
            <div class="care-section2">
              <div class="care-item2" v-for="(item, index) in careList2" :key="index">
                <img :src="item.image" :alt="item.text" />
                <p class="focus-p" v-html="item.text"></p>
              </div>
            </div>
          </div>
          <!-- 4.제빙기 청소시 어떤 세제를 사용하시나요? -->
          <div class="intro-section1">
            <div class="intro-section1-title observe-me">
              <p style="color: #1456fd; font-size: 45px; font-weight: 800" class="intro-section1-p1">4.</p>
              <p style="color: #212121; font-size: 36px; font-weight: 750" class="intro-section1-p2">
                제빙기 청소시 어떤 세제를 사용하시나요?
              </p>
              <p style="color: #1456fd; font-size: 18px; font-weight: bold" class="intro-section1-p3">
                화학물질을 일체 사용하지 않은 특허받은 친환경 살균제를 사용합니다.
              </p>
            </div>
            <!-- <p style="color: #757575; font-size: 18px; font-weight: bold" class="intro-section1-p4 focus-p">
              사람과 자연 모두에게 안전할수 있도록 독일제 150년 전통 최고등급 친환경 세정제를 사용하고 있습니다.<br />
              우리의 소중한 환경을 보호하면서 동시에 완벽한 청결을 약속합니다.
            </p> -->
          </div>
          <div class="care-section3">
            <div class="care-section3-img">
              <div class="section3-img1">
                <img src="/public/introbing/introsub/introcare/3-2.png" alt="section3-img1" />
              </div>
              <div class="section3-img2">
                <img src="/public/introbing/introsub/introbingfree/5-2.jpg" alt="section3-img2" />
              </div>
            </div>
            <div class="care-section3-txt">
              <h2 style="font-size: 25px; font-weight: bold; color: #212121">빙프리만의 특허받은 친환경 살균제</h2>
              <p style="font-size: 16px; font-weight: bold; color: #8a8a8a">
                ㆍ화학물질을 일체 사용하지 않아 인체에 해롭지 않은 친환경 살균제<br />
                ㆍSARS-CoV-2(COVID-19) 바이러스 사멸 효능 시험 <br />
                &nbsp;&nbsp;&nbsp;(KCAV) - 약 99% 이상의 바이러스 사멸 효능 확인<br />
                ㆍ소비자 보호를 위한 미국 DHHS 소속 정부기관 <br />
                  &nbsp;&nbsp;FDA 등록 (등록번호 No. 74651-0001-1)<br />
                ㆍ고위험성 물질 205종 무검출 인증 (SGS)<br />
                ㆍ무색, 무취, 무독성(무독성 알칼리), 강력한 살균력
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bingfree-container inner" v-show="introbingTab === 'bingfree'">
        <div class="bingfree-certificate-section">
          <div class="bingfree-certificate">
          <p class="small-title1 observe-me" style="color: #1456fd; font-size: 15px; font-weight: 600">CERTIFICATE</p>
          <h2 style="color: #212121; font-size: 36px; font-weight: bold" class="observe-me">
            청소는 누구나 할 수 있지만,<br />
            위기관리 능력에 대한 경험과 신뢰는 아무나 가질 수 없습니다.
          </h2>
          <p style="color: #212121; font-size: 18px; font-weight: normal">
            검증된 기술, 믿을 수 있는 위생 관리 <br />
            국제 인증과 특허로 검증된 빙프리의 솔루션.<br />
            지속 가능한 청결, 지금 경험해보세요
          </p>
          <div class="certicate-section-img">
            <img src="/public/introbing/introsub/introbingfree/1-1.jpg" alt="img1" />
            <img src="/public/introbing/introsub/introbingfree/1-2.jpg" alt="img2" />
          </div>
          <p style="margin-bottom: 1%; color: #212121; font-size: 20px; font-weight: bold">
            품질경영시스템 (ISO 9001) / 환경경영시스템 (ISO 14001)
          </p>
          <p style="color: #212121; font-size: 18px; font-weight: normal">
            국제표준기구(ISO) 기술위원회에서 제정한 환경경영체제에 관한 국제 표준인 'ISO 14000 시리즈'중 <br />
            가장 중요하게 여겨지는 품질경영시스템과 환경경영 시스템을 인증받았습니다.
          </p>
        </div>
          <!-- 지금, 빙프리를 선택해야하는 이유? -->
          <div class="nowbingfree-section">
            <!-- 상단 -->
            <div class="nowbingfree-upper">
              <p class="small-title2 observe-me" style="color: #1456fd; font-size: 15px; font-weight: 600">
                NOW, BINGFREE
              </p>
              <h2 style="color: #212121; font-size: 40px; font-weight: bold" class="observe-me">
                지금, 빙프리를 선택해야 하는 이유?
              </h2>
            </div>
            <!-- 01.완벽한 클린케어 -->
            <div class="nowbingfree-section1">
              <div class="nowbingfree-section1-txt">
                <h3 style="color: #212121; font-weight: bold; line-height: 1.5; font-size: 28px" class="observe-me">
                  01.<br />완벽한 클린케어
                </h3>
                <p style="margin-top: 4%; color: #8a8a8a; font-weight: 400; line-height: 1.5; font-size: 18px">
                  눈으로 직접 확인하는 완전 분해 청소와<br />
                  <span style="color: #1456fd; font-weight: 500">전후 비교 리포트 제공</span>으로 위생 상태를 명확하게
                  체크할 수 있습니다.<br />
                  믿을 수 있는 <span style="color: #1456fd; font-weight: 500">철처한 살균 청소 인증</span>까지 함께
                  받아보세요.
                </p>
              </div>
              <div class="nowbingfree-section1-img">
                <div class="section1-img-before">
                  <img src="/public/introbing/introsub/introbingfree/2-1.jpg" alt="Before Image" />
                  <div class="section1-caption">제빙기 청소 전/Before</div>
                </div>
                <div class="section1-img-after">
                  <img src="/public/introbing/introsub/introbingfree/2-2.jpg" alt="After Image" />
                  <div class="section1-caption">제빙기 청소 후/After</div>
                </div>
              </div>
            </div>
            <!-- 02.손끝으로 간편 예약 -->
            <div class="nowbingfree-section2">
              <div class="nowbingfree-section2-img">
                <div class="section2-img1">
                  <img src="/public/introbing/introsub/introbingfree/3-5.jpg" alt="reser1 Image" />
                </div>
                <div class="section2-img2">
                  <img src="/public/introbing/introsub/introbingfree/3-6.jpg" alt="reser2 Image" />
                </div>
              </div>
              <div class="nowbingfree-section2-txt" style="margin-top: 5%">
                <h3 style="color: #212121; font-weight: bold; line-height: 1.5; font-size: 28px" class="observe-me">
                  02.<br />손끝으로 간편 예약
                </h3>
                <p style="margin-top: 4%; color: #8a8a8a; font-weight: 400; line-height: 1.5; font-size: 18px">
                  <span style="color: #1456fd; font-weight: 500">빙프리 어플 하나로</span> 예약, 일정 확인, 작업
                  사진까지<br />
                  <span style="color: #1456fd; font-weight: 500"> 간편하게 관리</span> 할 수 있어요.<br />
                  번거로운 전화 상담 없이, 누구나
                  <span style="color: #1456fd; font-weight: 500">손쉽게 청소 서비스를 이용</span>해요.
                </p>
              </div>
            </div>
            <!-- 03.시간의 제약 없는 24시간 케어 -->
            <div class="nowbingfree-section3">
              <div class="nowbingfree-section3-txt">
                <h3 class="observe-me" style="color: #212121; font-weight: bold; line-height: 1.5; font-size: 28px">
                  03.<br />시간의 제약 없는 24시간 케어
                </h3>
                <p style="margin-top: 4%; color: #8a8a8a; font-weight: 400; line-height: 1.5; font-size: 18px">
                  바쁜 일상 속에서도
                  <span style="color: #1456fd; font-weight: 500">원하는 시간에 맞춰 청소 서비스</span>를 받을 수
                  있습니다.<br />
                  혹시라도 만족스럽지 않다면<span style="color: #1456fd; font-weight: 500"> 24시간안에 재방문</span
                  >하여<br />
                  <span style="color: #1456fd; font-weight: 500">끝까지 책임지는 A/S 서비스</span>를 보장해드립니다.
                </p>
              </div>
              <div class="nowbingfree-section3-img">
                <div class="section3-img1">
                  <img src="/public/introbing/introsub/introbingfree/4-1.jpg" alt="4-1Image" />
                </div>
                <div class="section3-img2">
                  <img src="/public/introbing/introsub/introbingfree/4-2.jpg" alt="4-2Image" />
                </div>
              </div>
            </div>
            <!-- 04.똑똑한 구독 서비스 -->
            <div class="nowbingfree-section4">
              <div class="nowbingfree-section4-img">
                <div class="section4-img1">
                  <img src="/public/introbing/introsub/introbingfree/5-1.png" alt="5-1Image" />
                </div>
                <div class="section4-img2">
                  <img src="/public/introbing/introsub/introbingfree/5-2.jpg" alt="5-2Image" />
                </div>
              </div>
              <div class="nowbingfree-section4-txt">
                <h3 class="observe-me" style="color: #212121; font-weight: bold; line-height: 1.5; font-size: 28px">
                  04.<br />똑똑한 구독 서비스
                </h3>
                <p style="margin-top: 4%; color: #8a8a8a; font-weight: 400; line-height: 1.5; font-size: 18px">
                  <span style="color: #1456fd; font-weight: 500">정기적인 구독</span>으로<span
                    style="color: #1456fd; font-weight: 500">
                    관리 비용을 줄이고, 체계적인 위생 관리</span
                  >를<br />
                  받을 수 있습니다.
                  <span style="color: #1456fd; font-weight: 500">빙프리 자체제작 친환경 인증 세제</span>와<br />
                  <span style="color: #1456fd; font-weight: 500">빙프라임 마크</span>를 함께
                  <span style="color: #1456fd; font-weight: 500">제공</span>합니다.
                </p>
              </div>
            </div>
         
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped></style>
