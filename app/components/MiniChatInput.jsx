'use client';

import { useState, useRef } from 'react';

export default function MiniChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="p-1 pb-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef} 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-base"
          disabled={disabled}
        />
        <button
          type="submit"
          className={`px-5 py-2 bg-nav text-black rounded-lg text-base font-medium ${
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