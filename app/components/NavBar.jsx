'use client';

import Image from 'next/image';
import homeIcon from '../assets/Home.svg';
import searchIcon from '../assets/Search.svg';
import profileIcon from '../assets/Profile.svg';
import messageIcon from '../assets/Message.svg';
import bar from '../assets/bar.png';

import { useRouter, usePathname } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/') {
      return pathname === path;
    } else {
      return pathname.includes(path);
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[414px] z-50 bg-nav h-20 flex justify-around items-center">
      <div
        className="flex flex-col items-center cursor-pointer hover:bg-nav-hover rounded-2xl p-2"
        onClick={() => router.push('/')}
      >
        <Image src={homeIcon} className="w-8 h-8" alt="Home Icon" />
        {isActive('/') && <Image src={bar} className="w-4 h-1 mt-1" alt="Active Indicator" />}
      </div>
      <div
        className="flex flex-col items-center cursor-pointer hover:bg-nav-hover rounded-2xl p-2"
        onClick={() => router.push('/search')}
      >
        <Image src={searchIcon} className="w-8 h-8" alt="Search Icon" />
        {isActive('/search') && <Image src={bar} className="w-4 h-1 mt-1" alt="Active Indicator" />}
      </div>
      <div
        className="flex flex-col items-center cursor-pointer hover:bg-nav-hover rounded-2xl p-2"
        onClick={() => router.push('/message')}
      >
        <Image src={messageIcon} className="w-8 h-8" alt="Message Icon" />
        {isActive('/message') && <Image src={bar} className="w-4 h-1 mt-1" alt="Active Indicator" />}
      </div>
      <div
        className="flex flex-col items-center cursor-pointer hover:bg-nav-hover rounded-2xl p-2"
        onClick={() => router.push('/profile')}
      >
        <Image src={profileIcon} className="w-8 h-8" alt="Profile Icon" />
        {isActive('/profile') && <Image src={bar} className="w-4 h-1 mt-1" alt="Active Indicator" />}
      </div>
    </div>
  );
}