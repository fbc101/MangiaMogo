"use client"

import { use, useEffect, useState } from "react";
import ChatInterface from "@/app/components/ChatInterface";
import { cleanUsername } from "@/app/utils/utils";
import { useMessage } from "@/app/components/MessageProvider";

export default function ChatPage({ params }) {
    const unwrappedParams = use(params); // Unwrap params
    const { user } = unwrappedParams;

    const { messageData, setMessageData } = useMessage();
    const [recipe, setRecipe] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (messageData) {
            setRecipe(messageData.recipe);
            setMessage(messageData.message);
        }
    }, [messageData]);

    const userCleaned = cleanUsername(user);

    useEffect(() => {
        setMessageData(null); 
    }, []); 

    return (
        <div className="flex-1 flex flex-col h-full">
            <ChatInterface username={userCleaned} recipe={recipe} message={message} />
        </div>
    )
}