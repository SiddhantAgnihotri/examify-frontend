const Profile = () => {
  return (
    <div>
      <h2>My Profile</h2>
      <p><b>Name:</b> {localStorage.getItem("name")}</p>
      <p><b>Role:</b> Student</p>
    </div>
  );
};

export default Profile;
