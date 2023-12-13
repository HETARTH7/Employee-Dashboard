import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const GenderPieChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const genders = [...new Set(data.map((employee) => employee.gender))];
      const genderCount = genders.map(
        (gender) => data.filter((employee) => employee.gender === gender).length
      );

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: genders,
          datasets: [
            {
              data: genderCount,
              backgroundColor: ["#FF6384", "#36A2EB"],
            },
          ],
        },
        options: {
          responsive: false,
        },
      });
    }
  }, [data]);

  return (
    <div>
      <h3>Genders</h3>
      <canvas ref={chartRef} width={400} height={200} />
    </div>
  );
};

export default GenderPieChart;
