'use client';

// app/page.jsx (or app/home/page.jsx)
import { useRouter } from 'next/navigation';
import home from "./assets/home-img.jpeg";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Welcome to Mangia Mogo!</h1>
      
      <div className="w-full text-center mb-4">
        <p className="text-base">
          Your place to discover, share and connect over amazing recipes
        </p>
      </div>

      <div className="w-full aspect-video mb-4">
        <Image 
          src={home} 
          alt="home" 
          className="rounded-lg w-full h-full object-cover" 
          priority
        />
      </div>

      <div className="w-full">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-3">Get Started</h2>
          <div className="space-y-3">
            <p className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg" onClick={() => router.push('/search')}>
              <span className="mr-3 text-xl">🔍</span>
              <span>Search for recipes!</span>
            </p>
            <p className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg" onClick={() => router.push('/message')}>
              <span className="mr-3 text-xl">💬</span>
              <span>Connect with other food lovers!</span>
            </p>
          </div>

          <p className="text-sm text-gray-600 text-center mt-4">
            Good luck chef!
          </p>
        </div>
      </div>
    </div>
  );
}