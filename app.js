const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// create a Schema
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
        required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
  },
  { versionKey: false }
);

// create a collection
const Student = mongoose.model("Student", studentSchema);


// Database Connection
mongoose.connect("mongodb://localhost:27017/data").then(() => {
  console.log("Connection Done !!");
});


//POST API
app.post("/students", async (req, res) => {
  try {
    // const { name, phone, address } = req.body;
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//GET API 
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(students, null, 2));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//DELETE API
app.delete("/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    res.json({ message: "Student deleted successfully", deletedStudent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.listen(3000, () => {
  console.log("Server is listening on 3000...");
});


 