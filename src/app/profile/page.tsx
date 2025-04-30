"use client";
import { VscAccount } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { IoMdColorWand } from "react-icons/io";


export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    username: "",
    bio: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

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

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // For demo: just show preview, for production: upload to server or cloud storage
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile({ ...profile, profileImage: ev.target?.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    if (res.ok) {
      alert("Profile updated!");
      setEdit(false);
    } else {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className=" items-center  rounded-xl p-5 bg-white   border-r-7 border-b-7  border-2 border-black  ">
      <h2 className="text-2xl font-bold mb-4">Setting</h2>
      <p className="text-zinc-600 text-sm"> Customize your Orkut experience!</p>
      {/* <div className="mb-4">
        <label className="block mb-1">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={!edit}
        />
        {profile.profileImage && (
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mt-2"
          />
        )}
      </div> */}
      <div className="border-4 rounded-2xl p-4 mt-2 pb-5 ">
        <div className="flex p-3 gap-3 items-center font-extrabold font-display">
          <div>
            <VscAccount className="text-3xl text-rose-500" />
          </div>
          <div>
            <p>ACCOUNT</p>
          </div>
        </div>
        <div className="mb-4 m-2">
          <label className="block mb-1">Name</label>
          <input
            className="w-full border px-2 py-1 rounded"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className="mb-4 m-2">
          <label className="block mb-1">Email</label>
          <input
            className="w-full border px-2 py-1 rounded"
            name="email"
            value={profile.email}
            disabled
          />
        </div>
        <div className="mb-4 m-2">
          <label className="block mb-1">Username</label>
          <input
            className="w-full border px-2 py-1 rounded"
            name="username"
            value={profile.username}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className="mb-4 m-2">
          <label className="block mb-1">Bio</label>
          <textarea
            className="w-full border px-2 py-1 rounded"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        {edit ? (
          <button
            className="flex items-center gap-4 w-full rounded-xl p-2 bg-rose-500 text-amber-50 border-black border-r-6 border-b-6 hover:border-r-3 hover:border-b-3 duration-300 justify-center mb-3"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
          className="flex items-center gap-4 w-full rounded-xl p-2 border-2 hover:bg-blue-500 hover:text-amber-50 text-black border-black border-r-6 border-b-6 hover:border-r-3 hover:border-b-3 duration-300 justify-center mb-3"
          onClick={() => setEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
      <div className="border-4 rounded-2xl p-2 mt-2 ">
        <div className="flex p-3 gap-3 items-center font-extrabold font-display">
        <div>
            <IoMdColorWand
            className="text-3xl text-rose-500" />
          </div>
          <div>
            <p>APPEARANCE</p>
          </div>
          </div>
          </div>

    </div>
  );
}
