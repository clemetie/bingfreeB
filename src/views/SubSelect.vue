<template>
  <div class="agree_box max-w-[860px] mx-auto py-20 px-6 bg-white">
    <!-- 제목 -->
    <h2 class="text-3xl font-bold text-center text-neutral-800 mb-16">정보입력</h2>

    <!-- 단계 표시 -->
    <div class="flex justify-center mb-12">
      <div class="w-[695px] h-24 relative rounded-[100px]">
        <div
          class="left-[3px] top-[82px] absolute justify-start text-neutral-400 text-base font-semibold font-['Pretendard']">
          약관동의
        </div>
        <div
          class="left-[215px] top-[82px] absolute justify-start text-neutral-400 text-base font-semibold font-['Pretendard']">
          회원정보
        </div>
        <div
          class="left-[424px] top-[82px] absolute justify-start text-neutral-800 text-base font-semibold font-['Pretendard']">
          구독선택
        </div>
        <div
          class="left-[635px] top-[82px] absolute justify-start text-neutral-400 text-base font-semibold font-['Pretendard']">
          가입완료
        </div>
        <div
          class="w-36 h-0 left-[65px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>
        <div
          class="w-36 h-0 left-[275px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>
        <div
          class="w-36 h-0 left-[485px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>

        <div class="w-16 h-16 left-[210px] top-0 absolute rounded-[100px] border-2 border-blue-700"></div>
        <div
          class="left-[233px] top-[15px] absolute justify-start text-blue-700 text-3xl font-semibold font-['Pretendard']">
          2
        </div>

        <div class="w-16 h-16 left-[420px] top-0 absolute bg-blue-700 rounded-[100px]"></div>
        <div
          class="left-[443px] top-[15px] absolute justify-start text-white text-3xl font-semibold font-['Pretendard']">
          3
        </div>

        <div class="w-16 h-16 left-[630px] top-0 absolute rounded-[100px] border-2 border-blue-700"></div>
        <div
          class="left-[653px] top-[15px] absolute justify-start text-blue-700 text-3xl font-semibold font-['Pretendard']">
          4
        </div>

        <div class="w-16 h-16 left-0 top-0 absolute rounded-[100px] border border-blue-700"></div>
        <div
          class="left-[26px] top-[15px] absolute justify-start text-blue-700 text-3xl font-semibold font-['Pretendard']">
          1
        </div>
      </div>
    </div>
    <!-- 구독선택 -->
    <div class="flex justify-center">
      <div class="w-96 h-[700px] flex flex-col items-center p-6 rounded-lg bg-white">
        <img class="w-16 h-16 mb-4" src="/public/prime/SubSelct_check.png" alt="단계 아이콘" />
        <div class="text-center text-black text-sm font-medium font-['Pretendard'] mb-8">1/3단계</div>
        <div class="text-center text-black text-3xl font-bold font-['Pretendard'] mb-12">
          <span class="whitespace-nowrap">지금, 나에게 딱 맞는 빙프라임</span><br />
          요금제를 선택하세요.
        </div>

        <div class="flex items-start mb-6 w-full">
          <img class="w-6 h-6 mr-3 flex-shrink-0" src="/public/prime/SubSelct_check_bluse.png" alt="아이콘1" />
          <p class="text-black text-lg font-semibold font-['Pretendard']">
            <span class="whitespace-nowrap">숨겨진 비용 없이, 청소 요금은 언제나 정찰제!</span> 추가 요금 걱정 없이,
            필요한 만큼만 예약하세요.
          </p>
        </div>

        <div class="flex items-start mb-6 w-full">
          <img class="w-6 h-6 mr-3 flex-shrink-0" src="/public/prime/SubSelct_check_bluse.png" alt="아이콘2" />
          <p class="text-black text-lg font-semibold font-['Pretendard']">
            정기 구독 한 번으로 매장 청결은 걱정 끝! <span class="whitespace-nowrap"></span>
            <span>청소 횟수가 많아질수록,할인 혜택은 더 커집니다.</span>
          </p>
        </div>

        <div class="flex items-start mb-10 w-full">
          <img class="w-6 h-6 mr-3 flex-shrink-0" src="/public/prime/SubSelct_check_bluse.png" alt="아이콘3" />
          <p class="text-black text-lg font-semibold font-['Pretendard']">
            <span class="whitespace-nowrap">바쁜 빙프라임 회원님들을 위해,<br /></span>
            <span class="whitespace-nowrap">모든 디바이스에서 간편하게 청소 예약하세요.</span>
          </p>
        </div>

        <router-link
          to="/SubReservation"
          class="w-full h-16 bg-blue-600 rounded-lg text-white text-xl font-bold font-['Pretendard'] hover:bg-blue-700 transition-colors flex items-center justify-center">
          다음
        </router-link>
      </div>
    </div>
  </div>
</template>
