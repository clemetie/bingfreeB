<template>
  <div class="signup">
    <div class="signup-container">
      <h2>회원가입</h2>

      <form class="signup-form" @submit.prevent="handleSingup">
        <div class="form-group">
          <label for="name">이름</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            placeholder="이름을 입력하세요"
            required />
        </div>
        <!-- 유형 고객 / 기사 -->
        <div class="form-group">
          <label for="role">유형</label>
          <select v-model="role" required>
            <option value="customer">고객</option>
            <option value="Worker">기사</option>
          </select>
        </div>
        <div class="form-group">
          <label for="email">이메일</label>
          <div class="input-with-button">
            <input
              type="email"
              id="email"
              v-model="formData.email"
              placeholder="이메일을 입력하세요"
              required />
            <button
              type="button"
              @click="handleEmailVerification"
              :disabled="isEmailVerfied"
              class="verify-btn">
              {{ isEmailVerfied ? "인증완료" : "인증하기" }}
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="password">비밀번호</label>
          <div class="input-with-icon">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="formData.password"
              placeholder="비밀번호를 입력하세요"
              required />
            <button
              type="button"
              @click="togglePassword"
              class="toggle-password">
              {{ showPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>
          <p class="password-hint">8자 이상, 영문, 숫자, 특수문자 포함</p>
          <p v-if="formData.password && !isPasswordValid">
            비밀번호 형식을 확인하세요.
          </p>
        </div>

        <div class="form-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="비밀번호를 다시 입력하세요"
            required />
        </div>

        <div class="form-group">
          <label for="phone">휴대폰 번호</label>
          <div class="input-with-button">
            <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              placeholder="휴대폰 번호를 입력하세요"
              required />
            <button
              type="button"
              @click="handlePhoneVerificaion"
              :disabled="isPhoneVerified"
              class="verify-btn">
              {{ isPhoneVerified ? "인증완료" : "인증하기" }}
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="address">주소</label>
          <div class="input-with-button">
            <input
              type="text"
              id="address"
              v-model="formData.address"
              placeholder="주소를 입력하세요"
              required />
            <button
              type="button"
              @click="handleAddressSearch"
              class="search-btn">
              주소검색
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="detailAddress">상세주소</label>
          <input
            type="text"
            id="detailAddress"
            v-model="formData.detailAddress"
            placeholder="상세주소를 입력하세요"
            required />
        </div>

        <div class="terms-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="formData.agreeTerms" required />
            <span>
              <a href="#" @click.prevent="showTermsModal('terms')">이용약관</a
              >과
              <a href="#" @click.prevent="showTermsModal('privacy')"
                >개인정보처리방침</a
              >에 동의합니다
            </span>
          </label>
        </div>

        <button type="submit" class="signup-btn" :disabled="!isFormValid">
          회원가입
        </button>

        <div class="social-signup">
          <p>또는</p>
          <button type="button" class="social-btn google">
            <span class="social-icon">G</span>
            Google로 회원가입
          </button>
          <button type="button" class="social-btn kakao">
            <span class="social-icon">K</span>
            카카오로 회원가입
          </button>
        </div>
      </form>

      <div class="login-link">
        이미 회원이신가요?
        <router-link to="/login">로그인</router-link>
      </div>
    </div>

    <!-- 약관 모달 -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h3>{{ modalTitle }}</h3>
        <div class="modal-body">
          <p>{{ modalContent }}</p>
        </div>
        <div class="modal-actions">
          <button @click="closeModal">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref, computed } from "vue";
const showModal = ref(false); //모달표시 여부
const showPassword = ref(false); //모달표시 여부
const isEmailVerfied = ref(false); //이메일 인증 완료 여부
const isPhoneVerified = ref(false); //휴대폰 인증 완료 여부
const modalTitle = ref("");
const modalContent = ref("");
// 유형추가
const role = ref("customer");

// 회원가입 폼 데이터 초기화
const formData = ref({
  name: "", // 사용자 이름
  role: "",
  email: "", // 사용자 이메일
  password: "", // 비밀번호
  confirmPassword: "", // 비밀번호 확인
  phone: "", // 휴대폰 번호
  address: "", // 주소
  detailAddress: "", // 상세 주소
  agreeTerms: false, // 이용약관 동의 여부
});
// 폼 유효성 검사
const isFormValid = computed(() => {
  return (
    formData.value.name && // 이름 필수 입력
    formData.value.email && // 이메일 필수 입력
    formData.value.password && // 비밀번호 필수 입력
    formData.value.confirmPassword && // 비밀번호 확인 필수 입력
    formData.value.phone && // 휴대폰 번호 필수 입력
    formData.value.address && // 주소 필수 입력
    formData.value.detailAddress && // 상세 주소 필수 입력
    formData.value.agreeTerms && // 약관 동의 필수
    isEmailVerfied.value && // 이메일 인증 완료 필수
    isPhoneVerified.value && // 휴대폰 인증 완료 필수
    formData.value.password === formData.value.confirmPassword // 비밀번호 일치 확인
  );
});
// 비밀번호 유효성 검사
const isPasswordValid = computed(() => {
  return (
    formData.value.password.length >= 8 && // 최소 8자
    /[A-Za-z]/.test(formData.value.password) && // 영문 포함
    /[0-9]/.test(formData.value.password) && // 숫자 포함
    /[^A-Za-z0-9]/.test(formData.value.password) // 특수 문자 포함
  );
});
// 회원가입 가입 처리
const handleSingup = () => {
  // 1.회원가입 정보 준비
  const userData = {
    id: Date.now(), // 고유 ID 생성 (현재 시간을 밀리초로 사용)
    name: formData.value.name, // 사용자 이름
    role: role.value,
    email: formData.value.email, // 이메일
    password: formData.value.password, // 비밀번호
    phone: formData.value.phone, // 휴대폰 번호
    address: formData.value.address, // 주소
    detailAddress: formData.value.detailAddress, // 상세 주소
    createdAt: new Date().toISOString(), // 계정 생성일 (ISO 형식)
    settings: {
      emailNotifications: true, // 이메일 알림 기본값: 활성화
      smsNotifications: false, // SMS 알림 기본값: 비활성화
    },
  };
  // 2.localStorage에서 기존 사용자 데이터 가져오기
  // 유저 배열 가져오기 (없으면 빈배열)
  // 문자열 => 객체
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
  // 3.이메일 중복 체크
  if (
    existingUsers.some(
      (user) => user.email === userData.email && user.role === userData.role
    )
  ) {
    alert("이미 등록된 이메일입니다.");
    return; //중복된 이메일이면 회원가입 중단
  }
  // 4.새 사용자 추가
  existingUsers.push(userData);
  // 5.업데이트된 사용자 데이터를 localStorage에 저장
  localStorage.setItem("users", JSON.stringify(existingUsers));
  // 6.회원가빕 성공 메시지 표시
  alert("회원가입이 완료 되었습니다.");
  // 7.로그인페이지 이동
  router.push("/Login");
};
// 이메일 인증 처리
const handleEmailVerification = () => {
  isEmailVerfied.value = true; //임시로 인증 완료 처리
};
// 비밀번호 표시 토글
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
// 휴대폰인증 처리
const handlePhoneVerificaion = () => {
  alert("인증완료");
  isPhoneVerified.value = true; // 임시로 인증완료처리
};
//카카오 주소 검색기능
const handleAddressSearch = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      let addr = "";
      let extraAddr = "";

      // 도로명 주소와 지번 주소 구분
      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      // 도로명 주소인 경우 추가 정보 처리
      if (data.userSelectedType === "R") {
        // 동/로 정보가 있는 경우 추가
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있는 경우 추가
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 추가 정보가 있는 경우 괄호로 묶기
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        addr += extraAddr;
      }

      // 선택된 주소를 폼 데이터에 설정
      formData.value.address = addr;
    },
  }).open();
};
// 약관 내용 정의
const terms = {
  terms: "이용약관 내용...", // 서비스 이용약관
  privacy: "개인정보처리방침 내용...", // 개인정보 처리방침
};

