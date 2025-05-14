<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const isScrolled = ref(false);
const handleScroll = () => {
  isScrolled.value = window.scrollY > 30;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 페이지 이동 및 메뉴 닫기
const navigateTo = (path) => {
  router.push(path);
  isMenuOpen.value = false;
};
// 페이지 mo-menu 전체 채우기
const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  setViewportHeight();
  window.addEventListener("resize", setViewportHeight);
  window.addEventListener("orientationchange", setViewportHeight); // ✅ 모바일 회전 대응
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", setViewportHeight);
  window.removeEventListener("orientationchange", setViewportHeight); // ✅ 위치 이동해서 정리
});
</script>

<template>
  <header :class="{ scrolled: isScrolled || isMenuOpen }">
    <div class="inner">
      <router-link to="/" @click="isMenuOpen = false">
        <img src="/images/main-logo.png" alt="메인 로고" />
      </router-link>
      <nav :class="{ open: isMenuOpen }">
        <router-link
          to="/IntroBing"
          :class="{ active: route.path === '/IntroBing' }"
        >
          빙프리란?
        </router-link>
        <router-link to="/Check" :class="{ active: route.path === '/Check' }">
          요금안내
        </router-link>
        <router-link to="/Review" :class="{ active: route.path === '/Review' }">
          고객리뷰
        </router-link>
        <router-link
          to="/Reservation"
          :class="{ active: route.path === '/Reservation' }"
        >
          예약하기
        </router-link>
      </nav>

      <div class="hamburger" @click="toggleMenu">
        <img
          :src="
            isMenuOpen
              ? '/images/closing_icon.png?v=1.2'
              : '/images/hambergar_menu_icon.png?v=1.2'
          "
          alt="menu toggle"
        />
      </div>
    </div>
  </header>

  <!-- 모바일 햄버거 메뉴 -->
  <nav class="mo-menu" v-show="isMenuOpen">
    <ul class="mo-sns">
      <li>
        <a href="#"><img src="/public/images/youtube.png" alt="" /></a>
      </li>
      <li>
        <a href="#"><img src="/public/images/facebook.png" alt="" /></a>
      </li>
      <li>
        <a href="#"><img src="/public/images/linkedin.png" alt="" /></a>
      </li>
    </ul>
    <div class="mo-logo">
      <p>
        청소가 필요한 순간<br />검증된 기술과 경험<br />제빙기 케어, 여기가 정답
      </p>
      <img src="/images/main-logo.png" alt="" />
    </div>
    <ul class="menu-list">
      <li class="first">
        <a 
          @click.prevent="navigateTo('/IntroBing')"
          :class="{ active: route.path === '/IntroBing' }"
        >
          빙프리란?
        </a>
      </li>
      <li>
        <a
          @click.prevent="navigateTo('/Check')"
          :class="{ inactive: route.path !== '/Check' }"
        >
          요금 안내
        </a>
      </li>
      <li>
        <a
          @click.prevent="navigateTo('/Review')"
          :class="{ inactive: route.path !== '/Review' }"
        >
          고객리뷰
        </a>
      </li>
      <li>
        <a
          @click.prevent="navigateTo('/Reservation')"
          :class="{ inactive: route.path !== '/Reservation' }"
        >
          예약하기
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
header {
  margin-top: 40px;
  margin-bottom: -80px;
  width: 100%;
  height: 80px;
  position: relative;
  z-index: 99;
  .inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 170px;
    }
    nav {
      display: flex;
      a {
        color: #111;
        font-weight: 600;
        margin-left: 70px;
        position: relative;

        &.active {
          color: #1651da; // 클릭 이후에도 계속 유지될 텍스트 색상
          font-weight: 800;
        }
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
        }
      }
    }
    .hamburger {
      display: none;
    }
  }
}

@mixin mobile {
  @media (min-width: 370px) and (max-width: 767px) {
    @content;
  }
}
// 모바일
@include mobile {
  ul,
  li {
    list-style: none;
  }
  header {
    z-index: 999;
    background-color: #fff;
    &.scrolled {
      background-color: #1651da; // ✅ 메뉴가 열렸을 때 바뀔 배경색
      transition: background-color 0.3s ease;
    }
    &.scrolled {
      .inner {
        img {
          display: none; // ✅ 메뉴가 열렸을 때 로고 숨김
        }
      }
    }
    .inner {
      display: flex;
      a {
        width: 100%;
        img {
          width: 140px;
        }
      }

      nav {
        display: none;
      }
      .hamburger {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        width: 30px;
        height: 80px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
      }
    }
  }
  // 모달 창
  .mo-menu {
    height: calc(var(--vh, 1vh) * 100) !important; // ✅ 동적 높이 적용
    margin-top: 120px;
    width: 100%;

    position: absolute;
    position: relative;
    top: -40px;
    left: 0;

    background-color: #1651da;
    z-index: 99;
    .mo-sns {
      position: absolute;
      right: 20px;
      top: calc(12% + 15px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 18px;
    }
    .mo-logo {
      display: block;
      position: absolute;
      left: 30px;
      top: calc(12% + -53px);

      p {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        margin-bottom: 20px;
        img {
          max-width: 100%;
        }
      }
    }
    .menu-list {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: calc(50% + -22px);
      left: 27px;
      gap: 22px;
      transform: translateY(-50%);
      li {
        font-weight: 500;
        a {
          font-size: 32px;
          color: #fff;
          padding-left: 20px;
          display: inline;
          opacity: 0.5; // 기본적으로 흐리게

          &:active {
            opacity: 1;
            font-weight: 700;
            transition: opacity 0.3s ease;
          }
          &:inactive {
            opacity: 0.5;
          }
        }
      }
    }
  }
}

@mixin tablet {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}
// 테블릿
@include tablet {
  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    transition: background-color 0.3s ease;
    &.scrolled {
      background-color: #fff; // 변경될 배경색
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); // 선택 사항: 그림자 추가
    }
    .inner {
      width: 100%;
      justify-content: space-between;
      img {
        flex: 20%;
        width: 170px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 55px;
      }
      nav {
        flex: 80%;
        display: flex;
        justify-content: flex-end;
        a {
          color: #111;
          font-weight: 500;
          margin-left: 40px;
          position: relative;
          &:active {
            color: #1651da; // 원하는 활성 색상
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
