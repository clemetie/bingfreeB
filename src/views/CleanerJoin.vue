<template>
  <div class="agree_box max-w-[860px] mx-auto py-20 px-6 bg-white">
    <!-- 제목 -->
    <h2 class="text-3xl font-bold text-center text-neutral-800 mb-16">정보입력</h2>

    <!-- 단계 표시 -->
    <div class="flex justify-center">
      <div class="w-[485px] h-24 relative rounded-[100px]">
        <div
          class="left-[5px] top-[82px] absolute justify-start text-neutral-400 text-base font-semibold font-['Pretendard']">
          약관동의
        </div>
        <div
          class="left-[207px] top-[82px] absolute justify-start text-neutral-800 text-base font-semibold font-['Pretendard']">
          클리너 정보
        </div>
        <div
          class="left-[425px] top-[82px] absolute justify-start text-neutral-400 text-base font-semibold font-['Pretendard']">
          가입완료
        </div>
        <div
          class="w-36 h-0 left-[65px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>
        <div
          class="w-36 h-0 left-[275px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>
        <div class="w-16 h-16 left-[210px] top-0 absolute bg-blue-700 rounded-[100px]"></div>
        <div
          class="left-[233px] top-[15px] absolute justify-start text-white text-3xl font-semibold font-['Pretendard']">
          2
        </div>
        <div class="w-16 h-16 left-[420px] top-0 absolute rounded-[100px] border-2 border-blue-700"></div>
        <div
          class="left-[443px] top-[15px] absolute justify-start text-blue-700 text-3xl font-semibold font-['Pretendard']">
          3
        </div>
        <div class="w-16 h-16 left-0 top-0 absolute rounded-[100px] border border-blue-700"></div>
        <div
          class="left-[26px] top-[15px] absolute justify-start text-blue-700 text-3xl font-semibold font-['Pretendard']">
          1
        </div>
      </div>
    </div>

    <!-- 로그인 폼 -->
    <div class="w-[860px] mt-[100px] mb-[120px] flex flex-col items-center justify-center px-4">
      <!-- 탭 -->
      <div class="w-[860px] mt-[100px] mb-[120px] flex flex-col items-start justify-center px-4">
        <!-- 탭 -->
        <div class="w-full max-w-[860px] flex h-14 mb-6">
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
        <!-- activeTab === 0: 회원 정보 입력 -->
        <div
          v-if="activeTab === 0"
          class="flex justify-start w-full mt-[42px] relative text-black text-xl font-bold font-['Pretendard']"
          style="padding-bottom: 42px">
          회원 정보 입력 (필수)
          <span
            class="absolute left-0 bottom-0 w-[860px] h-0 outline outline-1 outline-offset-[-0.5px] outline-neutral-400"
            style="content: ''; display: block"></span>
        </div>

        <!-- activeTab === 1: 비회원 정보 입력 -->
        <div
          v-else-if="activeTab === 1"
          class="flex justify-start w-full mt-[42px] relative text-black text-xl font-bold font-['Pretendard'] border-none"
          style="padding-bottom: 42px">
          비즈니스 정보 입력 (필수)
          <span
            class="absolute left-0 bottom-0 w-[860px] h-0 outline outline-1 outline-offset-[-0.5px] outline-neutral-400"
            style="content: ''; display: block"></span>
        </div>
      </div>

      <!-- 로그인 폼 -->
      <form @submit.prevent="handleLogin" class="w-full max-w-[860px]">
        <div class="relative w-full max-w-[860px] min-h-[800px]">
          <!-- 탭 0 :Bing.p 회원 폼 -->
          <div v-show="activeTab === 0" class="relative w-full min-h-screen">
            <!-- 이름 -->
            <div class="flex flex-row items-center w-full max-w-2xl space-x-4 mb-4">
              <label for="email" class="w-32 text-base font-bold text-neutral-800"> 이름 </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                placeholder="* 이름을 입력해 주세요."
                required
                class="flex-1 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1)] placeholder:text-stone-300 placeholder:text-base font-['Pretendard']" />
            </div>

            <!-- 아이디 -->
            <div class="mt-[36px] flex flex-row items-center w-full max-w-2xl space-x-4 mb-4">
              <label for="id" class="w-32 text-base font-bold text-neutral-800 font-['Pretendard']"> 아이디 </label>
              <input
                id="id"
                v-model="formData.id"
                type="text"
                placeholder="* 한글은 10자 , 영문은 20자 이내로"
                required
                class="flex-1 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1)] placeholder:text-stone-300 placeholder:text-base placeholder:font-bold font-['Pretendard']" />
              <button
                type="button"
                class="w-44 h-11 bg-blue-600 rounded-lg text-white text-base font-bold font-['Pretendard'] hover:bg-blue-700 transition">
                중복확인
              </button>
            </div>

            <!-- 비밀번호 -->

            <div class="mt-[36px] flex flex-row items-center w-full max-w-2xl space-x-4 mb-4">
              <label for="password" class="w-32 text-base font-bold text-neutral-800 font-['Pretendard']">
                비밀번호
              </label>
              <input
                id="password"
                v-model="formData.password"
                type="password"
                placeholder="영문, 숫자, 특수문자 조합 8자 이상"
                required
                class="flex-1 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1)] placeholder:text-stone-300 placeholder:text-base placeholder:font-bold font-['Pretendard']" />
            </div>
            <!-- 비밀번호 확인 -->
            <div class="flex flex-row items-center w-full max-w-2xl space-x-4 mb-4">
              <label for="passwordCheck" class="w-32 text-base font-bold text-neutral-800 font-['Pretendard']">
                비밀번호 확인
              </label>
              <input
                id="passwordCheck"
                v-model="formData.passwordcheck"
                :type="showPassword ? 'text' : 'password'"
                placeholder="비밀번호를 다시 입력해 주세요."
                required
                class="mt-[36px] flex-1 h-12 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1)] placeholder:text-stone-300 placeholder:text-base placeholder:font-bold font-['Pretendard']" />
              <button
                type="button"
                @click="togglePassword"
                class="mt-[36px] w-20 h-11 bg-gray-200 rounded-lg text-neutral-800 text-base font-bold font-['Pretendard'] hover:bg-gray-300 transition">
                {{ showPassword ? "숨기기" : "보기" }}
              </button>
            </div>

            <!-- 성별 -->
            <div class="flex flex-row items-center w-full max-w-2xl space-x-4 mb-4">
              <label class="w-32 text-base font-bold text-neutral-800 font-['Pretendard']"> 성별 </label>

              <div class="mt-[36px] flex flex-row items-center space-x-6">
                <!-- 여성 -->
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    v-model="formData.gender"
                    class="appearance-none w-5 h-5 rounded-full border border-neutral-400 checked:bg-blue-700 relative" />
                  <span class="text-sm font-semibold text-neutral-400 font-['Pretendard']">여성</span>
                </label>

                <!-- 남성 -->
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    v-model="formData.gender"
                    class="appearance-none w-5 h-5 rounded-full border border-neutral-400 checked:bg-blue-700 relative" />
                  <span class="text-sm font-semibold text-neutral-400 font-['Pretendard']">남성</span>
                </label>
              </div>
            </div>

            <!-- 휴대폰 번호 -->

            <div class="mt-[36px] flex flex-row items-center w-full max-w-4xl space-x-4 mb-4">
              <!-- 라벨 -->
              <label for="mobile1" class="w-32 text-base font-bold text-neutral-800 font-['Pretendard']">
                휴대전화
              </label>

              <!-- 앞자리 선택 -->
              <select
                id="mobile1"
                name="mobile[]"
                class="w-24 h-12 px-3 rounded-lg border border-stone-300 bg-white text-base font-bold text-neutral-700 font-['Pretendard'] focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1)]">
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="016">016</option>
                <option value="017">017</option>
                <option value="018">018</option>
                <option value="019">019</option>
              </select>

              <span class="text-lg font-semibold">-</span>

              <!-- 중간 자리 -->
              <input
                id="mobile2"
                name="mobile[]"
                maxlength="4"
                type="text"
                class="w-24 h-12 px-3 rounded-lg border border-stone-300 text-center text-base font-bold placeholder:text-stone-300 font-['Pretendard'] focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1)]" />

              <span class="text-lg font-semibold">-</span>

              <!-- 마지막 자리 -->
              <input
                id="mobile3"
                name="mobile[]"
                maxlength="4"
                type="text"
                class="w-24 h-12 px-3 rounded-lg border border-stone-300 text-center text-base font-bold placeholder:text-stone-300 font-['Pretendard'] focus:outline-none focus:ring focus:ring-[rgba(20,86,253,1)]" />

              <!-- 인증번호 전송 버튼 -->
              <button
                id="sendnum"
                type="button"
                class="w-44 h-11 bg-blue-600 rounded-lg text-white text-base font-bold font-['Pretendard'] hover:bg-blue-700 transition">
                인증번호 전송
              </button>
            </div>
            <!-- 기사 지도 -->
            <div class="mt-6">
              <label class="block font-semibold mb-2">활동 지역 선택</label>
              <KakaoMap ref="kakaoMap" />
            </div>

            <!-- 기사 결제 정보 -->

            <div>
              <label class="block font-semibold mb-1">은행명</label>
              <select v-model="formData.bank" class="w-full border rounded px-3 py-2 mb-3">
                <option value="">선택하세요</option>
                <option v-for="bank in bankList" :key="bank" :value="bank">
                  {{ bank }}
                </option>
              </select>

              <label class="block font-semibold mb-1">계좌번호</label>
              <input
                type="number"
                v-model="formData.accountNumber"
                class="w-full border rounded px-3 py-2"
                placeholder="숫자만 입력" />
            </div>
            <!-- 결제 받는 방식 -->
            <div class="flex flex-row items-center w-full max-w-2xl space-x-4 mb-4">
              <label class="w-32 text-base font-bold text-neutral-800 font-['Pretendard']">정산 주기 설정</label>

              <div class="mt-[36px] flex items-center space-x-8">
                <!-- 주급 -->
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paytype"
                    value="week"
                    v-model="formData.paytype"
                    class="appearance-none w-5 h-5 rounded-full border border-neutral-400 relative checked:border-blue-600 checked:bg-white checked:after:content-[''] checked:after:block checked:after:w-2.5 checked:after:h-2.5 checked:after:rounded-full checked:after:bg-blue-600 checked:after:mx-auto checked:after:my-auto checked:after:mt-[3px]" />
                  <span class="text-base font-semibold text-neutral-700 font-['Pretendard']">주급</span>
                </label>

                <!-- 월급 -->
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paytype"
                    value="month"
                    v-model="formData.paytype"
                    class="appearance-none w-5 h-5 rounded-full border border-neutral-400 relative checked:border-blue-600 checked:bg-white checked:after:content-[''] checked:after:block checked:after:w-2.5 checked:after:h-2.5 checked:after:rounded-full checked:after:bg-blue-600 checked:after:mx-auto checked:after:my-auto checked:after:mt-[3px]" />
                  <span class="text-base font-semibold text-neutral-700 font-['Pretendard']">월급</span>
                </label>
              </div>
            </div>

            <!-- 절취선 -->
            <div class="mt-[70px] w-[860px] border-t-2 border-neutral-800"></div>
            <div class="flex justify-center mt-10">
              <router-link
                to="/PersonalJoin"
                class="w-[430px] h-[60px] rounded-l-lg border border-neutral-400 bg-white text-neutral-400 hover:border-blue-600 hover:text-[#262626] flex items-center justify-center font-semibold transition-colors">
                이전
              </router-link>
              <button
                @click="lastModal"
                class="w-[430px] h-[60px] rounded-r-lg border border-transparent bg-blue-600 text-white hover:border-blue-600 hover:bg-white hover:text-[#262626] flex items-center justify-center font-semibold transition-colors">
                다음
              </button>
            </div>

            <!-- 마지막 결제 모달 -->
            <div
              v-if="showLastModal"
              class="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
              <div
                class="w-[459px] h-80 bg-white rounded-lg shadow-xl flex flex-col items-center justify-between py-6 px-4 relative">
                <!-- 닫기 버튼 -->
                <img
                  class="w-5 h-5 absolute top-4 right-4 cursor-pointer"
                  src="/prime/Modal_close.png"
                  @click="closeLastModal" />
                <div class="text-xl font-bold text-black mt-2">클리너 {{}}님, 반갑습니다</div>
                <img class="w-10 h-10 my-2" src="/prime/SubSelct_check.png" />
                <div class="text-center text-neutral-400 text-base font-normal px-4">
                  기사 등록이 완료되었어요!<br />
                  이제 바로 고객 청소 예약을 확인하고 출동 준비를 시작할 수 있어요.
                </div>
                <div class="flex w-full justify-center mt-4">
                  <router-link
                    @click="submitForm"
                    to="/Worker/DDashboard"
                    class="w-48 h-16 flex items-center justify-center bg-blue-600 text-white text-lg font-semibold rounded-xl">
                    파트너 홈으로 이동
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- 탭 1 :클리너 파트너 폼 -->
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
// 지도
import KakaoMap from "@/components/KaKaoMap.vue";

