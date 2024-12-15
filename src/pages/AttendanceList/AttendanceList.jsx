import React from 'react';

const AttendanceList = ({ records, handleCheckOut }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Attendance Records</h2>
            {records.length === 0 ? (
                <p className="text-gray-500">No records available.</p>
            ) : (
                <table className="w-full border border-gray-300 text-left text-gray-700">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">Employee ID</th>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Check-In</th>
                            <th className="py-2 px-4 border-b">Check-Out</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr key={record.attendance_id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{record.employee_id}</td>
                                <td className="py-2 px-4 border-b">{record.attendance_date}</td>
                                <td className="py-2 px-4 border-b">{record.check_in_time || '-'}</td>
                                <td className="py-2 px-4 border-b">{record.check_out_time || '-'}</td>
                                <td className={`py-2 px-4 border-b ${getStatusColor(record.status)}`}>
                                    {record.status}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {!record.check_out_time && record.status === 'Present' ? (
                                        <button
                                            onClick={() => handleCheckOut(record.attendance_id)}
                                            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                                        >
                                            Check Out
                                        </button>
                                    ) : (
                                        <span className="text-gray-500">Completed</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Present':
            return 'text-green-600';
        case 'Absent':
            return 'text-red-600';
        case 'Leave':
            return 'text-yellow-600';
        default:
            return 'text-gray-700';
    }
};

export default AttendanceList;
