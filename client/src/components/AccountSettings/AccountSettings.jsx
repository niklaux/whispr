import React, { useEffect, useState } from "react";
import { updateUser, updatePassword } from "../../services/users"; // Import the updatePassword function

function AccountSettings({ data }) {
  const [accountDetails, setAccountDetails] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [isChanged, setIsChanged] = useState(false);

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  useEffect(() => {
    if (data?.msg) {
      setAccountDetails({
        username: data.msg.username,
        email: data.msg.email,
      });
      setIsChanged(false);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    setIsChanged(true);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Update user details and store the updated user data
      const updatedUser = await updateUser(accountDetails);

      // Update the local state with the updated user details
      setAccountDetails({
        username: updatedUser.username, // assuming the API returns the updated user data
        email: updatedUser.email,
      });

      setSuccess("Account details updated successfully!");
      setIsChanged(false);
    } catch (err) {
      setError(err.message);
      console.error("Error updating account:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    try {
      const response = await updatePassword(passwordData);
      setPasswordSuccess(response.message);
      console.log("Password updated successfully:", response);
      setPasswordData({ currentPassword: "", newPassword: "" }); // Clear fields after success
    } catch (err) {
      setPasswordError(err.message);
      console.error("Error updating password:", err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-8 col-sm-12">
          <form
            className="white-bg-color my-5 p-4 rounded-5"
            onSubmit={handleSubmit}
          >
            <p className="fw-bold text-muted">Edit Account Details</p>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <div className="mb-3">
              <input
                type="text"
                className="form-control rounded-4"
                placeholder="Change username"
                name="username"
                value={accountDetails.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control rounded-4 mb-3"
                placeholder="Change email"
                name="email"
                value={accountDetails.email}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary rounded-4 whispr-blue-button"
              disabled={!isChanged || loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>

          <form
            className="white-bg-color my-5 p-4 rounded-5"
            onSubmit={handlePasswordSubmit}
          >
            <p className="fw-bold text-muted">Change Password</p>
            {passwordError && <p className="text-danger">{passwordError}</p>}
            {passwordSuccess && (
              <p className="text-success">{passwordSuccess}</p>
            )}
            <div className="mb-3">
              <input
                type="password"
                className="form-control rounded-4"
                placeholder="Current Password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control rounded-4 mb-3"
                placeholder="New Password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary rounded-4 whispr-blue-button"
              disabled={passwordLoading} // Disable button if loading
            >
              {passwordLoading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
