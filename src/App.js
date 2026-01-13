import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ===============================
   PUBLIC PAGES
================================ */
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import RegisterTeacher from "./pages/RegisterTeacher";

/* ===============================
   AUTH & COMMON
================================ */
import ChangePassword from "./pages/common/ChangePassword";
import ProtectedRoute from "./auth/ProtectedRoute";

/* ===============================
   TEACHER PAGES
================================ */
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import CreateExam from "./pages/teacher/CreateExam";
import MyExams from "./pages/teacher/MyExams";
import AddQuestions from "./pages/teacher/AddQuestions";
import AssignExam from "./pages/teacher/AssignExam";
import CreateStudent from "./pages/teacher/CreateStudent";
import StudentList from "./pages/teacher/StudentList";
import StudentDetail from "./pages/teacher/StudentDetail";
import EditStudent from "./pages/teacher/EditStudent";
import Results from "./pages/teacher/Results";
import ExamResults from "./pages/teacher/ExamResults";
import BulkUploadStudents from "./pages/teacher/BulkUploadStudents";
import TeacherSubmissionView from "./pages/teacher/TeacherSubmissionView";

/* ===============================
   STUDENT PAGES
================================ */
import StudentDashboard from "./pages/student/StudentDashboard";
import StartExam from "./pages/student/StartExam";
import MyResults from "./pages/student/MyResults";
import Profile from "./pages/student/Profile";
import StudentExamSummary from "./pages/student/StudentExamSummary";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===============================
           PUBLIC ROUTES
        ================================ */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-teacher" element={<RegisterTeacher />} />

        {/* ===============================
           TEACHER ROUTES
        ================================ */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/create-exam"
          element={
            <ProtectedRoute role="teacher">
              <CreateExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/my-exams"
          element={
            <ProtectedRoute role="teacher">
              <MyExams />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/add-questions/:examId"
          element={
            <ProtectedRoute role="teacher">
              <AddQuestions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/assign-exam/:examId"
          element={
            <ProtectedRoute role="teacher">
              <AssignExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/create-student"
          element={
            <ProtectedRoute role="teacher">
              <CreateStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/students"
          element={
            <ProtectedRoute role="teacher">
              <StudentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/bulk-upload"
          element={
            <ProtectedRoute role="teacher">
              <BulkUploadStudents />
            </ProtectedRoute>
          }
        />


        <Route
          path="/teacher/student/:id"
          element={
            <ProtectedRoute role="teacher">
              <StudentDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/student/edit/:id"
          element={
            <ProtectedRoute role="teacher">
              <EditStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/results"
          element={
            <ProtectedRoute role="teacher">
              <Results />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/results/:examId"
          element={
            <ProtectedRoute role="teacher">
              <ExamResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/submission/:submissionId"
          element={<TeacherSubmissionView />}
        />

        {/* ===============================
           STUDENT ROUTES
        ================================ */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/start/:examId"
          element={
            <ProtectedRoute role="student">
              <StartExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/exam-summary/:examId"
          element={<StudentExamSummary />}
        />


        <Route
          path="/student/results"
          element={
            <ProtectedRoute role="student">
              <MyResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ===============================
           COMMON ROUTES
        ================================ */}
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
