import { use } from "react";
import ChatInterface from "@/app/components/ChatInterface";
import { cleanUsername } from "@/app/utils/utils";

export default function ChatPage({ params }) {
    const unwrappedParams = use(params); // Unwrap params
    const { user } = unwrappedParams;

    console.log(user);
    const userCleaned = cleanUsername(user);

    return (
        <div className="flex flex-col justify-center items-center space-y-4 h-full ">
            <ChatInterface username={userCleaned} />
        </div>
    )
}