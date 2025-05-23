<script setup>
import { ref, computed } from "vue";
import Header from "@/components/Header.vue";
// 기본값: 전체보기
const selectedTab = ref("all");

// 고객님리뷰 radio
const reviews = ref([
  {
    name: "이*현",
    img: "/review/customer_review_01.png",
    text: "24시간 중 원하는 시간에 언제든 서비스 받을 수 있어 좋았어요. 기사님도 너무 친절하시고 꼼꼼하게 케어 해주셔서 믿음이 가요.",
  },
  {
    name: "김*수",
    img: "/review/customer_review_02.png",
    text: "청소 끝나고 다시 얼음 만들어보니까 투명도부터 다르더라고요. 물맛도 좋고, 냉장고 안 냄새도 덜해진 느낌이에요.",
  },
  {
    name: "오*연",
    img: "/review/customer_review_03.png",
    text: "보이지 않던 내부까지 다 분해해서 세척하는 걸 보고 놀랐어요. 청소 후 얼음 색도 더 맑아지고, 냄새도 완전히 사라졌습니다.",
  },
  {
    name: "김*빈",
    img: "/review/customer_review_04.png",
    text: "직접 하기 어려운 부분까지 다 해주시니 너무 편했어요. 정기적으로 꼭 받아야겠다는 생각이 들었어요. 완전 추천합니다!",
  },
  {
    name: "김*리",
    img: "/review/customer_review_05.png",
    text: "전문 청소 서비스를 받고 나서야, 속까지 비로소 안심이 됐습니다. 하얗게 맑아진 얼음을 보고 있으니 마음도 같이 맑아지는 기분이었어요.",
  },
  {
    name: "장*진",
    img: "/review/customer_review_06.png",
    text: "청소 후엔 얼음 투명도도 확실히 좋아졌고, 잡내도 사라졌습니다.",
  },
  {
    name: "김*웅",
    img: "/review/customer_review_07.png",
    text: "집에서 얼음을 자주 쓰다 보니 위생이 걱정됐는데, 전문 청소 후 얼음 맛이 확 달라졌어요. 아이들도 안심하고 마실 수 있어 만족합니다.",
  },
  {
    name: "박*호",
    img: "/review/customer_review_08.png",
    text: "냉장고 청소는 해도 제빙기는 처음 맡겨봤어요. 청소 후 얼음이 맑고 깨끗해서 놀랐습니다. 이젠 마음 놓고 음료에 넣어 마실 수 있어요.",
  },
  {
    name: "강*호",
    img: "/review/customer_review_09.png",
    text: "여름마다 제빙기 돌리는데 얼음 냄새가 살짝 나서 신경 쓰였거든요. 전문 청소 받고 나니 얼음도 더 맑고, 물맛도 깔끔해졌어요. 이젠 가족들 모두 안심하고 시원하게 즐기고 있어요.",
  },
  {
    name: "류*혁",
    img: "/review/customer_review_01.png",
    text: "친절하고 꼼꼼하게 청소해주셔서 믿음이 갔습니다. 위생 걱정이 사라져서 너무 만족해요😊 다음에도 꼭 이용할게요!",
  },
  {
    name: "김*곤",
    img: "/review/customer_review_02.png",
    text: "제빙기 청소 후 얼음이 훨씬 깨끗해지고 맛도 좋아졌어요. 숨어있던 찌든때까지 말끔히 제거해주셔서 완전 새 제빙기 된 느낌이에요!",
  },
]);

const visibleCount = ref(6);
const visibleReviews = computed(() =>
  reviews.value.slice(0, visibleCount.value)
);

const showMore = () => {
  visibleCount.value += 3;
};

