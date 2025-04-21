<script setup></script>
<template>
  <footer class="footer-container">
    <div id="app">
      <div class="footer-content">
        <!-- 좌측 영역: 로고 & "Contact us"-->
        <div class="footer-left">
          <!-- 로고 -->
          <div class="footer-logo">
            <router-link to="/"><img src="/public/images/footer_logo.png" alt="footer_logo" /></router-link>
          </div>
          <div class="footer-txt2">
            <!-- 연락처 -->
            <div class="footer-contact">
              <h3 class="footer-contact-title" style="color: #e9ff54">Contact us</h3>
              <p class="footer-contact-phone">064-739-6155</p>
              <p class="footer-contact-email">bingfree.korea@gmail.com</p>
            </div>
            <!-- 우측 영역: 주소 & 영업시간 -->
            <div class="footer-right">
              <div class="footer-address">
                <h3 style="color: #e9ff54">address</h3>
                <p class="footer-txt3">대구시 중구 중앙대로 394<br />제일빌딩 4F</p>
              </div>
              <div class="footer-hours">
                <h3 style="color: #e9ff54">cs opening hours</h3>
                <p class="footer-txt4">Monday - Friday <br />09:00 AM - 18:00 PM</p>
              </div>
            </div>
            <div class="footer-copy">
              <p class="copy">BINGFREE @COPYRIGHT 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
/* 공통 css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,
html {
  height: 100%;
  margin: 0;
  font-family: "Pretendard", sans-serif;
}
#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
/* 푸터 전체 컨테이너 */
.footer-container {
  caret-color: transparent;
  background-color: #1456fd;
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
}
.footer-left {
  display: flex;
  position: absolute;
  top: 20%;
  left: 10%;
  width: 100%;
  gap: 15%;
}
/* 로고 */
.footer-logo {
  width: 180px;
  display: block;
}
.footer-logo img {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: contain; /* 또는 cover */
}
.footer-right {
  width: 900px;
  padding-top: 4%;
  display: flex;
  gap: 10%;
  /* background-color: pink; */
}
/* 폰트 컬러, 사이즈 */
.footer-contact-title {
  font-weight: 500;
  font-size: 15px;
  padding-bottom: 1%;
}
.footer-address h3,
.footer-hours h3 {
  font-weight: 500;
  font-size: 15px;
}

.footer-contact-phone,
.footer-contact-email {
  color: #fff;
  font-size: 20px;
  font-weight: 500;
}
.footer-txt3 {
  padding-top: 3%;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
}
.footer-txt4 {
  padding-top: 3%;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}
.footer-copy {
  color: #fff;
  font-size: 13px;
  padding-top: 7%;
}

/* 모바일 */
@media (min-width: 370px) and (max-width: 767px) {
  .footer-logo {
    padding-bottom: 2%;
    width: 130px;
    display: block;
  }
  .footer-address h3,
  .footer-hours h3 {
    padding-top: 2%;
    font-weight: 500;
    font-size: 11px;
  }
  .footer-contact-phone,
  .footer-contact-email {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }
  .footer-contact-title {
    font-weight: 500;
    font-size: 11px;
    padding-bottom: 1%;
    padding-top: 4%;
  }
  .footer-txt3 {
    padding-top: 0.8%;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
  }
  .footer-txt4 {
    padding-top: 0.8%;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
  }
  .footer-left {
    display: block;
    position: absolute;
    top: 17%;
    left: 10%;
    width: 100%;
  }
  .footer-right {
    padding-top: 2%;
    display: block;
  }
  .footer-copy {
    color: #fff;
    font-size: 9px;
    padding-top: 7%;
  }
}
/* 태블릿 */
@media (min-width: 768px) and (max-width: 1023px) {
  .footer-left {
    display: block;
    position: absolute;
    top: 17%;
    left: 10%;
    width: 100%;
    gap: 15%;
  }
  .footer-logo {
    padding-bottom: 3%;
  }
  .footer-copy {
    color: #fff;
    font-size: 13px;
    padding-top: 3%;
  }
}
</style>
