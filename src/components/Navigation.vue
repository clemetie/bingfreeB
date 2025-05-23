<script setup></script>
<template>
  <header>
    <div class="inner">
      <router-link to="/"><img src="/images/main-logo.png" alt="" /></router-link>
      <nav>
        <router-link to="/BingprimeReservation">예약하기</router-link>
        <router-link to="/SubBenefit">구독요금</router-link>
        <router-link to="/Faq">FAQ</router-link>
        <router-link to="/CustomerProfile">프로필</router-link>
      </nav>
    </div>
  </header>
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
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 100px;
    }
    nav {
      display: flex;
      a {
        color: #111;
        font-weight: 600;
        margin-left: 70px;
        position: relative;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
        }
      }
    }
  }
}
@media (max-width: 800px) {
  header {
    margin-bottom: -80px;
    position: fixed;
    background-color: #fff;
    top: 0;
    .inner {
      margin: auto;
      max-width: 700px;
      // background-color: rgba($color: #ff0000, $alpha: 0.5);
      img {
        width: 120px;
        left: 8%;
      }
      nav {
        display: flex;
        margin-right: 5%;
        a {
          color: #111;
          font-weight: 600;
          margin-left: 40px;
          position: relative;
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
          }
        }
      }
    }
  }
}
</style>
