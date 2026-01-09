import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const AddQuestions = () => {
  const { examId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    questionText: "",
    options: { A: "", B: "", C: "", D: "" },
    correctAnswer: "A",
    marks: 1
  });

  const fetchQuestions = async () => {
    const res = await API.get(`/question/${examId}`);
    setQuestions(res.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOptionChange = (key, value) => {
    setForm({
      ...form,
      options: { ...form.options, [key]: value }
    });
  };

  const addQuestion = async () => {
    if (!form.questionText.trim()) {
      alert("Question text is required");
      return;
    }

    try {
      setLoading(true);

      await API.post(`/question/mcq/${examId}`, form);

      setForm({
        questionText: "",
        options: { A: "", B: "", C: "", D: "" },
        correctAnswer: "A",
        marks: 1
      });

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Add MCQ Questions
          </h2>
          <p className="text-gray-600 mt-1">
            Add multiple-choice questions for this exam
          </p>
        </div>

        {/* Add Question */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            New Question
          </h3>

          <textarea
            placeholder="Enter question text"
            value={form.questionText}
            onChange={(e) =>
              setForm({ ...form, questionText: e.target.value })
            }
            className="w-full border rounded-lg p-3 mb-5 focus:ring-2 focus:ring-blue-200"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["A", "B", "C", "D"].map((key) => (
              <input
                key={key}
                placeholder={`Option ${key}`}
                value={form.options[key]}
                onChange={(e) =>
                  handleOptionChange(key, e.target.value)
                }
                className="border rounded-lg px-3 py-2"
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-5">
            <select
              value={form.correctAnswer}
              onChange={(e) =>
                setForm({ ...form, correctAnswer: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value="A">Correct Answer: A</option>
              <option value="B">Correct Answer: B</option>
              <option value="C">Correct Answer: C</option>
              <option value="D">Correct Answer: D</option>
            </select>

            <input
              type="number"
              min="1"
              value={form.marks}
              onChange={(e) =>
                setForm({ ...form, marks: Number(e.target.value) })
              }
              className="border rounded-lg px-3 py-2 w-24"
              placeholder="Marks"
            />

            <button
              onClick={addQuestion}
              disabled={loading}
              className="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Question"}
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Questions Added ({questions.length})
          </h3>

          {questions.length === 0 && (
            <p className="text-gray-500">
              No questions added yet.
            </p>
          )}

          <ol className="space-y-4">
            {questions.map((q, index) => (
              <li
                key={q._id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-medium text-gray-800">
                      {index + 1}. {q.questionText}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Correct: {q.correctAnswer} • Marks: {q.marks}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteQuestion(q._id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AddQuestions;
