<!-- 채연 설정 -->
<template>
  <div class="p-8 max-w-7xl dark:bg-gray-900">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">
      {{ t("settings.title") }}
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- 알림 설정 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div
          class="bg-gray-50 dark:bg-gray-700 p-6 border-b border-gray-200 dark:border-gray-600 flex items-center gap-4">
          <i class="fas fa-bell text-xl text-blue-500"></i>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
            {{ t("settings.notifications.title") }}
          </h2>
        </div>
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.notifications.email.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.notifications.email.description") }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.emailNotifications" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.notifications.push.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.notifications.push.description") }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.pushNotifications" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.notifications.cancel.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.notifications.cancel.description") }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.cancelNotifications" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- 테마 설정 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div
          class="bg-gray-50 dark:bg-gray-700 p-6 border-b border-gray-200 dark:border-gray-600 flex items-center gap-4">
          <i class="fas fa-palette text-xl text-blue-500"></i>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
            {{ t("settings.theme.title") }}
          </h2>
        </div>
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.theme.darkMode.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.theme.darkMode.description") }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.darkMode" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div class="space-y-4">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.theme.colorTheme.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.theme.colorTheme.description") }}
              </p>
            </div>
            <div class="flex gap-3">
              <div
                v-for="color in colorThemes"
                :key="color.value"
                class="w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110"
                :class="{
                  'ring-2 ring-offset-2 ring-gray-800 dark:ring-white': settings.colorTheme === color.value,
                }"
                :style="{ backgroundColor: color.value }"
                @click="settings.colorTheme = color.value"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 시스템 설정 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div
          class="bg-gray-50 dark:bg-gray-700 p-6 border-b border-gray-200 dark:border-gray-600 flex items-center gap-4">
          <i class="fas fa-cog text-xl text-blue-500"></i>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
            {{ t("settings.system.title") }}
          </h2>
        </div>
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.system.autoSave.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.system.autoSave.description") }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.autoSave" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div class="space-y-2">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.system.language.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.system.language.description") }}
              </p>
            </div>
            <select
              v-model="settings.language"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 데이터 관리 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div
          class="bg-gray-50 dark:bg-gray-700 p-6 border-b border-gray-200 dark:border-gray-600 flex items-center gap-4">
          <i class="fas fa-database text-xl text-blue-500"></i>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
            {{ t("settings.data.title") }}
          </h2>
        </div>
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.data.backup.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.data.backup.description") }}
              </p>
            </div>
            <button
              @click="backupData"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              {{ t("settings.data.backup.button") }}
            </button>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-gray-800 dark:text-white font-medium">
                {{ t("settings.data.restore.title") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("settings.data.restore.description") }}
              </p>
            </div>
            <button
              @click="restoreData"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              {{ t("settings.data.restore.button") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button
        @click="saveSettings"
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        {{ t("settings.saveButton") }}
      </button>
    </div>

    <!-- 토스트 메시지 -->
    <div
      v-if="showToast"
      class="fixed bottom-8 right-8 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg animate-slide-in">
      {{ t("settings.savedMessage") }}
    </div>
  </div>
</template>
<script setup>
// 언어설정 라이브러리
// npm install vue-i18n@next - 설치
import { useI18n } from "vue-i18n";
import { reactive, ref, watchEffect } from "vue";
const { t, locale } = useI18n();
const showToast = ref(false);
// 페이지 로드시 즉시 다크모드 설정 적용
// localStorage에서 "darkMode" 가져옴(문자열 "true" 또는  "false")
const isDarkMode = localStorage.getItem("darkMode") === "true";
// 설정정보를 담고 있는 반응형 객체
const settings = reactive({
  emailNotifications: true, //이메일 알림 여부
  pushNotifications: true,
  cancelNotifications: false,
  autoSave: true,
  // 다크모드 설정
  //  기본값 : localStorage에서 가져온 isDarkMode 값
  // true면 다크모드 , false면 라이트 모드
  darkMode: isDarkMode,
  //   언어설정
  language: localStorage.getItem("language") || "ko",
});
// 언어 변경 감시
watchEffect(() => {
  locale.value = settings.language;
  localStorage.setItem("language", settings.language);
  // 다크모드설정이 변경될때마다 실행시킴
  const isDark = settings.darkMode;
  localStorage.setItem("darkMode", isDark);
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

// 선택할 수 있는 색상 테마 목록
const colorThemes = [
  { value: "#3498db", label: "파란색" },
  { value: "#2ecc71", label: "초록색" },
  { value: "#e74c3c", label: "빨간색" },
  { value: "#f1c40f", label: "노란색" },
  { value: "#9b59b6", label: "보라색" },
];
// 데이터 백업 함수(알림만 표시)
const backupData = () => {
  alert("데이터 백업이 시작되었습니다.");
};
// 데이터 복원 함수(알림만 표시)
const restoreData = () => {
  alert("데이터 복원이 시작되었습니다.");
};
// 설정 저장시 호출되는 함수
const saveSettings = () => {
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000); //3초후에 숨김
};
</script>
<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>
