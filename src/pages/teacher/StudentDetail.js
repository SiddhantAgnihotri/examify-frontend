import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await API.get(`/teacher/student/${id}`);
        setStudent(res.data);
      } catch {
        alert("Failed to load student details");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar role="teacher" />
        <div className="p-6 text-center text-gray-600">
          Loading student details...
        </div>
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-4xl mx-auto p-6">

        {/* ================= BREADCRUMB + BACK ================= */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500">
            <span
              onClick={() => navigate("/teacher")}
              className="cursor-pointer hover:text-blue-600"
            >
              Dashboard
            </span>{" "}
            /{" "}
            <span
              onClick={() => navigate("/teacher/students")}
              className="cursor-pointer hover:text-blue-600"
            >
              Students
            </span>{" "}
            /{" "}
            <span className="text-gray-700 font-medium">
              Student Profile
            </span>
          </div>

          <button
            onClick={() => navigate("/teacher/students")}
            className="px-4 py-1.5 text-sm rounded-lg border bg-white hover:bg-gray-50"
          >
            ← Back to Students
          </button>
        </div>

        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Student Profile
          </h2>
          <p className="text-gray-600 mt-1">
            View student information and activity
          </p>
        </div>

        {/* ================= PROFILE CARD ================= */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-800">
                {student.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">
                {student.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Student ID</p>
              <p className="font-medium text-gray-800">
                {student.userId || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium text-gray-800">
                Student
              </p>
            </div>
          </div>
        </div>

        {/* ================= FUTURE EXTENSION ================= */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 text-blue-700 text-sm">
          🔒 Exam assignments, attempts, reset access & performance analytics can be added here.
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
