import Image from 'next/image';
import homeIcon from '../assets/Home.svg';
import searchIcon from '../assets/Search.svg';
import profileIcon from '../assets/Profile.svg';
import messageIcon from '../assets/Message.svg';

export default function NavBar() {
  return (
    <div className="flex justify-center items-center w-screen bg-nav h-20 flex-shrink-0">
      <div className="flex justify-center items-center pl-6 pr-6">
        <Image src={homeIcon} className="w-12 h-12" alt="Home Icon" />
      </div>
      <div className="flex justify-center items-center pl-6 pr-6">
        <Image src={searchIcon} className="w-14 h-14" alt="Search Icon" />
      </div>
      <div className="flex justify-center items-center pl-6 pr-6">
        <Image src={profileIcon} className="w-12 h-12" alt="Profile Icon" />
      </div>
      <div className="flex justify-center items-center pl-6 pr-6">
        <Image src={messageIcon} className="w-14 h-14" alt="Message Icon" />
      </div>
    </div>
  );
}