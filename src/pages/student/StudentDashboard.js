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

  const buttonText = (status) => {
    if (status === "Active") return "View & Start Exam";
    if (status === "Upcoming") return "View Details";
    return "View Summary";
  };

  /* ===============================
     GO TO EXAM SUMMARY
  ================================ */
  const handleViewDetails = (examId) => {
    navigate(`/student/exam-summary/${examId}`);
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
            View exam details and attempt within the scheduled time
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
              No exams assigned yet.
            </p>
          </div>
        )}

        {/* Exams Grid */}
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

                  {exam.instituteName && (
                    <p className="text-xs text-gray-500 mt-1">
                      🏫 {exam.instituteName}
                    </p>
                  )}

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
                    onClick={() => handleViewDetails(exam._id)}
                    className="mt-5 w-full py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {buttonText(status)}
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
