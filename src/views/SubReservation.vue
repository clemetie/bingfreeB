<template>
  <div class="agree_box max-w-[860px] mx-auto py-20 px-6 bg-white">
    <!-- 제목 -->
    <h2 class="text-3xl font-bold text-center text-neutral-800 mb-16">정보입력</h2>

    <!-- 단계 표시 -->
    <div class="flex justify-center mb-12">
      <div class="w-[695px] h-24 relative rounded-[100px]">
        <div class="left-[3px] top-[82px] absolute text-neutral-400 text-base font-semibold">약관동의</div>
        <div class="left-[215px] top-[82px] absolute text-neutral-400 text-base font-semibold">회원정보</div>
        <div class="left-[424px] top-[82px] absolute text-neutral-800 text-base font-semibold">구독선택</div>
        <div class="left-[635px] top-[82px] absolute text-neutral-400 text-base font-semibold">가입완료</div>

        <div
          class="w-36 h-0 left-[65px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>
        <div
          class="w-36 h-0 left-[275px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>
        <div
          class="w-36 h-0 left-[485px] top-[33px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700"></div>

        <div class="w-16 h-16 left-0 top-0 absolute rounded-full border border-blue-700"></div>
        <div class="left-[26px] top-[15px] absolute text-blue-700 text-3xl font-semibold">1</div>

        <div class="w-16 h-16 left-[210px] top-0 absolute rounded-full border-2 border-blue-700"></div>
        <div class="left-[233px] top-[15px] absolute text-blue-700 text-3xl font-semibold">2</div>

        <div class="w-16 h-16 left-[420px] top-0 absolute bg-blue-700 rounded-full"></div>
        <div class="left-[443px] top-[15px] absolute text-white text-3xl font-semibold">3</div>

        <div class="w-16 h-16 left-[630px] top-0 absolute rounded-full border-2 border-blue-700"></div>
        <div class="left-[653px] top-[15px] absolute text-blue-700 text-3xl font-semibold">4</div>
      </div>
    </div>
  </div>

  <!-- 요금제 선택 안내 -->
  <div class="w-full h-36 bg-white shadow flex flex-col justify-center items-start px-[340px]">
    <div class="text-neutral-800 text-sm font-medium mb-1">1/3단계</div>
    <div class="text-black text-3xl font-bold">정기 청소를 위한 요금제를 선택하세요.</div>
  </div>

  <!-- 요금제 탭 -->
  <div class="mt-[50px] w-full bg-white shadow flex flex-col items-center gap-6 py-6">
    <!-- 탭 버튼 -->
    <div class="flex gap-20">
      <button
        @click="mainTab = 'capacity'"
        :class="`text-2xl font-bold ${
          mainTab === 'capacity' ? 'text-neutral-800 border-b-4 border-blue-700' : 'text-neutral-400'
        }`">
        Bing.P 용량별 요금제
      </button>
      <button
        @click="mainTab = 'hoshizaki'"
        :class="`text-2xl font-bold ${
          mainTab === 'hoshizaki' ? 'text-neutral-800 border-b-4 border-blue-700' : 'text-neutral-400'
        }`">
        Bing.P 호시자키전용 요금제
      </button>
    </div>

    <!-- 탭 콘텐츠 -->
    <div class="w-full max-w-4xl p-6">
      <!-- 용량별 요금제 -->
      <div v-show="mainTab === 'capacity'">
        <div class="flex justify-center gap-4 mb-6">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="subTabIndex = index"
            :class="[
              'px-4 py-2 rounded-full border',
              subTabIndex === index
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-800 border-gray-300',
            ]">
            {{ tab }}
          </button>
        </div>

        <div v-for="(plans, index) in groupedPlans" :key="index" v-show="subTabIndex === index">
          <div class="mt-[30px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(plan, i) in plans"
              :key="plan.title + plan.times"
              @click="openModal(plan)"
              class="border rounded-2xl p-6 shadow hover:shadow-lg relative">
              <h3 class="text-xl font-semibold mb-2">{{ plan.title }}</h3>
              <p class="text-sm text-gray-500 mb-1">
                횟수: <strong>{{ plan.times }}회</strong>
              </p>
              <div class="w-9 h-6 bg-blue-500 text-white text-xs flex items-center justify-center rounded mb-2">
                {{ plan.discount }}
              </div>

              <!-- Top3 뱃지 -->
              <div
                v-if="isTop3('capacity', index, i)"
                class="absolute top-4 right-4 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                Top3
              </div>

              <p class="text-lg font-bold text-blue-600 mb-1">총 금액: {{ plan.price }}</p>
              <p class="text-sm text-gray-500">(1회당 {{ plan.perSession }})</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 호시자키 요금제 -->
      <div v-show="mainTab === 'hoshizaki'">
        <div class="flex justify-center gap-4 mb-6">
          <button
            v-for="(tab, index) in hositabs"
            :key="index"
            @click="subTabIndex = index"
            :class="[
              'px-4 py-2 rounded-full border',
              subTabIndex === index
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-800 border-gray-300',
            ]">
            {{ tab }}
          </button>
        </div>

        <div v-for="(plans, index) in groupedhosiPlans" :key="index" v-show="subTabIndex === index">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(plan, i) in plans"
              :key="plan.title + plan.times"
              class="border rounded-2xl p-6 shadow hover:shadow-lg relative">
              <h3 class="text-xl font-semibold mb-2">{{ plan.title }}</h3>
              <p class="text-sm text-gray-500 mb-1">
                횟수: <strong>{{ plan.times }}회</strong>
              </p>
              <div class="w-9 h-6 bg-blue-500 text-white text-xs flex items-center justify-center rounded mb-2">
                {{ plan.discount }}
              </div>

              <div
                v-if="isTop3('hoshizaki', index, i)"
                class="absolute top-4 right-4 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                Top3
              </div>

              <p class="text-lg font-bold text-blue-600 mb-1">총 금액: {{ plan.price }}</p>
              <p class="text-sm text-gray-500">(1회당 {{ plan.perSession }})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  서비스 안내 -->
  <div class="overflow-x-auto">
    <div
      class="mb-[50px] min-w-[900px] w-full grid grid-cols-[180px_repeat(4,minmax(160px,1fr))] gap-x-4 border border-neutral-200 rounded-xl">
      <!-- 헤더 영역 -->
      <div class="bg-neutral-50 p-4 font-semibold text-sm text-neutral-500">혜택 항목</div>
      <div class="bg-neutral-50 p-4 font-semibold text-sm text-center text-neutral-700"></div>
      <div class="bg-neutral-50 p-4 font-semibold text-sm text-center text-neutral-700"></div>
      <div class="bg-neutral-50 p-4 font-semibold text-sm text-center text-neutral-700"></div>
      <div class="bg-neutral-50 p-4 font-semibold text-sm text-center text-neutral-700"></div>

      <!-- 1행: 청소 인증 리포트 -->
      <div class="p-4 text-sm text-neutral-600">청소 인증 리포트 라벨 증정</div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>

      <!-- 2행: 친환경 세제 제공 -->
      <div class="p-4 text-sm text-neutral-600">친환경 세제 제공</div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>

      <!-- 3행: 무료 점검 서비스 -->
      <div class="p-4 text-sm text-neutral-600">무료 점검 서비스</div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>

      <!-- 4행: 미리 알림 서비스 -->
      <div class="p-4 text-sm text-neutral-600">미리 알림 서비스</div>
      <div class="flex flex-col items-center justify-center p-4 text-xs text-neutral-400 space-y-1">
        <span>동의 시</span>
      </div>
      <div class="flex flex-col items-center justify-center p-4 text-xs text-neutral-400 space-y-1">
        <span>동의 시</span>
      </div>
      <div class="flex flex-col items-center justify-center p-4 text-xs text-neutral-400 space-y-1">
        <span>동의 시</span>
      </div>
      <div class="flex flex-col items-center justify-center p-4 text-xs text-neutral-400 space-y-1">
        <span>동의 시</span>
      </div>

      <!-- 5행: 생일 쿠폰 -->
      <div class="p-4 text-sm text-neutral-600">생일 축하 쿠폰</div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>
      <div class="flex items-center justify-center p-4">
        <img src="/public/prime/select_check_light.png" class="w-7 h-7" />
      </div>

      <!-- 6행: 첫 가입 쿠폰 -->
      <div class="p-4 text-sm text-neutral-600">첫 가입 쿠폰</div>
      <div class="flex items-center justify-center p-4 text-xs text-neutral-400">미리알림 서비스 동의시</div>
      <div class="flex items-center justify-center p-4 text-xs text-neutral-400">미리알림 서비스 동의시</div>
      <div class="flex items-center justify-center p-4 text-xs text-neutral-400">미리알림 서비스 동의시</div>
      <div class="flex items-center justify-center p-4 text-xs text-neutral-400">미리알림 서비스 동의시</div>

      <!-- 7행: 재청소 주기 -->
      <div class="p-4 text-sm text-neutral-600">재청소 권장 주기</div>
      <div class="flex items-center justify-center p-4 text-sm text-neutral-500">3개월</div>
      <div class="flex items-center justify-center p-4 text-sm text-neutral-500">3개월</div>
      <div class="flex items-center justify-center p-4 text-sm text-neutral-500">3개월</div>
      <div class="flex items-center justify-center p-4 text-sm text-neutral-500">3개월</div>
    </div>
  </div>
  <!-- 중요 내용 -->
  <div class="ml-[100px] mb-[50px] w-[772px] relative font-['Pretendard'] text-neutral-800 font-medium">
    <h2 class="text-base mb-3">구독 서비스 이용 주의사항</h2>

    <ul class="list-disc list-inside space-y-1 text-sm">
      <li>예약 방법: 홈페이지의 [예약하기] 버튼을 통해 원하는 날짜와 시간을 선택하여 신청하세요.</li>
      <li>예약 변경: 청소 예정일 24시간 전까지 변경 가능합니다. [마이페이지]에서 직접 변경할 수 있습니다</li>
      <li>소요 시간: 일반 청소는 1~2시간, 심층 청소는 2~3시간 소요됩니다. (소요시간에 따른 추가 비용은 없습니다.)</li>
      <li>사용 권장 시간: 청소 후 1~2시간 후 얼음 사용을 권장합니다.</li>
    </ul>

    <h3 class="text-base mt-6 mb-2">결제 및 해지</h3>
    <ul class="list-disc list-outside space-y-1 text-sm">
      <li>결제 수단: 현금/카드 결제 가능 (신용카드, 체크카드 모두 지원)</li>
      <li>이용 중 해지 시, 사용일 기준으로 일할 정산 환불</li>
      <li>영수증 발급, 세금 계산서: 현장 또는 이메일로 발급 가능</li>
      <li>
        결제 방식: 고객님이 선택한 <strong>청소 횟수(6회 / 8회 / 12회)</strong>에 따라 일괄 결제됩니다. 결제 후 선택한
        횟수만큼 청소 서비스를 이용할 수 있으며, 중도 해지 시 잔여 횟수 기준으로 환불이 가능합니다. 사용 기간은 1년
        기준이며, 미사용 회차는 다음 회차로 1회에 한해 이월할 수 있습니다. 이후에도 사용하지 않은 회차는 자동
        소멸됩니다.
      </li>
    </ul>

    <h3 class="text-base mt-6 mb-2">환불 규정</h3>
    <ul class="list-disc list-inside space-y-1 text-sm">
      <li>결제 후 7일 이내, 서비스 이용 전이라면 전액 환불 가능</li>
      <li>이용 중 해지 시, 사용일 기준으로 일할 정산 환불</li>
      <li>
        선결제한 횟수형 요금제를 중도 해지할 경우, 사용한 횟수는 1회 단가 기준으로 재계산되며, 남은 금액은 차액 기준으로
        환불됩니다.
      </li>
      <li>생일 쿠폰 및 이벤트 혜택은 해지 시 소급 회수될 수 있음</li>
    </ul>

    <h3 class="text-base mt-6 mb-2">기타사항</h3>
    <ul class="list-disc list-inside space-y-1 text-sm">
      <li>한 계정으로 여러 매장 관리 가능 (지점별 예약 지원)</li>
      <li>모든 기기에서 예약 가능 (PC, 모바일, 태블릿)</li>
      <li>빙프리 서비스는 국내 사업장 전용입니다.</li>
      <li>제빙기 종류에 따라 요금이 달라질 수 있습니다. (호시자키, 제빙기 Kg별 옵션 제공)</li>
    </ul>

    <h3 class="text-base mt-6 mb-2">고객센터 안내</h3>
    <ul class="list-disc list-inside space-y-1 text-sm">
      <li>운영시간: 평일 09:00 ~ 18:00</li>
      <li>전화번호: 064-739-6155</li>
      <li>이메일: bingfree.korea@gmail.com</li>
      <li>예약 미진행, 서비스 문의 등은 언제든 연락 주세요.</li>
    </ul>
  </div>

  <!-- 결제 모달창 -->
  <!-- 모달 -->
  <div
    @click.self="closeModal()"
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-[669px] max-h-[90vh] bg-white rounded-lg overflow-y-auto">
      <!-- Header -->
      <div class="bg-blue-600 py-6 px-4 text-center text-white text-3xl font-bold">Bing.P 구독권 구매</div>

      <div class="bg-neutral-100 p-6 space-y-6">
        <!-- 요금제 이름 및 태그 -->
        <div class="flex items-center space-x-2">
          <h2 class="text-2xl font-bold text-neutral-800">스탠다드</h2>
          <span class="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-lg">10%</span>
          <span class="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-lg">6회</span>
        </div>

        <!-- 설명 -->
        <div class="text-base font-medium text-neutral-800 space-y-1">
          <p>50kg 미만의 소형 제빙기를 위한 전용 구독 요금제입니다.</p>
          <p>추가금 없이 무료 진단 1회 및 자사몰 클리너 증정</p>
        </div>

        <!-- 이용기간 및 금액 -->
        <div class="space-y-2">
          <div class="flex">
            <span class="w-24 font-semibold text-neutral-800">이용기간</span>
            <span class="text-neutral-800 font-medium">
              2025.05.30~2026.05.30 (1년 기간 동안 이용 가능, 1년 이월 가능)
            </span>
          </div>
          <div class="flex items-center">
            <span class="w-24 font-semibold text-neutral-800">금액</span>
            <span class="text-2xl font-bold text-neutral-800">534,600 원</span>
          </div>
        </div>

        <!-- 결제 수단 -->
        <div class="space-y-4">
          <h3 class="text-2xl font-bold text-neutral-800">결제수단 선택</h3>

          <!-- 빠른 결제 -->
          <div class="bg-neutral-100 p-4 rounded-lg shadow-md space-y-2">
            <div class="flex items-center space-x-2">
              <div class="w-5 h-5 bg-blue-700 rounded-full flex items-center justify-center">
                <div class="w-1 h-1 bg-white rounded-full"></div>
              </div>
              <span class="text-lg font-medium text-neutral-800">빠른 결제</span>
            </div>

            <div class="text-base text-neutral-800 font-medium">
              빠른결제를 등록하시면 모든 디바이스에서 4자리 숫자만으로 간편하게 결제가 가능합니다.
            </div>
            <div class="text-base text-neutral-800 font-medium">
              BingFree에서는 고객님의 카드정보 일체를 보관하지 않으며, 전자결제대행사 ‘그린레터(주)’를 통해 안전하게
              관리됩니다.
            </div>

            <!-- 카드 등록 박스 -->
            <div class="border border-neutral-400 rounded-lg h-44 mt-4 flex items-center justify-center relative">
              <img
                src="/public/prime/card_plus_icon.png"
                class="w-7 h-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div class="text-center text-neutral-800 text-base font-medium mt-2">카드 등록</div>
          </div>

          <!-- 기타 결제 수단 -->
          <div>
            <!-- 클릭 가능한 체크박스 -->
            <div
              class="bg-neutral-100 p-4 rounded-lg shadow-md flex items-center space-x-2 cursor-pointer"
              @click="toggleOtherPayment">
              <div class="w-5 h-5 border border-neutral-400 rounded-full flex items-center justify-center">
                <div v-if="otherPaymentVisible" class="w-3 h-3 bg-blue-700 rounded-full"></div>
                <div v-else class="w-1 h-1 bg-neutral-400 rounded-full"></div>
              </div>
              <span class="text-lg font-medium text-neutral-800">다른 결제 수단</span>
            </div>

            <!-- v-show로 토글 되는 결제 수단 영역 -->
            <div v-show="otherPaymentVisible" class="w-[609px] h-60 relative mt-4">
              <!-- 배경 박스: absolute 위치 유지 -->
              <div
                class="w-[609px] h-60 left-0 top-0 absolute bg-neutral-100 rounded-lg shadow-[2px_2px_4px_3px_rgba(189,189,189,0.25)]"></div>

              <!-- flex 컨테이너 래퍼, 위치 지정 없이 자연스러운 플렉스 배치 -->
              <div class="relative z-10 flex flex-wrap justify-center items-center gap-4 w-full h-full">
                <!-- 기존 박스들은 absolute 위치 유지하므로 여기서는 자식들을 배치 안함 -->
                <!-- 기존 absolute 박스 및 텍스트 이미지들은 그대로 유지 -->
                <div class="w-48 h-14 left-[19px] top-[161px] absolute rounded-lg border border-neutral-400"></div>
                <div class="w-48 h-14 left-[212px] top-[161px] absolute rounded-lg border border-neutral-400"></div>
                <div class="w-48 h-14 left-[405px] top-[93px] absolute rounded-lg border border-neutral-400"></div>
                <div class="w-48 h-14 left-[19px] top-[93px] absolute rounded-lg border border-neutral-400"></div>

                <div
                  class="left-[97px] top-[114px] absolute text-center justify-start text-neutral-400 text-base font-bold font-['Pretendard']">
                  신용카드
                </div>
                <img class="w-5 h-5 left-[71px] top-[112px] absolute" src="/public/prime/icon-card1.png" />
                <div class="w-48 h-14 left-[212px] top-[93px] absolute rounded-lg border border-neutral-400"></div>
                <div
                  class="left-[296px] top-[114px] absolute text-center justify-start text-neutral-400 text-base font-bold font-['Pretendard']">
                  휴대폰
                </div>
                <img class="w-5 h-5 left-[272px] top-[112px] absolute" src="/public/prime/icon-phone1.png" />
                <img class="w-16 h-5 left-[272px] top-[180px] absolute" src="/public/prime/logo-naver-pay.png" />
                <img class="w-14 h-5 left-[83px] top-[180px] absolute" src="/public/prime/logo-kakao-pay.png" />
                <img class="w-14 h-5 left-[469px] top-[112px] absolute" src="/public/prime/logo-payco.png" />
              </div>
            </div>
          </div>

          <!-- 약관 동의 -->

          <div class="space-y-2 pt-6">
            <!-- 전체 약관 동의 -->
            <div class="flex items-center space-x-2 cursor-pointer" @click="toggleAgreeAll">
              <div class="w-5 h-5 border border-neutral-400 rounded flex items-center justify-center">
                <div v-if="agreeAll" class="w-3 h-3 bg-blue-700 rounded"></div>
              </div>
              <span class="text-lg font-medium text-neutral-400">약관에 모두 동의합니다.</span>
            </div>

            <!-- 자동결제 동의 -->
            <div class="flex items-center space-x-2 cursor-pointer" @click="toggleAutoPayAgree">
              <div class="w-5 h-5 border border-neutral-400 rounded flex items-center justify-center">
                <div v-if="agreeAutoPay" class="w-3 h-3 bg-blue-700 rounded"></div>
              </div>
              <span class="text-lg font-medium text-neutral-400"> 모든 이용 횟수 소진 시 자동 결제에 동의합니다. </span>
            </div>
          </div>

          <!-- 버튼 -->
          <div class="flex justify-between pt-8">
            <button
              @click="closeModal()"
              class="w-1/2 py-4 border border-neutral-400 rounded-bl-lg text-neutral-400 font-semibold">
              취소
            </button>
            <button @click="lastModal" class="w-1/2 py-4 bg-blue-600 rounded-br-lg text-white font-semibold">
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- // 마지막 결제 창 -->
  <!-- 마지막 결제 모달은 최상단에 위치시킴 -->
  <div v-if="showLastModal" class="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
    <div
      class="w-[459px] h-80 bg-white rounded-lg shadow-xl flex flex-col items-center justify-between py-6 px-4 relative">
      <!-- 닫기 버튼 -->
      <img
        class="w-5 h-5 absolute top-4 right-4 cursor-pointer"
        src="/public/prime/Modal_close.png"
        @click="closeLastModal" />

      <!-- 인사말 -->
      <div class="text-xl font-bold text-black mt-2">오도라 님, 반갑습니다</div>

      <!-- 이미지 -->
      <img class="w-10 h-10 my-2" src="/public/prime/SubSelct_check.png" />

      <!-- 메시지 -->
      <div class="text-center text-neutral-400 text-base font-normal px-4">
        구독 요금제 결제까지 마무리되었어요. <br />
        이제 바로 청소 예약을 시작하실 수 있어요!
      </div>

      <!-- 버튼 그룹 -->
      <div class="flex w-full justify-center mt-4">
        <router-link
          to="/BingprimeReservation"
          class="w-44 h-14 flex items-center justify-center bg-blue-600 text-white text-base font-semibold rounded-l-lg">
          예약하러 가기
        </router-link>
        <router-link
          to="/BingPrime"
          class="w-44 h-14 flex items-center justify-center border border-neutral-400 text-neutral-400 text-base font-semibold rounded-r-lg">
          괜찮아요
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const mainTab = ref("capacity");
const subTabIndex = ref(0);

watch(mainTab, () => {
  subTabIndex.value = 0;
});

const tabs = ["스탠다드", "스탠다드+", "디럭스", "프리미엄"];
const hositabs = ["호시자키", "호시자키+"];

// 데이터 정의
const planData = [
  { title: "스탠다드", times: 6, discount: "10%", price: "₩534,600", perSession: "₩89,100", numericPrice: 534600 },
  { title: "스탠다드", times: 8, discount: "15%", price: "₩673,200", perSession: "₩84,150", numericPrice: 673200 },
  { title: "스탠다드", times: 12, discount: "20%", price: "₩950,400", perSession: "₩79,200", numericPrice: 950400 },
  { title: "스탠다드+", times: 6, discount: "10%", price: "₩648,000", perSession: "₩108,000", numericPrice: 648000 },
  { title: "스탠다드+", times: 8, discount: "15%", price: "₩816,000", perSession: "₩102,000", numericPrice: 816000 },
  { title: "스탠다드+", times: 12, discount: "20%", price: "₩1,152,000", perSession: "₩96,000", numericPrice: 1152000 },
  { title: "디럭스", times: 6, discount: "10%", price: "₩810,000", perSession: "₩135,000", numericPrice: 810000 },
  { title: "디럭스", times: 8, discount: "15%", price: "₩1,020,000", perSession: "₩127,500", numericPrice: 1020000 },
  { title: "디럭스", times: 12, discount: "20%", price: "₩1,440,000", perSession: "₩120,000", numericPrice: 1440000 },
  { title: "프리미엄", times: 6, discount: "10%", price: "₩918,000", perSession: "₩153,000", numericPrice: 918000 },
  { title: "프리미엄", times: 8, discount: "15%", price: "₩1,156,000", perSession: "₩144,500", numericPrice: 1156000 },
  { title: "프리미엄", times: 12, discount: "20%", price: "₩1,632,000", perSession: "₩136,000", numericPrice: 1632000 },
];

const hosiData = [
  { title: "호시자키", times: 6, discount: "10%", price: "₩918,000", perSession: "₩153,000", numericPrice: 918000 },
  { title: "호시자키", times: 8, discount: "15%", price: "₩1,156,000", perSession: "₩144,500", numericPrice: 1156000 },
  { title: "호시자키", times: 12, discount: "20%", price: "₩1,632,000", perSession: "₩136,000", numericPrice: 1632000 },
  { title: "호시자키+", times: 6, discount: "10%", price: "₩1,026,000", perSession: "₩171,000", numericPrice: 1026000 },
  { title: "호시자키+", times: 8, discount: "15%", price: "₩1,296,000", perSession: "₩162,000", numericPrice: 1296000 },
  {
    title: "호시자키+",
    times: 12,
    discount: "20%",
    price: "₩1,872,000",
    perSession: "₩156,000",
    numericPrice: 1872000,
  },
];

// 요금제 그룹화
const groupedPlans = computed(() => tabs.map((tab) => planData.filter((plan) => plan.title === tab)));

const groupedhosiPlans = computed(() => hositabs.map((tab) => hosiData.filter((plan) => plan.title === tab)));

// Top3 체크
function isTop3(type, tabIndex, planIndex) {
  const list = type === "capacity" ? groupedPlans.value : groupedhosiPlans.value;
  const sorted = [...list[tabIndex]].sort((a, b) => a.numericPrice - b.numericPrice);
  return sorted
    .slice(0, 3)
    .some((p) => p.title === list[tabIndex][planIndex].title && p.times === list[tabIndex][planIndex].times);
}

// 결제 모달창
const selectedPlan = ref(null); // 선택한 요금제
const showModal = ref(false); // 모달 표시 여부

function openModal(plan) {
  selectedPlan.value = plan;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedPlan.value = null;
}

// 다른 결제 수단 클릭시 토글 이벤트

function toggleOtherPayment() {
  otherPaymentVisible.value = !otherPaymentVisible.value;
}
const otherPaymentVisible = ref(false);
const agreeAll = ref(false);
const agreeAutoPay = ref(false);

const toggleAgreeAll = () => {
  agreeAll.value = !agreeAll.value;
};

const toggleAutoPayAgree = () => {
  agreeAutoPay.value = !agreeAutoPay.value;
};

// 모달 표시 상태
const showLastModal = ref(false);
// 모달 열기
const lastModal = () => {
  showLastModal.value = true;
};

function closeLastModal() {
  showLastModal.value = false;
}
</script>
