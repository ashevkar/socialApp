"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import LoadingPage from "./LoadingPage";

type Tweet = {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    username: string;
    profileImage: string | null;
  };
  likes: {
    id: string;
    userId: string;
  }[];
  comments: {
    id: string;
    content: string;
    user: {
      id: string;
      name: string;
      username: string;
    };
  }[];
};

export default function TweetFeed() {
  // console.log('TweetFeed mounted');

  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  const fetchTweets = async () => {
    // console.log('Fetching tweets...');
    try {
      const res = await fetch("/api/tweets");
      // console.log('Fetch response:', res);
      const data = await res.json();
      // console.log('Fetched tweets:', data);
      setTweets(data);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTweets();
    // const interval = setInterval(fetchTweets, 500); // fetch every 5 seconds
    // return () => clearInterval(interval);
  }, []);

  const handleLike = async (tweetId: string) => {
    if (!session) return;

    try {
      const res = await fetch(`/api/tweets/${tweetId}/like`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to like tweet");
      }

      const updatedTweets = tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          const isLiked = tweet.likes.some(
            (like) => like.userId === session.user.id
          );
          return {
            ...tweet,
            likes: isLiked
              ? tweet.likes.filter((like) => like.userId !== session.user.id)
              : [...tweet.likes, { id: "temp", userId: session.user.id }],
          };
        }
        return tweet;
      });
      setTweets(updatedTweets);
      router.refresh();
    } catch (error) {
      console.error("Error liking tweet:", error);
    }
  };

  const handleDelete = async (tweetId: string) => {
    if (!window.confirm("Are you sure you want to delete this tweet?")) return;
    const res = await fetch(`/api/tweets/${tweetId}`, { method: "DELETE" });
    if (res.ok) {
      setTweets(tweets.filter(tweet => tweet.id !== tweetId));
    } else {
      alert("Failed to delete tweet.");
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">
        <LoadingPage />          
    </div>;
  }

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <div key={tweet.id} className="custom-border bg-white rounded-lg shadow p-4 relative">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Image
                src={tweet.author.profileImage || "/default-avatar.jpg"}
                alt={tweet.author.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full bg-blue-300"
              />
            </div>
            <div className="flex-1 text-gray-500">
              <div className="flex justify-between items-center space-x-1">
                <span className="font-semibold">{tweet.author.name}</span>
                {/* <span className="">@{tweet.author.username}</span> */}
                <span className=""></span>
                <span className="">
                  {formatDistanceToNow(new Date(tweet.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <p className="mt-1">{tweet.content}</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleLike(tweet.id)}
                  className={`flex items-center space-x-1 ${
                    tweet.likes.some((like) => like.userId === session?.user.id)
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{tweet.likes.length}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{tweet.comments.length}</span>
                </button>
                {tweet.author.id === session?.user?.id && (
                  <button
                    className="absolute bottom-3 right-3 text-zinc-400 hover:text-red-500"
                    onClick={() => handleDelete(tweet.id)}
                    title="Delete Tweet"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}