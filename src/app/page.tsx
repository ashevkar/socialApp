import MainPage from '@/app/mainPage';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  
 const session = await getServerSession(authOptions);
  
    if (!session) {
      redirect("/login");
    }
  
    console.log("SESSION:", session);
  return (
    <main className="min-h-screen bg-gray-50">
      <MainPage/>
    </main>
  );
}
