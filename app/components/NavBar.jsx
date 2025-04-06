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
    <div className="flex justify-center items-center w-screen bg-nav h-30 flex-shrink-0">
      <div className="flex justify-center items-center ml-6 mr-6 cursor-pointer hover:bg-nav-hover rounded-2xl" onClick={() => router.push('/')}>
        <div className="flex flex-col justify-center items-center">
          <Image src={homeIcon} className="w-18 h-18" alt="Home Icon" />
          {isActive('/') && <Image src={bar} className="w-15 h-1" alt="Home Icon" />}
        </div>
      </div>
      <div className="flex justify-center items-center ml-6 mr-6 cursor-pointer hover:bg-nav-hover rounded-2xl" onClick={() => router.push('/search')}>
        <div className="flex flex-col justify-center items-center">
          <Image src={searchIcon} className="w-18 h-18" alt="Search Icon" />
          {isActive('/search') && <Image src={bar} className="w-15 h-1" alt="Home Icon" />}
        </div>
      </div>
      <div className="flex justify-center items-center ml-6 mr-6 cursor-pointer hover:bg-nav-hover rounded-2xl" onClick={() => router.push('/message')}>
        <div className="flex flex-col justify-center items-center">
          <Image src={messageIcon} className="w-18 h-18" alt="Message Icon" />
          {isActive('/message') && <Image src={bar} className="w-15 h-1" alt="Home Icon" />}
        </div>
      </div>
      <div className="flex justify-center items-center ml-6 mr-6 cursor-pointer hover:bg-nav-hover rounded-2xl" onClick={() => router.push('/profile')}>
        <div className="flex flex-col justify-center items-center">
          <Image src={profileIcon} className="w-16 h-16" alt="Profile Icon" />
          {isActive('/profile') && <Image src={bar} className="w-15 h-1 mt-1" alt="Home Icon" />}
        </div>
      </div>
    </div>
  );
}