import { useEffect, useState, useRef, useCallback } from "react";
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
        res.data.previousAnswers.forEach((a) => {
          restored[a.questionId] = {
            type: "mcq",
            value: a.selectedOption
          };
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
     SUBMIT EXAM (FIXED)
  ================================ */
  const handleSubmit = useCallback(
    async (auto = false) => {
      if (submitting) return;
      if (!auto && !window.confirm("Submit exam now?")) return;

      try {
        setSubmitting(true);

        const formattedAnswers = Object.keys(answers)
          .filter((qid) => answers[qid].type !== "file")
          .map((qid) => ({
            questionId: qid,
            selectedOption: answers[qid].value
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
    },
    [answers, examId, navigate, submitting]
  );

  /* ===============================
     TIMER (FIXED)
  ================================ */
  useEffect(() => {
    if (!examStarted.current || timeLeft === null) return;

    if (timeLeft <= 0) {
      handleSubmit(true);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, handleSubmit]);

  /* ===============================
     ANSWER HANDLER
  ================================ */
  const updateAnswer = (qId, type, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: { type, value }
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

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="student" />

      {/* HEADER */}
      <div className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            ← Back
          </button>

          <p className="font-medium">
            Answered: {Object.keys(answers).length}/{questions.length}
          </p>

          <p className="font-bold text-red-600">
            ⏱ {timeLeft !== null ? formatTime(timeLeft) : "--:--"}
          </p>
        </div>
      </div>

      {/* QUESTIONS */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {questions.map((q, index) => (
          <div key={q._id} className="bg-white p-6 rounded-xl shadow">
            <p className="font-semibold mb-4">
              {index + 1}. {q.questionText}
            </p>

            {/* MCQ */}
            {q.type === "mcq" &&
              Object.entries(q.options).map(([key, value]) => (
                <label
                  key={key}
                  className={`block p-3 border rounded-lg mb-2 cursor-pointer
                    ${
                      answers[q._id]?.value === key
                        ? "border-blue-600 bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                >
                  <input
                    type="radio"
                    name={q._id}
                    checked={answers[q._id]?.value === key}
                    onChange={() =>
                      updateAnswer(q._id, "mcq", key)
                    }
                    className="mr-2"
                  />
                  <b>{key}.</b> {value}
                </label>
              ))}

            {/* SHORT */}
            {q.type === "short" && (
              <input
                type="text"
                value={answers[q._id]?.value || ""}
                onChange={(e) =>
                  updateAnswer(q._id, "short", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Write your answer"
              />
            )}

            {/* LONG */}
            {q.type === "long" && (
              <textarea
                value={answers[q._id]?.value || ""}
                onChange={(e) =>
                  updateAnswer(q._id, "long", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-2"
                rows={5}
                placeholder="Write detailed answer"
              />
            )}

            {/* FILE */}
            {q.type === "file" && (
              <div className="p-4 border rounded-lg bg-yellow-50 text-yellow-800">
                📎 File upload questions are not enabled yet.
                <br />
                Please contact your teacher.
              </div>
            )}
          </div>
        ))}

        {/* SUBMIT */}
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
