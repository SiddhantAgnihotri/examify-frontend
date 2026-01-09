import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const Results = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/exam/my-exams").then((res) => setExams(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          Exam Results
        </h2>

        {exams.length === 0 && (
          <p className="text-gray-600">No exams available.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="bg-white rounded-xl shadow p-6"
            >
              <h3 className="text-lg font-semibold">
                {exam.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {exam.subject} • {exam.duration} mins
              </p>

              <button
                onClick={() =>
                  navigate(`/teacher/results/${exam._id}`)
                }
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                View Results
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
