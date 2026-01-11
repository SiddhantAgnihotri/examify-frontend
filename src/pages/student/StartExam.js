import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const StartExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const examStarted = useRef(false);
  const timerRef = useRef(null);

  /* ===============================
     START / RESUME EXAM
  ================================ */
  useEffect(() => {
    const startExam = async () => {
      try {
        const res = await API.get(`/student/start/${examId}`);

        setQuestions(res.data.questions);

        const restored = {};
        res.data.previousAnswers.forEach(a => {
          restored[a.questionId] = a.selectedOption;
        });
        setAnswers(restored);

        const durationMinutes = res.data.duration || 60;
        setTimeLeft(durationMinutes * 60);

        examStarted.current = true;
      } catch (err) {
        alert(err.response?.data?.message || "Unable to start exam");
        navigate("/student");
      }
    };

    startExam();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examId, navigate]);

  /* ===============================
     TIMER
  ================================ */
  useEffect(() => {
    if (!examStarted.current || timeLeft === null) return;

    if (timeLeft <= 0) {
      handleSubmit(true);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft]);

  /* ===============================
     HANDLERS
  ================================ */
  const handleOptionChange = (qId, option) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: option
    }));
  };

  const handleBack = () => {
    if (
      window.confirm(
        "Exam is in progress.\nAre you sure you want to leave?"
      )
    ) {
      navigate("/student");
    }
  };

  const handleSubmit = async (auto = false) => {
    if (submitting) return;
    if (!auto && !window.confirm("Submit exam now?")) return;

    try {
      setSubmitting(true);

      const formattedAnswers = Object.keys(answers).map(qid => ({
        questionId: qid,
        selectedOption: answers[qid]
      }));

      const res = await API.post(`/student/submit/${examId}`, {
        answers: formattedAnswers
      });

      alert(
        auto
          ? "Time up! Exam auto-submitted."
          : `Exam submitted successfully!\nScore: ${res.data.obtainedMarks}/${res.data.totalMarks}`
      );

      navigate("/student/results");
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
      setSubmitting(false);
    }
  };

  const formatTime = sec => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="student" />

      {/* ===============================
          EXAM HEADER (STICKY)
      ================================ */}
      <div className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            ← Back to Exams
          </button>

          <p className="font-medium">
            Answered: {Object.keys(answers).length}/{questions.length}
          </p>

          <p className="font-bold text-red-600">
            ⏱ {timeLeft !== null ? formatTime(timeLeft) : "--:--"}
          </p>
        </div>
      </div>

      {/* ===============================
          QUESTIONS
      ================================ */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {questions.map((q, index) => (
          <div key={q._id} className="bg-white p-6 rounded-xl shadow">
            <p className="font-semibold mb-4">
              {index + 1}. {q.questionText}
            </p>

            {Object.entries(q.options).map(([key, value]) => (
              <label
                key={key}
                className={`block p-3 border rounded-lg mb-2 cursor-pointer
                  ${
                    answers[q._id] === key
                      ? "border-blue-600 bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
              >
                <input
                  type="radio"
                  name={q._id}
                  checked={answers[q._id] === key}
                  onChange={() => handleOptionChange(q._id, key)}
                  className="mr-2"
                />
                <b>{key}.</b> {value}
              </label>
            ))}
          </div>
        ))}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            onClick={() => handleSubmit(false)}
            disabled={submitting}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Exam"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartExam;
