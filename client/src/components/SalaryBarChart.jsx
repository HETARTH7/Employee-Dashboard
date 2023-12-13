import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const SalaryBarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const salaries = data.map((employee) => employee.salary);
      const labels = data.map((employee, index) => employee.name);

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Salary",
              data: salaries,
              backgroundColor: "rgba(75,192,192,0.6)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Salary (LPA)",
              },
            },
          },
          responsive: true,
        },
      });
    }
  }, [data]);

  return (
    <div>
      <h3>Employees salaries</h3>
      <canvas ref={chartRef} width={1000} height={500} />
    </div>
  );
};

export default SalaryBarChart;
