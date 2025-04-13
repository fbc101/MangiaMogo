'use client';

import { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { getUserImage } from '@/app/utils/utils';
import Image from 'next/image';
import reject from '@/app/assets/reject.png';
import { useRouter } from 'next/navigation';
import chat from '../../data/chat.json';

export default function ChatInterface({ username }) {
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello!' },
    { type: 'bot', content: 'I love your cooking!' },
  ]);

  const router = useRouter();

  useEffect(() => {
    setMessages(chat[username]);
  }, [username]);

  

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    
    setMessages(prev => [
      ...prev, 
      { 
        type: 'bot', 
        content: 'I love your cooking!',
      }
    ]);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden w-xl"> {/* Make the main container take full viewport height and hide overflow */}
      <div className="bg-nav rounded-lg p-4 flex justify-between items-center shadow-md z-10 "> {/* Added shadow and z-index for header */}
        <div className="flex justify-start items-center">
          <Image src={getUserImage(username)} alt={username} className="w-12 h-12 rounded-full mr-4" />
          <h1 className="text-xl font-bold text-gray-800">{username}</h1>
        </div>
        <button className="bg-nav rounded-lg p-2 hover:bg-nav-hover cursor-pointer" onClick={() => router.back()}>
          <Image src={reject} alt="reject" className="w-12 h-12 rounded-full " />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white shadow-inner"> {/* Scrollable message area */}
        {messages.map((message, index) => (
          <div key={index}>
            <ChatMessage message={message} />
          </div>
        ))}
      </div>

      <div className="bg-white p-4 shadow-md z-10"> {/* Added shadow and z-index for input */}
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}