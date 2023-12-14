import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./components/Employees";
import axios from "./api/axios";
import AgeDistributionChart from "./components/AgeDistributionChart";
import DepartmentEmployeeCountChart from "./components/DepartmentEmployeeCountChart";
import SalaryRangeDistributionChart from "./components/SalaryRangeDistributionChart";
import GenderPieChart from "./components/GenderPieChart";
import SalaryBarChart from "./components/SalaryBarChart";

const App = () => {
  const [employeesData, setEmployeesData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/");
        const json = await response.data;
        setEmployeesData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const totalEmployees = employeesData.length;
  const averageSalary =
    totalEmployees > 0
      ? employeesData.reduce((sum, employee) => sum + employee.salary, 0) /
        totalEmployees
      : 0;

  return (
    <div className="text-center">
      <h1 style={{ color: "#B6C4B6" }} className="fw-bold fs-1 m-2">
        Employee Dashboard
      </h1>
      <div style={{ "background-color": "aquamarine" }} className="row">
        <div
          style={{ "background-color": "aquamarine" }}
          className="container card col-lg-6 col-md-12"
        >
          <div
            style={{ "background-color": "aquamarine" }}
            className="row text-center mt-5"
          >
            <h1>Key Metrics</h1>
            <div
              style={{ "background-color": "teal" }}
              className="card p-1 col-sm-6"
            >
              {totalEmployees} {totalEmployees === 1 ? "Employee" : "Employees"}
            </div>
            <div
              style={{ "background-color": "teal" }}
              className="card p-1 col-sm-6"
            >
              Average Salary: {averageSalary.toFixed(2)} LPA
            </div>
          </div>
          <div
            style={{ "background-color": "aquamarine" }}
            className="row pb-4 pt-4"
          >
            <div className="col-sm-6">
              <AgeDistributionChart data={employeesData} />
            </div>
            <div className="col-sm-6">
              <SalaryRangeDistributionChart data={employeesData} />
            </div>
          </div>

          <div
            style={{ "background-color": "aquamarine" }}
            className="row pb-4 pt-4"
          >
            <div className="col-sm-6">
              <DepartmentEmployeeCountChart data={employeesData} />
            </div>
            <div className="col-sm-6">
              <GenderPieChart data={employeesData} />
            </div>
          </div>

          <SalaryBarChart data={employeesData} />
        </div>
        <div
          style={{ "background-color": "aquamarine" }}
          className="card col-lg-6 col-md-12"
        >
          <Employees employeeList={employeesData} />
        </div>
      </div>
    </div>
  );
};

export default App;
