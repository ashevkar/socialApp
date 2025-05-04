"use client";
import { VscAccount } from "react-icons/vsc";
import { useEffect, useState, ChangeEvent } from "react";
import LoadingPage from "@/components/LoadingPage";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
// import { IoMdColorWand } from "react-icons/io";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
    bio: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // const handleImageChange = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     // For demo: just show preview, for production: upload to server or cloud storage
  //     const reader = new FileReader();
  //     reader.onload = (ev) => {
  //       setProfile({ ...profile, profileImage: ev.target?.result as string });
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

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

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setIsDeleting(true);
      try {
        const res = await fetch(`/api/user/${profile.id}`, {
          method: "DELETE"
        });
        
        if (res.ok) {
          alert("Your account has been deleted successfully");
          // Sign out the user before redirecting
          await signOut({ redirect: false });
          // Redirect to login page
          router.push("/login");
        } else {
          const error = await res.json();
          alert(`Failed to delete account: ${error.error || "Unknown error"}`);
        }
      } catch (error) {
        alert("An error occurred while deleting your account");
        console.error(error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (loading) return <div><LoadingPage/></div>;

  return (
    <div className="font-sans font-bold items-center  rounded-xl p-6 m-4 border-black text-black bg-white ">
      <h1 className="text-3xl font-black italic mb-2">PROFILE</h1>
      <p className="text-lg text-gray-500 mb-6"> Customize your Orkut experience!</p>
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
        <div className="flex p-3 gap-3 items-center  font-black">
          <div>
            <VscAccount className="text-3xl text-rose-500" />
          </div>
          <div>
            <h1 className="font-black text-xl italic">ACCOUNT</h1>
          </div>
        </div>
        <div className="mb-4 m-2">
          <label className="block mb-1">Email:- {profile?.email || ''}</label>
          {/* <input
            className="w-full  px-2 py-1 rounded"
            name="email"
            value={profile.email}
            disabled
          /> */}
        </div>
        <div className="mb-4 m-2">
          <label className="block mb-1">Name</label>
          <input
            className="w-full border px-2 py-1 rounded font-medium"
            name="name"
            value={profile?.name || ''}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
       
        <div className="mb-4 m-2">
          <label className="block mb-1">Username</label>
          <input
            className="w-full border px-2 py-1 rounded font-medium"
            name="username"
            value={profile?.username || ''}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className="mb-4 m-2">
          <label className="block mb-1">Bio</label>
          <textarea
            className="w-full border px-2 py-1 rounded placeholder-gray-400 font-medium"
            name="bio"
            value={profile?.bio ?? ''}
            onChange={handleChange}
            disabled={!edit}
            placeholder="Tell us a bit about yourself..."
          />
        </div>
        {edit ? (
          <button
            className="custom-border flex items-center gap-4 w-full p-2 bg-blue-500 text-amber-50 justify-center mb-3 "
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="custom-border flex items-center gap-4 w-full p-2 text-black hover:bg-blue-500 justify-center mb-3 hover:text-white"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        )}
        
        <button
          className="custom-border flex items-center gap-4 w-full p-2 bg-red-500 text-white justify-center mt-5"
          onClick={handleDeleteAccount}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting Account..." : "Delete Account"}
        </button>
      </div>

    </div>
  );
}
