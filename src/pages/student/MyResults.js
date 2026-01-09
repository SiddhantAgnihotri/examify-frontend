import { useEffect, useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const MyResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get("/results/my-results");
        setResults(res.data);
      } catch (err) {
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

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">My Results</h2>

        {loading && <p>Loading results...</p>}

        {!loading && results.length === 0 && (
          <p className="text-gray-600">No results available yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="bg-white rounded-xl shadow p-6"
              >
                <h3 className="text-lg font-semibold mb-1">
                  {r.examId.title}
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  {r.examId.subject} •{" "}
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Score
                    </p>
                    <p className="text-xl font-bold">
                      {r.obtainedMarks} / {r.totalMarks}
                    </p>
                  </div>

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

                {/* Progress bar */}
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

                <p className="text-right text-sm mt-2 text-gray-600">
                  {percent}%
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyResults;
