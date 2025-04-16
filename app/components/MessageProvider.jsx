// app/context/MessageContext.tsx
'use client';

import { createContext, useState, useContext } from 'react';

const MessageContext = createContext(null);

export function MessageProvider({ children }) {
  const [messageData, setMessageData] = useState(null);
  return (
    <MessageContext.Provider value={{ messageData, setMessageData }}>
      {children}
    </MessageContext.Provider>
  );
}

export const useMessage = () => useContext(MessageContext);