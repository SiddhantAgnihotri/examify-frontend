import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const MyResults = () => {
  const [results, setResults] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const checkedRes = await API.get("/results/my-results");
        setResults(checkedRes.data);

        // 🔥 fetch pending submissions manually
        const pendingRes = await API.get("/student/pending-results");
        setPending(pendingRes.data);
      } catch {
        alert("Failed to load results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const getStatus = (obtained, total) => {
    const percent = (obtained / total) * 100;
    return percent >= 40 ? "Pass" : "Fail";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="student" />

      <div className="max-w-6xl mx-auto p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              My Results
            </h2>
            <p className="text-gray-600 mt-1">
              Exam scores & evaluation status
            </p>
          </div>

          <button
            onClick={() => navigate("/student")}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            ← Back
          </button>
        </div>

        {loading && (
          <p className="text-gray-500">Loading results...</p>
        )}

        {/* ================= CHECKED RESULTS ================= */}
        {!loading && results.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-4">
              ✅ Evaluated Exams
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {results.map((r) => {
                const percent = Math.round(
                  (r.obtainedMarks / r.totalMarks) * 100
                );
                const status = getStatus(
                  r.obtainedMarks,
                  r.totalMarks
                );

                return (
                  <div
                    key={r._id}
                    className="bg-white rounded-xl shadow-sm border p-6"
                  >
                    <h3 className="text-lg font-semibold">
                      {r.examId.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4">
                      {r.examId.subject}
                    </p>

                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xl font-bold">
                        {r.obtainedMarks} / {r.totalMarks}
                      </p>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold
                          ${
                            status === "Pass"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          status === "Pass"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <p className="text-right text-sm mt-2">
                      {percent}%
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ================= PENDING RESULTS ================= */}
        {!loading && pending.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-4">
              ⏳ Pending Evaluation
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pending.map((p) => (
                <div
                  key={p._id}
                  className="bg-white border rounded-xl p-6"
                >
                  <h3 className="font-semibold text-lg">
                    {p.examId.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-3">
                    {p.examId.subject}
                  </p>

                  <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                    Awaiting Teacher Evaluation
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && results.length === 0 && pending.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-600">
              You haven’t completed any exams yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyResults;
