'use client';

// app/page.jsx (or app/home/page.jsx)
import { useRouter } from 'next/navigation';
import home from "./assets/home-img.jpeg";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (

    <div className="flex flex-col items-center justify-center flex-grow text-black p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Mangia Mogo!</h1>
      
      <div className="max-w-md text-center space-y-6">
        <p className="text-lg">
          Your place to discover, share and connect over amazing recipes
        </p>
      </div>

      <div className="w-full h-full mt-6 mb-6">
        <Image src={home} alt="home" className="rounded-lg w-full h-full object-cover" />
      </div>

      <div className="max-w-md text-center space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Get Started</h2>
          <div className="space-y-3 text-left">
            <p className="flex items-center cursor-pointer" onClick={() => router.push('/search')}>
              <span className="mr-2">🔍</span>
              Search for recipes!
            </p>
            <p className="flex items-center cursor-pointer" onClick={() => router.push('/message')}> 
              <span className="mr-2">👩‍🍳</span>
              Follow your favorite chefs!
            </p>
            <p className="flex items-center cursor-pointer" onClick={() => router.push('/message')}>
              <span className="mr-2">💬</span>
              Connect with other food lovers!
            </p>

          </div>

          <p className="text-sm text-gray-600 text-center">
            Good luck chef!
          </p>
        </div>
      </div>
    </div>
  );
}