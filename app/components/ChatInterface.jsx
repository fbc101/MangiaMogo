'use client';

import { useState, useEffect, useRef } from 'react';
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
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // Scroll to the last message whenever the messages array changes
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' }); // Or 'auto' for instant scroll
    }
  }, [messages]); 

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
    
    try {
      const response = await fetch('/api/chat/bot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, bot: username })
        });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [
          ...prev, 
          { 
              type: 'bot', 
              content: data.response.explanation 
          }]);
      } else {
        setMessages(prev => [
          ...prev, 
          { 
              type: 'bot', 
              content: 'I love your cooking!' 
          }
        ]);
      }
    } catch (error) {
        console.error("Chat error:", error);
        setMessages(prev => [
            ...prev, 
            { type: 'bot', content: 'I love your cooking!' }
        ]);
    } 
  };

  return (
    <div className="flex flex-col h-full"> 
      <div className="bg-nav rounded-lg p-2 flex justify-between items-center shadow-md z-10 "> {/* Added shadow and z-index for header */}
        <div className="flex justify-start items-center">
          <Image src={getUserImage(username)} alt={username} className="w-12 h-12 rounded-full mr-4" />
          <h1 className="text-xl font-bold text-gray-800">{username}</h1>
        </div>
        <button className="bg-nav rounded-lg p-2 hover:bg-nav-hover cursor-pointer" onClick={() => router.back()}>
          <Image src={reject} alt="reject" className="w-8 h-8 rounded-full " />
        </button>
      </div>
      <div className="flex h-full flex-col overflow-y-auto scrollbar-hide overscroll-contain"> {/* Make the main container take full viewport height and hide overflow */}

        <div className="flex-1 p-4 space-y-4 bg-white shadow-inner"> {/* Scrollable message area */}
          {messages.map((message, index) => (
            <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
              <ChatMessage message={message} />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-4 shadow-md z-10 sticky bottom-0 overscroll-contain ">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}