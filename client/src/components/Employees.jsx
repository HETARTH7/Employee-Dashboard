import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Form from "./Form";

const Employees = (props) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState(null);
  const [filter, setFilter] = useState(false);

  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterSalaryMin, setFilterSalaryMin] = useState("");
  const [filterSalaryMax, setFilterSalaryMax] = useState("");

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

    const filteredList = sortedList.filter(
      (employee) =>
        Object.values(employee).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        ) &&
        (filterDepartment
          ? employee.department
              .toLowerCase()
              .includes(filterDepartment.toLowerCase())
          : true) &&
        (filterPosition
          ? employee.position
              .toLowerCase()
              .includes(filterPosition.toLowerCase())
          : true) &&
        (filterSalaryMin
          ? parseFloat(employee.salary) >= parseFloat(filterSalaryMin)
          : true) &&
        (filterSalaryMax
          ? parseFloat(employee.salary) <= parseFloat(filterSalaryMax)
          : true)
    );

    setFilteredEmployeeList(filteredList);
  }, [
    sortConfig,
    searchQuery,
    filterDepartment,
    filterPosition,
    filterSalaryMin,
    filterSalaryMax,
    props.employeeList,
  ]);

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
    const json = await response.data;
    alert(json.message);
    setSelectedEmployee(null);
    window.location = "/";
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (shouldDelete) {
      const response = await axios.delete(`/${id}`);
      const json = await response.data;
      alert(json.message);
      setSelectedEmployee(null);
      window.location = "/";
    }
  };

  const handleFilter = () => {
    setCurrentPage(1);
    setFilter(!filter);
  };

  return (
    <div className="">
      {!selectedEmployee ? (
        <Form />
      ) : (
        <form className="mt-5 row text-center">
          <h2>Update Employee Details</h2>
          <div className="mb-3 col-6">
            <label htmlFor="name" className="form-label">
              Name:
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={updatedEmployee.name}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    name: e.target.value,
                  })
                }
              />
            </label>
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="department" className="form-label">
              Department:
              <input
                type="text"
                className="form-control"
                id="department"
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
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="position" className="form-label">
              Position:
              <input
                type="text"
                className="form-control"
                id="position"
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
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="salary" className="form-label">
              Salary (LPA):
              <input
                type="number"
                className="form-control"
                id="salary"
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
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="age" className="form-label">
              Age:
              <input
                type="number"
                className="form-control"
                id="age"
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
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="gender" className="form-label">
              Gender:
              <input
                type="text"
                className="form-control"
                id="gender"
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
          </div>
          <div className="mb-3 col-6">
            <button
              type="button"
              className="btn btn-outline-success me-2"
              onClick={() => handleUpdate(selectedEmployee._id)}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-outline-danger me-2"
              onClick={() => handleDelete(selectedEmployee._id)}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSelectedEmployee(null)}
            >
              Close
            </button>
          </div>
        </form>
      )}
      <div className="search-bar mb-5 mt-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button className="btn btn-secondary m-1" onClick={handleFilter}>
          Filter
        </button>
      </div>
      <div hidden={filter ? false : true} className="filter-bar mb-5 mt-5">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by Department..."
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Filter by Position..."
          value={filterPosition}
          onChange={(e) => setFilterPosition(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Min Salary"
          value={filterSalaryMin}
          onChange={(e) => setFilterSalaryMin(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Max Salary"
          value={filterSalaryMax}
          onChange={(e) => setFilterSalaryMax(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("department")}>Department</th>
              <th onClick={() => handleSort("position")}>Position</th>
              <th onClick={() => handleSort("salary")}>Salary (LPA)</th>
              <th>Actions</th>
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
                  <button
                    className="btn btn-outline-success"
                    onClick={() => handleEmployeeClick(employeeData)}
                  >
                    Actions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className="btn btn-secondary m-1"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Employees;
