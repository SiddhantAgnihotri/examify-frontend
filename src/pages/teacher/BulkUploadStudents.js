import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

const BulkUploadStudents = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setResult(null);

      const res = await API.post(
        "/teacher/students/bulk-upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    window.location.href = "/students-template.xlsx";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="teacher" />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">
          Bulk Upload Students
        </h2>

        {/* Upload Card */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <p className="text-gray-600">
            Upload students using Excel or CSV file.
          </p>

          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full border rounded-lg px-3 py-2"
          />

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Upload Students"}
            </button>

            <button
              onClick={downloadTemplate}
              className="px-6 py-2 border rounded-lg hover:bg-gray-100"
            >
              Download Excel Template
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3">
              Upload Summary
            </h3>

            <p>✅ Created: {result.createdCount}</p>
            <p>⚠ Skipped: {result.skippedCount}</p>

            {result.errors?.length > 0 && (
              <div className="mt-3">
                <p className="font-medium text-red-600">
                  Errors:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {result.errors.map((e, i) => (
                    <li key={i}>
                      Row {e.row}: {e.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkUploadStudents;
