import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const SalaryBoxplot = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      const salaries = data.map((employee) => employee.salary);

      const margin = { top: 10, right: 30, bottom: 30, left: 40 };
      const width = 400 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const quartiles = d3
        .extent(salaries)
        .map((q) => d3.quantile(salaries, 0.5, (d) => d <= q));
      const iqr = quartiles[1] - quartiles[0];
      const outliers = salaries.filter(
        (salary) =>
          salary < quartiles[0] - 1.5 * iqr || salary > quartiles[1] + 1.5 * iqr
      );

      const xScale = d3.scaleLinear().domain([0, 1]).range([0, width]);
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(salaries)])
        .range([height, 0]);

      svg
        .selectAll("rect")
        .data([quartiles[0], quartiles[1]])
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(0.5) - 20)
        .attr("y", (d) => yScale(d))
        .attr("width", 40)
        .attr("height", (d) => height - yScale(d))
        .attr("fill", "#69b3a2")
        .attr("stroke", "black");

      svg
        .selectAll("line")
        .data([
          [quartiles[0] - 1.5 * iqr, outliers[0]],
          [quartiles[1] + 1.5 * iqr, outliers[1]],
        ])
        .enter()
        .append("line")
        .attr("x1", xScale(0.5))
        .attr("x2", xScale(0.5))
        .attr("y1", (d) => yScale(d[0]))
        .attr("y2", (d) => yScale(d[1]))
        .attr("stroke", "black");

      svg
        .append("line")
        .attr("x1", xScale(0.5) - 20)
        .attr("x2", xScale(0.5) + 20)
        .attr("y1", yScale(quartiles[0.5]))
        .attr("y2", yScale(quartiles[0.5]))
        .attr("stroke", "black");

      svg
        .selectAll("circle")
        .data(outliers)
        .enter()
        .append("circle")
        .attr("cx", xScale(0.5))
        .attr("cy", (d) => yScale(d))
        .attr("r", 3)
        .attr("fill", "red");
    }
  }, [data]);

  return (
    <div>
      <h3>Salary Range Distribution</h3>
      <svg ref={svgRef} />
    </div>
  );
};

export default SalaryBoxplot;
