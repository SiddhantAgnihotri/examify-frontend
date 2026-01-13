import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const StudentExamSummary = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await API.get(`/student/exam-summary/${examId}`);
        setExam(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load exam details");
        navigate("/student");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [examId, navigate]);

  const getStatus = () => {
    const now = new Date();
    if (now < new Date(exam.startTime)) return "Upcoming";
    if (now > new Date(exam.endTime)) return "Expired";
    return "Active";
  };

  const handleStartExam = async () => {
    try {
      setStarting(true);
      await API.get(`/student/start/${examId}`);
      navigate(`/student/start/${examId}`);
    } catch (err) {
      alert(err.response?.data?.message || "Cannot start exam");
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar role="student" />
        <div className="p-6 text-center text-gray-600">
          Loading exam summary...
        </div>
      </div>
    );
  }

  if (!exam) return null;

  const status = getStatus();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="student" />

      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Exam Summary
          </h2>
          <p className="text-gray-600 mt-1">
            Please review details before starting the exam
          </p>
        </div>

        {/* Exam Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          {/* Institute */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-blue-700 font-semibold">
              Institute
            </p>
            <p className="text-lg font-bold text-blue-800">
              {exam.instituteName}
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Exam Title</p>
              <p className="font-medium text-gray-800">
                {exam.title}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Subject</p>
              <p className="font-medium text-gray-800">
                {exam.subject || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium text-gray-800">
                {exam.duration} minutes
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Marks</p>
              <p className="font-medium text-gray-800">
                {exam.totalMarks || "Based on questions"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Start Time</p>
              <p className="font-medium text-gray-800">
                {new Date(exam.startTime).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">End Time</p>
              <p className="font-medium text-gray-800">
                {new Date(exam.endTime).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                ${
                  status === "Active"
                    ? "bg-green-100 text-green-700"
                    : status === "Upcoming"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {status}
            </span>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm text-yellow-800">
            ⚠️ Once you start the exam, the timer will begin and you must
            submit before time ends.
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => navigate("/student")}
              className="px-5 py-2 rounded-lg border hover:bg-gray-100"
            >
              Back
            </button>

            <button
              disabled={status !== "Active" || starting}
              onClick={handleStartExam}
              className={`px-6 py-2 rounded-lg text-white font-medium
                ${
                  status === "Active"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              {starting ? "Starting..." : "Start Exam"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentExamSummary;
