<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <!-- 로고 -->
    <div class="mb-10">
      <img src="/prime/Login_logo.png" alt="브랜드로고" class="w-40" />
    </div>

    <!-- 탭 -->
    <div class="w-full max-w-md flex h-14 mb-6">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        @click="changeTab(index)"
        :class="[
          'flex-1 flex items-center justify-center font-semibold cursor-pointer transition',
          activeTab === index ? 'active-tab' : 'inactive-tab',
        ]">
        {{ tab }}
      </div>
    </div>

    <!-- 로그인 폼 -->
    <form @submit.prevent="handleLogin" class="w-full max-w-md">
      <div class="relative min-h-[400px]">
        <!-- 탭 0 :Bing.p 회원 폼 -->
        <div v-show="activeTab === 0" class="absolute w-full">
          <div class="mb-4 flex flex-col items-center justify-center">
            <label
              for="email"
              class="self-start px-8 text-left mb-[5px] justify-start text-neutral-800 text-base font-bold font-['Pretendard']"
              >이메일</label
            >
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="Bing.P 아이디"
              required
              class="w-96 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1) placeholder:text-left placeholder:justify-start placeholder:text-stone-300 placeholder:text-base placeholder:font-bold placeholder:font-['Pretendard']" />
          </div>

          <div class="mb-4 relative flex flex-col mt-[34px] items-center justify-center">
            <label
              for="password"
              class="self-start px-8 blocktext-left mb-[5px] justify-start text-neutral-800 text-base font-bold font-['Pretendard']"
              >비밀번호</label
            >
            <input
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Bing.P 비밀번호"
              required
              class="w-96 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1) placeholder:text-left placeholder:justify-start placeholder:text-stone-300 placeholder:text-base placeholder:font-bold placeholder:font-['Pretendard']" />
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-12 top-11 text-right justify-start text-neutral-800 text-base font-normal font-['Pretendard']">
              {{ showPassword ? "숨기기" : "보기" }}
            </button>
          </div>

          <div class="flex items-center px-8 gap-3 mb-4 text-sm">
            <label class="relative w-[38px] h-5 cursor-pointer">
              <input type="checkbox" v-model="formData.rememberMe" class="sr-only peer" />

              <!-- 배경 바 -->
              <div
                class="w-full h-full bg-zinc-300 rounded-full transition-colors duration-200 peer-checked:bg-[#1456FD]"></div>

              <!-- 토글 핸들 -->
              <div
                class="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 peer-checked:translate-x-[18px]"></div>
            </label>
            <span class="text-center justify-start text-neutral-800 text-base font-normal font-['Pretendard']"
              >로그인 상태 유지</span
            >
          </div>

          <div class="relative mt-10 flex items-center justify-center">
            <button
              type="submit"
              class="w-96 h-12 border border-transparent bg-blue-600 rounded-lg text-white font-semibold hover:border-blue-600 hover:bg-white hover:text-[#262626] transition-colors">
              로그인
            </button>
          </div>
          <div class="w-full max-w-md mt-[20px] mx-auto">
            <div class="flex justify-center items-center space-x-6 relative">
              <!-- 비밀번호 찾기 -->
              <span
                class="text-neutral-800 text-base font-medium font-['Pretendard'] hover:text-blue-600 transition-colors duration-200">
                비밀번호 찾기
              </span>

              <!-- 구분선 1 -->
              <span class="w-px h-4 bg-stone-300"></span>

              <!-- 아이디 찾기 -->
              <span
                class="text-neutral-800 text-base font-medium font-['Pretendard'] hover:text-blue-600 transition-colors duration-200">
                아이디 찾기
              </span>

              <!-- 구분선 2 -->
              <span class="w-px h-4 bg-stone-300"></span>

              <!-- 회원가입 -->
              <router-link
                to="/BingprimeJoin"
                class="text-neutral-800 text-base font-medium font-['Pretendard'] cursor-pointer transition-colors duration-200">
                회원가입
              </router-link>
            </div>

            <!-- 하단 가로선 -->
            <div class="mt-2 w-full h-px bg-stone-300"></div>
          </div>
          <!-- 최상위 부모: 가운데 정렬을 위한 flex 컨테이너 -->
          <div class="w-full flex justify-center items-center mt-10">
            <!-- 버튼 박스 -->
            <router-link
              to="/Reservation"
              class="w-96 h-12 rounded-lg border border-blue-600 flex justify-center items-center hover:bg-blue-600 transition-colors">
              <span class="text-zinc-800 text-base font-bold font-['Pretendard'] hover:text-white transition-colors">
                비회원 예약조회
              </span>
            </router-link>
          </div>
        </div>
        <!-- 탭 1 :클리너 파트너 폼 -->
        <div v-show="activeTab === 1" class="absolute w-full">
          <div class="mb-4 flex flex-col items-center justify-center">
            <label
              for="email"
              class="self-start px-8 text-left mb-[5px] justify-start text-neutral-800 text-base font-bold font-['Pretendard']"
              >사원번호</label
            >
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="클리너 사원번호"
              required
              class="w-96 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1) placeholder:text-left placeholder:justify-start placeholder:text-stone-300 placeholder:text-base placeholder:font-bold placeholder:font-['Pretendard']" />
          </div>

          <div class="mb-4 relative flex flex-col mt-[34px] items-center justify-center">
            <label
              for="password"
              class="self-start px-8 blocktext-left mb-[5px] justify-start text-neutral-800 text-base font-bold font-['Pretendard']"
              >비밀번호</label
            >
            <input
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="비밀번호"
              required
              class="w-96 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1) placeholder:text-left placeholder:justify-start placeholder:text-stone-300 placeholder:text-base placeholder:font-bold placeholder:font-['Pretendard']" />
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-12 top-11 text-right justify-start text-neutral-800 text-base font-normal font-['Pretendard']">
              {{ showPassword ? "숨기기" : "보기" }}
            </button>
          </div>

          <div class="flex items-center px-8 gap-3 mb-4 text-sm">
            <label class="relative w-[38px] h-5 cursor-pointer">
              <input type="checkbox" v-model="formData.rememberMe" class="sr-only peer" />

              <!-- 배경 바 -->
              <div
                class="w-full h-full bg-zinc-300 rounded-full transition-colors duration-200 peer-checked:bg-[#1456FD]"></div>

              <!-- 토글 핸들 -->
              <div
                class="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 peer-checked:translate-x-[18px]"></div>
            </label>
            <span class="text-center justify-start text-neutral-800 text-base font-normal font-['Pretendard']"
              >로그인 상태 유지</span
            >
          </div>

          <div class="relative mt-10 flex items-center justify-center">
            <button
              type="submit"
              class="w-96 h-12 border border-transparent bg-blue-600 rounded-lg text-white font-semibold hover:border-blue-600 hover:bg-white hover:text-[#262626] transition-colors">
              로그인
            </button>
          </div>
          <div class="w-full max-w-md mt-[20px] mx-auto">
            <div class="flex justify-center items-center space-x-6 relative">
              <!-- 비밀번호 찾기 -->
              <span
                class="text-neutral-800 text-base font-medium font-['Pretendard'] hover:text-blue-600 transition-colors duration-200">
                비밀번호 찾기
              </span>

              <!-- 구분선 1 -->
              <span class="w-px h-4 bg-stone-300"></span>

              <!-- 회원가입 -->
              <router-link
                to="/BusinessJoin"
                class="text-neutral-800 text-base font-medium font-['Pretendard'] cursor-pointer transition-colors duration-200">
                회원가입
              </router-link>
            </div>

            <!-- 하단 가로선 -->
            <div class="mt-2 w-full h-px bg-stone-300"></div>
          </div>
          <!-- 최상위 부모: 가운데 정렬을 위한 flex 컨테이너 -->
          <div class="w-full flex justify-center items-center mt-10">
            <!-- 버튼 박스 -->
            <div
              class="w-96 h-12 rounded-lg border border-blue-600 flex justify-center items-center hover:bg-blue-600 transition-colors">
              <span class="text-zinc-800 text-base font-bold font-['Pretendard'] hover:text-white transition-colors">
                사원번호 조회하기
              </span>
            </div>
          </div>
        </div>
        <!-- 탭 2 : 매니저 센터 폼 -->
        <div v-show="activeTab === 2" class="absolute w-full">
          <div class="mb-4 flex flex-col items-center justify-center">
            <label
              for="email"
              class="self-start px-8 text-left mb-[5px] justify-start text-neutral-800 text-base font-bold font-['Pretendard']"
              >아이디</label
            >
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="아이디"
              required
              class="w-96 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1) placeholder:text-left placeholder:justify-start placeholder:text-stone-300 placeholder:text-base placeholder:font-bold placeholder:font-['Pretendard']" />
          </div>

          <div class="mb-4 relative flex flex-col mt-[34px] items-center justify-center">
            <label
              for="password"
              class="self-start px-8 blocktext-left mb-[5px] justify-start text-neutral-800 text-base font-bold font-['Pretendard']"
              >비밀번호</label
            >
            <input
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="비밀번호"
              required
              class="w-96 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1) placeholder:text-left placeholder:justify-start placeholder:text-stone-300 placeholder:text-base placeholder:font-bold placeholder:font-['Pretendard']" />
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-12 top-11 text-right justify-start text-neutral-800 text-base font-normal font-['Pretendard']">
              {{ showPassword ? "숨기기" : "보기" }}
            </button>
          </div>

          <div class="flex items-center px-8 gap-3 mb-4 text-sm">
            <label class="relative w-[38px] h-5 cursor-pointer">
              <input type="checkbox" v-model="formData.rememberMe" class="sr-only peer" />

              <!-- 배경 바 -->
              <div
                class="w-full h-full bg-zinc-300 rounded-full transition-colors duration-200 peer-checked:bg-[#1456FD]"></div>

              <!-- 토글 핸들 -->
              <div
                class="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 peer-checked:translate-x-[18px]"></div>
            </label>
            <span class="text-center justify-start text-neutral-800 text-base font-normal font-['Pretendard']"
              >로그인 상태 유지</span
            >
          </div>

          <div class="relative mt-10 flex items-center justify-center">
            <button
              type="submit"
              class="w-96 h-12 border border-transparent bg-blue-600 rounded-lg text-white font-semibold hover:border-blue-600 hover:bg-white hover:text-[#262626] transition-colors">
              로그인
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const tabs = ["Bing.P 회원", "클리너 파트너", "매니저 센터"];
const activeTab = ref(0);

