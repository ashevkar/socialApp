'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { formatDistanceToNow } from 'date-fns';

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
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await fetch('/api/tweets');
        const data = await res.json();
        setTweets(data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTweets();
  }, []);

  const handleLike = async (tweetId: string) => {
    if (!session) return;

    try {
      const res = await fetch(`/api/tweets/${tweetId}/like`, {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Failed to like tweet');
      }

      const updatedTweets = tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          const isLiked = tweet.likes.some((like) => like.userId === session.user.id);
          return {
            ...tweet,
            likes: isLiked
              ? tweet.likes.filter((like) => like.userId !== session.user.id)
              : [...tweet.likes, { id: 'temp', userId: session.user.id }],
          };
        }
        return tweet;
      });

      setTweets(updatedTweets);
    } catch (error) {
      console.error('Error liking tweet:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading tweets...</div>;
  }

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <div key={tweet.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <img
                src={tweet.author.profileImage || '/default-avatar.png'}
                alt={tweet.author.name}
                className="h-10 w-10 rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <span className="font-semibold">{tweet.author.name}</span>
                <span className="text-gray-500">@{tweet.author.username}</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-500">
                  {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="mt-1">{tweet.content}</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleLike(tweet.id)}
                  className={`flex items-center space-x-1 ${
                    tweet.likes.some((like) => like.userId === session?.user.id)
                      ? 'text-red-500'
                      : 'text-gray-500'
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 