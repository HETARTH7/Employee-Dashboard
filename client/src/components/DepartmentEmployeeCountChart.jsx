import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DepartmentEmployeeCountChart = ({ data }) => {
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
      const departmentCounts = departments.map(
        (department) =>
          data.filter((employee) => employee.department === department).length
      );

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: departments,
          datasets: [
            {
              data: departmentCounts,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
              ],
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
      <h3>Departments</h3>
      <canvas ref={chartRef} width={400} height={200} />
    </div>
  );
};

export default DepartmentEmployeeCountChart;
