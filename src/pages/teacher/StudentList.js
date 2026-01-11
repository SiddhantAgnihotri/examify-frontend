import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await API.get("/teacher/students");
    setStudents(res.data);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.userId && s.userId.toLowerCase().includes(search.toLowerCase()))
  );

  const deleteStudent = async (id) => {
    if (
      !window.confirm(
        "Are you sure?\nThis will permanently delete the student account."
      )
    )
      return;

    await API.delete(`/teacher/student/${id}`);
    fetchStudents();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-6xl mx-auto p-6">
        {/* ================= HEADER ================= */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Students
            </h2>
            <p className="text-gray-600 mt-1">
              View, search, edit, or remove student accounts
            </p>
          </div>

          {/* Navigation actions */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/teacher")}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            >
              ← Dashboard
            </button>

            <button
              onClick={() => navigate("/teacher/create-student")}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              + Add Student
            </button>
          </div>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="mb-4">
          <input
            placeholder="Search by name, email, or student ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
          {filteredStudents.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              <p className="mb-4">No students found.</p>
              <button
                onClick={() => navigate("/teacher/create-student")}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Create First Student
              </button>
            </div>
          ) : (
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Student ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((s) => (
                  <tr
                    key={s._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-gray-800">
                      {s.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {s.email}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {s.userId || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            navigate(`/teacher/student/${s._id}`)
                          }
                          className="px-3 py-1.5 text-sm rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
                        >
                          View
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/teacher/student/edit/${s._id}`)
                          }
                          className="px-3 py-1.5 text-sm rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteStudent(s._id)}
                          className="px-3 py-1.5 text-sm rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
