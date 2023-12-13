import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./components/Employees";
import axios from "./api/axios";
import Form from "./components/Form";
import ChartComponent from "./components/Charts";

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
    <div>
      <div>
        {totalEmployees} {totalEmployees === 1 ? "Employee" : "Employees"}
      </div>
      <div>Average Salary: {averageSalary.toFixed(2)} LPA</div>
      <ChartComponent data={employeesData} />
      <Form />
      <Employees employeeList={employeesData} />
    </div>
  );
};

export default App;
