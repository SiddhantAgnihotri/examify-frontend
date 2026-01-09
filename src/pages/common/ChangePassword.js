import { useState } from "react";
import API from "../../api/axios";

const ChangePassword = () => {
  const [oldP, setOldP] = useState("");
  const [newP, setNewP] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!oldP || !newP) {
      alert("Both fields are required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/change-password", {
        oldPassword: oldP,
        newPassword: newP
      });

      alert("Password updated successfully");
      setOldP("");
      setNewP("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>

      <input
        type="password"
        placeholder="Old Password"
        value={oldP}
        onChange={(e) => setOldP(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        value={newP}
        onChange={(e) => setNewP(e.target.value)}
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "Updating..." : "Change Password"}
      </button>
    </div>
  );
};

export default ChangePassword;
