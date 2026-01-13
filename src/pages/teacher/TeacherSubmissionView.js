import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const TeacherSubmissionView = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        // Fetch submission
        const res = await API.get(
          `/results/submission/${submissionId}`
        );

        setSubmission(res.data);

        // Fetch exam questions
        const qRes = await API.get(
          `/question/${res.data.examId._id}`
        );
        setQuestions(qRes.data);
      } catch (err) {
        alert("Failed to load submission");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [submissionId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar role="teacher" />
        <div className="p-6 text-center text-gray-600">
          Loading submission...
        </div>
      </div>
    );
  }

  if (!submission) return null;

  // Map answers for quick lookup
  const answerMap = {};
  submission.answers.forEach((a) => {
    answerMap[a.questionId] = a.selectedOption;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-6xl mx-auto p-6">
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Student Exam Attempt
            </h2>
            <p className="text-gray-600 mt-1">
              {submission.examId.title}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            ← Back
          </button>
        </div>

        {/* ================= STUDENT SUMMARY ================= */}
        <div className="bg-white rounded-xl border p-5 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Student Name</p>
            <p className="font-semibold">
              {submission.studentId.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Student ID</p>
            <p className="font-semibold">
              {submission.studentId.userId || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Score</p>
            <p className="font-bold text-lg">
              {submission.obtainedMarks} /{" "}
              {submission.totalMarks}
            </p>
          </div>
        </div>

        {/* ================= QUESTIONS ================= */}
        <div className="space-y-6">
          {questions.map((q, index) => {
            const studentAnswer = answerMap[q._id];
            const isCorrect =
              studentAnswer === q.correctAnswer;

            return (
              <div
                key={q._id}
                className="bg-white rounded-xl border p-6"
              >
                <p className="font-semibold mb-4">
                  {index + 1}. {q.questionText}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(q.options).map(
                    ([key, value]) => {
                      const isSelected =
                        studentAnswer === key;
                      const isCorrectOpt =
                        q.correctAnswer === key;

                      return (
                        <div
                          key={key}
                          className={`p-3 rounded-lg border
                            ${
                              isCorrectOpt
                                ? "border-green-500 bg-green-50"
                                : isSelected
                                ? "border-red-500 bg-red-50"
                                : ""
                            }`}
                        >
                          <b>{key}.</b> {value}
                        </div>
                      );
                    }
                  )}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm">
                    Student Answer:{" "}
                    <b>{studentAnswer || "Not Answered"}</b>
                  </p>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        isCorrect
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {isCorrect ? "Correct" : "Wrong"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherSubmissionView;
