import React, { useState } from 'react';
import Image from 'next/image';
import assistant from '../assets/burger-assistant-icon.png';
import MiniChatInterface from './MiniChatInterface';
import MiniChatInput from './MiniChatInput';

export default function Assistant() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {!isChatOpen && <div
        className="fixed bottom-20 right-1 z-50 w-15 h-15 cursor-pointer"
      >
        <Image src={assistant} alt="Assistant Icon" onClick={(e) => {
            e.stopPropagation();
            toggleChat();
        }} />
      </div>}

      {isChatOpen && (
        <div className="fixed bottom-20 right-0 z-40 w-80 h-96  border rounded-lg shadow-lg overflow-hidden">
          <MiniChatInterface username="Lil' Chef" onClose={toggleChat}/> 
        </div>
      )}
    </>
  );
}