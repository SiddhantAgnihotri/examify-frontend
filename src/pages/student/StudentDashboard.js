import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const StudentDashboard = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await API.get("/student/exams");
        setExams(res.data);
      } catch (err) {
        alert("Failed to load exams");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  /* ===============================
     EXAM STATUS (TIME BASED)
  ================================ */
  const getExamStatus = (exam) => {
    const now = new Date();
    const start = new Date(exam.startTime);
    const end = new Date(exam.endTime);

    if (now < start) return "Upcoming";
    if (now > end) return "Expired";
    return "Active";
  };

  const statusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      case "Expired":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  /* ===============================
     START EXAM HANDLER (SAFE)
  ================================ */
  const handleStartExam = async (examId) => {
    try {
      await API.get(`/student/start/${examId}`);
      navigate(`/student/start/${examId}`);
    } catch (err) {
      alert(err.response?.data?.message || "Cannot start exam");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="student" />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            My Exams
          </h2>
          <p className="text-gray-600 mt-1">
            View and attempt your assigned examinations
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500">Loading exams...</p>
        )}

        {/* Empty State */}
        {!loading && exams.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-600">
              No exams assigned yet. Please check back later.
            </p>
          </div>
        )}

        {/* Exams Grid */}
        {!loading && exams.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => {
              const status = getExamStatus(exam);
              const disabled = status !== "Active";

              return (
                <div
                  key={exam._id}
                  className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {exam.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {exam.subject} • {exam.duration} mins
                  </p>

                  <div className="text-sm text-gray-600 mt-3 space-y-1">
                    <p>
                      <span className="font-medium">Start:</span>{" "}
                      {new Date(exam.startTime).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">End:</span>{" "}
                      {new Date(exam.endTime).toLocaleString()}
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
                      status
                    )}`}
                  >
                    {status}
                  </span>

                  {/* Action */}
                  <button
                    disabled={disabled}
                    onClick={() => handleStartExam(exam._id)}
                    className={`mt-5 w-full py-2.5 rounded-lg text-sm font-medium text-white transition
                      ${
                        !disabled
                          ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Start Exam
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
