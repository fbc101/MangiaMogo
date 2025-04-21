'use client';

import { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { getUserImage } from '@/app/utils/utils';
import Image from 'next/image';
import reject from '@/app/assets/reject.png';
import { useRouter } from 'next/navigation';
import chat from '../../data/chat.json';

export default function ChatInterface({ username, message, recipe }) {
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello!' },
    { type: 'bot', content: 'I love your cooking!' },
  ]);

  const router = useRouter();

  useEffect(() => {
    setMessages(chat[username]);
    if (recipe) {
      setMessages(prev => [...prev, { type: 'user', recipe: `${recipe}`, username: username }]);
      if (message) {
        setMessages(prev => [...prev, { type: 'user', content: message }]);
      }
    }
  }, [username, message]);

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
    <div className="flex flex-col h-full bg-white">
      <div className="bg-nav p-4 flex justify-between items-center shadow-md">
        <div className="flex justify-start items-center">
          <Image src={getUserImage(username)} alt={username} className="w-12 h-12 rounded-full mr-4" />
          <h1 className="text-xl font-bold text-gray-800">{username}</h1>
        </div>
        <button className="bg-nav rounded-lg p-2 hover:bg-nav-hover cursor-pointer" onClick={() => router.back()}>
          <Image src={reject} alt="reject" className="w-12 h-12 rounded-full" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-2 space-y-3">
        {messages.map((message, index) => (
          <div key={index}>
            <ChatMessage message={message} />
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pb-20">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}