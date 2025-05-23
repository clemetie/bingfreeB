<script setup>
import { ref, onMounted, computed, nextTick, onBeforeUnmount } from "vue";
import { onUnmounted } from "vue";
import { useRouter } from "vue-router"; // ✅ 라우터 임포트 추가
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
// import Header from "@/components/Header.vue";
import Navigation from "@/components/Navigation.vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const router = useRouter(); // ✅ 라우터 인스턴스 초기화

// 상단 탭
const intropiceTab = ref("ordinary");
function selectTopTab(tab) {
  intropiceTab.value = tab;
}

// 오른쪽 사이드 고탑기능
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 스와이퍼 버튼
const currentSection = ref("visual");
const descriptions = ref([
  {
    title: "케어 에센셜",
    name: "스탠다드+",
    weight: "(50~100kg)",
    detail: {
      times: "6회",
      label: "소형 카페,식당 운영자라면?",
      beforeprice: "120,000",
      totalprice: "108,000",
    },
  },
  {
    title: "스마트 클린",
    name: "디럭스+",
    weight: "(100~200kg)",
    detail: {
      times: "8회",
      label: "보다 청결에 민감하다면?",
      beforeprice: "150,000",
      totalprice: "127,500",
    },
  },
  {
    title: "프리미엄 시그니처",
    name: "호시자키+",
    weight: "(250kg이상)",
    detail: {
      times: "12회",
      label: "프렌차이즈 브랜드 매장 운영자라면?",
      beforeprice: "210,000",
      totalprice: "168,000",
    },
  },
]);

const tabs = ["스탠다드", "스탠다드+", "디럭스", "프리미엄", "호시자키", "호시자키+"];
const selectedTab = ref("스탠다드");
const showBenefits = ref(false);

const pricePlans = {
  스탠다드: [
    { times: 6, pricePerUse: 89100, total: 534600 },
    { times: 8, pricePerUse: 84150, total: 673200 },
    { times: 12, pricePerUse: 158400, total: 950400 },
  ],
  "스탠다드+": [
    { times: 6, pricePerUse: 108000, total: 648000 },
    { times: 8, pricePerUse: 102000, total: 816000 },
    { times: 12, pricePerUse: 192000, total: 1152000 },
  ],
  디럭스: [
    { times: 6, pricePerUse: 135000, total: 810000 },
    { times: 8, pricePerUse: 127500, total: 1020000 },
    { times: 12, pricePerUse: 240000, total: 1440000 },
  ],
  프리미엄: [
    { times: 6, pricePerUse: 153000, total: 918000 },
    { times: 8, pricePerUse: 144500, total: 1156000 },
    { times: 12, pricePerUse: 272000, total: 1632000 },
  ],
  호시자키: [
    { times: 6, pricePerUse: 153000, total: 918000 },
    { times: 8, pricePerUse: 144500, total: 1156000 },
    { times: 12, pricePerUse: 272000, total: 1632000 },
  ],
  "호시자키+": [
    { times: 6, pricePerUse: 189000, total: 1134000 },
    { times: 8, pricePerUse: 178500, total: 1428000 },
    { times: 12, pricePerUse: 336000, total: 2016000 },
  ],
};

const ordinarys = ref([
  { title: "스탠다드", subtitle: "스탠다드", weight: "50kg 미만", totalprice: "99,000" },
  { title: "스탠다드", subtitle: "스탠다드+", weight: "50~100kg", totalprice: "120,000" },
  { title: "디럭스", subtitle: "", weight: "100~200kg", totalprice: "150,000" },
  { title: "프리미엄", subtitle: "", weight: "200kg 이상", totalprice: "170,000" },
  { title: "호시자키", subtitle: "호시자키", weight: "250kg 미만", totalprice: "170,000" },
  { title: "호시자키", subtitle: "호시자키+", weight: "250kg 이상", totalprice: "210,000" },
]);

const selectTab = (tab) => {
  selectedTab.value = tab;
  showBenefits.value = false;
};

const selectedPlan = ref(null);
const toggleBenefits = (plan) => {
  selectedPlan.value = plan;
  showBenefits.value = true;
  nextTick(() => {
    const benefitSection = document.querySelector(".plus_sale_list");
    benefitSection?.scrollIntoView({ behavior: "smooth" });
  });
};

