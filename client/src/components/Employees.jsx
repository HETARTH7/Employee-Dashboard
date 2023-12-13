import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const Employees = (props) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState(null);

  useEffect(() => {
    const sortedList = [...props.employeeList].sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      if (sortConfig.direction === "desc") {
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
      }
      return 0;
    });

    const filteredList = sortedList.filter((employee) =>
      Object.values(employee).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setFilteredEmployeeList(filteredList);
  }, [sortConfig, searchQuery, props.employeeList]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployeeList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredEmployeeList.length / itemsPerPage);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setUpdatedEmployee({ ...employee });
  };

  const handleUpdate = async (id) => {
    const response = await axios.put(`/${id}`, updatedEmployee);
    const updatedData = await response.data;
    console.log(updatedData);
    setSelectedEmployee(null);
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (shouldDelete) {
      const response = await axios.delete(`/${id}`);
      const json = await response.data;
      console.log(json);
      setSelectedEmployee(null);
    }
  };

  return (
    <div className="container border">
      <h1>Employees</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("department")}>Department</th>
            <th onClick={() => handleSort("position")}>Position</th>
            <th onClick={() => handleSort("salary")}>Salary (LPA)</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employeeData, index) => (
            <tr key={index}>
              <td>{employeeData.name}</td>
              <td>{employeeData.department}</td>
              <td>{employeeData.position}</td>
              <td>{employeeData.salary}</td>
              <td>
                <button onClick={() => handleEmployeeClick(employeeData)}>
                  Actions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      {selectedEmployee && (
        <div className="employee-details-card">
          <h2>Employee Details</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={updatedEmployee.name}
              onChange={(e) =>
                setUpdatedEmployee({ ...updatedEmployee, name: e.target.value })
              }
            />
          </label>
          <label>
            Department:
            <input
              type="text"
              name="department"
              value={updatedEmployee.department}
              onChange={(e) =>
                setUpdatedEmployee({
                  ...updatedEmployee,
                  department: e.target.value,
                })
              }
            />
          </label>
          <label>
            Position:
            <input
              type="text"
              name="position"
              value={updatedEmployee.position}
              onChange={(e) =>
                setUpdatedEmployee({
                  ...updatedEmployee,
                  position: e.target.value,
                })
              }
            />
          </label>
          <label>
            Salary (LPA):
            <input
              type="number"
              name="salary"
              value={updatedEmployee.salary}
              onChange={(e) =>
                setUpdatedEmployee({
                  ...updatedEmployee,
                  salary: e.target.value,
                })
              }
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={updatedEmployee.age}
              onChange={(e) =>
                setUpdatedEmployee({
                  ...updatedEmployee,
                  age: e.target.value,
                })
              }
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={updatedEmployee.gender}
              onChange={(e) =>
                setUpdatedEmployee({
                  ...updatedEmployee,
                  gender: e.target.value,
                })
              }
            />
          </label>
          <button onClick={() => handleUpdate(selectedEmployee._id)}>
            Update
          </button>
          <button onClick={() => handleDelete(selectedEmployee._id)}>
            Delete
          </button>
          <button onClick={() => setSelectedEmployee(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Employees;
