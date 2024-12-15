import React, { useState, useEffect } from "react";
import axios from "axios";


const AttendancePage = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceDate] = useState(new Date().toISOString().split("T")[0]); // Today's date
  const [loading, setLoading] = useState(false);
  const [inserting, setInserting] = useState(false); // Added missing state for insertion
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setFormattedDate(`${year}-${month}-${day}`);
  }, []);

  // Fetch employees with attendance data
  useEffect(() => {
    const fetchAttendanceData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/attendance?date=${formattedDate}`);
        console.log(response.data.data[0]);
        setEmployees(response.data.data || []);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [formattedDate]);

  // Handle inserting attendance for all employees
  const handleInsertAttendance = async () => {
    setInserting(true);
    try {
      const response = await axios.post("http://localhost:5000/attendance/insert-all", { date: formattedDate });
      alert(response.data.message);
      // Refresh the attendance data
      const responseData = await axios.get(`http://localhost:5000/attendance?date=${formattedDate}`);
      setEmployees(responseData.data.data || []);
    } catch (error) {
      console.error("Error inserting attendance:", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Show error message from backend
      } else {
        alert("Error inserting attendance data for all employees.");
      }
    } finally {
      setInserting(false);
    }
  };

  // Handle check-in
  const handleCheckIn = async (employeeId) => {
    if (!formattedDate) {
      return;
    }


    try {
      await axios.post("http://localhost:5000/attendance/checkin", { employeeId, date: formattedDate });
      alert("Check-in recorded successfully!");
      // Refresh the attendance data
      const response = await axios.get(`http://localhost:5000/attendance?date=${formattedDate}`);
      setEmployees(response.data.data || []);
    } catch (error) {
      console.error("Error recording check-in:", error);
    }
  };

  // Handle check-out
  const handleCheckOut = async (employeeId, checkInTime) => {
    if (!formattedDate) {
      return;
    }
    if (!checkInTime) {

      alert("Please check in first");
      return;
    }
    try {
      await axios.post("http://localhost:5000/attendance/checkout", { employeeId, date: formattedDate });
      alert("Check-out recorded successfully!");
      // Refresh the attendance data
      const response = await axios.get(`http://localhost:5000/attendance?date=${formattedDate}`);
      setEmployees(response.data.data || []);
    } catch (error) {
      console.error("Error recording check-out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-2xl font-bold text-center mb-6">Attendance Sheet</h1>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg">Date: {formattedDate}</span>
        <button
          onClick={handleInsertAttendance}
          disabled={inserting}
          className={`px-4 py-2 rounded shadow ${inserting ? "bg-gray-400 text-gray-700" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          {inserting ? "Inserting..." : "Insert Attendance for All Employees"}
        </button>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-5">Loading...</div>
        ) : employees.length > 0 ? (
          <table className="table-auto w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2">Employee ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Check-In</th>
                <th className="px-4 py-2">Check-Out</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees
                .slice() // Create a shallow copy to avoid mutating the original array
                .sort((a, b) => a.employeeId - b.employeeId) // Sort by employeeId
                .map((employee) => (
                  <tr key={employee.employeeId} className="border-b">
                    <td className="px-4 py-2 text-center">{employee.employeeId}</td>
                    <td className="px-4 py-2 text-center">
                      {employee.firstName} {employee.lastName}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {employee.checkInTime || (
                        <button
                          onClick={() => handleCheckIn(employee.employeeId)}
                          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                        >
                          Check In
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {employee.checkOutTime ? (
                        <span>{employee.checkOutTime}</span>
                      ) : (
                        <button
                          onClick={() => handleCheckOut(employee.employeeId, employee.checkInTime)}
                          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
                        >
                          Check Out
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">{employee.status || "Pending"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-5">No employees found.</div>
        )}
      </div>
    </div>

  );
};

export default AttendancePage;
