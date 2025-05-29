// Pinia에서 스토어를 정의하기 위해 defineStore를 불러옴
import { defineStore } from "pinia";
import { dummyUsers } from "@/data.mjs";

// 'auth'라는 이름의 인증 스토어 정의
export const useAuthStore = defineStore("auth", {
  // 상태(state): 로그인 상태 및 사용자 정보 저장
  state: () => ({
    // 로컬스토리지에 저장된 로그인 상태를 불러와 초기값으로 사용
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    userRole: localStorage.getItem("userRole") || "",
    // 저장된 사용자 이름 또는 기본값 ''
    // Pinia에서 userName으로 자동 저장
    userName: localStorage.getItem("userName") || "",

    // 저장된 이메일 또는 기본값 ''
    userEmail: localStorage.getItem("userEmail") || "",
    // 주소
    userAddress: localStorage.getItem("userAddress") || "",
    userDetailAddress: localStorage.getItem("userDetailAddress") || "",
    // 전화번호
    userPhone: localStorage.getItem("userPhone") || "",
    // 가입날짜
    userCreatedAt: localStorage.getItem("userCreatedAt") || "",
  }),

  // 계산된 값(getters): 상태를 기반으로 값을 가공하여 제공
  getters: {
    // 사용자 이름 반환
    getUserName: (state) => state.userName,
    getUserRole: (state) => state.userRole,
    // 로그인 여부 반환
    getIsLoggedIn: (state) => state.isLoggedIn,
    getUserEmail: (state) => state.userEmail,
    getUserPhone: (state) => state.userPhone,
    getUserAddress: (state) => state.userAddress,
    getUserDetailAddress: (state) => state.userDetailAddress,
    getUserCreatedAt: (state) => state.userCreatedAt,
  },

  // 상태를 변경하는 메서드 정의
  actions: {
    // 로그인 처리 메서드
    // 보통 로그인 폼 데이터를 담아서 넘겨주는 객체
    // login() 함수를 호출할 때 userData를 전달하면, 함수 안에서 그 값을 받아서 사용
    // userData는 어디선가 직접 전달해줘야 해요.
    login(userData) {
      const found = dummyUsers.find(
        (user) =>
          user.email === userData.email && user.password === userData.password
      );

      if (!found) {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
      }

      this.isLoggedIn = true;
      this.userName = found.name;
      this.userEmail = found.email;
      this.userPhone = found.phone;
      this.userAddress = found.address;
      this.userDetailAddress = found.detailAddress;
      this.userCreatedAt = found.createdAt;
      this.userRole = found.role;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", found.name);
      localStorage.setItem("userEmail", found.email);
      localStorage.setItem("userRole", found.role);
      // 나머지도 필요하면 저장

      return Promise.resolve(); // ✅ 로그인 성공 시 then 쓸 수 있도록
    },
    // 로그아웃 처리 메서드
    logout() {
      // 상태 초기화
      this.isLoggedIn = false;
      this.userName = "";
      this.userEmail = "";
      this.userId = null;
      this.userPhone = "";
      this.userAddress = "";
      this.userDetailAddress = "";
      this.userCreatedAt = "";
      this.userRole = "";
      localStorage.removeItem("userRole");
      // 로컬스토리지에서도 삭제
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
    },
    // 프로필 업데이트
    updateProfile(profileData) {
      console.log(profileData);
      this.userName = profileData.name;
      this.userPhone = profileData.phone;
      this.userAddress = profileData.address;
      this.userDetailAddress = profileData.detailAddress;
    },
  },
});
