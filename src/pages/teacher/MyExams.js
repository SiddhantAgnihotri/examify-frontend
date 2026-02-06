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
    if (!window.confirm("Publish this exam?")) return;
    await API.put(`/exam/publish/${id}`);
    fetchExams();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this exam permanently?")) return;
    await API.delete(`/exam/delete/${id}`);
    fetchExams();
  };

  const statusBadge = (status) =>
    status === "published"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  const evalBadge = (type) =>
    type === "manual"
      ? "bg-red-100 text-red-700"
      : "bg-blue-100 text-blue-700";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-7xl mx-auto p-6">
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Exams</h2>
          <p className="text-gray-600 mt-1">
            Manage exams, questions & evaluations
          </p>
        </div>

        {loading && <p>Loading exams...</p>}

        {!loading && exams.length === 0 && (
          <div className="bg-white p-10 rounded-xl text-center">
            No exams created yet.
          </div>
        )}

        {!loading && exams.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-xl shadow border">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Subject</th>
                  <th className="px-4 py-3 text-left">Duration</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Evaluation</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {exams.map((exam) => (
                  <tr key={exam._id} className="border-t">
                    <td className="px-4 py-3 font-medium">{exam.title}</td>
                    <td className="px-4 py-3">{exam.subject || "-"}</td>
                    <td className="px-4 py-3">{exam.duration} min</td>

                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(exam.status)}`}>
                        {exam.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${evalBadge(exam.evaluationType)}`}>
                        {exam.evaluationType === "manual"
                          ? "Manual Check"
                          : "Auto Check"}
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

                        {exam.status === "published" && (
                          <button
                            onClick={() => navigate(`/teacher/results/${exam._id}`)}
                            className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg"
                          >
                            View Submissions
                          </button>
                        )}

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