const router = useRouter();
const authStore = useAuthStore();

const tabs = ["개인회원", ""];
const activeTab = ref(0);

const formData = reactive({
  email: "",
  password: "",
  partnerId: "",
  partnerPassword: "",
  managerId: "",
  managerPassword: "",
  role: "customer",
  rememberMe: false,
  name: "",
  phone: "",
  city: "",
  district: "",
  bank: "국민은행",
  accountNumber: "",
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
  // 지도에서 선택한 시/구 값 가져오기
  if (kakaoMap.value && kakaoMap.value.region) {
    formData.value.city = kakaoMap.value.region.city;
    formData.value.district = kakaoMap.value.region.district;
  }

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
  } else {
    user = null;
  }

  if (user) {
    authStore.login({
      ...user,
      city: formData.value.city,
      district: formData.value.district,
    });

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

// 기사 지도
const kakaoMap = ref(null);
// 은행명
const bankList = [
  "국민은행",
  "신한은행",
  "우리은행",
  "하나은행",
  "농협은행",
  "기업은행",
  "SC제일은행",
  "케이뱅크",
  "카카오뱅크",
  "토스뱅크",
  "수협은행",
  "대구은행",
  "부산은행",
  "광주은행",
  "전북은행",
  "제주은행",
];

// 모달
// 모달 표시 상태

const showLastModal = ref(false);

const lastModal = () => {
  showLastModal.value = true;
};

const closeLastModal = () => {
  showLastModal.value = false;
};

// 회원가입 저장
// eCleanerForm.vue
function submitForm() {
  const data = {
    name: form.name,
    phone: form.phone,
    email: form.email,
    region: form.region,
  };
  sessionStorage.setItem("workerInfo", JSON.stringify(data));

  router.push("/worker/home");
}
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
#map {
  width: 100%;
  height: 400px;
}
</style>