// 약관 모달 표시
const showTermsModal = (type) => {
  // 모달 제목 설정
  modalTitle.value = type === "terms" ? "이용약관" : "개인정보처리방침";
  // 모달 내용 설정
  modalContent.value = terms[type];
  // 모달 표시
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
.signup {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 2rem;
}

.signup-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

input,
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.input-with-button {
  display: flex;
  gap: 0.5rem;
}

.input-with-icon {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.verify-btn,
.search-btn {
  padding: 0.75rem 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.verify-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.password-hint {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
}

.terms-group {
  margin: 2rem 0;
}

.checkbox-label {
  width: 80%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}
.checkbox-label input {
  flex: 1;
}
.checkbox-label span {
  flex: 8;
}
.checkbox-label a {
  color: #4caf50;
  text-decoration: none;
}

.checkbox-label a:hover {
  text-decoration: underline;
}

.signup-btn {
  width: 100%;
  padding: 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 1.5rem;
}

.signup-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.signup-btn:not(:disabled):hover {
  background: #45a049;
}

.social-signup {
  text-align: center;
  margin-bottom: 1.5rem;
}

.social-signup p {
  color: #666;
  margin-bottom: 1rem;
  position: relative;
}

.social-signup p::before,
.social-signup p::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background: #ddd;
}

.social-signup p::before {
  left: 0;
}

.social-signup p::after {
  right: 0;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-btn {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.social-btn img {
  width: 20px;
  height: 20px;
}

.social-btn.google:hover {
  background: #f5f5f5;
}

.social-btn.kakao {
  background: #fee500;
  border-color: #fee500;
}

.social-btn.kakao:hover {
  background: #ffe812;
}

.login-link {
  text-align: center;
  color: #666;
}

.login-link a {
  color: #4caf50;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.5rem;
}

.login-link a:hover {
  text-decoration: underline;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal h3 {
  margin-bottom: 1rem;
  color: #333;
}

.modal-body {
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
}

.modal-actions button {
  padding: 0.75rem 1.5rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.social-icon {
  font-weight: bold;
  font-size: 1.2rem;
}

@media (max-width: 480px) {
  .signup {
    padding: 1rem;
  }

  .signup-container {
    padding: 1.5rem;
  }
}
</style>