const formData = ref({
  email: "",
  password: "",
  partnerId: "",
  partnerPassword: "",
  managerId: "",
  managerPassword: "",
  role: "customer",
  rememberMe: false,
});

const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const changeTab = (index) => {
  activeTab.value = index;
  if (index === 0) {
    formData.value.role = "customer";
  } else if (index === 1) {
    formData.value.role = "Worker";
  } else if (index === 2) {
    formData.value.role = "Manager";
  }

  // 탭 변경 시 폼 초기화
  formData.value.email = "";
  formData.value.password = "";
  formData.value.partnerId = "";
  formData.value.partnerPassword = "";
  formData.value.managerId = "";
  formData.value.managerPassword = "";
  formData.value.rememberMe = false;
};

const handleLogin = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  let user;

  if (activeTab.value === 0) {
    user = users.find(
      (u) =>
        u.email === formData.value.email && u.password === formData.value.password && u.role === formData.value.role
    );
  } else if (activeTab.value === 1) {
    user = users.find(
      (u) =>
        u.email === formData.value.partnerId &&
        u.password === formData.value.partnerPassword &&
        u.role === formData.value.role
    );
  } else if (activeTab.value === 2) {
    user = users.find(
      (u) =>
        u.email === formData.value.managerId &&
        u.password === formData.value.managerPassword &&
        u.role === formData.value.role
    );
  } else {
    user = null;
  }

  if (user) {
    authStore.login(user);

    if (user.role === "Worker") {
      router.push("/Worker");
    } else if (user.role === "Manager") {
      router.push("/Manager");
    } else if (user.role === "customer") {
      router.push("/BingPrime");
    } else {
      router.push("/");
    }
  } else {
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  }
};
</script>
<style scoped>

.active-tab {
  color: black;
  border: 2px solid #292929; /* 전체 보더 */
  border-bottom: none; /* 젤 아래선 없애기 */
}

.inactive-tab {
  color: #9ca3af; /* text-gray-400 */
  border: 1px solid #bdbdbd; /* 전체 보더 밝은 회색 1px */
  border-bottom: 2px solid #292929; /* 젤 아래선 진한 회색 1.5px */
}
</style>
