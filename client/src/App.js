import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./components/Employees";
import axios from "./api/axios";
import Form from "./components/Form";
import AgeDistributionChart from "./components/AgeDistributionChart";
import DepartmentEmployeeCountChart from "./components/DepartmentEmployeeCountChart";
import SalaryRangeDistributionChart from "./components/SalaryRangeDistributionChart";
import GenderPieChart from "./components/GenderPieChart";

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
    <div className="container card">
      <h1>Employee Dashboard</h1>
      <div className="row text-center">
        <h1>Key Metrics</h1>
        <div className="card p-5 col-6">
          {totalEmployees} {totalEmployees === 1 ? "Employee" : "Employees"}
        </div>
        <div className="card p-5 col-6">
          Average Salary: {averageSalary.toFixed(2)} LPA
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-3">
          <AgeDistributionChart data={employeesData} />
        </div>
        <div className="col-3">
          <DepartmentEmployeeCountChart data={employeesData} />
        </div>
        <div className="col-3">
          <SalaryRangeDistributionChart data={employeesData} />
        </div>
        <div className="col-3">
          <GenderPieChart data={employeesData} />
        </div>
      </div>

      <Form />
      <Employees employeeList={employeesData} />
    </div>
  );
};

export default App;
