
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8083/students";

export default function DisplayStudents() {
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
      const studentToUpdate = updatedStudents.find(
        (student) => student.rollNumber === rollNumber
      );
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
      const studentToUpdate = updatedStudents.find(
        (student) => student.rollNumber === rollNumber
      );
      await axios.put(`${API_URL}/${studentToUpdate.id}`, studentToUpdate);
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error updating checkout time:", error);
    }
  };

  const presentStudents = students.filter(
    (student) => student.checkoutTime === undefined
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Students Present in School</h1>
      <p className="mb-4">Total students: {students.length}</p>
      <ul>
        {presentStudents.map((student) => (
          <li key={student.rollNumber} className="flex items-center">
            <div className="flex-grow">
              {student.name} (
              {student.checkinTime ? (
                <>
                  Checked In: {student.checkinTime}{" "}
                  {student.checkoutTime && <span>- </span>}
                </>
              ) : (
                "Not checked in yet"
              )}
              {student.checkoutTime && <>Checked Out: {student.checkoutTime}</>}
              )
            </div>
            <div className="flex">
              <button
                className="mt-4 ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleCheckin(student.rollNumber)}
              >
                Check In
              </button>
              {student.checkinTime && !student.checkoutTime && (
                <button
                  className="mt-4 ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleCheckout(student.rollNumber)}
                >
                  Check Out
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

