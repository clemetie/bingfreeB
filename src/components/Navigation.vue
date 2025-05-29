<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isLoggedIn = ref(false);
const userRole = ref("");
const isMenuOpen = ref(false);

watchEffect(() => {
  isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
  userRole.value = localStorage.getItem("userRole") || "";
});

const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userRole");
  router.push("/BingPrime");
  isMenuOpen.value = false;
};
</script>

<template>
  <header class="primeHead">
    <div class="inner">
      <router-link to="/" @click="isMenuOpen = false">
        <img src="/prime/prime_logo.png" alt="빙프라임 로고" class="logo" />
      </router-link>

      <button class="hamburger" @click="isMenuOpen = !isMenuOpen">
        <img
          :src="
            isMenuOpen
              ? '/images/closing_icon.png?v=1.2'
              : '/images/hambergar_menu_icon.png?v=1.2'
          "
          alt="menu toggle"
        />
      </button>

      <nav class="pc-nav" v-if="!isMenuOpen">
        <router-link to="/BingprimeReservation">예약하기</router-link>
        <router-link to="/SubBenefit">구독요금</router-link>
        <router-link to="/Faq">FAQ</router-link>
        <router-link
          v-if="isLoggedIn && userRole === 'customer'"
          to="/customerprofile"
        >
          프로필
        </router-link>
        <router-link v-else to="/Login">로그인</router-link>
        <button v-if="isLoggedIn" @click="logout">로그아웃</button>
      </nav>

      <nav class="mo-nav" v-if="isMenuOpen">
        <router-link to="/BingprimeReservation" @click="isMenuOpen = false"
          >예약하기</router-link
        >
        <router-link to="/SubBenefit" @click="isMenuOpen = false"
          >구독요금</router-link
        >
        <router-link to="/Faq" @click="isMenuOpen = false">FAQ</router-link>
        <router-link
          v-if="isLoggedIn && userRole === 'customer'"
          to="/customerprofile"
          @click="isMenuOpen = false"
        >
          프로필
        </router-link>
        <router-link v-else to="/Login" @click="isMenuOpen = false"
          >로그인</router-link
        >
        <button v-if="isLoggedIn" @click="logout">로그아웃</button>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header.primeHead {
  margin-top: 40px;
  margin-bottom: -80px;
  width: 100%;
  height: 80px;
  position: relative;
  z-index: 99;
  box-shadow: 0px 0px 10px rgba($color: #616161, $alpha: 0.1);
  .inner {
    width: 100%;
    max-width: 1200px;
    height: 100%;
    margin: auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      height: 50px;
    }

    nav {
      display: flex;
      align-items: center;
      gap: 40px;

      a {
        color: #111;
        font-weight: 600;
        text-decoration: none;
      }

      button {
        background: none;
        border: none;
        font-weight: 600;
        color: #111;
        cursor: pointer;
        padding-left: 20px;
      }
    }

    .hamburger {
      display: none;
      background: none;
      border: none;
      cursor: pointer;

      img {
        width: 28px;
        height: 28px;
      }
    }
  }
}

@media (max-width: 800px) {
  .pc-nav {
    display: none !important;
  }

  .hamburger {
    display: block !important;
  }

  .mo-nav {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    a {
      font-size: 18px;
      color: #111;
      font-weight: 600;
    }

    button {
      text-align: left;
      font-size: 16px;
      font-weight: 600;
      color: #111;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
    }
  }
}
</style>
