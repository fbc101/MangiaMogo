import save from "../assets/save-instagram.png";
import saved from "../assets/saved-instagram.png";
import Image from "next/image";
import { useState } from "react";
import { useMessage } from './MessageProvider';

export default function SaveBtn({ onClick, recipeName, username }) {
    const [isSaved, setIsSaved] = useState(false); 
    const { setMessageData } = useMessage();

    const handleSave = () => {
        const newState = !isSaved;
        setIsSaved(newState);

        if (newState) {
            setMessageData({
                name: recipeName,
                author: username,
            });
        } else {
            setMessageData(null); 
        }
    };

    return (
        <button onClick={handleSave}>
            <Image 
                src={isSaved ? saved : save} 
                alt="Save Button"
                className='w-8 h-8 cursor-pointer'
            />
        </button>
    );
}