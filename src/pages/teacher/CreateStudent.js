import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userId: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Name, email and password are required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/teacher/create-student", form);

      alert("Student created successfully");
      navigate("/teacher");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-3xl mx-auto bg-white mt-8 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">
          Create Student Account
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Student Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Student Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Amit Kumar"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="amit@gmail.com"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Student ID (optional)
            </label>
            <input
              name="userId"
              value={form.userId}
              onChange={handleChange}
              placeholder="STU001"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-8 space-x-3">
          <button
            onClick={() => navigate("/teacher")}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Student"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
