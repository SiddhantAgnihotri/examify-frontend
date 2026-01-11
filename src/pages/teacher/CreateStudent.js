import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const navigate = useNavigate();

  /* ===============================
     SINGLE STUDENT STATE
  ================================ */
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userId: ""
  });

  const [loading, setLoading] = useState(false);

  /* ===============================
     BULK UPLOAD STATE
  ================================ */
  const [file, setFile] = useState(null);
  const [bulkLoading, setBulkLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ===============================
     CREATE SINGLE STUDENT
  ================================ */
  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Name, email and password are required");
      return;
    }

    try {
      setLoading(true);
      await API.post("/teacher/create-student", form);
      alert("Student created successfully");
      navigate("/teacher/students");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create student");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     BULK UPLOAD STUDENTS
  ================================ */
  const handleBulkUpload = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setBulkLoading(true);

      const res = await API.post(
        "/teacher/bulk-upload-students",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      alert(res.data.message || "Students uploaded successfully");
      setFile(null);
    } catch (err) {
      alert(err.response?.data?.message || "Bulk upload failed");
    } finally {
      setBulkLoading(false);
    }
  };

  /* ===============================
     DOWNLOAD CSV TEMPLATE
  ================================ */
  const downloadTemplate = () => {
    const csvContent =
      "name,email,password,userId\n" +
      "Rahul Kumar,rahul@gmail.com,123456,STU001\n" +
      "Anjali Sharma,anjali@gmail.com,123456,STU002\n";

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "student_upload_template.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />
      <div className="max-w-4xl mx-auto  mt-8 ">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500">
            <span
              onClick={() => navigate("/teacher")}
              className="cursor-pointer hover:text-blue-600"
            >
              Dashboard
            </span>{" "}
            / <span className="text-gray-700 font-medium">Create-Student</span>
          </div>

          <button
            onClick={() => navigate("/teacher")}
            className="px-4 py-1.5 text-sm rounded-lg border bg-white hover:bg-gray-50"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white mt-8 p-8 rounded-xl shadow-md">
        
        <h2 className="text-2xl font-bold mb-6">
          Create Student Account
        </h2>

        {/* ===============================
            SINGLE STUDENT FORM
        ================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Student Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Amit Kumar"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

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
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

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

        <div className="flex justify-end mt-6">
          <button
            onClick={handleCreate}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Student"}
          </button>
        </div>

        {/* ===============================
            BULK UPLOAD SECTION
        ================================ */}
        <hr className="my-10" />

        <h3 className="text-xl font-semibold mb-4">
          Bulk Upload Students
        </h3>

        <div className="flex flex-col md:flex-row gap-4 items-start">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded-lg w-full md:w-auto"
          />

          <button
            onClick={handleBulkUpload}
            disabled={bulkLoading}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {bulkLoading ? "Uploading..." : "Upload CSV"}
          </button>

          <button
            onClick={downloadTemplate}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Download Template
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          CSV columns: <b>name, email, password, userId</b>
        </p>
      </div>
    </div>
  );
};

export default CreateStudent;
