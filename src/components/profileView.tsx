"use client";
import { VscAccount } from "react-icons/vsc";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    username: "",
    bio: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);


  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (res.ok) {
      alert("Password changed successfully!");
      setShowPasswordForm(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      const data = await res.json();
      alert(data.message || "Failed to change password.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl border-4 border-black shadow-lg">
      <div className="flex items-center space-x-4 mb-6">
        {profile.profileImage ? (
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-black"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-black text-4xl">
            <VscAccount />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-600">@{profile.username}</p>
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Bio</label>
        <p className="text-gray-700">{profile.bio || "No bio yet."}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Email</label>
        <p className="text-gray-700">{profile.email}</p>
      </div>
      <button
        className="w-50 rounded-xl p-2 bg-blue-500 text-amber-50 border-r-6 border-b-6  hover:bg-blue-950-400  border-black hover:border-r-4 hover:border-b-4 duration-300"
        onClick={() => setShowPasswordForm(true)}
      >
        Change Password
      </button>
      {showPasswordForm && (
        <div className="mt-4 p-4 border-4 rounded-xl bg-gray-50">
          <div className="mb-2">
            <label className="block font-semibold">Current Password</label>
            <input
              type="password"
              className="w-full border rounded px-2 py-1"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">New Password</label>
            <input
              type="password"
              className="w-full border rounded px-2 py-1"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Confirm New Password</label>
            <input
              type="password"
              className="w-full border rounded px-2 py-1"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between pt-2">
          <button
        className="w-50 rounded-xl p-2  border-r-6 border-b-6 pl-3 hover:bg-green-500 border  border-black hover:border-r-4 hover:border-b-4 hover:text-amber-50 duration-300"
        onClick={handlePasswordChange}
          >
            Save Password
          </button>
          <button
        className="w-50 rounded-xl p-2 border-r-6 border-b-6 border hover:bg-zinc-500 border-black hover:border-r-4 hover:border-b-4 hover:text-amber-50 duration-300"
        onClick={() => setShowPasswordForm(false)}
          >
            Cancel
          </button>
          </div>
        </div>
      )}
    </div>
  );
}
