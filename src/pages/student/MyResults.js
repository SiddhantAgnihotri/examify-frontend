import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const MyResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get("/results/my-results");
        setResults(res.data);
      } catch {
        alert("Failed to load results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const getPassFail = (obtained, total) => {
    const percent = (obtained / total) * 100;
    return percent >= 40 ? "Pass" : "Fail";
  };

  const statusBadge = (status) => {
    if (status === "checked")
      return "bg-green-100 text-green-700";
    return "bg-yellow-100 text-yellow-700";
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
              View your exam results and evaluation status
            </p>
          </div>

          <button
            onClick={() => navigate("/student")}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            ← Back
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-500">Loading results...</p>
        )}

        {/* EMPTY */}
        {!loading && results.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-600">
              You haven’t completed any exams yet.
            </p>
          </div>
        )}

        {/* RESULTS */}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((r) => {
              const isChecked = r.status === "checked";
              const percent = isChecked
                ? Math.round((r.obtainedMarks / r.totalMarks) * 100)
                : 0;

              return (
                <div
                  key={r._id}
                  className="bg-white rounded-xl border p-6 shadow hover:shadow-lg transition"
                >
                  {/* TITLE */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {r.examId.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-3">
                    {r.examId.subject} •{" "}
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>

                  {/* STATUS BADGE */}
                  <span
                    className={`inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
                      r.status
                    )}`}
                  >
                    {r.status === "checked"
                      ? "Checked"
                      : "Pending Evaluation"}
                  </span>

                  {/* SCORE */}
                  {isChecked ? (
                    <>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-sm text-gray-500">
                            Score
                          </p>
                          <p className="text-xl font-bold">
                            {r.obtainedMarks} / {r.totalMarks}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            getPassFail(
                              r.obtainedMarks,
                              r.totalMarks
                            ) === "Pass"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {getPassFail(
                            r.obtainedMarks,
                            r.totalMarks
                          )}
                        </span>
                      </div>

                      {/* PROGRESS BAR */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            percent >= 40
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <p className="text-right text-sm mt-2 text-gray-600">
                        {percent}%
                      </p>
                    </>
                  ) : (
                    <div className="mt-4 text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg">
                      ⏳ Result will be visible after teacher evaluation
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyResults;
