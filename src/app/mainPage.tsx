"use client";

import { useState } from "react";
import CreateTweet from "@/components/CreateTweet";
import TweetFeed from "@/components/TweetFeed";
import Profile from "@/components/ProfileView";
import { FiHome, FiSearch } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { IconType } from "react-icons";
import SettingPage from "@/app/profile/page";

export default function Home() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <CreateTweet />
            <TweetFeed />
          </>
        );
      case "explore":
        return (
          <div className="p-4 text-xl font-bold">Explore Page Coming Soon!</div>
          //   <>
          //   </>
        );
      case "notifications":
        return (
          <div className="p-4 text-xl font-bold">No new notifications!</div>
        );
      case "profile":
        return (
          <div className="">
            {/* Profile Page (Under construction) */}
            <Profile/>
          </div>
        );
      case "settings":
        return (
          <div className="w-full">
            <SettingPage />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 h-screen sticky top-0 border-r border-gray-200 md:flex flex-col justify-between p-2">
        <aside className="hidden md:block">
          <div className="text-3xl font-bold mb-6">Orkut</div>
          <nav className="flex flex-col text-md p-2 ">
            <div className="flex flex-col space-y-3  ">
              <SidebarButton
                label="Home"
                Icon={FiHome}
                setActiveTab={() => setActiveTab("home")}
              />
              <SidebarButton
                label="Explore"
                Icon={FiSearch}
                setActiveTab={() => setActiveTab("explore")}
              />
              <SidebarButton
                label="Notifications"
                Icon={IoMdNotificationsOutline}
                setActiveTab={() => setActiveTab("notifications")}
              />
              <SidebarButton
                label="Profile"
                Icon={CiUser}
                setActiveTab={() => setActiveTab("profile")}
              />
              <SidebarButton
                label="Settings"
                Icon={IoSettingsOutline}
                setActiveTab={() => setActiveTab("settings")}
              />

              {/* Bottom Logout Button */}
              <div className="p-2">
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-4 w-50 rounded-xl p-2 bg-amber-400  m-2  border-r-6 border-b-6  hover:bg-amber-400  border-black hover:border-r-4 hover:border-b-4 duration-300 justify-start  bottom-2 fixed"
                >
                  <FiLogOut className="text-xl" />
                  <span className="text-md font-semibold">Logout</span>
                </button>
              </div>
            </div>
          </nav>
        </aside>
      </div>

      {/* Center Feed */}
      <div className="flex-1 min-h-screen max-w-xl mx-auto border-x border-gray-200 p-3">
        {renderContent()}
      </div>

      {/* Right Sidebar */}
      <div className="w-80 h-screen border-x border-gray-200 sticky top-0 hidden lg:flex flex-col p-2 space-y-4 overflow-y-auto">
        <aside className="p-2 hidden lg:block">
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-full bg-gray-100 p-3 px-5 outline-none"
            />
          </div>

          {/* Trends */}
          <div className="bg-gray-100 rounded-xl p-4">
            <h2 className="text-lg font-bold mb-4">Trends for you</h2>
            <div className="mb-2">#Nextjs</div>
            <div className="mb-2">#React</div>
            <div className="mb-2">#WebDev</div>
            <div className="mb-2">#TailwindCSS</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SidebarButton({
  label,
  Icon,
  setActiveTab,
}: {
  label: string;
  Icon: IconType;
  setActiveTab: () => void;
}) {
  return (
    <button
      onClick={(setActiveTab)}
      className="flex items-center gap-4 w-full rounded-xl p-2 focus:bg-rose-500 focus:text-amber-50  hover:bg-rose-500 hover:text-amber-50 border-black focus:border-r-4 focus:border-b-4 duration-300 justify-start"
    >
      <Icon className="text-lg" />
      <span className="text-md font-semibold">{label}</span>
    </button>
  );
}
