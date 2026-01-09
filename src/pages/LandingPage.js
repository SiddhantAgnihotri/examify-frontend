import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* ================= HEADER ================= */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          Examify
        </h1>

        <div className="space-x-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register-teacher")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Create Account
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Smart Online Examination <br />
            Platform for Teachers & Students
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Create exams, assign students, conduct secure timed tests,
            and evaluate results — all from one powerful dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/register-teacher")}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Get Started as Teacher
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 rounded-xl border font-medium hover:bg-gray-100"
            >
              Student Login
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <ul className="space-y-4 text-gray-700">
            <li>✅ Create & manage exams</li>
            <li>✅ Schedule start & end time</li>
            <li>✅ MCQ-based evaluation</li>
            <li>✅ Resume & single attempt control</li>
            <li>✅ Instant result generation</li>
            <li>✅ Secure student access</li>
          </ul>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-white py-16 border-t">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-blue-600">100+</h3>
            <p className="text-gray-600 mt-1">Exams Created</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">500+</h3>
            <p className="text-gray-600 mt-1">Students Assessed</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">99%</h3>
            <p className="text-gray-600 mt-1">Exam Accuracy</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
            <p className="text-gray-600 mt-1">Availability</p>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">
            How Examify Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <h4 className="font-semibold text-lg mb-2">
                1️⃣ Create Exam
              </h4>
              <p className="text-gray-600">
                Teachers create exams, add questions,
                set duration and schedule.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <h4 className="font-semibold text-lg mb-2">
                2️⃣ Assign Students
              </h4>
              <p className="text-gray-600">
                Assign exams to specific students
                with controlled access.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <h4 className="font-semibold text-lg mb-2">
                3️⃣ Get Results
              </h4>
              <p className="text-gray-600">
                Students attempt exams and results
                are calculated instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ROLES ================= */}
      <section className="bg-white py-20 border-t">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              👨‍🏫 For Teachers
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Create & manage exams</li>
              <li>• Assign students easily</li>
              <li>• Monitor exam status</li>
              <li>• View & export results</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">
              👨‍🎓 For Students
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Secure login</li>
              <li>• Timed online exams</li>
              <li>• Resume exam if interrupted</li>
              <li>• Instant result visibility</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= WHO USES ================= */}
      <section className="py-20 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">
            Who Uses Examify?
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            Designed for schools, coaching institutes,
            private tutors and training centers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              🏫 <b>Schools</b>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              📘 <b>Coaching Institutes</b>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              👨‍🏫 <b>Private Tutors</b>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECURITY ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">
            Security & Reliability
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <ul className="space-y-3">
              <li>🔐 Secure login & role-based access</li>
              <li>⏱ Time-bound exams</li>
              <li>🚫 Single attempt control</li>
              <li>📄 No question leakage</li>
            </ul>
            <ul className="space-y-3">
              <li>📊 Auto result calculation</li>
              <li>🧾 Exam history maintained</li>
              <li>⚙️ Stable during exams</li>
              <li>🌐 Multi-device support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 bg-gray-50 border-t">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h3>

          <div className="space-y-6 text-gray-700">
            <p><b>Q:</b> Can students attempt exams multiple times?<br />
              <b>A:</b> No, exams are controlled by teachers.</p>

            <p><b>Q:</b> What if internet disconnects?<br />
              <b>A:</b> Resume is allowed within time window.</p>

            <p><b>Q:</b> Is technical knowledge required?<br />
              <b>A:</b> No, Examify is beginner-friendly.</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">
          Ready to conduct smarter exams?
        </h3>
        <p className="mb-8 text-blue-100">
          Join Examify today and modernize your examination system.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/register-teacher")}
            className="px-6 py-3 rounded-xl bg-white text-blue-600 font-medium hover:bg-blue-50"
          >
            Create Teacher Account
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-xl border border-white font-medium hover:bg-blue-700"
          >
            Student Login
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Examify. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
