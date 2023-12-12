const {
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = require("express").Router();

// POST request to accept user input for employee details
router.post("/", addEmployee);

// GET request to accept updates to existing employee information
router.get("/", getEmployee);

// PUT request to update information about a specific employee using their ID
router.put("/:id", updateEmployee);

// DELETE request to remove employee records
router.delete("/:id", deleteEmployee);

module.exports = router;
