const Navbar = ({ role }) => {
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Brand */}
        <div className="flex items-center space-x-2">
          {/* Logo placeholder (optional later) */}
          {/* <img src={logo} alt="Examify" className="h-8" /> */}
          <h1 className="text-xl font-extrabold tracking-wide text-blue-600">
            Examify
          </h1>
        </div>

        {/* Right Section */}
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
