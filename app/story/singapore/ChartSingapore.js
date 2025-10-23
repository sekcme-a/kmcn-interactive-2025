import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js에 필수 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartData = {
  // 단일 막대이므로 레이블은 하나만 사용
  labels: ["노동자 구성"],
  datasets: [
    {
      label: "내국인노동자 (26%)",
      // '노동자 구성' 레이블에 대한 데이터 값 (26)
      data: [26],
      // 예쁜 색상 선택: 밝은 파랑
      backgroundColor: "rgba(54, 162, 235, 0.8)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
    {
      label: "외국인노동자 (74%)",
      // '노동자 구성' 레이블에 대한 데이터 값 (74)
      data: [74],
      // 예쁜 색상 선택: 진한 주황
      backgroundColor: "rgba(255, 159, 64, 0.8)",
      borderColor: "rgba(255, 159, 64, 1)",
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y", // **가로형 막대 그래프 설정**
  plugins: {
    legend: {
      position: "top", // 범례 위치
    },
    title: {
      display: false,
      text: "노동자 구성 비율 (100% Stacked Bar)",
      font: {
        size: 18,
      },
    },
    tooltip: {
      // 툴팁에서 퍼센트 값 표시
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.x !== null) {
            label += context.parsed.x + "%";
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true, // **데이터 누적 설정**
      max: 100, // **X축을 100%로 고정**
      min: 0,
      ticks: {
        callback: function (value) {
          return value + "%"; // X축 레이블에 '%' 표시
        },
      },
    },
    y: {
      stacked: true, // Y축 누적 설정 (가로형에서는 X축이 값 축이 됨)
      grid: {
        display: false, // Y축 그리드 숨기기 (단일 막대라 필요 없음)
      },
      barPercentage: 0.5, // 막대 너비 조절
      categoryPercentage: 0.5, // 카테고리 공간 조절
    },
  },
  // **막대의 디자인을 예쁘게 만들기 위한 추가 옵션**
  elements: {
    bar: {
      borderRadius: 10, // 막대 모서리를 둥글게
    },
  },
};

const ChartSingapore = () => {
  return (
    <div className="w-full h-32">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartSingapore;
