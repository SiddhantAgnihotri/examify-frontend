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
      } catch {
        alert("Failed to load exams");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  /* ===============================
     EXAM STATUS
  ================================ */
  const getExamStatus = (exam) => {
    const now = new Date();
    if (now < new Date(exam.startTime)) return "Upcoming";
    if (now > new Date(exam.endTime)) return "Expired";
    return "Active";
  };

  const badgeStyle = (status) => {
    if (status === "Active") return "bg-green-100 text-green-700";
    if (status === "Upcoming") return "bg-blue-100 text-blue-700";
    return "bg-red-100 text-red-700";
  };

  /* ===============================
     BUTTON TEXT
  ================================ */
  const getButtonText = (exam, status) => {
    if (status === "Active") return "Start Exam";
    if (status === "Upcoming") return "View Details";

    // Expired
    if (exam.evaluationType === "manual") {
      return "Result Pending";
    }
    return "View Result";
  };

  /* ===============================
     BUTTON ACTION
  ================================ */
  const handleAction = (exam, status) => {
    if (status === "Active" || status === "Upcoming") {
      navigate(`/student/exam-summary/${exam._id}`);
      return;
    }

    // Expired
    if (exam.evaluationType === "auto") {
      navigate("/student/results");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="student" />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Assigned Exams
          </h2>
          <p className="text-gray-600 mt-1">
            View and attempt exams within the scheduled time
          </p>
        </div>

        {loading && (
          <p className="text-gray-500">Loading exams...</p>
        )}

        {!loading && exams.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-600">
              No exams assigned yet.
            </p>
          </div>
        )}

        {!loading && exams.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => {
              const status = getExamStatus(exam);

              return (
                <div
                  key={exam._id}
                  className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {exam.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {exam.subject} • {exam.duration} mins
                  </p>

                  <p className="text-xs mt-1 text-gray-500">
                    📝 Evaluation:{" "}
                    <b>
                      {exam.evaluationType === "manual"
                        ? "Teacher Checked"
                        : "Auto (MCQ)"}
                    </b>
                  </p>

                  <div className="text-sm text-gray-600 mt-3 space-y-1">
                    <p>
                      <b>Start:</b>{" "}
                      {new Date(exam.startTime).toLocaleString()}
                    </p>
                    <p>
                      <b>End:</b>{" "}
                      {new Date(exam.endTime).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle(
                      status
                    )}`}
                  >
                    {status}
                  </span>

                  <button
                    onClick={() => handleAction(exam, status)}
                    disabled={
                      status === "Expired" &&
                      exam.evaluationType === "manual"
                    }
                    className={`mt-5 w-full py-2.5 rounded-lg text-sm font-medium text-white
                      ${
                        status === "Expired" &&
                        exam.evaluationType === "manual"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                    {getButtonText(exam, status)}
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
