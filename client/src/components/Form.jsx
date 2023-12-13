import React, { useState } from "react";
import axios from "../api/axios";

const Form = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("Male");

  const handleSubmit = async () => {
    const response = await axios.post("", {
      name,
      department,
      position,
      salary,
      age,
      gender,
    });
    const json = await response.data;
    alert(json.message);
    window.location = "/";
  };

  return (
    <div className="text-center mt-5">
      <h1>Add Employee Details</h1>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-6">
          <label htmlFor="name" className="form-label">
            Name:
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="col-6">
          <label htmlFor="department" className="form-label">
            Department:
            <input
              type="text"
              className="form-control"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </label>
        </div>
        <div className="col-6">
          <label htmlFor="position" className="form-label">
            Position:
            <input
              type="text"
              className="form-control"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </label>
        </div>
        <div className="col-6">
          <label htmlFor="salary" className="form-label">
            Salary (LPA):
            <input
              type="number"
              className="form-control"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </label>
        </div>
        <div className="col-6">
          <label htmlFor="age" className="form-label">
            Age:
            <input
              type="number"
              className="form-control"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
        </div>
        <div className="col-6">
          <label htmlFor="gender" className="form-label">
            Gender:
            <select
              className="form-select"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
