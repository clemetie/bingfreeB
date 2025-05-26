<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const route = useRoute();
const router = useRouter();
const menuopen = ref(false);

const links = [
  {
    name: "대시보드",
    imgUrl: "/prime/dashboard-icon.png",
    path: "/Worker/ddashboard",
    icon: "fas fa-chart-line",
  },
  {
    name: "작업내역",
    imgUrl: "/prime/customer-icon.png",
    path: "/Worker/WorkerHistory",
    icon: "fas fa-users",
  },
  {
    name: "정산내역",
    imgUrl: "/prime/pay-icon.png",
    path: "/Worker/WorkerSale",
    icon: "fas fa-user-tie",
  },
  {
    name: "프로필",
    imgUrl: "/prime/profile_icon.png",
    path: "/Worker/WorkerProfile",
    icon: "fas fa-user-tie",
  },
  {
    name: "게시판",
    imgUrl: "/prime/notice-icon.png",
    path: "/Worker/WorkerBoard",
    icon: "fas fa-user-tie",
  },
  {
    name: "설정",
    imgUrl: "/prime/settings-icon.png",
    path: "/Worker/WorkerSetting",
    icon: "fas fa-cog",
  },
];

// 현재 경로에 따른 활성화 상태 계산
const isActive = (path) => route.path === path;

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>
<!-- 지수 대시보드 홈 -->

<template>
  <!-- 페이지 헤더 -->
  <header class="workerHead">
    <div class="logo">
      <router-link to="/Worker/ddashboard"
        ><img src="/prime/bingfree-logo.png" alt="빙프리로고"
      /></router-link>
    </div>
    <div class="right webonly">
      <div class="right-icon saerch">
        <img src="/prime/search-icon.png" alt="돋보기 아이콘" />
      </div>
      <div class="right-icon bell">
        <img src="/prime/bell-icon.png" alt="알림 아이콘" />
        <img
          class="redPoint"
          src="/prime/redPoint-icon.png"
          alt="알림이 있을때 활성화되는 빨간도트 아이콘"
        />
      </div>
      <div class="right-icon darkmode">
        <img src="/prime/darkmode-icon.png" alt="다크모드 아이콘" />
      </div>
      <div class="right-icon setting">
        <img src="/prime/setting-icon.png" alt="설정 아이콘" />
      </div>
      <div class="right-icon profile">
        <img src="/prime/profile-image-icon.png" alt="프로필 아이콘" />
      </div>
    </div>
    <div class="sidebar mbonly">
      <button class="hbbar" v-on:click="menuopen = true">
        <svg
          width="28"
          height="20"
          viewBox="0 0 28 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.015 10.0059H2"
            stroke="#212121"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M26.015 2H2"
            stroke="#212121"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M26.015 18.0117H2"
            stroke="#212121"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <nav class="side-menu" v-show="menuopen">
        <div class="right mbonly">
          <div class="right-icon saerch">
            <img src="/prime/search-icon.png" alt="돋보기 아이콘" />
          </div>
          <div class="right-icon bell">
            <img src="/prime/bell-icon.png" alt="알림 아이콘" />
            <img
              class="redPoint"
              src="/prime/redPoint-icon.png"
              alt="알림이 있을때 활성화되는 빨간도트 아이콘"
            />
          </div>
          <div class="right-icon darkmode">
            <img src="/prime/darkmode-icon.png" alt="다크모드 아이콘" />
          </div>
          <div class="right-icon setting">
            <img src="/prime/setting-icon.png" alt="설정 아이콘" />
          </div>
          <div class="right-icon profile">
            <img src="/prime/profile-image-icon.png" alt="프로필 아이콘" />
          </div>
        </div>
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="flex items-center text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray8 transition-colors"
          :class="{ 'bg-gray1 text-gray8 font-semibold': isActive(link.path) }"
        >
          <img
            :src="link.imgUrl"
            :alt="link.name"
            class="w-[16px] h-[16px] object-contain object-center"
          />
          {{ link.name }}
        </router-link>
        <div class="btnbox">
          <button class="logout modal" style="text-decoration: none">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66667 15H2.55556C2.143 15 1.74733 14.8361 1.45561 14.5444C1.16389 14.2527 1 13.857 1 13.4444V2.55556C1 2.143 1.16389 1.74733 1.45561 1.45561C1.74733 1.16389 2.143 1 2.55556 1H5.66667"
                stroke="#9e9e9e"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.1112 11.8891L15.0001 8.00022L11.1112 4.11133"
                stroke="#9e9e9e"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 8H5.66663"
                stroke="#9e9e9e"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>로그아웃 </span>
          </button>
          <span style="color: #9e9e9e">|</span>
          <button
            class="modal"
            style="text-decoration: none"
            v-on:click="menuopen = false"
          >
            닫기
          </button>
        </div>
      </nav>
    </div>
  </header>
  <div class="home">
    <!-- 사이드바 -->
    <div class="sidebar webonly">
      <nav class="side-menu">
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="flex items-center text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray8 transition-colors"
          :class="{ 'bg-gray1 text-gray8 font-semibold': isActive(link.path) }"
        >
          <img
            :src="link.imgUrl"
            :alt="link.name"
            class="w-[16px] h-[16px] object-contain object-center"
          />
          {{ link.name }}
        </router-link>
      </nav>
      <div class="logout-wrap">
        <div class="logout">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.66667 15H2.55556C2.143 15 1.74733 14.8361 1.45561 14.5444C1.16389 14.2527 1 13.857 1 13.4444V2.55556C1 2.143 1.16389 1.74733 1.45561 1.45561C1.74733 1.16389 2.143 1 2.55556 1H5.66667"
              stroke="#616161"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.1112 11.8891L15.0001 8.00022L11.1112 4.11133"
              stroke="#616161"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15 8H5.66663"
              stroke="#616161"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>로그아웃</span>
        </div>
      </div>
    </div>
    <!-- 전체 -->
    <div class="admin-right">
      <p v-if="isLoggedIn">🛠 {{ userName }} 기사님!</p>
      <div>
        <main class="workerbody"><router-view></router-view></main>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
