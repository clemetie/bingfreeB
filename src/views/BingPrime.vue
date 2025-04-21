<script setup>
import { onMounted, ref } from "vue";

const mainImg = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("anim_active");
        }
      });
    },
    { threshold: 0.1 } // 절반 이상 보일 때 동작
  );

  if (mainImg.value) {
    observer.observe(mainImg.value);
  }
});
</script>
<template>
  <div class="prime-wrap" style="margin-top: 80px">
    <div class="main01">
      <div class="inner">
        <img class="prime_sticker1" src="/prime/prime_sticker01.png" alt="뱃지1" />
        <img class="prime_sticker2" src="/prime/prime_sticker02.png" alt="뱃지2" />

        <div class="prime_main_txt_box">
          <p style="font-size: 80px; font-weight: 500; color: #1456fd">빙 프 라 임</p>
          <p style="font-size: 100px; font-weight: 800; color: #1456fd">멤버스 라운지</p>
        </div>
      </div>
    </div>
    <div class="prime_txt">
      <p class="main-h1" style="text-align: center; color: #1456fd; font-weight: 300">
        빙프리에 방문하신 고객님, <br />
        <span style="color: #02123a"
          >지금 <b style="font-weight: 600">빙프라임</b> 가입하고 <b style="font-weight: 600">멤버스 라운지</b>를 이용해
          보세요.</span
        >
      </p>
      <hr style="margin: 43px auto; width: 60%; border: none; border-top: 2px solid #e9ff54" />
      <p class="main-h3" style="text-align: center; color: #1456fd; font-weight: 300">
        빙프라임 멤버스 라운지에서는 프리몰부터 빙프리에서 운영하는 실험 연구소 체험까지
        <br />
        빙프라임 멤버스 고객님께만 드리는 특별한 혜택을 확인하실 수 있습니다.
      </p>
      <p class="main-h3" style="text-align: center; color: #1456fd; font-weight: 300; margin-top: 80px">
        구독만하면 바로 누릴 수 있는 혜택정보를 바로 확인해보세요! <br />
        <span class="main-h4" style="color: #626262; font-weight: 300"
          >*빙프라임 멤버스 : 빙프리 구독 서비스를 이용하고 계신 고객님</span
        >
      </p>
    </div>
    <div class="membersOTP">
      <p class="main-h4" style="color: #fff">멤버스 인증하기</p>
    </div>
    <div class="main02">
      <div class="number_box">
        <h2 class="number">01</h2>
        <hr class="number_bar" />
        <p style="text-align: center; font-size: 38px; font-weight: 100; color: #1456fd; margin-bottom: 230px">
          BENEFIT
        </p>
      </div>
      <p
        style="
          font-size: 50px;
          color: #001f57;

          margin-left: 20%;
        ">
        <b style="font-weight: bold">구독</b>만 해도
      </p>
      <div class="main02_img" ref="mainImg">
        <div class="img_txt">
          <p
            style="
              font-size: 50px;
              color: #001f57;
              font-weight: bold;
              margin-left: 20%;
              transform: scaleY(-1);
              filter: blur(5px) opacity(0.4);
            ">
            구독만 해도
          </p>
          <p style="font-size: 50px; color: #001f57; font-weight: 300">
            쏟아지는 <b style="font-weight: bold">혜택!</b>
          </p>
        </div>
        <div class="table_txt">
          <p style="font-size: 150px; font-weight: bold; color: #1456fd">4</p>
          <p style="font-size: 50px; color: #1456fd; line-height: 132.4%">
            <b style="font-weight: 800">빙프라임 구독</b>하고 <br /><b style="font-weight: 800">종 쿠폰</b>
            받고,
          </p>
        </div>
        <table style="width: 40%; border-collapse: collapse; font-family: sans-serif; border: 2px solid #1456fd">
          <thead>
            <tr style="background-color: #1456fd; color: white">
              <th colspan="2" class="main-h2" style="padding: 15px"><strong>구독</strong>만 하면 누. 구. 나</th>
            </tr>
          </thead>
          <tbody class="main-h3" style="background-color: #fff">
            <tr>
              <td style="padding: 12px; font-weight: bold; text-align: center; color: #1456fd">01</td>
              <td style="padding: 18px 50px; text-align: right; color: #1456fd">
                가입 즉시
                <strong style="color: #1456fd; font-weight: 600">3,000원</strong>
                포인트 적립
              </td>
            </tr>
            <tr>
              <td
                style="
                  border-top: 1px solid #ccc;
                  padding: 12px;
                  font-weight: bold;
                  text-align: center;
                  color: #1456fd;
                ">
                02
              </td>
              <td style="border-top: 1px solid #ccc; padding: 18px 50px; text-align: right; color: #1456fd">
                모든 상품
                <strong style="color: #1456fd; font-weight: 600">1,000원</strong>
                할인 쿠폰
              </td>
            </tr>
            <tr>
              <td
                style="
                  border-top: 1px solid #ccc;
                  padding: 12px;
                  font-weight: bold;
                  text-align: center;
                  color: #1456fd;
                ">
                03
              </td>
              <td style="border-top: 1px solid #ccc; padding: 18px 50px; text-align: right; color: #1456fd">
                프리몰
                <strong style="color: #1456fd; font-weight: 600">10%</strong>
                할인 쿠폰
              </td>
            </tr>
            <tr>
              <td
                style="
                  border-top: 1px solid #ccc;
                  padding: 12px;
                  font-weight: bold;
                  text-align: center;
                  color: #1456fd;
                ">
                04
              </td>
              <td style="border-top: 1px solid #ccc; padding: 18px 50px; text-align: right; color: #1456fd">
                <strong style="color: #1456fd; font-weight: 600">3만원 이상 무료배송!</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table_txt" style="margin-top: 150px">
          <p style="font-size: 150px; font-weight: bold; color: #1456fd">4</p>
          <p style="font-size: 50px; color: #1456fd; line-height: 132.4%">
            <b style="font-weight: 800">빙프라임 연장구독</b>하면 <br /><b style="font-weight: 800">종 쿠폰</b>
            또 받고 받고!
          </p>
        </div>
        <table style="width: 40%; border-collapse: collapse; font-family: sans-serif; border: 2px solid #e9ff54">
          <thead>
            <tr style="background-color: #e9ff54; color: white">
              <th class="main-h2" colspan="2" style="padding: 15px; color: #1456fd">
                <strong>구독연장</strong>만 하면 한. 번. 더
              </th>
            </tr>
          </thead>
          <tbody class="main-h3" style="background-color: #fff">
            <tr>
              <td style="padding: 12px; font-weight: bold; text-align: center; color: #1456fd">01</td>
              <td style="padding: 18px 50px; text-align: right; color: #1456fd">
                가입 즉시
                <strong style="color: #1456fd; font-weight: 600">3,000원</strong>
                포인트 적립
              </td>
            </tr>
            <tr>
              <td
                style="
                  border-top: 1px solid #ccc;
                  padding: 12px;
                  font-weight: bold;
                  text-align: center;
                  color: #1456fd;
                ">
                02
              </td>
              <td style="border-top: 1px solid #ccc; padding: 18px 50px; text-align: right; color: #1456fd">
                모든 상품
                <strong style="color: #1456fd; font-weight: 600">1,000원</strong>
                할인 쿠폰
              </td>
            </tr>
            <tr>
              <td
                style="
                  border-top: 1px solid #ccc;
                  padding: 12px;
                  font-weight: bold;
                  text-align: center;
                  color: #1456fd;
                ">
                03
              </td>
              <td style="border-top: 1px solid #ccc; padding: 18px 50px; text-align: right; color: #1456fd">
                프리몰
                <strong style="color: #1456fd; font-weight: 600">10%</strong>
                할인 쿠폰
              </td>
            </tr>
            <tr>
              <td
                style="
                  border-top: 1px solid #ccc;
                  padding: 12px;
                  font-weight: bold;
                  text-align: center;
                  color: #1456fd;
                ">
                04
              </td>
              <td style="border-top: 1px solid #ccc; padding: 18px 50px; text-align: right; color: #1456fd">
                <strong style="color: #1456fd; font-weight: 600">3만원 이상 무료배송!</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="main03">
      <div class="number_box">
        <h2 class="number">02</h2>
        <hr class="number_bar" />
        <p style="text-align: center; font-size: 38px; font-weight: 100; color: #1456fd; margin-bottom: 230px">
          BENEFIT
        </p>
      </div>
      <p class="main-h2" style="text-align: center; color: #1456fd; margin-bottom: 146px">
        멤버스가 필요로 하는 상품만을 골라 <br />
        <b class="main-h1" style="text-align: center; color: #212121">멤버스 전용 서프라이즈 혜택!</b>
      </p>

      <div class="main03_box">
        <div class="box_top">
          <img src="/prime/prime_persona1.png" alt="페르소나1" />
          <div class="top_left">
            <div class="bar">
              <p class="main-h3" style="color: #e9ff54; letter-spacing: 7px; font-weight: 300">
                <b style="font-weight: 600">BINGPRIME</b>MEMBER 01
              </p>
            </div>
            <p class="main-h2" style="color: #1456fd; font-weight: 300; margin-left: 30px">
              카페를 운영하고 있어 <br />정기적인 청소가 필요한데 <br />매번 예약하기 번거로워요.
            </p>
          </div>
        </div>
        <div class="box_bt">
          <div class="bar">
            <img src="/reservation/reservsub/calendar-check.png" alt="달력" />
            <p class="main-h2" style="color: #fff">빙프라임만의 <b>자동 예약</b>서비스</p>
          </div>
          <div class="bt_txt">
            <p class="main-h3" style="font-weight: 500; color: #1651da">
              업장 운영을 하고 있어 정기적인<br />
              제빙기 청소 서비스가 필요하진 않으신가요?
            </p>
            <p class="main-h3">
              빙프리는 빙프라임 고객님을 위해 <br />편리한 <b>자동 예약 서비스</b> 를 제공합니다. <br />첫 청소 신청 시
              <b>주기만 설정</b>하시면, <br />주기에 맞춰 안내 후 방문 청소해드려요!
            </p>
          </div>
        </div>
        <img class="clock_img" src="/prime/prime_clock.png" alt="휴대폰 이미지" />
      </div>
      <div class="main03_box" style="margin-top: 60px">
        <div class="box_top">
          <img src="/prime/prime_persona2.png" alt="페르소나2" />
          <div class="top_left">
            <div class="bar">
              <p class="main-h3" style="color: #e9ff54; letter-spacing: 7px; font-weight: 300">
                <b style="font-weight: 600">BINGPRIME</b>MEMBER 02
              </p>
            </div>
            <p class="main-h2" style="color: #1456fd; font-weight: 300; margin-left: 30px">
              셀프 세척을 하고 싶은데, <br />주방 세제로 해도 될까요? <br />
              전용 세제가 있으면 좋을텐데
            </p>
          </div>
        </div>
        <div class="box_bt">
          <div class="bar">
            <img src="/reservation/reservsub/calendar-check.png" alt="달력" />
            <p class="main-h2" style="color: #fff">빙프라임만의 <b>가정용 제빙기</b> 세척제</p>
          </div>
          <div class="bt_txt">
            <p class="main-h3" style="font-weight: 500; color: #1651da">
              가정에서 제빙기를 청소할 때<br />
              주방 세제나 락스를 사용하시나요?
            </p>
            <p class="main-h3">
              빙프리에서는 가정용 제빙기 사용자를 위해 <br />전용 세척제를 별도로 판매하고 있습니다.<br />청소 서비스
              구독 시, 방문할 때마다 <b>세척제를 증정</b>해드리며, <br />
              <b>셀프 청소 꿀팁도 함께 안내</b>해드려요!
            </p>
          </div>
        </div>
        <img class="cart_img" src="/prime/prime_cart.png" alt="카트 이미지" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@keyframes ani_opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes ani_move {
  0% {
    transform: translateY(30px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes ani_loop {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(-5px);
  }
}
@keyframes ani_rotate {
  0% {
    transform: translateY(-1px) rotate(7deg);
  }
  50% {
    transform: translateY(1px) rotate(-7deg);
  }
  0% {
    transform: translateY(-1px) rotate(7deg);
  }
}
@keyframes ani_move2 {
  0% {
    transform: translateY(30px);
  }
  100% {
    transform: translateY(0);
  }
}
h2.number {
  font-size: 100px;
  text-align: center;
  color: #1456fd;
}
p {
  font-weight: 300;
  b {
    font-weight: 600;
  }
}
.main01 {
  display: grid;
  grid-template-rows: auto;
  margin: 0 auto 75px;
  background: url("/prime/prime_main01.png") no-repeat;
  width: 100%;
  height: 1200px;
  background-size: cover;
  background-position: center;
  position: relative;
  .prime_sticker1 {
    width: 23%;
    position: absolute;
    top: 7%;
    right: 17%;
    animation: ani_opacity 0.6s ease-in-out, ani_move 0.6s ease-in-out, ani_loop 2.5s ease infinite;
  }
  .prime_sticker2 {
    width: 15%;
    position: absolute;
    top: 20%;
    left: 22%;
    animation: ani_opacity 0.6s ease-in-out, ani_move 0.6s ease-in-out, ani_loop 3s ease infinite;
  }
  .prime_main_txt_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 30%;
    left: 33%;
    animation: ani_opacity 0.6s ease-in-out, ani_move 0.6s ease-in-out;
    p {
      letter-spacing: 15px;
    }
    &:first-child {
      text-align: center;
    }
  }
}
.prime_txt {
  &:first-child {
    animation: ani_opacity 0.6s ease-in-out, ani_move 0.6s ease-in-out;
    animation-fill-mode: forwards;
  }
  &:nth-child(2) {
    animation: ani_opacity 0.8s ease-in-out, ani_move 0.8s ease-in-out;
    animation-fill-mode: forwards;
  }
}
.membersOTP {
  cursor: pointer;
  width: 10%;
  padding: 0.5% 0;
  margin: 5% auto 15%;
  border-radius: 30px 0 30px 0;
  background-color: #1456fd;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main02 {
  .number_bar {
    width: 150px;
    margin: 20px auto;
    border: 0.5px solid #1456fd;
    img {
      width: 100%;
    }
  }
  .main02_img {
    width: 100%;
    height: 1600px;
    background-image: url("/prime/prime_main02.png");
    background-size: cover;
    background-position: center;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: -10%;
      left: calc(50% + 220px);
      width: 50%;
      max-width: 697px;
      aspect-ratio: 1 / 2.2;
      background: url("/prime/prime_coupons.png") 0 0 no-repeat;
      background-size: cover;
      opacity: 0;
      z-index: 0;
    }

    &.anim_active::before {
      animation: ani_opacity 1.6s 0.5s ease-in-out forwards, ani_move2 1.6s 0.5s ease-in-out;
    }
    .img_txt {
      display: flex;
      gap: 28px;
    }
    .table_txt {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-left: 20%;
      margin-top: 80px;
    }
    table {
      margin-left: 20%;
    }
  }
}
.main03 {
  background-color: #e1edf5;
  padding: 130px 310px;
  .number_bar {
    width: 150px;
    margin: 20px auto;
    border: 0.5px solid #1456fd;
    img {
      width: 100%;
    }
  }
  .main03_box {
    width: 90%;
    height: 100%;
    border: 1px solid #1456fd;
    position: relative;
    margin: auto;
    .box_top {
      display: flex;
      align-items: center;
      img {
        width: calc(100% / 2);
      }
      .top_left {
        display: flex;
        flex-direction: column;
        width: calc(100% / 2);
        .bar {
          width: 50%;
          height: 80px;
          padding: 20px 30px;
          background-color: #1456fd;
          position: absolute;
          top: 0;
        }
      }
    }
    .box_bt {
      .bar {
        display: flex;
        align-items: center;
        gap: 30px;
        width: 100%;
        height: 120px;
        padding: 10px 30px;
        background-color: #1456fd;
        img {
          width: 30px;
          filter: brightness(0) invert(1);
        }
      }
      .bt_txt {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 80px 58px;
      }
    }
    .clock_img {
      width: 50%;
      position: absolute;
      bottom: -2%;
      right: -13%;
    }
    .cart_img {
      width: 35%;
      position: absolute;
      bottom: -5%;
      right: -10%;
    }
  }
}
</style>
