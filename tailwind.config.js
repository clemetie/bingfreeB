// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",

    // ❗ 제외할 파일 명시 (경로는 정확히 수정)
    "!./src/views/BingFree.vue",
  ],
  theme: {
     extend: {
      colors: {
        gray1: '#f5f5f5',
        gray2: '#eeeeee',
        gray3: '#e0e0e0',
        gray4: '#bdbdbd',
        gray5: '#9e9e9e',
        gray6: '#757575',
        gray7: '#616161',
        gray8: '#424242',
        black: '#212121',
      },
    },
  },
  plugins: [],
};
