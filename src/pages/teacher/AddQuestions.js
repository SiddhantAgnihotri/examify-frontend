import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const AddQuestions = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("mcq");

  const [form, setForm] = useState({
    questionText: "",
    options: { A: "", B: "", C: "", D: "" },
    correctAnswer: "A",
    expectedAnswer: "",
    allowedFileTypes: "",
    maxFileSizeMB: 10,
    marks: 1
  });

  /* ===============================
     FETCH QUESTIONS (FIXED)
  ================================ */
  const fetchQuestions = useCallback(async () => {
    const res = await API.get(`/question/${examId}`);
    setQuestions(res.data);
  }, [examId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const resetForm = () => {
    setForm({
      questionText: "",
      options: { A: "", B: "", C: "", D: "" },
      correctAnswer: "A",
      expectedAnswer: "",
      allowedFileTypes: "",
      maxFileSizeMB: 10,
      marks: 1
    });
  };

  const addQuestion = async () => {
    if (!form.questionText.trim()) {
      alert("Question text is required");
      return;
    }

    try {
      setLoading(true);

      if (type === "mcq") {
        await API.post(`/question/mcq/${examId}`, {
          questionText: form.questionText,
          options: form.options,
          correctAnswer: form.correctAnswer,
          marks: form.marks
        });
      }

      if (type === "short") {
        await API.post(`/question/short/${examId}`, {
          questionText: form.questionText,
          expectedAnswer: form.expectedAnswer,
          marks: form.marks
        });
      }

      if (type === "long") {
        await API.post(`/question/long/${examId}`, {
          questionText: form.questionText,
          marks: form.marks
        });
      }

      if (type === "file") {
        await API.post(`/question/file/${examId}`, {
          questionText: form.questionText,
          allowedFileTypes: form.allowedFileTypes
            .split(",")
            .map(f => f.trim()),
          maxFileSizeMB: form.maxFileSizeMB,
          marks: form.marks
        });
      }

      resetForm();
      fetchQuestions();
    } catch {
      alert("Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question permanently?")) return;
    await API.delete(`/question/${id}`);
    fetchQuestions();
  };

  const badge = (type) => {
    if (type === "mcq") return "bg-blue-100 text-blue-700";
    if (type === "short") return "bg-purple-100 text-purple-700";
    if (type === "long") return "bg-indigo-100 text-indigo-700";
    return "bg-orange-100 text-orange-700";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-5xl mx-auto p-6">
        {/* HEADER */}
        <div className="mb-6 flex justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Add Questions
            </h2>
            <p className="text-gray-600">
              MCQ, Short, Long & File-based questions
            </p>
          </div>

          <button
            onClick={() => navigate("/teacher/my-exams")}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            ← Back
          </button>
        </div>

        {/* ADD QUESTION */}
        <div className="bg-white p-6 rounded-xl shadow border mb-8">
          <h3 className="text-lg font-semibold mb-4">
            New Question
          </h3>

          {/* QUESTION TYPE */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded-lg px-3 py-2 mb-4"
          >
            <option value="mcq">MCQ</option>
            <option value="short">Short Answer</option>
            <option value="long">Long Answer</option>
            <option value="file">File Upload</option>
          </select>

          <textarea
            placeholder="Enter question text"
            value={form.questionText}
            onChange={(e) =>
              setForm({ ...form, questionText: e.target.value })
            }
            className="w-full border rounded-lg p-3 mb-4"
          />

          {/* MCQ */}
          {type === "mcq" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["A", "B", "C", "D"].map((k) => (
                  <input
                    key={k}
                    placeholder={`Option ${k}`}
                    value={form.options[k]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        options: {
                          ...form.options,
                          [k]: e.target.value
                        }
                      })
                    }
                    className="border rounded-lg px-3 py-2"
                  />
                ))}
              </div>

              <select
                value={form.correctAnswer}
                onChange={(e) =>
                  setForm({
                    ...form,
                    correctAnswer: e.target.value
                  })
                }
                className="border rounded-lg px-3 py-2 mt-4"
              >
                {["A", "B", "C", "D"].map(o => (
                  <option key={o} value={o}>
                    Correct: {o}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* SHORT */}
          {type === "short" && (
            <input
              placeholder="Expected Answer (optional)"
              value={form.expectedAnswer}
              onChange={(e) =>
                setForm({
                  ...form,
                  expectedAnswer: e.target.value
                })
              }
              className="border rounded-lg px-3 py-2 w-full mb-4"
            />
          )}

          {/* FILE */}
          {type === "file" && (
            <>
              <input
                placeholder="Allowed file types (pdf,docx,zip)"
                value={form.allowedFileTypes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    allowedFileTypes: e.target.value
                  })
                }
                className="border rounded-lg px-3 py-2 w-full mb-3"
              />

              <input
                type="number"
                value={form.maxFileSizeMB}
                onChange={(e) =>
                  setForm({
                    ...form,
                    maxFileSizeMB: Number(e.target.value)
                  })
                }
                className="border rounded-lg px-3 py-2 w-40"
                placeholder="Max MB"
              />
            </>
          )}

          {/* MARKS + ADD */}
          <div className="flex gap-4 mt-4">
            <input
              type="number"
              min="1"
              value={form.marks}
              onChange={(e) =>
                setForm({ ...form, marks: Number(e.target.value) })
              }
              className="border rounded-lg px-3 py-2 w-24"
            />

            <button
              onClick={addQuestion}
              disabled={loading}
              className="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Adding..." : "Add Question"}
            </button>
          </div>
        </div>

        {/* QUESTION LIST */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-lg font-semibold mb-4">
            Questions ({questions.length})
          </h3>

          {questions.map((q, i) => (
            <div
              key={q._id}
              className="border rounded-lg p-4 mb-3"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">
                    {i + 1}. {q.questionText}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${badge(
                      q.type
                    )}`}
                  >
                    {q.type.toUpperCase()}
                  </span>
                </div>

                <button
                  onClick={() => deleteQuestion(q._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddQuestions;
