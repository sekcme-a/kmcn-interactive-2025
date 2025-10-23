// components/ChartCanada.js
"use client";

import { useEffect, useState, useRef } from "react";
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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function ChartCanada() {
  const labels = ["건설업 전체", "전기공", "배관공", "목수"];
  const finalData = [23, 16, 14, 15];

  const baseColors = [
    [59, 130, 246], // blue
    [16, 185, 129], // green
    [234, 179, 8], // yellow
    [239, 68, 68], // red
  ];

  const [animatedData, setAnimatedData] = useState([0, 0, 0, 0]);
  const [animatedColors, setAnimatedColors] = useState(
    baseColors.map((c) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.3)`)
  );

  const animationRef = useRef();

  useEffect(() => {
    const duration = 1000;
    const delays = finalData.map((_, i) => i * 200);
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;

      const newData = finalData.map((value, index) => {
        const localElapsed = elapsed - delays[index];
        if (localElapsed <= 0) return 0;
        const progress = Math.min(localElapsed / duration, 1);
        return Math.round(progress * value);
      });

      const newColors = baseColors.map((c, index) => {
        const localElapsed = elapsed - delays[index];
        const progress = Math.min(Math.max(localElapsed / duration, 0), 1);
        const alpha = 0.3 + 0.5 * progress; // 0.3 -> 0.8
        return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
      });

      setAnimatedData(newData);
      setAnimatedColors(newColors);

      if (newData.some((v, i) => v < finalData[i])) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "비율 (%)",
        data: animatedData,
        backgroundColor: animatedColors,
        borderColor: baseColors.map(
          (c) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, 1)`
        ),
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#000",
        font: { weight: "bold", size: 14 },
        formatter: (value) => `${value}%`,
      },
    },
    scales: {
      y: { beginAtZero: true, max: 30, ticks: { stepSize: 5 } },
    },
  };

  return (
    <div className="lg:h-60 w-full">
      <Bar data={data} options={options} />
    </div>
  );
}
