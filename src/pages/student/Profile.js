import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="student" />

      <div className="max-w-4xl mx-auto p-6">
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              My Profile
            </h2>
            <p className="text-gray-600 mt-1">
              View your account information
            </p>
          </div>

          <button
            onClick={() => navigate("/student")}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* ================= PROFILE CARD ================= */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-800">
                {name || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium text-gray-800 capitalize">
                {role}
              </p>
            </div>
          </div>
        </div>

        {/* ================= FUTURE ACTIONS ================= */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 text-blue-700 text-sm">
          🔒 Profile editing, password change, and security settings can be added here.
        </div>
      </div>
    </div>
  );
};

export default Profile;
