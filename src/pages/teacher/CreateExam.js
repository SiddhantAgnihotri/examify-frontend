import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const CreateExam = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    instituteName: "",
    examType: "Practice",
    subject: "",
    duration: "",
    totalMarks: "",
    startTime: "",
    endTime: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.instituteName ||
      !form.duration ||
      !form.startTime ||
      !form.endTime
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await API.post("/exam/create", form);
      alert("Exam created successfully (Draft)");
      navigate("/teacher/my-exams");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create exam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-4xl mx-auto p-6">
        {/* ===============================
            HEADER WITH NAVIGATION
        ================================ */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500">
            <span
              onClick={() => navigate("/teacher")}
              className="cursor-pointer hover:text-blue-600"
            >
              Dashboard
            </span>{" "}
            / <span className="text-gray-700 font-medium">Create Exam</span>
          </div>

          <button
            onClick={() => navigate("/teacher")}
            className="px-4 py-1.5 text-sm rounded-lg border bg-white hover:bg-gray-50"
          >
            ← Back to Dashboard
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Create New Exam
            </h2>
            <p className="text-gray-600 mt-1">
              Create exam in draft mode. Add questions and publish later.
            </p>
          </div>
        </div>

        {/* ===============================
            FORM CARD
        ================================ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {/* Exam Details */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Exam Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Exam Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Java Basics Test"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Institute Name <span className="text-red-500">*</span>
              </label>
              <input
                name="instituteName"
                value={form.instituteName}
                onChange={handleChange}
                placeholder="Faction Computer Education"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Exam Type
              </label>
              <select
                name="examType"
                value={form.examType}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="Practice">Practice</option>
                <option value="Test">Test</option>
                <option value="Final">Final</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Java"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Schedule */}
          <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">
            Exam Schedule
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                End Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Marks */}
          <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">
            Marks & Duration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Duration (minutes) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="60"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Total Marks
              </label>
              <input
                type="number"
                name="totalMarks"
                value={form.totalMarks}
                onChange={handleChange}
                placeholder="100"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end mt-10 space-x-3">
            <button
              onClick={() => navigate("/teacher/my-exams")}
              className="px-5 py-2 rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Exam"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
