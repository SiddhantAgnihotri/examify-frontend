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
     FIX: useCallback
  ================================ */
  const fetchQuestions = useCallback(async () => {
    const res = await API.get(`/question/${examId}`);
    setQuestions(res.data);
  }, [examId]);

  /* ===============================
     FIX: dependency added
  ================================ */
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
            .map((f) => f.trim()),
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
        {/* UI remains unchanged */}
      </div>
    </div>
  );
};

export default AddQuestions;
