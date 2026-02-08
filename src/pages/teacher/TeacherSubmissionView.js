import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const TeacherSubmissionView = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [marksMap, setMarksMap] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await API.get(
          `/results/submission/${submissionId}/details`
        );

        setData(res.data);

        // ✅ Initialize marks for ALL non-MCQ (short, long, file)
        const initial = {};
        res.data.questions.forEach(q => {
          if (q.type !== "mcq") {
            initial[q._id] = q.obtainedMarks || 0;
          }
        });

        setMarksMap(initial);
      } catch {
        alert("Failed to load submission");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [submissionId, navigate]);

  const handleMarksChange = (qid, value, max) => {
    const v = Math.min(Math.max(Number(value), 0), max);
    setMarksMap(prev => ({ ...prev, [qid]: v }));
  };

  const finalizeEvaluation = async () => {
    if (!window.confirm("Finalize and lock this result?")) return;

    try {
      setSaving(true);

      const payload = Object.keys(marksMap).map(qid => ({
        questionId: qid,
        obtainedMarks: marksMap[qid]
      }));

      await API.post(
        `/results/submission/${submissionId}/evaluate`,
        { answers: payload }
      );

      alert("Result finalized successfully");
      navigate(-1);
    } catch {
      alert("Failed to save evaluation");
    } finally {
      setSaving(false);
    }
  };

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

  if (!data) return null;

  const { student, exam, questions, obtainedMarks, totalMarks } = data;
  const isManual = exam.evaluationType === "manual";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-6xl mx-auto p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Student Submission</h2>
            <p className="text-gray-600">
              {exam.title} • {student.name}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-lg"
          >
            ← Back
          </button>
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-xl border p-5 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Student</p>
            <p className="font-semibold">{student.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">User ID</p>
            <p className="font-semibold">{student.userId || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Score</p>
            <p className="font-bold text-lg">
              {obtainedMarks} / {totalMarks}
            </p>
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q._id} className="bg-white rounded-xl border p-6">
              <p className="font-semibold mb-3">
                {index + 1}. {q.questionText}
              </p>

              {/* MCQ */}
              {q.type === "mcq" && (
                <>
                  <p className="text-sm">
                    Student Answer:{" "}
                    <b>{q.studentAnswer || "Not Answered"}</b>
                  </p>
                  <p className="text-sm mt-1">
                    Correct Answer: <b>{q.correctAnswer}</b>
                  </p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      q.studentAnswer === q.correctAnswer
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {q.studentAnswer === q.correctAnswer
                      ? "Correct"
                      : "Wrong"}
                  </span>
                </>
              )}

              {/* SHORT / LONG */}
              {(q.type === "short" || q.type === "long") && (
                <>
                  <p className="text-sm mb-2">Student Answer:</p>
                  <div className="p-3 bg-gray-50 rounded mb-3 whitespace-pre-wrap">
                    {q.studentAnswer || "Not Answered"}
                  </div>

                  {isManual && (
                    <div className="flex items-center gap-3">
                      <label className="text-sm">
                        Marks (/{q.maxMarks})
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={q.maxMarks}
                        value={marksMap[q._id] ?? 0}
                        onChange={e =>
                          handleMarksChange(
                            q._id,
                            e.target.value,
                            q.maxMarks
                          )
                        }
                        className="border rounded px-3 py-1 w-24"
                      />
                    </div>
                  )}
                </>
              )}

              {/* FILE UPLOAD */}
              {q.type === "file" && (
                <>
                  <p className="text-sm mb-2">Uploaded File:</p>

                  {q.fileUrl ? (
                    <a
                      href={`${process.env.REACT_APP_API_URL}/${q.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mb-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      📎 View / Download File
                    </a>
                  ) : (
                    <p className="text-gray-500 mb-3">
                      No file uploaded
                    </p>
                  )}

                  {isManual && (
                    <div className="flex items-center gap-3">
                      <label className="text-sm">
                        Marks (/{q.maxMarks})
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={q.maxMarks}
                        value={marksMap[q._id] ?? 0}
                        onChange={e =>
                          handleMarksChange(
                            q._id,
                            e.target.value,
                            q.maxMarks
                          )
                        }
                        className="border rounded px-3 py-1 w-24"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* FINALIZE */}
        {isManual && (
          <div className="flex justify-end mt-8">
            <button
              onClick={finalizeEvaluation}
              disabled={saving}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save & Finalize Result"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherSubmissionView;
