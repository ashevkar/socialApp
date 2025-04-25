'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreateTweet() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

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

      if (!res.ok) {
        throw new Error('Failed to create tweet');
      }

      setContent('');
      router.refresh();
    } catch (error) {
      console.error('Error creating tweet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 text-black">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading || !content.trim()}
          >
            {isLoading ? 'Posting...' : 'Tweet'}
          </button>
        </div>
      </form>
    </div>
  );
} 