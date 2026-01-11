import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const ExamResults = () => {
  const { examId } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get(`/results/exam/${examId}`);
        setResults(res.data);
      } catch (err) {
        alert("Failed to load exam results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [examId]);

  const getStatus = (obtained, total) => {
    const percent = (obtained / total) * 100;
    return percent >= 40 ? "Pass" : "Fail";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Exam Results
            </h2>
            <p className="text-gray-600 mt-1">
              Student performance overview
            </p>
          </div>

          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            ← Back
          </button>
        </div>


        {loading && <p>Loading results...</p>}

        {!loading && results.length === 0 && (
          <p className="text-gray-600">No submissions yet.</p>
        )}

        {!loading && results.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Student Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Marks
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Percentage
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.map((r) => {
                  const percent = Math.round(
                    (r.obtainedMarks / r.totalMarks) * 100
                  );
                  const status = getStatus(
                    r.obtainedMarks,
                    r.totalMarks
                  );

                  return (
                    <tr
                      key={r._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">
                        {r.studentId.name}
                      </td>
                      <td className="px-4 py-3">
                        {r.studentId.email}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {r.obtainedMarks} / {r.totalMarks}
                      </td>
                      <td className="px-4 py-3">
                        {percent}%
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold
                            ${status === "Pass"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                            }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamResults;
