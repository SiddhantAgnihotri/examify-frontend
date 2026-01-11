import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const AssignExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/teacher/students").then((res) => setStudents(res.data));
  }, []);

  const toggleStudent = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const assign = async () => {
    if (selected.length === 0) {
      alert("Please select at least one student");
      return;
    }

    try {
      setLoading(true);
      await API.post(`/exam/assign/${examId}`, {
        studentIds: selected
      });
      alert("Exam assigned successfully");
      navigate("/teacher/my-exams");
    } catch {
      alert("Failed to assign exam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-5xl mx-auto p-6">

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
              onClick={() => navigate("/teacher/my-exams")}
              className="cursor-pointer hover:text-blue-600"
            >
              My Exams
            </span>{" "}
            / <span className="text-gray-700 font-medium">Assign Exam</span>
          </div>

          <button
            onClick={() => navigate("/teacher/my-exams")}
            className="px-4 py-1.5 text-sm rounded-lg border bg-white hover:bg-gray-50"
          >
            ← Back to My Exams
          </button>
        </div>

        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Assign Exam
          </h2>
          <p className="text-gray-600 mt-1">
            Select students who should attempt this exam
          </p>
        </div>

        {/* ================= STUDENT LIST ================= */}
        <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
          {students.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              No students available
            </div>
          ) : (
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Select
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Student ID
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr
                    key={s._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(s._id)}
                        onChange={() => toggleStudent(s._id)}
                        className="h-4 w-4 accent-blue-600"
                      />
                    </td>
                    <td className="px-4 py-3">{s.name}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {s.email}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {s.userId || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ================= FOOTER ACTIONS ================= */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-600">
            Selected students:{" "}
            <span className="font-medium">{selected.length}</span>
          </p>

          <div className="space-x-3">
            <button
              onClick={() => navigate("/teacher/my-exams")}
              className="px-5 py-2 rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={assign}
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Assigning..." : "Assign Exam"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignExam;
