'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function CreateTweet({ onTweetCreated }: { onTweetCreated?: () => void }) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !session) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error('Failed to create tweet');

      setContent('');
      if (onTweetCreated) onTweetCreated();
    } catch (error) {
      console.error('Error creating tweet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full text-black  mt-6 mb-3">
      {/* 🟡 Manga Feed Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold tracking-tighter italic">ORKUT FEED</h1>
        <div className="mt-3 flex justify-center border-2 border-black rounded-xl overflow-hidden max-w-sm mx-auto">
          <button className="bg-pink-400 text-white font-semibold px-6 py-2 border-r-2 border-black">⚡ Popular</button>
          <button className="text-gray-800 font-semibold px-6 py-2 bg-white">☆ My Series</button>
        </div>
      </div>

      {/* 📝 Post Form */}
      <div className="custom-border bg-white text-black p-4 rounded-xl shadow-md border-2 border-black">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-black">
              <img src="/avatar-placeholder.png" alt="avatar" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 relative">
              {/* Banner */}
              <div className="absolute -top-3 left-0 bg-yellow-300 text-black px-2 py-0.5 text-xs font-bold rotate-[-5deg] border border-black shadow-sm">
                SHARE YOUR THOUGHTS!
              </div>

              {/* Textarea */}
              <textarea
                className="w-full mt-3 p-3 border-2 border-black rounded-xl bg-gray-100 focus:outline-none"
                rows={3}
                placeholder="What's happening in your manga world?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className='flex justify-between'>
          {/* Icons Row */}
          <div className="flex justify-start gap-6 mt-4 px-3">
            <IconButton icon="🖼️" />
            <IconButton icon="😊" />
            <IconButton icon="📅" />
            <IconButton icon="📍" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={isLoading || !content.trim()}
              className="custom-border bg-blue-500 text-white px-6 py-2 rounded-xl shadow-md font-bold border-2 border-black hover:bg-pink-400 disabled:opacity-50"
            >
              {isLoading ? 'Posting...' : 'SHARE!'}
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// 🧩 Reusable Icon Button
function IconButton({ icon }: { icon: string }) {
  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black text-xl bg-white hover:bg-gray-100 cursor-pointer">
      {icon}
    </div>
  );
}
