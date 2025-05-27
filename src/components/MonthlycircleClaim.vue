<template>
  <div class="chart-card">
    <div class="chart-header">
      <h2 class="monthlyPayChart-h2">월간 청소 현황</h2>
      <span class="unit-label">단위(%)</span>
    </div>
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

// 데이터 정의
const chartData = {
  labels: ["상담 대기 중", "진행 중", "완료"],
  datasets: [
    {
      data: [20.8, 29.2, 50],
      backgroundColor: ["#4CAF50", "#FFA500", "#3B82F6"],
      borderWidth: 1,
    },
  ],
};

// 옵션 정의
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "60%", // 도넛 두께
  plugins: {
    tooltip: {
      backgroundColor: "#ffffff",
      titleColor: "#616161",
      bodyColor: "#616161",
      borderColor: "#9E9E9E",
      borderWidth: 1,
      cornerRadius: 8,
      padding: 14,
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
      callbacks: {
        label: function (ctx) {
          return `${ctx.label}: ${ctx.raw}%`;
        },
      },
    },
    legend: {
      position: "right",
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          family: "Pretendard",
          size: 14,
        },
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
    font-weight: 500;
    color: #424242;
  }

  .unit-label {
    font-size: 12px;
    color: #999;
  }
}
</style>