const endValues = [6, 8, 12];
const benefitEndValues = [10, 15, 20];
const numberPairs = endValues.map((n, i) => [n, benefitEndValues[i]]);
const pair = computed(() => numberPairs[currentIndex.value]);

const currentIndex = ref(0);
const animate = ref(false);

onMounted(() => {
  currentIndex.value = 0;
  const interval = setInterval(() => {
    animate.value = false;
    setTimeout(() => {
      animate.value = true;
    }, 50);
    currentIndex.value++;
    if (currentIndex.value >= numberPairs.length) {
      currentIndex.value = 0;
    }
  }, 3000);
});

const imgSrc = ref("//check/check_banner_top.png");
const updateImageSrc = () => {
  if (window.matchMedia("(min-width: 390px) and (max-width: 767px)").matches) {
    imgSrc.value = "/check/check_banner_mobile.png";
  } else if (window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches) {
    imgSrc.value = "/check/check_banner_tablet.dc.png";
  } else {
    imgSrc.value = "/check/check_banner_top.png";
  }
};

onMounted(() => {
  updateImageSrc();
  window.addEventListener("resize", updateImageSrc);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateImageSrc);
});

const handleBottomButtonClick = () => {
  if (showBenefits.value) {
    router.push("/reservation"); // ✅ 버튼 클릭 시 라우터 이동
  } else {
    if (!selectedPlan.value) return;
    showBenefits.value = true;
    nextTick(() => {
      const section = document.querySelector(".plus_sale_list");
      section?.scrollIntoView({ behavior: "smooth" });
    });
  }
};

const isAutoplayActive = ref(false);
const swiperKey = ref(0);

const checkMediaQuery = () => {
  const mq = window.matchMedia("(min-width: 390px) and (max-width: 767px)");
  isAutoplayActive.value = mq.matches;
  swiperKey.value++;
};

