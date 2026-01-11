import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    userId: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await API.get(`/teacher/student/${id}`);
        setForm({
          name: res.data.name,
          email: res.data.email,
          userId: res.data.userId || ""
        });
      } catch {
        alert("Failed to load student details");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const update = async () => {
    if (!form.name || !form.email) {
      alert("Name and email are required");
      return;
    }

    try {
      setSaving(true);
      await API.put(`/teacher/student/${id}`, form);
      alert("Student updated successfully");
      navigate("/teacher/students");
    } catch {
      alert("Failed to update student");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar role="teacher" />
        <div className="p-6 text-center text-gray-600">
          Loading student details...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Edit Student
            </h2>
            <p className="text-gray-600 mt-1">
              Update student profile information
            </p>
          </div>

          <button
            onClick={() => navigate("/teacher/students")}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            ← Students
          </button>
        </div>


        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200"
                placeholder="Student name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200"
                placeholder="student@email.com"
              />
            </div>

            {/* Student ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student ID
              </label>
              <input
                value={form.userId}
                onChange={(e) =>
                  setForm({ ...form, userId: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200"
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => navigate("/teacher/students")}
              className="px-5 py-2 rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={update}
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Update Student"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
