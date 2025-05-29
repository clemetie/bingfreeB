<template>
  <div class="chart-card">
    <div class="chart-header">
      <h1 class="monthlyChart-h2">월간 청소 현황</h1>
      <span class="unit-label">단위(건)</span>
    </div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale } from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale);

const chartData = {
  labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  datasets: [
    {
      label: "청소 횟수",
      data: [45, 52, 60, 60, 65, 80, 98, 90, 68, 60, 45, 40],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
      fill: false,
      pointRadius: 5, // ● 기본 원 크기
      pointHoverRadius: 7, // ● 마우스 호버 시 커지는 크기
      pointBackgroundColor: "#3b82f6",
      pointHitRadius: 20, // hover 인식 범위를 키움
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      backgroundColor: "#ffffff",
      titleColor: "#616161",
      bodyColor: "red",
      borderColor: "#9E9E9E",
      borderWidth: 1,
      cornerRadius: 8,
      padding: 10,
      displayColors: false,
      titleFont: {
        size: 16,
        weight: "600",
        family: "Pretendard",
      },
      bodyFont: {
        size: 16,
        family: "Pretendard",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        padding: 10,
      },
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 20,
        padding: 10,
      },
      grid: {
        display: true,
        drawBorder: false,
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
  max-width: 740px;
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
  & .monthlyChart-h2 {
    font-size: 16px;
    font-weight: 500;
    color: #424242;
  }
  h1 {
    font-size: 18px;
    font-weight: 500;
    color: #424242;
  }

  .unit-label {
    font-size: 10px;
    font-weight: 500;
    color: #757575;
  }
}
</style>
