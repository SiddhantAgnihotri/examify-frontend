import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const MyExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchExams = async () => {
    try {
      const res = await API.get("/exam/my-exams");
      setExams(res.data);
    } catch {
      alert("Failed to load exams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const publishExam = async (id) => {
    if (!window.confirm("Publish this exam? Students will be able to attempt it.")) return;
    await API.put(`/exam/publish/${id}`);
    fetchExams();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This will permanently delete the exam.")) return;
    await API.delete(`/exam/delete/${id}`);
    fetchExams();
  };

  const badgeStyle = (status) =>
    status === "published"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-7xl mx-auto p-6">

        {/* ================= BREADCRUMB + BACK ================= */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500">
            <span
              onClick={() => navigate("/teacher")}
              className="cursor-pointer hover:text-blue-600"
            >
              Dashboard
            </span>{" "}
            / <span className="text-gray-700 font-medium">My Exams</span>
          </div>

          <button
            onClick={() => navigate("/teacher")}
            className="px-4 py-1.5 text-sm rounded-lg border bg-white hover:bg-gray-50"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Exams</h2>
          <p className="text-gray-600 mt-1">
            View, manage, publish, assign or delete your exams
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        {loading && <p className="text-gray-500">Loading exams...</p>}

        {!loading && exams.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-600">You haven’t created any exams yet.</p>
          </div>
        )}

        {!loading && exams.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Subject</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Duration</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {exams.map((exam) => (
                  <tr key={exam._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{exam.title}</td>
                    <td className="px-4 py-3">{exam.subject || "-"}</td>
                    <td className="px-4 py-3">{exam.duration} min</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle(exam.status)}`}>
                        {exam.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => navigate(`/teacher/add-questions/${exam._id}`)}
                          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg"
                        >
                          Questions
                        </button>

                        <button
                          onClick={() => navigate(`/teacher/assign-exam/${exam._id}`)}
                          disabled={exam.status !== "published"}
                          className={`px-3 py-1.5 text-sm rounded-lg text-white
                            ${exam.status === "published"
                              ? "bg-indigo-600"
                              : "bg-gray-400 cursor-not-allowed"}`}
                        >
                          Assign
                        </button>

                        {exam.status === "draft" && (
                          <button
                            onClick={() => publishExam(exam._id)}
                            className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg"
                          >
                            Publish
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(exam._id)}
                          className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyExams;
