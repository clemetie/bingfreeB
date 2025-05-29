<template>
  <div class="chart-card">
    <div class="chart-header">
      <h1 class="monthlyPayChart-h2">정기 구독 요금제 비교</h1>
      <span class="unit-label">단위 (만원)</span>
    </div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

// 데이터: pricePlans 객체의 총액(total)에서 만원 단위로 변환
const labels = ["스탠다드", "스탠다드+", "디럭스", "프리미엄", "호시자키", "호시자키+"];

const data6 = [534600, 648000, 810000, 918000, 918000, 1134000].map((v) => (v / 10000).toFixed(1)); // 6회
const data8 = [673200, 816000, 1020000, 1156000, 1156000, 1428000].map((v) => (v / 10000).toFixed(1)); // 8회
const data12 = [950400, 1152000, 1440000, 1632000, 1632000, 2016000].map((v) => (v / 10000).toFixed(1)); // 12회

const chartData = {
  labels,
  datasets: [
    {
      label: "6회",
      data: data6,
      backgroundColor: "#60a5fa", // 파랑
      stack: "total",
    },
    {
      label: "8회",
      data: data8,
      backgroundColor: "#34d399", // 초록
      stack: "total",
    },
    {
      label: "12회",
      data: data12,
      backgroundColor: "#f472b6", // 분홍
      stack: "total",
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
      titleColor: "#212121",
      bodyColor: "#424242",
      borderColor: "#e0e0e0",
      borderWidth: 1,
      cornerRadius: 8,
      padding: 14,
      titleFont: {
        size: 15,
        weight: "600",
        family: "Pretendard",
      },
      bodyFont: {
        size: 14,
        family: "Pretendard",
      },
      callbacks: {
        label: (ctx) => {
          const label = ctx.dataset.label || "";
          const value = ctx.raw;
          return `${label}: ${value}만원`;
        },
      },
    },
    legend: {
      position: "bottom",
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        padding: 10,
      },
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        stepSize: 10,
        padding: 10,
        callback: (value) => `${value}만원`,
      },
      grid: {
        display: true,
        drawBorder: false,
      },
      max: 220, // max값은 201.6만원(가장 큰 데이터) + 여유
    },
  },
};
</script>

<style scoped lang="scss">
.chart-card {
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  padding: 24px;
  width: 100%;
  max-width: 838px;
  height: 453px;
}
.chart-card canvas {
  height: 92% !important;
  width: 80% !important;
  margin: auto;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .monthlyPayChart-h2 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .unit-label {
    font-size: 12px;
    color: #757575;
  }
}
</style>
