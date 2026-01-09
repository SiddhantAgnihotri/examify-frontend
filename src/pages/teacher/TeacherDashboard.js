import Navbar from "../../components/Navbar";
import DashboardCard from "../../components/DashboardCard";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Teacher Dashboard
          </h2>
          <p className="text-gray-600 mt-1">
            Manage exams, students, and results from one place
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Create Exam"
            subtitle="Create a new exam paper"
            actionText="Create"
            onAction={() => navigate("/teacher/create-exam")}
          />

          <DashboardCard
            title="My Exams"
            subtitle="View, edit & assign exams"
            actionText="Manage"
            onAction={() => navigate("/teacher/my-exams")}
          />

          <DashboardCard
            title="Create Student"
            subtitle="Create student login accounts"
            actionText="Create"
            onAction={() => navigate("/teacher/create-student")}
          />

          <DashboardCard
            title="Students"
            subtitle="View and manage all students"
            actionText="View"
            onAction={() => navigate("/teacher/students")}
          />

          <DashboardCard
            title="Results"
            subtitle="View student exam results"
            actionText="View"
            onAction={() => navigate("/teacher/results")}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
