<template>
  <div class="chart-card">
    <div class="chart-header">
      <h1 class="monthlyPayChart-h2">월간 정산 현황</h1>
      <span class="unit-label">단위(만원)</span>
    </div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const chartData = {
  labels: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  datasets: [
    {
      label: "일반",
      data: [100, 150, 200, 180, 190, 200, 250, 230, 210, 190, 170, 160],
      backgroundColor: "#d1d5db", // 연회색
      stack: "total",
    },
    {
      label: "구독",
      data: [150, 180, 300, 200, 210, 280, 320, 300, 270, 250, 220, 200],
      backgroundColor: "#3b82f6", // 파랑
      stack: "total",
    },
    {
      label: "합계",
      data: [250, 330, 500, 380, 400, 480, 570, 530, 480, 440, 390, 360],
      backgroundColor: "rgba(0,0,0,0)", // 합계는 툴팁용 가상 데이터 (투명)
      stack: "total",
      borderWidth: 0,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    tooltip: {
      backgroundColor: "#ffffff",
      titleColor: "#616161",
      bodyColor: "#616161",
      borderColor: "#9E9E9E",
      borderWidth: 1,
      cornerRadius: 8,
      padding: 14,
      bodySpacing: 6, // 텍스트 줄 간격
      titleSpacing: 8, // 타이틀 아래 여백
      titleFont: {
        size: 16,
        weight: "600",
        family: "Pretendard",
        lineHeight: 1.6,
      },
      bodyFont: {
        size: 16,
        family: "Pretendard",
        lineHeight: 1.6,
      },
      bodySpacing: 6, // ✅ 텍스트 줄 간격
      titleSpacing: 8, // ✅ 타이틀 아래 여백
      callbacks: {
        label: function (ctx) {
          const label = ctx.dataset.label || "";
          const value = ctx.raw;
          return `${label}: ${value}만원`;
        },
      },
    },
    legend: {
      position: "bottom",
      labels: {
        filter: function (legendItem, chart) {
          // '합계' 라벨은 legend애서 제외
          return legendItem.text !== "합계";
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        padding: 10,
      },
      grid: {
        display: false, // 세로선 숨김
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      max: 800,
      ticks: {
        stepSize: 100,
        padding: 10,
      },
      grid: {
        display: true, //가로선 표시
        drawBorder: false, // 왼쪽 축선 제거
      },
      border: {
        display: false,
      },
    },
  },
};
</script>

<style scoped lang="scss">
.chart-card {
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  padding: 24px;
  width: 100%;
  max-width: 838px;
  height: 453px;
  // margin: auto;
}
.chart-card canvas {
  height: 92% !important;
  width: 92% !important;
  margin: auto;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  & .monthlyPayChart-h2 {
    font-size: 16px;
    font-weight: 500;
    color: #424242;
  }
  h1 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .unit-label {
    font-size: 12px;
    color: #999;
  }
}
</style>
