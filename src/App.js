// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const API_URL = "http://localhost:8083/students";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">Attendance System</div>
        <div>
          <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
            Display
          </Link>
          <Link to="/add" className="text-white hover:bg-gray-700 px-3 py-2 rounded ml-4">
            Add Details
          </Link>
        </div>
      </div>
    </nav>
  );
}

function AddStudent() {
  const [rollNumber, setRollNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentMobile, setStudentMobile] = useState("");

  const handleRollNumberChange = (event) => setRollNumber(event.target.value);
  const handleStudentNameChange = (event) => setStudentName(event.target.value);
  const handleStudentEmailChange = (event) => setStudentEmail(event.target.value);
  const handleStudentMobileChange = (event) => setStudentMobile(event.target.value);

  const handleAddStudent = async () => {
    const newStudent = { rollNumber, name: studentName, email: studentEmail, mobile: studentMobile };
    try {
      await axios.post(API_URL, newStudent);
      alert("Student added successfully!");
      setRollNumber("");
      setStudentName("");
      setStudentEmail("");
      setStudentMobile("");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Add Student</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="rollNumber">
          Roll Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="rollNumber"
          type="number"
          value={rollNumber}
          onChange={handleRollNumberChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="studentName">
          Student Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="studentName"
          type="text"
          value={studentName}
          onChange={handleStudentNameChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="studentEmail">
          Email Id
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="studentEmail"
          type="text"
          value={studentEmail}
          onChange={handleStudentEmailChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="studentMobile">
          Mobile Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="studentMobile"
          type="number"
          value={studentMobile}
          onChange={handleStudentMobileChange}
          required
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleAddStudent}
      >
        Add Student
      </button>
    </div>
  );
}

function DisplayStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(API_URL);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleCheckin = async (rollNumber) => {
    const updatedStudents = students.map((student) => {
      if (student.rollNumber === rollNumber) {
        return { ...student, checkinTime: new Date().toLocaleTimeString() };
      }
      return student;
    });

    try {
      const studentToUpdate = updatedStudents.find((student) => student.rollNumber === rollNumber);
      await axios.put(`${API_URL}/${studentToUpdate.id}`, studentToUpdate);
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error updating checkin time:", error);
    }
  };

  const handleCheckout = async (rollNumber) => {
    const updatedStudents = students.map((student) => {
      if (student.rollNumber === rollNumber) {
        return { ...student, checkoutTime: new Date().toLocaleTimeString() };
      }
      return student;
    });

    try {
      const studentToUpdate = updatedStudents.find((student) => student.rollNumber === rollNumber);
      await axios.put(`${API_URL}/${studentToUpdate.id}`, studentToUpdate);
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error updating checkout time:", error);
    }
  };

  const presentStudents = students.filter((student) => student.checkoutTime === undefined);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Students Present in School</h1>
      <p className="mb-4">Total students: {students.length}</p>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">Student Name</th>
            <th className="py-2 px-4 text-left">Email ID</th>
            <th className="py-2 px-4 text-left">Mobile Number</th>
            <th className="py-2 px-4 text-left">Checkin Time</th>
            <th className="py-2 px-4 text-left">Checkout Time</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {presentStudents.map((student) => (
            <tr key={student.rollNumber} className="border-b">
              <td className="py-2 px-4">{student.name}</td>
              <td className="py-2 px-4">{student.email}</td>
              <td className="py-2 px-4">{student.mobile}</td>
              <td className="py-2 px-4">{student.checkinTime || "Not checked in yet"}</td>
              <td className="py-2 px-4">{student.checkoutTime || "Not checked out yet"}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleCheckin(student.rollNumber)}
                >
                  Check In
                </button>
                {student.checkinTime && !student.checkoutTime && (
                  <button
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleCheckout(student.rollNumber)}
                  >
                    Check Out
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DisplayStudents />} />
        <Route path="/add" element={<AddStudent />} />
      </Routes>
    </Router>
  );
}
