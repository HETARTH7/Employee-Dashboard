import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const AgeDistributionHistogram = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ages = data.map((employee) => employee.age);

      const ctx = chartRef.current.getContext("2d");

      const ageCounts = {};
      ages.forEach((age) => {
        ageCounts[age] = (ageCounts[age] || 0) + 1;
      });

      const ageLabels = Object.keys(ageCounts);
      const countData = ageLabels.map((age) => ageCounts[age]);

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ageLabels,
          datasets: [
            {
              label: "Number of Employees",
              data: countData,
              backgroundColor: "rgba(75,192,192,0.6)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Age",
              },
            },
            y: {
              beginAtZero: true,
              display: true,
              title: {
                display: true,
                text: "Number of Employees",
              },
            },
          },
          responsive: true,
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} width={200} height={200} />;
};

export default AgeDistributionHistogram;