onMounted(() => {
  checkMediaQuery();
  window.addEventListener("resize", checkMediaQuery);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMediaQuery);
});
</script>
<template>
  <Navigation />
  <div class="sbf-wrap" style="margin-top: 80px">
    <!-- 숫자 표현 섹션 -->
    <div class="Top_number_section">
      <!-- 이벤트 안 텍스트  -->
      <div class="Top_number_text_content">
        <p class="num_first">2025 빙프라임 플러스</p>
        <p class="num_second">많이 쓸수록, 더 커지는 혜택!</p>
        <p class="num_third">BingPrime Plus</p>
      </div>
      <!-- 숫자 박스 -->
      <div class="numbering_box">
        <ul class="number_ul">
          <li v-for="(pair, index) in numberPairs" :key="index" v-show="currentIndex === index">
            <div class="lt">
              <em>구독권</em>
              <div class="lt_second_Sec">
                <div class="numbering">
                  <div class="n_wrap">
                    <transition-group name="numbering" tag="div">
                      <span class="n_list_sub" :key="pair[0]" :class="{ animate: animate }">{{ pair[0] + "회" }}</span>
                    </transition-group>
                  </div>
                </div>
                <div class="ar_wrap">
                  <img
                    src="https://mall.cowaystatic.com/static/front/resources/web/images/event/package/2503/numbering_arrow.png"
                    class="load_img" />
                </div>
              </div>

              <p class="fixp">구독시</p>
            </div>
          </li>
          <li v-for="(pair, index) in numberPairs" :key="index" v-show="currentIndex === index">
            <div class="rt">
              <em>혜택</em>
              <div class="b_txt"><b>최대20%</b></div>
              <div class="numbering">
                <div class="n_wrap">
                  <transition-group name="numbering" tag="div">
                    <span class="n_list_sub" :class="{ animate: animate }">{{ pair[1] + `%` }}</span>
                  </transition-group>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--top3 요금제 카드  -->

    <div class="inner">
      <p class="top3_p">빙프라임+ 구독요금제&nbsp; <span>TOP3</span></p>
      <div class="top3_card_content">
        <div class="top3_card_list" v-for="(description, index) in descriptions" :key="index">
          <!-- 요금제 제목 -->
          <p class="price_title">{{ description.title }}</p>

          <!-- 요금제 상세 -->
          <p class="price_weight">
            <span>{{ description.name }}</span>
            <span>{{ description.weight }}</span>
          </p>

          <!-- 상세 안내 텍스트 -->
          <div class="description">
            <!-- 구독 횟수 -->
            <p>
              <span><img src="/public/check/price_tag.png" alt="태그아이콘" /></span>
              <span>
                <strong>{{ description.detail.times }}</strong
                >&nbsp구독
              </span>
            </p>
            <!-- 서비스 내용 -->
            <p>
              <span><img src="/public/check/price_description_tag.png" alt="price아이콘" /></span
              ><span>무료진단 서비스 1회 , 자사몰 클리너 증정</span>
            </p>
            <!-- 맞춤 질문 -->
            <p>
              <span><img src="/public/check/price_description_tag.png" alt="price아이콘" /></span
              ><span>{{ description.detail.label }}</span>
            </p>
          </div>

          <!-- 가격 내용 -->
          <p class="entire_price">
            <span class="before-price">회당&nbsp;{{ description.detail.beforeprice }}원</span>
            <span class="total-price">{{ description.detail.totalprice }}원</span>
          </p>

          <!-- 버튼 -->
          <div class="buttons">
            <button>상세보기</button>
            <router-link to="/reservation"><button>가입하기</button></router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- top event 요금제 섹션 -->
    <div class="top3_price_section">
      <!-- 텍스트 부분 -->
      <!-- ////////////////////////////////////////////////////// -->
      <!-- 일반 요금제 설명 -->
      <div
        class="ordinary_text_content ordinary_right"
        data-aos="fade-left"
        data-aos-duration="1500"
        style="margin-left: 41%">
        <div class="text_box">
          <p>요금안내</p>
          <p>깨끗한 얼음, 완벽한 시작! 빙프리와 함께하세요!</p>
          <p>프랜차이즈 카페·식당 사장님을 위한 스마트한 선택, 제빙기 구독 관리 서비스!</p>
          <p>
            구독 시 제빙기 검사 무료 + 전용 세제 무상 제공 + 세균 시트지까지!
            <br />
            2년 연장 시 추가 5% 할인, 일반 요금제 대비 최대 210,000원 절약!
            <br />
            <span>요금안내참조</span>
          </p>
        </div>
      </div>
      <!--  호시 자키에 대한 설명 -->
      <div
        class="ordinary_text_content ordinary_left"
        style="margin-right: 32%"
        data-aos="fade-right"
        data-aos-duration="1500">
        <div class="text_box">
          <p>호시자키 모델도 문제없이!</p>
          <p>
            분해 난이도가 높은 호시자키 제빙기,<br />
            <strong>빙프리에서는 추가요금 없이</strong> 구독 요금제로 이용할 수 있습니다.
          </p>
          <p>
            복잡한 구조 때문에 타사에서는 추가 비용이 발생하는 경우가 많지만,<br />
            빙프리는 <strong>모델 구분 없이 동일한 기준</strong>으로 청소 서비스를 제공합니다.
          </p>
          <p>
            1회 청소만으로도 만족하셨다면,<br />
            <strong>호시자키 전용 구독 요금제 ‘호시자키’, ‘호시자키+’</strong>로 편하게 이어가 보세요.
            <span>구독요금 안내참조</span>
          </p>
        </div>
      </div>
      <!-- 빙프리 프라임 구독 요금제 -->
      <div class="bingfrime_wrap_section">
        <div class="inner">
          <p class="bing_h1">
            필요한 만큼 선택하는<span>&nbsp#빙프라임+ 맞춤케어</span><span>&nbsp;구독&nbsp;요금제</span>
          </p>
          <div class="pricelist_tap">
            <ul class="tab_list">
              <li v-for="(tab, index) in tabs" :key="index" class="tab_item" :class="{ on: selectedTab === tab }">
                <a href="#" class="btn_tab" @click.prevent="selectTab(tab)">
                  {{ tab }}
                </a>
              </li>
            </ul>
          </div>
          <!-- 요금제 카드 목록 -->
          <div class="price_list">
            <!-- 대표 제목 버튼 (탭 선택에 따라 바뀜) -->
            <!-- price리스트 왼쪽 부분 -->
            <div class="price_list_left">
              <button class="selected_plan_title">
                <span class="selctedTab_bt">{{ selectedTab }}</span>
                빙프라임+구독회원 요금
              </button>
              <div class="individual_list">
                <div
                  class="individual_card"
                  v-for="(plan, idx) in pricePlans[selectedTab]"
                  :key="idx"
                  :class="{
                    'last-card': idx === pricePlans[selectedTab].length - 1,
                  }">
                  <div class="card_in_times">
                    회차: <span>{{ plan.times }}회</span>
                  </div>
                  <button class="perprice_bt">1회당</button>
                  <div class="card_in_price">
                    <div class="card_in_perprice">
                      <span>{{ plan.pricePerUse.toLocaleString() }}원</span>
                    </div>
                    <div class="card_in_total">
                      합계: <span>{{ plan.total.toLocaleString() }}원</span>
                    </div>
                  </div>

                  <div class="buttons">
                    <button>구독하기</button>
                    <button @click="toggleBenefits(plan)">혜택보기</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 혜택 정보 섹션 그대로 유지 -->
            <div class="plus_sale_list">
              <h1 class="twoyear_h1">2년 연장회원 특별할인 혜택 계산하기</h1>

              <!-- 혜택 전 -->
              <div class="first_box_section" v-if="!showBenefits">
                <div class="first_box_before">
                  <p>
                    <span>혜택하기를 누르고<br />자세한 정보를 확인해보세요.</span>
                  </p>
                </div>
                <div class="second_box">
                  <p>
                    <span>기본회원권:</span>
                    <span>가격확인하기</span>
                  </p>
                  <p>
                    <span>2년 연장 혜택:</span>
                    <span>가격확인하기</span>
                  </p>
                </div>
              </div>

              <!-- 혜택 후 -->
              <!-- 혜택 후 -->
              <div v-else>
                <div class="first_box_after">
                  <p>
                    <span><img class="check_icon" src="/public/check/price_check_icon.png" alt="checkicon" /></span>
                    <span>3년 구독 혜택으로<strong>&nbsp;5% 추가</strong>할인까지!</span>
                  </p>
                  <p>
                    <span><img class="check_icon" src="/public/check/price_check_icon.png" alt="checkicon" /></span>
                    <span>1년 4회의 청소, <strong>3년까지</strong>사용할 수 있는<br />특별 구독 혜택 </span>
                  </p>
                  <p>
                    <span><img class="check_icon" src="/public/check/price_check_icon.png" alt="checkicon" /></span>
                    <span>동절기엔 청소를 미뤄도 괜찮아요,<br /><strong>AI 알림</strong>&nbsp;으로 언제든 체크!</span>
                  </p>
                </div>

                <div class="second_box" v-if="selectedPlan">
                  <p>
                    <span>기본 {{ selectedPlan.times }}회권</span>
                    <span>회당 {{ selectedPlan.pricePerUse.toLocaleString() }}원</span>
                  </p>
                  <p>
                    <span>2년 연장 혜택 {{ selectedPlan.times }}회권</span>
                    <span>회당 {{ (selectedPlan.pricePerUse * 0.9).toLocaleString() }}원</span>
                  </p>
                </div>
              </div>

              <p class="years2_banner">2년 연장 구독하고 최대 25% 혜택을 누려보세요.</p>
              <button class="years2_bt" @click="handleBottomButtonClick">
                {{ showBenefits ? "구독하기" : "혜택보기" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 반응형 여기에 하겠습니다 */

/* 테블릿용 스타일 */
@media (min-width: 768px) and (max-width: 1023px) {
  .banner_section {
    margin-top: 120px !important;
    width: 100% !important;
    height: 400px !important;

    img {
      display: block !important;
      width: 100% !important;
    }
  }

  .check-top2 {
    display: none !important;
  }

  .introbing_tab {
    margin-top: 51px !important;
  }

  .reserve-btn {
    position: absolute !important;
    left: 125px !important;
    bottom: 92px !important;
    display: block !important;
    background-color: #e9ff54 !important;
    border-style: none !important;
    width: 179px !important;
    height: 42px !important;
    border-radius: 14px !important;
    font-weight: 700 !important;
    font-size: 21px !important;
    font-family: "Pretendard", sans-serif !important;
    color: #1456fd !important;
    cursor: pointer !important;
    transition: transform 0.2s ease-out, background-color 0.2s !important;
  }

  .ordinary_h1 {
    font-size: 31px !important;
  }

  .ordinary_list {
    p {
      margin-left: 5% !important;
    }
  }

  .or_price_title {
    margin-top: 8% !important;
    font-size: 21px !important;
  }

  .or_price_weight {
    text-align: right !important;
    margin-right: 5% !important;
    font-size: 15px !important;
  }

  .ordinary span:last-child {
    font-size: 14px !important;
    display: inline-block !important;
    margin-left: 13% !important;
    text-align: left !important;
  }

  .ordinary {
    margin-top: 5% !important;
    font-size: 14px !important;
    overflow-wrap: break-word !important;
  }

  .total-price {
    margin-top: 8% !important;
    font-size: 24px !important;
  }

  .text_box {
    max-width: 500px !important;

    p {
      &:first-child {
        font-size: 26px !important;
      }
      &:not(:first-child) {
        font-size: 16px !important;
      }
      &:nth-child(4) {
        font-size: 17px !important;
      }
    }
  }

  .Top_number_section {
    .Top_number_text_content {
      transform: translateY(60%);
      display: flex;
      flex-direction: column;
      gap: 4px;

      .num_first {
        font-size: 21px;
      }

      .num_second,
      .num_third {
        font-size: 26px;
      }
    }

    .numbering_box {
      max-width: 480px;

      .number_ul {
        .lt {
          gap: 20px;

          em {
            font-size: 22px;
          }

          .lt_second_Sec {
            .numbering {
              .n_wrap {
                .n_list_sub {
                  font-size: 38px;
                  height: 50px;
                }
              }
            }
          }

          .fixp {
            font-size: 22px;
            margin-top: 20px;
          }
        }

        .rt {
          gap: 20px;

          em {
            font-size: 22px;
          }

          .b_txt {
            b {
              font-size: 38px;
            }
          }

          .numbering {
            margin-top: -38px;
            .n_wrap {
              margin-top: 19%;

              .n_list_sub {
                font-size: 38px;
              }
            }
          }
        }
      }
    }
  }

  .top3_p {
    font-size: 31px;
  }

  .top3_card_content {
    gap: 10px;
    flex-direction: column;
    align-items: center;

    .top3_card_list {
      width: 500px;

      p {
        margin-left: 40px;
      }

      .price_title {
        font-size: 25px;
        margin-top: 38px;
      }

      .price_weight {
        font-size: 19px;
        margin-top: 5px;
        margin-left: 32%;
      }

      .description {
        font-size: 17px;
        gap: 8px;
        margin-top: 15px;

        p {
          gap: 10px;
        }
      }

      .entire_price {
        .before-price {
          font-size: 19px;
        }

        .total-price {
          font-size: 21px;
        }
      }
    }
  }

  .buttons {
    margin-top: 10px;
  }

  .bingfrime_wrap_section .inner p {
    font-size: 16px;
  }

  .bing_h1 {
    font-size: 31px !important;
  }

  .price_list {
    flex-direction: column;
    gap: 50px;
  }

  .first_box_after {
    p {
      span {
        &:nth-child(2) {
          margin-left: 5%;
        }
      }
    }
  }
}

/* 모바일용 스타일 */
@media (min-width: 390px) and (max-width: 767px) {
  .reserve-btn {
    position: absolute !important;
    left: 50px !important;
    top: 128px !important;
    display: block !important;
    background-color: #e9ff54 !important;
    border-style: none !important;
    width: 140px !important;
    height: 33px !important;
    border-radius: 14px !important;
    font-weight: 800 !important;
    font-size: 18px !important;
    font-family: "Pretendard", sans-serif !important;
    color: #1456fd !important;
    cursor: pointer !important;
    transition: transform 0.2s ease-out, background-color 0.2s !important;
  }

  .check-top2 {
    display: none !important;
  }

  .banner_section {
    margin-top: 80px !important;
    width: 100% !important;
    height: 360px !important;
    background-color: antiquewhite !important;

    img {
      display: block !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
    }
  }

  .introbing_tab li {
    font-size: 16px !important;
  }

  .ordinary_h1 {
    font-size: 20px !important;
  }

  .ordinary_list {
    width: 550px !important;

    p {
      margin-left: 5% !important;
    }
  }

  .or_price_title {
    margin-top: 8% !important;
    font-size: 20px !important;
  }

  .or_price_weight {
    margin-right: 9% !important;
    font-size: 15px !important;
  }

  .ordinary {
    span:last-child {
      font-size: 14px !important;
      display: inline-block !important;
      margin-left: 12% !important;
      text-align: left !important;
    }
  }

  .ordinary_entire_price {
    font-size: 20px !important;
  }

  .text_box {
    max-width: 250px !important;

    p {
      &:first-child {
        font-size: 21px !important;
      }
      &:not(:first-child) {
        font-size: 14px !important;
      }
      &:nth-child(4) {
        font-size: 16px !important;
      }
    }
  }

  .Top_number_section {
    max-height: 700px;
    height: 675px;

    .Top_number_text_content {
      transform: translateY(40%);

      .num_first {
        font-size: 16px;
      }

      .num_second {
        font-size: 21px;
      }
      .num_third {
        font-size: 21px;
      }
    }

    .numbering_box {
      max-width: 300px;
      top: 150px;

      .number_ul {
        max-width: 270px;
        flex-direction: column;
        align-items: center;

        li {
          width: 100%;
          padding: 10px 5px 20px 5px;
        }
      }
    }
  }

  .number_ul {
    .lt {
      gap: 3px;
      max-height: 200px;

      em {
        font-size: 19px;
      }

      .lt_second_Sec {
        .numbering {
          .n_wrap {
            .n_list_sub {
              font-size: 33px;
              height: 30px;
            }
          }
        }
      }

      .fixp {
        font-size: 28px;
        margin-top: 35px;
      }
    }

    .rt {
      max-height: 200px;

      em {
        font-size: 19px;
      }

      .b_txt {
        b {
          font-size: 33px;
          margin-top: 0;
        }
      }

      .numbering {
        margin-top: -22px;

        .n_wrap {
          margin-top: 19%;

          .n_list_sub {
            font-size: 33px;
          }
        }
      }
    }
  }
  .top3_p {
    font-size: 24px;
  }
  .top3_card_content {
    gap: 10px;
    flex-direction: column;
    align-items: center;
    .top3_card_list {
      width: 80%;
      .price_title {
        margin-top: 25px;
        font-size: 21px;
      }
      .price_weight {
        margin-left: 24%;
        font-size: 14px;
        margin-top: 14px;
      }
      .description {
        gap: 8px;
        margin-top: 13%;
        p {
          font-size: 14px;
        }
      }
      .entire_price {
        .before-price {
          font-size: 14px;
        }
        .total-price {
          font-size: 16px;
        }
      }
    }
  }
  .bingfrime_wrap_section {
    .bing_h1 {
      font-size: 23px;
      // white-space: wrap;
      flex-direction: column;
      margin: auto;
    }
    .tab_list {
      flex-wrap: wrap;
      gap: 20px;
      .btn_tab {
        font-size: 16px !important;
      }
    }
    .price_list {
      flex-direction: column;
      width: 100%;
      .price_list_left {
        .selected_plan_title {
          font-size: 17px;
          height: 56px;
        }
        .individual_list {
          .individual_card {
            justify-content: space-evenly;
            .perprice_bt {
              flex: 0.5;
              font-size: 10px;
              border-radius: 8px;
            }
            //버튼
            .buttons {
              flex: 1;
              gap: 5px;
              width: 130px;
              height: 20px;
              align-items: center;

              button {
                font-size: 10px;
                &:hover {
                  font-size: 10px;
                }
              }
            }
            .card_in_times {
              flex: 0.5;
              font-size: 10px;
            }
            .card_in_price {
              flex: 1;
              .card_in_perprice {
                font-size: 10px;
              }
              .card_in_total {
                font-size: 10px;
              }
            }
          }
        }
      }

      .plus_sale_list {
        .twoyear_h1 {
          font-size: 17px;
        }
        //혜택 전
        .first_box_section {
          .first_box_before {
            width: 280px;
            p {
              margin-top: 14%;
            }

            span {
              font-size: 14px;
            }
          }

          .second_box {
            width: 280px;
            span {
              font-size: 14px;
            }
          }
        }
        //혜택 후
        .first_box_after {
          width: 280px;
          p {
            font-size: 12px;
            span {
              img {
                width: 70%;
              }
            }
          }
        }
        .second_box {
          width: 280px;
          span {
            font-size: 12px;
          }
        }

        .years2_banner {
          margin-top: 10%;
          font-size: 14px;
        }
        .years2_bt {
          width: 300px !important;
          height: 48px;
          font-size: 17px;
        }
      }
    }
  }
}
.numbering_box .rt .numbering .n_wrap .n_list_sub {
  display: inline-block;
  color: #fff;
  position: relative;
  overflow: hidden;
  width: 90px;
  height: 100px;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-in forwards;
  font-size: 40px;
  font-weight: 500;
  color: #fff;
}
</style>
