'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import gordon from '../assets/Gordon_Ramsay.png';
import jamie from '../assets/JamieOliver.jpg';
import julia from '../assets/JuliaChild.jpg';

export default function MessagePage() {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState(null);

  const profiles = {
    'Gordon Ramsay': {
      name: 'Gordon Ramsay',
      avatar: gordon,
      bio: 'Celebrity chef and restaurateur. Love creating simple yet delicious recipes that anyone can make at home.',
      followers: 1200,
      following: 350,
      friends: 425
    },
    'Jamie Oliver': {
      name: 'Jamie Oliver', 
      avatar: jamie,
      bio: 'British chef and restaurateur. Passionate about making cooking accessible to everyone.',
      followers: 900,
      following: 250,
      friends: 300
    },
    'Julia Child': {
      name: 'Julia Child',
      avatar: julia, 
      bio: 'American cooking teacher and author. Bringing French cuisine to everyday American cooks.',
      followers: 800,
      following: 200,
      friends: 275
    }
  };

  const handleProfileClick = (username) => {
    setSelectedProfile(profiles[username]);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <div className="flex flex-col space-y-4">
        {/* Gordon Ramsay Message */}
        <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg w-full text-left hover:bg-gray-200 transition-colors">
          <Image 
            src={gordon} 
            alt="Gordon Ramsay avatar"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0 cursor-pointer"
            onClick={() => handleProfileClick('Gordon Ramsay')}
          />
          <div>
            <p className="font-bold">Gordon Ramsay</p>
            <p className="text-gray-600">Your recipe looks absolutely fantastic! The presentation is spot on.</p>
            <p className="text-xs text-gray-400">2 hours ago</p>
          </div>
        </div>

        {/* Another user message */}
        <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg w-full text-left hover:bg-gray-200 transition-colors">
          <Image
            src={jamie}
            alt="Jamie Oliver avatar"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0 cursor-pointer"
            onClick={() => handleProfileClick('Jamie Oliver')}
          />
          <div>
            <p className="font-bold">Jamie Oliver</p>
            <p className="text-gray-600">Hey mate! Would love to collaborate on a new recipe together.</p>
            <p className="text-xs text-gray-400">5 hours ago</p>
          </div>
        </div>

        {/* Third user message */}
        <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg w-full text-left hover:bg-gray-200 transition-colors">
          <Image
            src={julia}
            alt="Julia Child avatar" 
            className="w-12 h-12 rounded-full object-cover flex-shrink-0 cursor-pointer"
            onClick={() => handleProfileClick('Julia Child')}
          />
          <div>
            <p className="font-bold">Julia Child</p>
            <p className="text-gray-600">Your chocolate soufflé technique is impressive! Let&apos;s chat about it.</p>
            <p className="text-xs text-gray-400">1 day ago</p>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedProfile(null)}>
          <div className="bg-white rounded-lg p-6 w-96" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-6 mb-6">
              <Image
                src={selectedProfile.avatar}
                alt={`${selectedProfile.name} profile picture`}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">{selectedProfile.name}</h2>
                <p className="text-gray-600">{selectedProfile.bio}</p>
              </div>
            </div>
            
            <div className="flex justify-around mb-6">
              <div className="text-center">
                <p className="font-bold">{selectedProfile.followers}</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{selectedProfile.following}</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{selectedProfile.friends}</p>
                <p className="text-sm text-gray-500">Friends</p>
              </div>
            </div>
            
            <button 
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setSelectedProfile(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}