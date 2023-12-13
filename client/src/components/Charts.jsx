import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const departments = [
        ...new Set(data.map((employee) => employee.department)),
      ];
      const averageSalaries = departments.map((department) => {
        const departmentEmployees = data.filter(
          (employee) => employee.department === department
        );
        const totalSalary = departmentEmployees.reduce(
          (acc, employee) => acc + employee.salary,
          0
        );
        const averageSalary = totalSalary / departmentEmployees.length;
        return averageSalary.toFixed(2);
      }, []);

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: departments,
          datasets: [
            {
              label: "Average Salary",
              data: averageSalaries,
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
            },
          },
          responsive: true,
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
