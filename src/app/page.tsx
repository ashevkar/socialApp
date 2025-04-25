import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import TweetFeed from '@/components/TweetFeed';
import CreateTweet from '@/components/CreateTweet';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <CreateTweet />
        <TweetFeed />
      </div>
    </main>
  );
}
