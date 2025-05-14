<template>
  <!-- <div
    style="
      text-align: center;
      padding: 50px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 120px;
      gap: 20px;
    "
  >
    <p class="main-h1">404 - 페이지를 찾을 수 없습니다</p>
    <p>존재하지 않는 경로입니다.</p>
    <router-link
      to="/"
      style="
        text-decoration: none;
        border: 1px solid #ddd;
        width: 30%;
        text-align: center;
        border-radius: 10px;
        padding: 10px 5px;
      "
      >홈으로 돌아가기</router-link
    >
  </div> -->
  <div
    id="p404"
    style="
      width: 100vw;
      height: 80vh;
      margin-top: -100px;
      color: #ecebeb;
      font-weight: 400;
    "
  >
    <div
      id="p404-co"
      style="
        position: absolute;
        width: 100vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        display: flex;
        flex-direction: column;
        row-gap: calc(20 / var(--b) * 100vw);
        text-align: center;
        box-sizing: border-box;
        max-width: calc(380 / var(--b) * 100vw);
        margin-top: -100px;
      "
    >
      <svg
        width="40"
        height="28"
        viewBox="0 0 40 28"
        fill="none"
        style="
          width: calc(39.27 / var(--b) * 100vw);
          height: calc(26.79 / var(--b) * 100vw);
          margin: 0 auto 10px;
        "
      >
        <path
          d="M31.3926 27.2252C31.8402 27.6728 32.5621 27.7017 33.0242 27.2252C33.5007 26.7342 33.4718 26.0412 33.0242 25.5935L8.52093 1.11915C8.07331 0.671532 7.33691 0.657093 6.8893 1.11915C6.45612 1.55232 6.45612 2.30316 6.8893 2.73633L31.3926 27.2252ZM32.7499 22.8068C36.9661 19.9767 39.6373 16.1503 39.6373 14.4465C39.6373 11.5298 31.7102 2.07213 20.0001 2.07213C17.5454 2.07213 15.2496 2.49087 13.1703 3.18395L17.1267 7.14028C18.0219 6.7793 18.9893 6.57715 20.0145 6.57715C24.3896 6.57715 27.9272 10.057 27.9272 14.4609C27.9272 15.4717 27.7106 16.4535 27.3207 17.3343L32.7499 22.8068ZM20.0001 26.8353C22.6424 26.8353 25.0971 26.3588 27.263 25.5647L23.2778 21.5795C22.2959 22.0704 21.1841 22.3303 20.0145 22.3303C15.6106 22.3303 12.1018 18.7349 12.0874 14.4609C12.0874 13.2625 12.3473 12.1362 12.8238 11.1399L7.61126 5.89851C3.12068 8.78635 0.362793 12.7427 0.362793 14.4465C0.362793 17.3777 8.43429 26.8353 20.0001 26.8353ZM24.6206 14.1577C24.6206 11.6309 22.5991 9.59494 20.0578 9.59494C19.899 9.59494 19.7402 9.60938 19.5958 9.62382L24.5917 14.6053C24.6062 14.4754 24.6206 14.3166 24.6206 14.1577ZM15.3651 14.2155C15.3651 16.7423 17.4443 18.7783 19.9568 18.7783C20.13 18.7783 20.2889 18.7638 20.4477 18.7494L15.394 13.6957C15.3795 13.8689 15.3651 14.0422 15.3651 14.2155Z"
          fill="#ECEBEB"
        ></path>
      </svg>
      <div
        id="p404-co-ti"
        style="
          font-size: 38px;
          line-height: calc(28.98 / var(--b) * 100vw);
          letter-spacing: calc(((23 / var(--b) * 100vw) * -1) / 100);
          font-weight: 700;
        "
      >
        Error 404 Page
      </div>
      <div
        id="p404-co-de"
        style="
          font-size: calc(20 / var(--b) * 100vw);
          line-height: calc(25.2 / var(--b) * 100vw);
          letter-spacing: calc(((20 / var(--b) * 100vw) * -1) / 100);
          opacity: 0.8;
        "
      >
        The page you are looking for cannot be found. It might have been
        removed, renamed, or is temporarily unavailable.
      </div>
    </div>
    <div
      id="p404-cta"
      style="
        width: 100%;
        margin: 100px auto;
        position: absolute;
        bottom: 0;
        left: calc(20 / var(--b) * 100vw);
        right: calc(20 / var(--b) * 100vw);
        z-index: 2;
        border-top: calc(1 / var(--b) * 100vw) solid #787878;
        font-size: 24px;
        line-height: 1;
        letter-spacing: calc(((18 / var(--b) * 100vw) * -1) / 100);
        font-weight: 700;
        text-align: center;
        padding: calc(30 / var(--b) * 100vw) 0;
      "
    >
      <router-link
        to="/"
        style="
          position: relative;
          display: inline-flex;
          flex-direction: column;
          row-gap: 1px;
          overflow: hidden;
          height: calc(18 / var(--b) * 100vw);
          color: #fff;
        "
        >Back to Home</router-link
      >
    </div>
    <picture>
      <img
        src="/images/web_visual01.png"
        alt="404"
        style="width: 100%; filter: blur(100px)"
    /></picture>
  </div>
</template>
