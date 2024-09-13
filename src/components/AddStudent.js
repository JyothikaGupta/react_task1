// src/components/AddStudent.js
import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8083/students";

export default function AddStudent() {
  const [rollNumber, setRollNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentMobile, setStudentMobile] = useState("");

  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleSTudentEmailChange = (event) => {
    setStudentEmail(event.target.value);
  };

  const handleStudentMobileChange = (event) => {
    setStudentMobile(event.target.value);
  };

  const handleAddStudent = async () => {
    const newStudent = { rollNumber, name: studentName, email: studentEmail, mobile: studentMobile };
    try {
      const response = await axios.post(API_URL, newStudent);
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
          onChange={handleSTudentEmailChange}
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

