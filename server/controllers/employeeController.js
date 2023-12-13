const Employee = require("../models/employeeModel");

// Function to accept user input for employee details
const addEmployee = async (req, res) => {
  try {
    const { name, department, position, salary, age, gender } = req.body;
    // Validation for accurate and complete information
    if (!name || !department || !position || !salary || !age || !gender) {
      return res
        .status(400)
        .json({ error: "Please provide all required information." });
    }
    // Creating a new Employee instance
    const newEmployee = new Employee({
      name,
      department,
      position,
      salary,
      age,
      gender,
    });
    // Store validated data in the database
    await newEmployee.save();
    // Respond with success message
    res.status(201).json({ message: "Employee created successfully." });
  } catch (error) {
    // Handle any errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
};

// Function to retrieve all employee data
const getEmployee = async (req, res) => {
  try {
    // Retrieve all employees from the database
    const employees = await Employee.find();
    // Return requested employee data in JSON format
    res.status(200).json(employees);
  } catch (error) {
    // Handle any errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
};

// Function to accept updates to existing employee information
const updateEmployee = async (req, res) => {
  try {
    // Extracting updated employee information from the request body
    const { name, department, position, salary, age, gender } = req.body;

    // Perform data validation
    if (!name || !department || !position || !salary || !age || !gender) {
      return res
        .status(400)
        .json({ error: "Please provide all required information." });
    }

    // Update database record
    await Employee.findByIdAndUpdate(req.params.id, {
      name,
      department,
      position,
      salary,
      age,
      gender,
    });

    // Respond with success message
    res.status(200).json({ message: "Employee updated successfully." });
  } catch (error) {
    // Handle any errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
};

// Function to to remove employee records
const deleteEmployee = async (req, res) => {
  try {
    // Delete employee data from the database
    await Employee.findByIdAndDelete(req.params.id);
    // Respond with success message
    res.status(200).json({ message: "Employee deleted successfully." });
  } catch (error) {
    // Handle any errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addEmployee, getEmployee, updateEmployee, deleteEmployee };
