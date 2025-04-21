<template>
  <div
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
  </div>
</template>
