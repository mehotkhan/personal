<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [
          "s",
          "s",
          "s",
          "s",
          "s",
          "s",
          "s",
          "s",
          "s",
          "s",
          "s",
          "s",
          "s",
          "s",
        ],
        datasets: [
          {
            label: "تسک ها",
            backgroundColor: "#ddd",
            data: [40, 20, 12, 40, 20, 12, 40, 20, 12, 3, 55, 22, 44, 55],
          },
        ],
      },
      chartOptions: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            display: false,

            grid: {
              display: false,
            },
          },
        },
        responsive: true,
      },
    };
  },
};
</script>
