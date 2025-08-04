import React, { useEffect, useState } from 'react';
import axiosInstance from "../utils/axiosInstance.js";
import { Input, Button } from "./index.js";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [originalUser, setOriginalUser] = useState({})
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [activeSection, setActiveSection] = useState("edit")
  const [isEditing, setIsEditing] = useState(false)

  const hasChanges =
    user.fullName !== originalUser.fullName ||
    user.username !== originalUser.username ||
    user.email !== originalUser.email ||
    user.gender !== originalUser.gender;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(false);


  const saveUserHandle = async () => {
    try {
      const res = await axiosInstance.patch("/users/me", {
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        gender: user.gender
      })
      console.log("Updated user:", res.data);
      setIsEditing(false)
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 4000,
      })
    } catch (error) {
      console.error("Update failed:", error);

    }
  }

  const toggleEditMode = () => {
    if (isEditing) {
      setIsEditing(false)
      setUser(originalUser)
      setActiveSection("edit")
    } else {
      setIsEditing(true)
      setActiveSection("edit")
    }
  }

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await axiosInstance.patch("/users/change/password", {
        oldPassword,
        newPassword
      });
      toast.success("Password changed successfully");
      setActiveSection("edit")
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Password update failed");
    }
  };

  const deleteAccountHandler = async () => {
    try {
      const res = await axiosInstance.delete('/users/delete/account');

      toast.success(res.data?.message || "Account deleted successfully", {
        autoClose: 4000
      });

      localStorage.clear()
      setTimeout(() => navigate("/"), 4000);

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete account");
      console.error("Account deletion failed:", error);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = (await axiosInstance.get("/users/me")).data;
        setUser(res);
        setOriginalUser(res)
        console.log(res);
      } catch (error) {
        setError("Unable to fetch the User Data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-600 flex items-center justify-center text-white font-semibold">
        <p className="text-2xl text-gray-200 tracking-widest animate-bounce">
          L o a d i n g . . .
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] bg-red-600/80 border border-red-300 text-white px-4 py-3 rounded-lg text-center flex justify-center items-center font-semibold">
        {error}
      </div>)
  }

  return (
    <div className="min-h-[80vh] w-full bg-gradient-to-r from-purple-700 to-blue-600 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl flex bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg">

        {/* Sidebar Buttons */}
        <div className="w-1/3 bg-gradient-to-b from-purple-800 via-indigo-700 to-sky-600 text-white p-6 flex flex-col justify-start gap-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>

          <Button
            className="bg-sky-500 text-white hover:bg-sky-600 px-6 py-2 w-full"
            onClick={() => setActiveSection("edit")}
          >
            Profile
          </Button>

          <Button
            onClick={() => setActiveSection("password")}
            className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-2 w-full">
            Change Password
          </Button>

          <Button
            onClick={() => setActiveSection("delete")}
            className="bg-red-600 text-white hover:bg-red-700 px-6 py-2 w-full">
            Delete Account
          </Button>
        </div>

        {/* Divider */}
        <div className="w-[3px] bg-white/30" />

        {/* Edit Section */}
        {activeSection === 'edit' && (
          <div className="w-2/3 p-8 space-y-6 text-white bg-gradient-to-b from-sky-600 via-indigo-700 to-purple-800">
            <h2 className="text-3xl font-bold text-center">Account Details</h2>

            {/* Profile Fields */}
            <div className="space-y-4 pt-2">
              <Input
                label="Full Name"
                value={user.fullName || ""}
                readOnly={!isEditing}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                className={`w-full ${isEditing ? "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500" : ""}`}
              />

              <Input
                label="Username"
                value={user.username || ""}
                readOnly={!isEditing}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className={`w-full ${isEditing ? "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500" : ""}`}
              />

              <Input
                label="Email"
                value={user.email || ""}
                readOnly={!isEditing}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className={`w-full ${isEditing ? "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500" : ""}`}
              />

              {user.gender && (
                <div>
                  <label className="block text-sm text-gray-100 mb-1">Gender</label>

                  {isEditing ? (
                    <select
                      value={user.gender}
                      onChange={(e) => setUser({ ...user, gender: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <Input
                      value={(user.gender).toUpperCase()}
                      readOnly
                      className="w-full"
                    />
                  )}
                </div>
              )}

              {user.createdAt && (
                <Input
                  label="Joined On"
                  value={new Date(user.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  readOnly
                  className="w-full"
                />
              )}
            </div>

            {/* Save Button and Cancel Button */}
            {isEditing && (
              <div className="pt-2 w-full flex gap-4">
                <Button
                  onClick={saveUserHandle}
                  disabled={!hasChanges}
                  className={`w-1/2 py-2 rounded-md font-semibold text-white 
                    ${hasChanges
                      ? 'bg-green-500 hover:bg-green-600 cursor-pointer'
                      : 'bg-green-300 cursor-not-allowed'}`}
                >
                  Save
                </Button>

                <Button
                  onClick={toggleEditMode}
                  className="w-1/2 bg-red-600 text-white hover:bg-red-700 py-2 rounded-md font-semibold"
                >
                  Cancel
                </Button>
              </div>


            )}

            {!isEditing && (
              <Button
                onClick={toggleEditMode}
                className="w-full bg-orange-500 text-white hover:bg-orange-600 py-2 rounded-md font-semibold"
              >
                Edit Profile
              </Button>)}


          </div>)
        }

        {/* Password Section */}
        {activeSection === 'password' && (
          <div className="w-2/3 p-8 space-y-6 text-white bg-gradient-to-b from-sky-600 via-indigo-700 to-purple-800">
            <h2 className="text-3xl font-bold text-center">Password Setting</h2>
            <div className="space-y-4 pt-4">
              <Input
                label="Current Password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your current password"
              />
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
              />

              <div className="flex gap-4 pt-2">
                <Button
                  className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md"
                  onClick={handlePasswordChange}
                >
                  Change
                </Button>
                <Button
                  onClick={() => {
                    setOldPassword("")
                    setNewPassword("")
                    setConfirmPassword("")
                    setActiveSection("edit")
                  }}
                  className="w-1/2 bg-red-600 text-white hover:bg-red-700 py-2 rounded-md font-semibold"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Section */}
        {activeSection === 'delete' && (
          <div className="w-2/3 p-8 space-y-6 text-white bg-gradient-to-b from-sky-600 via-indigo-700 to-purple-800">
            <h2 className="text-3xl font-bold text-center text-white-300">Delete Account</h2>

            {/* Alert Message */}
            <div className="bg-red-500/20 border border-red-400 
            text-red-100 p-4 rounded-lg flex items-start gap-3">
              <div>
                <p className="text-lg font-semibold">This action is irreversible.</p>
                <p className="text-sm text-red-100 mt-1">
                  Deleting your account will permanently erase all your data. You will be signed out immediately after deletion.
                </p>
                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="confirmDelete"
                    checked={confirmDelete}
                    onChange={(e) => setConfirmDelete(e.target.checked)}
                    className="w-4 h-4 accent-red-600"
                  />
                  <label htmlFor="confirmDelete" className="text-sm text-red-100">
                    I understand the consequences of deleting my account.
                  </label>
                </div>

              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                disabled={!confirmDelete}
                className={`w-1/2 py-2 rounded-md font-semibold text-white ${confirmDelete
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-red-400 cursor-not-allowed'
                  }`}
                onClick={deleteAccountHandler}
              >
                Delete My Account
              </Button>


              <Button
                className="w-1/2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-md"
                onClick={() => setActiveSection("edit")}
              >
                Cancel
              </Button>
            </div>
          </div>

        )}

      </div>
    </div>
  );
};

export default Profile;