// 오른쪽 사이드 고탑기능
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
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
  <!-- 고객리뷰 배너 -->
  <div class="banner_bg">
    <div class="banner_container inner">
      <div class="banner_left">
        <p class="banner_event">event</p>
        <p style="font-size: 44px; font-weight: 500; line-height: 1.5">
          빙프리 리뷰 참여하고
        </p>
        <p style="font-size: 50px; font-weight: 700; line-height: 1.2">
          최대 <b style="color: #1456fd">5천 포인트</b> 받아가세요 !
        </p>
        <button>리뷰쓰기</button>
      </div>
      <div class="banner_right">
        <div class="review_txt_wrap">
          <div class="txt_box txt_box1">
            <p
              style="
                font-size: 20px;
                font-weight: 500;
                line-height: 1.4;
                color: #616161;
                text-align: center;
              "
            >
              빙프라임 구독 서비스로 비용도 절감하고<br />친환경 세제까지
              증정받아 좋았습니다.
            </p>
            <img
              src="/public/review/emoji_face_01.png"
              alt="emoji face1"
              class="emoji_face1"
            />
          </div>
          <div class="txt_box txt_box2">
            <img
              src="/public/review/emoji_face_02.png"
              alt="emoji face2"
              class="emoji_face2"
            />
            <p
              style="
                font-size: 20px;
                font-weight: 500;
                line-height: 1.4;
                color: #616161;
                text-align: center;
              "
            >
              쉽고 간편한 예약, 24시간 서비스로<br />원하는 시간에 방문해 주셔서
              편리했어요 :)
            </p>
          </div>
          <div class="txt_box txt_box3">
            <p
              style="
                font-size: 20px;
                font-weight: 500;
                line-height: 1.4;
                color: #616161;
                text-align: center;
              "
            >
              얼음 맛과 제빙기 상태가 확연히 개선되어<br />깨끗하고 신선한
              얼음을 사용할 수 있게 됐어요 !
            </p>
            <img
              src="/public/review/emoji_face_03.png"
              alt="emoji face3"
              class="emoji_face3"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 고객리뷰 상세 -->
  <div class="review_detail_container inner">
    <!-- 고객리뷰 radio -->
    <div class="review_radio_wrap">
      <label class="radioset">
        <input
          class="radio_input"
          type="radio"
          value="all"
          v-model="selectedTab"
        />
        <div class="radio_ui">
          <span class="custom_radio"></span>
        </div>
        <span style="color: #616161; font-weight: 500; cursor: pointer"
          >전체보기</span
        >
      </label>
      <label class="radioset">
        <input
          class="radio_input"
          type="radio"
          value="ceo"
          v-model="selectedTab"
        />
        <div class="radio_ui">
          <span class="custom_radio"></span>
        </div>
        <span style="color: #616161; font-weight: 500; cursor: pointer"
          >사장님후기</span
        >
      </label>
      <label class="radioset">
        <input
          class="radio_input"
          type="radio"
          value="customer"
          v-model="selectedTab"
        />
        <div class="radio_ui">
          <span class="custom_radio"></span>
        </div>
        <span style="color: #616161; font-weight: 500; cursor: pointer"
          >고객님후기</span
        >
      </label>
      <label class="radioset">
        <input
          class="radio_input"
          type="radio"
          value="blog"
          v-model="selectedTab"
        />
        <div class="radio_ui">
          <span class="custom_radio"></span>
        </div>
        <span style="color: #616161; font-weight: 500; cursor: pointer"
          >블로그후기</span
        >
      </label>
    </div>
    <!-- 고객리뷰 콘텐츠 -->
    <!-- 전체보기 -->
    <div v-if="selectedTab === 'all'">
      <!-- 사장님 후기 section -->
      <h2 class="sub-title ceo-title">사장님 후기</h2>
      <div class="ceo_review_wrap">
        <div class="mega_review">
          <div class="ceo_info">
            <img
              src="/public/review/megacoffee_icon.png"
              alt="메가커피 아이콘"
              class="mega_icon"
            />
            <p style="font-size: 18px; font-weight: 600; color: #212121">
              <strong style="font-size: 26px; font-weight: 600"
                >메가커피</strong
              >
              김대영 대표님
            </p>
          </div>
          <p
            style="
              font-size: 20px;
              font-weight: 600;
              color: #212121;
              margin-bottom: 10px;
            "
          >
            도입하게 된 계기가 궁금해요!
          </p>
          <p
            style="
              font-size: 15px;
              font-weight: 500;
              line-height: 1.3;
              color: #757575;
            "
          >
            매장에서 제빙기 위생은 브랜드 신뢰와 직결된다고 생각합니다. 이번
            전문 청소 서비스를 통해 내부까지 완벽히 관리할 수 있었어요. 청소
            전후의 얼음 상태가 확실히 달라졌고 맛도 깔끔해졌습니다. 전국 매장에
            동일한 서비스를 도입해도 좋겠다는 판단이 들었습니다.
          </p>
          <div class="ceo_image">
            <img src="/public/review/megacoffee_ceo.png" alt="메가커피 대표" />
          </div>
        </div>
        <div class="mass_review">
          <div class="ceo_info">
            <img
              src="/public/review/masscoffee_icon.png"
              alt="메스커피 아이콘"
              class="mass_icon"
            />
            <p style="font-size: 18px; font-weight: 600; color: #212121">
              <strong style="font-size: 26px; font-weight: 600"
                >매스커피</strong
              >
              이은재 대표님
            </p>
          </div>
          <p
            style="
              font-size: 20px;
              font-weight: 600;
              color: #212121;
              margin-bottom: 10px;
            "
          >
            도입하게 된 계기가 궁금해요!
          </p>
          <p
            style="
              font-size: 15px;
              font-weight: 500;
              line-height: 1.3;
              color: #757575;
            "
          >
            대형 매장을 운영하며 가장 중요하게 생각하는 요소 중 하나는 위생,
            신뢰입니다. 제빙기 내부까지 전문적으로 관리받은 이번 서비스는 기대
            이상이었습니다. 청소 이후 얼음의 투명도와 맛의 퀄리티가 눈에 띄게
            향상되었고, 고객 만족도 역시 높아졌습니다.
          </p>
          <div class="ceo_image">
            <img src="/public/review/masscoffee_ceo.png" alt="매스커피 대표" />
          </div>
        </div>
      </div>
      <!-- 고객님 후기 section -->
      <h2 class="sub-title">고객님 후기</h2>
      <div class="customer_review_wrap">
        <div class="customer_review_box">
          <img
            src="/review/customer_review_01.png"
            alt="고객리뷰 이미지1"
            style="display: block"
          />
          <div class="customer_review_txt">
            <div class="txt_top">
              <img src="/public/review/star.png" alt="별점" />
              <p style="font-size: 14px; font-weight: 700; color: #616161">
                이*현
              </p>
            </div>
            <div class="txt_bottom">
              <p
                style="
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 1.4;
                  color: #424242;
                "
              >
                24시간 중 원하는 시간에 언제든 서비스 받을 수 있어 좋았어요.
                기사님도 너무 친절하시고 꼼꼼하게 케어 해주셔서 믿음이 가요.
              </p>
            </div>
          </div>
        </div>
        <div class="customer_review_box">
          <img
            src="/public/review/customer_review_02.png"
            alt="고객리뷰 이미지2"
            style="display: block"
          />
          <div class="customer_review_txt">
            <div class="txt_top">
              <img src="/public/review/star.png" alt="별점" />
              <p style="font-size: 14px; font-weight: 700; color: #616161">
                김*수
              </p>
            </div>
            <div class="txt_bottom">
              <p
                style="
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 1.4;
                  color: #424242;
                "
              >
                청소 끝나고 다시 얼음 만들어보니까 투명도부터 다르더라고요.
                물맛도 좋고, 냉장고 안 냄새도 덜해진 느낌이에요. 애들도 얼음 잘
                먹고 얼음물 맛있다고 하네요ㅎㅎ
              </p>
            </div>
          </div>
        </div>
        <div class="customer_review_box">
          <img
            src="/public/review/customer_review_03.png"
            alt="고객리뷰 이미지3"
            style="display: block"
          />
          <div class="customer_review_txt">
            <div class="txt_top">
              <img src="/public/review/star.png" alt="별점" />
              <p style="font-size: 14px; font-weight: 700; color: #616161">
                오*연
              </p>
            </div>
            <div class="txt_bottom">
              <p
                style="
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 1.4;
                  color: #424242;
                "
              >
                보이지 않던 내부까지 다 분해해서 세척하는 걸 보고 놀랐어요. 청소
                후 얼음 색도 더 맑아지고, 냄새도 완전히 사라졌습니다.
              </p>
            </div>
          </div>
        </div>
        <div class="customer_review_box">
          <img
            src="/public/review/customer_review_04.png"
            alt="고객리뷰 이미지4"
            style="display: block"
          />
          <div class="customer_review_txt">
            <div class="txt_top">
              <img src="/public/review/star.png" alt="별점" />
              <p style="font-size: 14px; font-weight: 700; color: #616161">
                김*빈
              </p>
            </div>
            <div class="txt_bottom">
              <p
                style="
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 1.4;
                  color: #424242;
                "
              >
                직접 하기 어려운 부분까지 다 해주시니 너무 편했어요. 정기적으로
                꼭 받아야겠다는 생각이 들었어요. 완전 추천합니다!
              </p>
            </div>
          </div>
        </div>
        <div class="customer_review_box">
          <img
            src="/public/review/customer_review_05.png"
            alt="고객리뷰 이미지5"
            style="display: block"
          />
          <div class="customer_review_txt">
            <div class="txt_top">
              <img src="/public/review/star.png" alt="별점" />
              <p style="font-size: 14px; font-weight: 700; color: #616161">
                김*리
              </p>
            </div>
            <div class="txt_bottom">
              <p
                style="
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 1.4;
                  color: #424242;
                "
              >
                전문 청소 서비스를 받고 나서야, 속까지 비로소 안심이 됐습니다.
                하얗게 맑아진 얼음을 보고 있으니 마음도 같이 맑아지는
                기분이었어요.
              </p>
            </div>
          </div>
        </div>
        <div class="customer_review_box">
          <img
            src="/public/review/customer_review_06.png"
            alt="고객리뷰 이미지6"
            style="display: block"
          />
          <div class="customer_review_txt">
            <div class="txt_top">
              <img src="/public/review/star.png" alt="별점" />
              <p style="font-size: 14px; font-weight: 700; color: #616161">
                장*진
              </p>
            </div>
            <div class="txt_bottom">
              <p
                style="
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 1.4;
                  color: #424242;
                "
              >
                청소 후엔 얼음 투명도도 확실히 좋아졌고, 잡내도 사라졌습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 블로그 후기 section -->
      <h2 class="sub-title">블로그 후기</h2>
      <div class="blog_review_wrap">
        <div class="blog_review_box">
          <img
            style="border-radius: 2px"
            src="/public/review/blog_review_01.png"
            alt="블로그후기 이미지1"
          />
          <div class="blog_review_txt">
            <div class="blog_title_des">
              <p
                style="
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 5px;
                  color: #212121;
                "
              >
                한솔 제빙기 청소- 빙프리, 빙프라임 구독서비스까지
              </p>
              <p
                class="txt_ellipsis"
                style="font-size: 14px; font-weight: 400; color: #424242"
              >
                최근 제빙기 청소 서비스를 받았는데 정말 만족스러웠습니다.
                제빙기가 자주 사용되다 보니 안쪽에 얼음 찌꺼기와 먼지가 쌓여
                있어서 걱정이었는데 전문가분이 아주 꼼꼼하고 세심하게
                청소해주셨습니다. 청소 후 제빙기가 훨씬 깨끗하고 효율적으로
                작동하는 걸 느낄 수 있었고, 얼음의 질도 좋아졌어요. 서비스가
                빠르고 친절해서 불편함 없이 진행될 수 있었고, 전문가분이 제빙기
                관리 방법에 대해서도 친절하게 설명해주셔서 정말 도움이 많이
                되었어요. 앞으로도 정기적으로 이용하고 싶은 서비스예요!
              </p>
            </div>
            <div class="blog_name">
              <p style="font-size: 12px; font-weight: 400; color: #424242">
                오래 기억하기 위한 기록 _ 2025.1.20
              </p>
            </div>
          </div>
        </div>
        <div class="blog_review_box">
          <img
            style="border-radius: 2px"
            src="/public/review/blog_review_02.png"
            alt="블로그후기 이미지2"
          />
          <div class="blog_review_txt">
            <div class="blog_title_des">
              <p
                style="
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 5px;
                  color: #212121;
                "
              >
                빙프리 정기구독 서비스 좋아요 :)
              </p>
              <p
                class="txt_ellipsis"
                style="font-size: 14px; font-weight: 400; color: #424242"
              >
                집에서 제빙기를 오래 사용하다 보니 얼음에서 묘한 냄새가 나기
                시작했어요. 평소엔 바빠서 청소를 미루다가 이번에 전문가에게
                맡겨봤어요. 기사님이 장비를 가지고 오셔서 정말 꼼꼼하게
                청소해주셨어요. 보이지 않던 내부까지 다 분해해서 세척하는 걸
                보고 놀랐어요. 청소 후 얼음 색도 더 맑아지고, 냄새도 완전히
                사라졌습니다. 아이가 얼음을 자주 먹는데 이젠 안심이 되더라고요.
                직접 하기 어려운 부분까지 다 해주시니 너무 편했어요. 정기적으로
                꼭 받아야겠다는 생각이 들었어요. 완전 추천합니다!
              </p>
            </div>
            <div class="blog_name">
              <p style="font-size: 12px; font-weight: 400; color: #424242">
                장꾸의 일상_2025.2.5
              </p>
            </div>
          </div>
        </div>
        <div class="blog_review_box" style="margin-bottom: 120px">
          <img
            style="border-radius: 2px"
            src="/public/review/blog_review_03.png"
            alt="블로그후기 이미지3"
          />
          <div class="blog_review_txt">
            <div class="blog_title_des">
              <p
                style="
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 5px;
                  color: #212121;
                "
              >
                경복궁 인근 카페-제빙기 청소
              </p>
              <p
                class="txt_ellipsis"
                style="font-size: 14px; font-weight: 400; color: #424242"
              >
                작은 카페를 운영하다 보니, 하나하나 신경 쓸 게 참 많아요. 얼음도
                그냥 얼음이 아니라, 손님에게 드리는 ‘신뢰’라고 생각했어요.
                그런데 요즘 따라 얼음 맛이 조금 이상해서 마음이 불편했죠. 전문
                청소 서비스를 받고 나서야, 속까지 비로소 안심이 됐습니다. 하얗게
                맑아진 얼음을 보고 있으니 마음도 같이 맑아지는 기분이었어요.
                손님들 “오늘 아이스 아메리카노 더 맛있네요” 한마디에 미소가
                지어지더라고요. 보이지 않는 부분까지 정성껏 관리해줘서 감사한
                마음이 컸습니다. 이제는 제빙기 청소도 매장의 ‘루틴 케어’로 꼭
                챙기려 해요. 💛
              </p>
            </div>
            <div class="blog_name">
              <p style="font-size: 12px; font-weight: 400; color: #424242">
                집순이의 끄적끄적_2025.2.16
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 사장님 후기 -->
    <div v-else-if="selectedTab === 'ceo'">
      <h2 class="sub-title ceo-title">사장님 후기</h2>
      <div class="ceo_review_wrap ceo_section">
        <div class="mega_review">
          <div class="ceo_info">
            <img
              src="/public/review/megacoffee_icon.png"
              alt="메가커피 아이콘"
              class="mega_icon"
            />
            <p style="font-size: 18px; font-weight: 600; color: #212121">
              <strong style="font-size: 26px; font-weight: 600"
                >메가커피</strong
              >
              김대영 대표님
            </p>
          </div>
          <p
            style="
              font-size: 20px;
              font-weight: 600;
              color: #212121;
              margin-bottom: 10px;
            "
          >
            도입하게 된 계기가 궁금해요!
          </p>
          <p
            style="
              font-size: 15px;
              font-weight: 500;
              line-height: 1.3;
              color: #757575;
            "
          >
            매장에서 제빙기 위생은 브랜드 신뢰와 직결된다고 생각합니다. 이번
            전문 청소 서비스를 통해 내부까지 완벽히 관리할 수 있었어요. 청소
            전후의 얼음 상태가 확실히 달라졌고 맛도 깔끔해졌습니다. 전국 매장에
            동일한 서비스를 도입해도 좋겠다는 판단이 들었습니다.
          </p>
          <div class="ceo_image">
            <img src="/public/review/megacoffee_ceo.png" alt="메가커피 대표" />
          </div>
        </div>
        <div class="mass_review">
          <div class="ceo_info">
            <img
              src="/public/review/masscoffee_icon.png"
              alt="메스커피 아이콘"
              class="mass_icon"
            />
            <p style="font-size: 18px; font-weight: 600; color: #212121">
              <strong style="font-size: 26px; font-weight: 600"
                >매스커피</strong
              >
              이은재 대표님
            </p>
          </div>
          <p
            style="
              font-size: 20px;
              font-weight: 600;
              color: #212121;
              margin-bottom: 10px;
            "
          >
            도입하게 된 계기가 궁금해요!
          </p>
          <p
            style="
              font-size: 15px;
              font-weight: 500;
              line-height: 1.3;
              color: #757575;
            "
          >
            대형 매장을 운영하며 가장 중요하게 생각하는 요소 중 하나는 위생,
            신뢰입니다. 제빙기 내부까지 전문적으로 관리받은 이번 서비스는 기대
            이상이었습니다. 청소 이후 얼음의 투명도와 맛의 퀄리티가 눈에 띄게
            향상되었고, 고객 만족도 역시 높아졌습니다.
          </p>
          <div class="ceo_image">
            <img src="/public/review/masscoffee_ceo.png" alt="매스커피 대표" />
          </div>
        </div>
        <div class="delivery_review">
          <div class="ceo_info">
            <img
              src="/public/review/delivery_icon.png"
              alt="배달의 민족 아이콘"
              class="delivery_icon"
            />
            <p
              style="
                font-size: 18px;
                font-weight: 600;
                margin-top: 6px;
                color: #212121;
              "
            >
              <strong style="font-size: 26px; font-weight: 600"
                >배달의 민족</strong
              >
              김봉진 대표님
            </p>
          </div>
          <p
            style="
              font-size: 20px;
              font-weight: 600;
              color: #212121;
              margin-bottom: 10px;
            "
          >
            도입하게 된 계기가 궁금해요!
          </p>
          <p
            style="
              font-size: 15px;
              font-weight: 500;
              line-height: 1.3;
              color: #757575;
            "
          >
            대규모 매장을 운영하다 보면 위생 관리가 곧 신뢰라는 걸 절실히
            느낍니다. 이번 서비스를 통해 눈에 띄게 맑아진 얼음과 깔끔한 맛에
            저희 직원들도 놀랐습니다. 정기적인 유지 관리 파트너로 신뢰할 수 있어
            앞으로도 꾸준히 이용할 예정입니다.
          </p>
          <div class="ceo_image">
            <img src="/public/review/delivery_ceo.png" alt="배달의 민족 대표" />
          </div>
        </div>
        <div class="ediya_review">
          <div class="ceo_info">
            <img
              src="/public/review/ediyacoffee_logo.png"
              alt="이디야커피 아이콘"
              class="ediya_icon"
            />
            <p
              style="
                font-size: 18px;
                font-weight: 600;
                margin-top: 6px;
                color: #212121;
              "
            >
              <strong style="font-size: 26px; font-weight: 600"
                >이디야커피</strong
              >
              문창기 대표님
            </p>
          </div>
          <p
            style="
              font-size: 20px;
              font-weight: 600;
              color: #212121;
              margin-bottom: 10px;
            "
          >
            도입하게 된 계기가 궁금해요!
          </p>
          <p
            style="
              font-size: 15px;
              font-weight: 500;
              line-height: 1.3;
              color: #757575;
            "
          >
            프랜차이즈 규모가 크다 보니 얼음 위생은 늘 걱정이었어요. 제빙기
            내부까지 꼼꼼하게 관리해주셔서 믿음이 갔습니다. 서비스 후 얼음의
            투명도와 맛이 확실히 달라졌고요. 정기적인 유지 관리 파트너로 신뢰할
            수 있어 앞으로도 꾸준히 이용할 예정입니다.
          </p>
          <div class="ceo_image">
            <img
              src="/public/review/ediyacoffee_ceo.png"
              alt="이디야커피 대표"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 고객님 후기 -->
    <div v-else-if="selectedTab === 'customer'">
      <h2 class="sub-title customer-title">고객님 후기</h2>
      <div class="customer_review_wrap">
        <div
          v-for="(review, index) in visibleReviews"
          :key="index"
          class="customer_review_box"
        >
          <img
            :src="review.img"
            :alt="`고객리뷰 이미지${index + 1}`"
            style="display: block"
          />
          <div class="customer_review_txt">
            <div class="txt_top">
              <img src="/public/review/star.png" alt="별점" />
              <p style="font-size: 14px; font-weight: 700; color: #616161">
                {{ review.name }}
              </p>
            </div>
            <div class="txt_bottom">
              <p
                style="
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 1.4;
                  color: #424242;
                "
              >
                {{ review.text }}
              </p>
            </div>
          </div>
        </div>

        <button
          class="review_moreBtn"
          v-if="visibleCount < reviews.length"
          @click="showMore"
        >
          더보기
        </button>
      </div>
    </div>
    <div v-else-if="selectedTab === 'blog'">
      <h2 class="sub-title blog-title">블로그 후기</h2>
      <div class="blog_review_wrap" style="margin-bottom: 100px">
        <div class="blog_review_box">
          <img
            style="border-radius: 2px"
            src="/public/review/blog_review_01.png"
            alt="블로그후기 이미지1"
          />
          <div class="blog_review_txt">
            <div class="blog_title_des">
              <p
                style="
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 5px;
                  color: #212121;
                "
              >
                한솔 제빙기 청소- 빙프리, 빙프라임 구독서비스까지
              </p>
              <p
                class="txt_ellipsis"
                style="font-size: 14px; font-weight: 400; color: #424242"
              >
                최근 제빙기 청소 서비스를 받았는데 정말 만족스러웠습니다.
                제빙기가 자주 사용되다 보니 안쪽에 얼음 찌꺼기와 먼지가 쌓여
                있어서 걱정이었는데 전문가분이 아주 꼼꼼하고 세심하게
                청소해주셨습니다. 청소 후 제빙기가 훨씬 깨끗하고 효율적으로
                작동하는 걸 느낄 수 있었고, 얼음의 질도 좋아졌어요. 서비스가
                빠르고 친절해서 불편함 없이 진행될 수 있었고, 전문가분이 제빙기
                관리 방법에 대해서도 친절하게 설명해주셔서 정말 도움이 많이
                되었어요. 앞으로도 정기적으로 이용하고 싶은 서비스예요!
              </p>
            </div>
            <div class="blog_name">
              <p style="font-size: 12px; font-weight: 400; color: #424242">
                오래 기억하기 위한 기록 _ 2025.1.20
              </p>
            </div>
          </div>
        </div>
        <div class="blog_review_box">
          <img
            style="border-radius: 2px"
            src="/public/review/blog_review_02.png"
            alt="블로그후기 이미지2"
          />
          <div class="blog_review_txt">
            <div class="blog_title_des">
              <p
                style="
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 5px;
                  color: #212121;
                "
              >
                빙프리 정기구독 서비스 좋아요 :)
              </p>
              <p
                class="txt_ellipsis"
                style="font-size: 14px; font-weight: 400; color: #424242"
              >
                집에서 제빙기를 오래 사용하다 보니 얼음에서 묘한 냄새가 나기
                시작했어요. 평소엔 바빠서 청소를 미루다가 이번에 전문가에게
                맡겨봤어요. 기사님이 장비를 가지고 오셔서 정말 꼼꼼하게
                청소해주셨어요. 보이지 않던 내부까지 다 분해해서 세척하는 걸
                보고 놀랐어요. 청소 후 얼음 색도 더 맑아지고, 냄새도 완전히
                사라졌습니다. 아이가 얼음을 자주 먹는데 이젠 안심이 되더라고요.
                직접 하기 어려운 부분까지 다 해주시니 너무 편했어요. 정기적으로
                꼭 받아야겠다는 생각이 들었어요. 완전 추천합니다!
              </p>
            </div>
            <div class="blog_name">
              <p style="font-size: 12px; font-weight: 400; color: #424242">
                장꾸의 일상_2025.2.5
              </p>
            </div>
          </div>
        </div>
        <div class="blog_review_box">
          <img
            style="border-radius: 2px"
            src="/public/review/blog_review_03.png"
            alt="블로그후기 이미지3"
          />
          <div class="blog_review_txt">
            <div class="blog_title_des">
              <p
                style="
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 5px;
                  color: #212121;
                "
              >
                경복궁 인근 카페-제빙기 청소
              </p>
              <p
                class="txt_ellipsis"
                style="font-size: 14px; font-weight: 400; color: #424242"
              >
                작은 카페를 운영하다 보니, 하나하나 신경 쓸 게 참 많아요. 얼음도
                그냥 얼음이 아니라, 손님에게 드리는 ‘신뢰’라고 생각했어요.
                그런데 요즘 따라 얼음 맛이 조금 이상해서 마음이 불편했죠. 전문
                청소 서비스를 받고 나서야, 속까지 비로소 안심이 됐습니다. 하얗게
                맑아진 얼음을 보고 있으니 마음도 같이 맑아지는 기분이었어요.
                손님들 “오늘 아이스 아메리카노 더 맛있네요” 한마디에 미소가
                지어지더라고요. 보이지 않는 부분까지 정성껏 관리해줘서 감사한
                마음이 컸습니다. 이제는 제빙기 청소도 매장의 ‘루틴 케어’로 꼭
                챙기려 해요. 💛
              </p>
            </div>
            <div class="blog_name">
              <p style="font-size: 12px; font-weight: 400; color: #424242">
                집순이의 끄적끄적_2025.2.16
              </p>
            </div>
          </div>
        </div>
        <div class="blog_review_box">
          <img
            style="border-radius: 2px"
            src="/public/review/blog_review_04.png"
            alt="블로그후기 이미지4"
          />
          <div class="blog_review_txt">
            <div class="blog_title_des">
              <p
                style="
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 5px;
                  color: #212121;
                "
              >
                깨끗한 얼음, 조용한 기계 - 빙프리의 효과
              </p>
              <p
                class="txt_ellipsis"
                style="font-size: 14px; font-weight: 400; color: #424242"
              >
                제빙기 청소 서비스 받았는데 생각보다 효과가 좋았어요. 얼음이
                깨끗하게 나오는 게 확실히 느껴지고, 기계 소리도 조금 더
                조용해졌어요. 서비스 진행하시는 분도 친절하게 설명해주셔서
                좋았고, 청소 후에는 기계 내부도 깔끔하게 정리된 게 보였어요.
                다만 청소 후 얼음 냄새가 조금 나긴 했지만, 시간이 지나면서
                해결됐어요. 전반적으로 만족스럽고 앞으로도 필요할 때마다 이용할
                생각이에요.
              </p>
            </div>
            <div class="blog_name">
              <p style="font-size: 12px; font-weight: 400; color: #424242">
                어제보다 더 나은 _ 2025.2.25
              </p>
            </div>
          </div>
        </div>
        <div class="blog_review_box">
          <img
            style="border-radius: 2px"
            src="/public/review/blog_review_05.png"
            alt="블로그후기 이미지5"
          />
          <div class="blog_review_txt">
            <div class="blog_title_des">
              <p
                style="
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 5px;
                  color: #212121;
                "
              >
                내가 먹는 얼음은 얼마나 깨끗할까? (빙프리, 제빙기 청소 서비스,
                정기구독 서비스)
              </p>
              <p
                class="txt_ellipsis"
                style="font-size: 14px; font-weight: 400; color: #424242"
              >
                전반적으로 매우 만족스러웠어요. 서비스가 시작되기 전에 기계
                상태에 대해 자세히 설명해 주셔서 믿음이 갔고, 청소 과정도 매우
                꼼꼼하게 진행되었습니다. 청소 후 얼음이 훨씬 깨끗하고 신선하게
                나오는 것이 확실히 느껴졌어요. 기계도 원활하게 작동하는 것 같고,
                전에 비해 소음도 줄어든 것 같아요. 청소하는 동안 기계 내부의
                얼음 찌꺼기나 먼지들이 깨끗하게 제거되어 기계가 훨씬
                깔끔해졌습니다. 다만, 청소 후 기계에서 약간의 습기가 남아
                있었는데, 시간이 지나면서 자연스럽게 해결되었어요.
              </p>
            </div>
            <div class="blog_name">
              <p style="font-size: 12px; font-weight: 400; color: #424242">
                Love Is All_2025.2.27
              </p>
            </div>
          </div>
        </div>
        <div class="blog_review_box">
          <img
            style="border-radius: 2px"
            src="/public/review/blog_review_06.png"
            alt="블로그후기 이미지6"
          />
          <div class="blog_review_txt">
            <div class="blog_title_des">
              <p
                style="
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 5px;
                  color: #212121;
                "
              >
                제빙기 청소했어요!! #홈카페 #깨끗한얼음 #빙프리 #세균박멸
              </p>
              <p
                class="txt_ellipsis"
                style="font-size: 14px; font-weight: 400; color: #424242"
              >
                우선 서비스 제공자가 매우 친절하고 전문적으로 진행해주셔서 기분
                좋게 받았어요. 청소 후 제빙기 내부가 깨끗하게 정리된 모습에
                놀랐고, 얼음이 더 깨끗하고 신선하게 나오 는 게 확실히
                느껴졌습니다. 기계 소리도 좀 더 부드럽고 조용해져서, 이전보다
                작동 상태가 좋아진 느낌이에요. 다만, 청소 후에 약간의 물기나
                습기가 남아 있었는데, 시간이 지나면서 자연스럽게 해결되었고,
                전체적으로 만족스러웠습니다. 앞으로도 주기적으로 청소 서비스
                이용할 계획이에요.
              </p>
            </div>
            <div class="blog_name">
              <p style="font-size: 12px; font-weight: 400; color: #424242">
                페어리의 하루 _ 2025.3.4
              </p>
            </div>
          </div>
        </div>
        <div class="blog_review_box">
          <img
            style="border-radius: 2px"
            src="/public/review/blog_review_07.png"
            alt="블로그후기 이미지7"
          />
          <div class="blog_review_txt">
            <div class="blog_title_des">
              <p
                style="
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 5px;
                  color: #212121;
                "
              >
                깨끗한 얼음, 조용한 기계 - 빙프리의 효과
              </p>
              <p
                class="txt_ellipsis"
                style="font-size: 14px; font-weight: 400; color: #424242"
              >
                제빙기 청소 서비스를 받았는데 정말 만족스러웠어요. 처음에는
                제빙기가 조금 오래돼서 얼음 품질이 떨어지고 기계도 소리가
                컸는데, 청소 후 확실히 달라졌어요. 청소하는 과정에서 기계 내부의
                얼음 찌꺼기나 먼지들이 깨끗하게 제거된 게 눈에 보였고, 청소 후
                얼음이 훨씬 깨끗하고 신선하게 나오더라고요. 이전보다 얼음 냄새도
                없고, 얼음이 더 투명하게 보였어요. 기계 작동 소음도 줄어들어서
                훨씬 부드럽게 작동하는 느낌이 들었습니다. 서비스 담당자 분이
                친절하게 설명해주시고, 청소 과정도 철저하게 해주셔서 믿음이
                갔어요.
              </p>
            </div>
            <div class="blog_name">
              <p style="font-size: 12px; font-weight: 400; color: #424242">
                못난이의 일기장 _ 2025.3.10
              </p>
            </div>
          </div>
        </div>
        <button class="review_moreBtn">더보기</button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
