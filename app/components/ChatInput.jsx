'use client';

import { useState, useRef } from 'react';

export default function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null); // Create a ref for the input field

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      inputRef.current?.focus(); // Keep focus on the input field
    }
  };

  return (
    <div className="border-t p-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          ref={inputRef} 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          disabled={disabled}
        />
        <button
          type="submit"
          className={`px-4 py-2 bg-nav text-black rounded-md ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-nav-hover'
          }`}
          disabled={disabled}
        >
          Send
        </button>
      </form>
    </div>
  );
}