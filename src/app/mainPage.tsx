"use client";
// import Link from "next/link";
import { useState} from "react";
import CreateTweet from "@/components/CreateTweet";
import TweetFeed from "@/components/TweetFeed";
import Settings from "@/components/profileView";
import NotificationPage from "@/components/NotificationPage";
import { FiHome, FiSearch } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { IconType } from "react-icons";
import Profile from "@/app/profile/page";
// import { useSession } from "next-auth/react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  // const { data: session } = useSession();
  // const [taggedTweets, setTaggedTweets] = useState<Tweet[]>([]);

  // useEffect(() => {
  //   if (activeTab === "notifications" && session?.user?.username) {
  //     fetch(`/api/tweets/tagged?username=${session.user.username}`)
  //       .then((res) => res.json())
  //       .then(setTaggedTweets);
  //   }
  // }, [activeTab, session]);

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
        );
      case "notifications":
        return (
          <div className="p-4 text-xl font-bold">
            <NotificationPage />
          </div>
        );
      case "settings":
        return (
          <div className="">
            {/* Profile Page (Under construction) */}
            <Settings />
          </div>
        );
      case "profile":
        return (
          <div className="">
            <Profile />
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
          <div className="text-4xl font-bold m-4 text-start">Orkut</div>
          <nav className="flex flex-col text-md p-2 ">
            <div className="flex flex-col space-y-3  ">
              <SidebarButton
                label="Home"
                Icon={FiHome}
                setActiveTab={() => setActiveTab("home")}
                active={activeTab === "home"}
              />
              <SidebarButton
                label="Explore"
                Icon={FiSearch}
                setActiveTab={() => setActiveTab("explore")}
                active={activeTab === "explore"}
              />
              <SidebarButton
                label="Notifications"
                Icon={IoMdNotificationsOutline}
                setActiveTab={() => setActiveTab("notifications")}
                active={activeTab === "notifications"}
              />
              <SidebarButton
                label="Profile"
                Icon={CiUser}
                setActiveTab={() => setActiveTab("profile")}
                active={activeTab === "profile"}
              />
              <SidebarButton
                label="Settings"
                Icon={IoSettingsOutline}
                setActiveTab={() => setActiveTab("settings")}
                active={activeTab === "settings"}
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
      <div
        className={`min-h-screen m-auto
          ${
            activeTab === "home"
              ? "flex-1 max-w-4xl mx-auto border-x"
              : "flex-[2] w-full"
          }
          border-gray-200 p-3
          ${
            activeTab === "explore"
              ? "bg-amber-100"
              : activeTab === "notifications"
              ? "bg-purple-100"
              : activeTab === "settings"
              ? "bg-orange-100"
              : activeTab === "profile"
              ? "bg-blue-100"
              : "bg-white"
          }`}
      >
        {renderContent()}
      </div>

      {/* Right Sidebar */}
      {activeTab === "home" && (
        <div className="w-auto h-screen border-x border-gray-200 sticky top-0 hidden lg:flex flex-col p-2 space-y-4 overflow-y-auto">
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
      )}
    </div>
  );
}

function SidebarButton({
  label,
  Icon,
  setActiveTab,
  active,
  notificationCount = 0,
}: {
  label: string;
  Icon: IconType;
  setActiveTab: () => void;
  active: boolean;
  notificationCount?: number;
}) {
  return (
    <button
      onClick={setActiveTab}
      className={`flex items-center gap-4 w-full rounded-xl p-2 
        ${active ? "bg-rose-500 text-white custom-border" : ""}
        hover:bg-rose-500 hover:text-amber-50 
        border-black relative`}
    >
      <Icon className="text-lg" />
      <span className="text-md font-semibold">{label}</span>
      {notificationCount > 0 && (
        <span className="absolute right-4 top-3 bg-green-500 text-black rounded-full px-2 py-0.5 text-xs font-bold">
          {notificationCount}
        </span>
      )}
    </button>
  );
}
