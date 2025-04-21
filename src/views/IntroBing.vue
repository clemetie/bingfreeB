<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { onMounted } from "vue";
import { onBeforeUnmount } from "vue";

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
  { image: "/introbing/introsub/introcare/2-3.jpg", text: "완전분해 케어를 받아보지 않았거나 케어 시점이 도래했을 때" },
];
const careList2 = [
  { image: "/introbing/introsub/introcare/cleaning/1.jpg", text: "제품안전 분해" },
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
  <!-- 오른쪽 사이드 (예약, 챗봇 등) -->
  <div class="side">
    <div>
      <router-link
        to="/reservation"
        class="sideBtn reservBtn main-icon-drop"
        :class="{ compact: currentSection !== 'visual' }">
        <img src="/images/calendar_blue.png" alt="캘린더" />
        <span class="text">예약하기</span>
      </router-link>
    </div>
    <div class="sideBtn main-icon-drop" :class="{ compact: currentSection !== 'visual' }">
      <img src="/images/chabot.png" alt="챗봇이미지" :class="{ compact: currentSection !== 'visual' }" />
      <span class="text">챗봇&nbsp;&nbsp;</span>
    </div>

    <div class="goTop main-icon-drop" @click="scrollToTop">↑</div>
  </div>
  <div class="intro-wrap">
    <div class="intro-banner" style="margin-top: 80px">
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
              빙프리만의 <br />
              제빙기 케어 서비스
            </h2>
            <p style="color: #1456fd; font-size: 18px; font-weight: bold">빙프리의 제빙기 케어 서비스는</p>
            <p style="color: #212121; font-size: 16px; font-weight: 500">
              제빙기 내부의 오염물과 세균을 깨끗이 제거하고, 최적의 성능을 유지하여 위생적인 얼음 생산 환경을
              제공합니다.<br />
              잔여물과 불순물로 인한 위생 문제와 성능 저하를 예방해 언제나 신선한 얼음을 만드실 수 있도록 돕습니다.<br />
              정기적인 관리로 얼음의 위생 수준을 높이는 것은 물론, 부품 마모와 고장을 방지해 제빙기의 수명을
              연장합니다.<br />
            </p>
          </div>
          <!-- 1.제빙기 케어는 왜 필요할까요? -->
          <div class="intro-section1">
            <div class="intro-section1-title observe-me">
              <p style="color: #1456fd; font-size: 45px; font-weight: 800" class="intro-section1-p1">1.</p>
              <p style="color: #212121; font-size: 36px; font-weight: 750" class="intro-section1-p2">
                제빙기 케어는 왜 필요할까요?
              </p>
              <p style="color: #757575; font-size: 18px; font-weight: bold" class="intro-section1-p3">
                빙프리는 오염된 내부를 세부분해하여 완벽하게 청소해 드리겠습니다.
              </p>
            </div>
            <div class="intro-section1-desc">
              <div class="intro-section1-desc1">
                <div class="desc1-img">
                  <img src="/public/introbing/introsub/introcare/1-1.jpg" alt="img1-1" />
                </div>
                <div class="desc1-txt observe-me">
                  <p style="color: #212121; font-size: 19px; font-weight: 800; line-height: 1.3">
                    제빙기의 내부는 항상 습한 환경에 있기 때문에<br />
                    반드시 주기적인 관리가 필요합니다.
                  </p>
                  <p style="color: #495861; font-size: 15px; font-weight: 750">
                    제빙기 내부는 항상 물기를 머금고 있기 때문에 자주 닦고 말려주지 않으면 습한 환경 때문에<br />
                    곰팡이가 서식하게 됩니다. 처음에는 분홍색 곰팡이, 더 심해지면 검은색 곰팡이가 생기게<br />
                    되는데, 이러한 곰팡이는 면역력이 약한 사람에게 폐혈증, 폐렴, 수막염 등을 유발할 수 있습니다.
                  </p>
                </div>
              </div>
              <div class="intro-section1-desc2">
                <div class="desc2-img">
                  <img src="/public/introbing/introsub/introcare/1-2.jpg" alt="img1-2" />
                </div>
                <div class="desc1-txt observe-me">
                  <p style="color: #212121; font-size: 19px; font-weight: 800; line-height: 1.3">
                    얼음을 얼리는 냉각기 성분인 니켈은<br />
                    관리를 하지 않으면 발암물질로 변질될 수 있습니다.
                  </p>
                  <p style="color: #495861; font-size: 15px; font-weight: 750">
                    제빙기의 냉각기는 니켈로 도금되어 있는데 주기적인 청소를 하지 않으면 니켈 도금이 조금씩<br />
                    벗겨지면서 그 가루가 수조에 담기게 됩니다. 니켈은 발암물질로 분류되고 있으며, 폐암 및<br />
                    신장암을 유발하는 물질로 잘 알려져 있기 때문에 각별한 관리가 필요합니다.
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
              <p style="color: #495861; font-size: 15px; font-weight: 750; margin-top: 5%">
                식품의약품안전처가 식용얼음의 위생 관리를 강화하기 위해 지난해부터 검사 건수를 2배 이상<br />
                확대해 운영하고 있다고 19일 밝혔다. 식약처에 따르면, 2023년 483건이던 검사 건수는<br />
                2024년 878건으로 증가했으며, 올해 2월에만 389건의 검사를 진행했다.<br />
                추가적인 점검은 오는 6월에도 실시될 예정이다. 이번 검사에서는 커피 전문점, 음식점 등<br />
                식품 접객업소에서 사용하는 제빙기 얼음을 대상으로 식중독균(살모넬라), 대장균, 세균수 기준을<br />
                점검했으며, 2건이 부적합 판정을 받았다.<br />
                식약처는 “식품 소비 트렌드 변화에 맞춰 선제적으로 안전 관리를 강화해 국민이 안심하고 먹을<br />
                수 있는 환경을 조성해 나가겠다” 고 밝혔다.<br />
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
              <p style="color: #757575; font-size: 18px; font-weight: bold" class="intro-section1-p3">
                평상시에는 3개월에 한번 여름철에는 최소 1~2개월에 한번 완전분해 케어가 필요합니다.
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
            </div>
            <p style="color: #757575; font-size: 18px; font-weight: bold" class="intro-section1-p4 focus-p">
              사람과 자연 모두에게 안전할수 있도록 독일제 150년 전통 최고등급 친환경 세정제를 사용하고 있습니다.<br />
              우리의 소중한 환경을 보호하면서 동시에 완벽한 청결을 약속합니다.
            </p>
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
          <p class="small-title1 observe-me" style="color: #1456fd; font-size: 18px; font-weight: 600">CERTIFICATE</p>
          <h2 style="color: #212121; font-size: 36px; font-weight: bold" class="observe-me">
            청소는 누구나 할 수 있지만,<br />
            위기관리 능력에 대한 경험과 신뢰는 아무나 가질 수 없습니다.
          </h2>
          <p style="color: #212121; font-size: 18px; font-weight: normal">
            빙프리는 각종 국제 인증 및 특허를 통해 검증된 전문성을 바탕으로 지속 가능한 위생 관리 솔루션을
            제공합니다.<br />
            경영 혁신과 품질 향상을 위해 끊임없이 연구하며, 최상의 서비스로 신뢰를 쌓아갑니다.
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
          <!-- 지금, 빙프리를 선택해야하는 이유? -->
          <div class="nowbingfree-section">
            <!-- 상단 -->
            <div class="nowbingfree-upper">
              <p class="small-title2 observe-me" style="color: #1456fd; font-size: 18px; font-weight: 600">
                NOW, BINGFREE
              </p>
              <h2 style="color: #212121; font-size: 36px; font-weight: bold" class="observe-me">
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
                  <span style="color: #1456fd; font-weight: 500">빙프리 어플 하나로</span>예약, 일정 확인, 작업
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
                <h3 class="observe-me" style="color: #212121; font-weight: bold; line-height: 1.5; font-size: 28px" >
                  03.<br />시간의 제약 없는 24시간 케어
                </h3>
                <p style="margin-top: 4%; color: #8a8a8a; font-weight: 400; line-height: 1.5; font-size: 18px">
                  바쁜 일상 속에서도<span style="color: #1456fd; font-weight: 500">원하는 시간에 맞춰 청소 서비스</span
                  >를 받을 수 있습니다.<br />
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
                    style="color: #1456fd; font-weight: 500"
                    >관리 비용을 줄이고, 체계적인 위생 관리</span
                  >를<br />
                  받을 수 있습니다.
                  <span style="color: #1456fd; font-weight: 500">빙프리 자체제작 친환경 인증 세제</span>와<br />
                  <span style="color: #1456fd; font-weight: 500">빙프라임 마크</span>를 함께<span
                    style="color: #1456fd; font-weight: 500"
                    >제공</span
                  >합니다.
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
