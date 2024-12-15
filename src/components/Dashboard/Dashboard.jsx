import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  CreditCard, 
  BarChart2, 
  Settings, 
  LogOut, 
  Menu 
} from 'lucide-react';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'employees':
        return <EmployeeManagement />;
      case 'attendance':
        return <AttendanceTracking />;
      case 'payroll':
        return <PayrollOverview />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 transform bg-white shadow-md z-20 
          w-64 transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:static flex flex-col
        `}
      >
        <div className="p-6 text-center border-b">
          <h1 className="text-2xl font-bold text-blue-600">HR Portal</h1>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="mt-6">
            <SidebarItem 
              icon={<LayoutDashboard />} 
              label="Dashboard" 
              active={activeSection === 'dashboard'}
              onClick={() => {
                setActiveSection('dashboard');
                setSidebarOpen(false); // Close on mobile
              }}
            />
            <SidebarItem 
              icon={<Users />} 
              label="Employee Management" 
              active={activeSection === 'employees'}
              onClick={() => {
                setActiveSection('employees');
                setSidebarOpen(false);
              }}
            />
            <SidebarItem 
              icon={<Clock />} 
              label="Attendance" 
              active={activeSection === 'attendance'}
              onClick={() => {
                setActiveSection('attendance');
                setSidebarOpen(false);
              }}
            />
            <SidebarItem 
              icon={<CreditCard />} 
              label="Payroll" 
              active={activeSection === 'payroll'}
              onClick={() => {
                setActiveSection('payroll');
                setSidebarOpen(false);
              }}
            />
          </nav>
        </div>

        {/* Bottom Buttons */}
        <div className="border-t p-4">
          <SidebarItem icon={<Settings />} label="Settings" />
          <SidebarItem icon={<LogOut />} label="Logout" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-6">
          {/* Hamburger Menu for Mobile */}
          <button 
            className="md:hidden text-gray-600" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-semibold">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">3</span>
              <BarChart2 className="text-gray-600" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        {renderContent()}
      </div>

      {/* Backdrop for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div 
    className={`flex items-center p-3 cursor-pointer 
      ${active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </div>
);

const DashboardContent = () => (
  <div className="grid grid-cols-3 gap-6">
    <StatCard title="Total Employees" value="254" />
    <StatCard title="Active Employees" value="238" />
    <StatCard title="New Hires" value="12" />
  </div>
);

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-gray-500 mb-2">{title}</h3>
    <p className="text-3xl font-bold text-blue-600">{value}</p>
  </div>
);

const EmployeeManagement = () => (
  <div>
    <h3 className="text-xl mb-4">Employee List</h3>
    {/* Placeholder for employee list */}
  </div>
);

const AttendanceTracking = () => (
  <div>
    <h3 className="text-xl mb-4">Attendance Overview</h3>
    {/* Placeholder for attendance tracking */}
  </div>
);

const PayrollOverview = () => (
  <div>
    <h3 className="text-xl mb-4">Payroll Summary</h3>
    {/* Placeholder for payroll overview */}
  </div>
);

export default Dashboard;
