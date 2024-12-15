import React, { useState } from 'react';

const AttendanceForm = ({ onAddAttendance }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Present');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeName && date) {
      onAddAttendance({ employeeName, date, status });
      setEmployeeName('');
      setDate('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 items-center mb-6"
    >
      <input
        type="text"
        placeholder="Employee Name"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full md:w-1/3"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full md:w-1/3"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full md:w-1/6"
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Leave">Leave</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add Attendance
      </button>
    </form>
  );
};

export default AttendanceForm;
