import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ role }) => {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  /* ===============================
     NAV ITEMS (ROLE BASED)
  ================================ */
  const teacherLinks = [
    { label: "Dashboard", path: "/teacher" },
    { label: "My Exams", path: "/teacher/my-exams" },
    { label: "Students", path: "/teacher/students" },
    { label: "Results", path: "/teacher/results" }
  ];

  const studentLinks = [
    { label: "Dashboard", path: "/student" },
    { label: "My Results", path: "/student/results" },
    { label: "Profile", path: "/student/profile" }
  ];

  const links = role === "teacher" ? teacherLinks : studentLinks;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* ================= BRAND ================= */}
        <div
          onClick={() =>
            navigate(role === "teacher" ? "/teacher" : "/student")
          }
          className="cursor-pointer"
        >
          <h1 className="text-xl font-extrabold tracking-wide text-blue-600">
            Examify
          </h1>
        </div>

        {/* ================= NAV LINKS ================= */}
        <nav className="hidden md:flex space-x-6">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`text-sm font-medium transition
                ${
                  location.pathname === link.path
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-600 hover:text-blue-600"
                }
              `}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* ================= USER INFO ================= */}
        <div className="flex items-center space-x-5">
          <div className="text-right leading-tight">
            <p className="text-sm font-medium text-gray-700">
              {name || "User"}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm font-medium bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
