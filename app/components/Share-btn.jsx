import React, { useState } from 'react';
import { getRecipeImage, getUserImage, turnUsernameToUrl } from '../utils/utils';
import { useRouter } from 'next/navigation';
import { useMessage } from './MessageProvider';
import Image from 'next/image';
import send from '../assets/send.png';
import SearchBar from './SearchBar';
import reject from '../assets/reject.png';

export default function ShareButton({ onShare, recipe }) {
    const [opened, setOpened] = useState(false);
    const [user, setUser] = useState('');
    const users = ['Gordon Ramsay', 'Jamie Oliver', 'Julia Child', 'Jack Black', 'Big Smoke', 'Nick', 'Carmy Berzatto'];
    const friends = ['Gordon Ramsay', 'Jamie Oliver', 'Julia Child'];
    const [message, setMessage] = useState('Hey, check out this recipe!');
    const router = useRouter();
    const { setMessageData } = useMessage();

    const filteredUsers = users.filter((username) => {
        return username.toLowerCase().includes(user.toLowerCase());
    });
    console.log(message);
    return (
        <div className='flex flex-col justify-center items-center'>
            <Image 
                src={send}
                alt="send"
                className='w-8 h-8 cursor-pointer'
                onClick={() => setOpened(!opened)}
            />
            {opened && <div className='fixed inset-0 bg-black/75 flex items-center justify-center z-50' onClick={() => {
                setOpened(false);
                setUser('');
                setMessage('Hey, check out this recipe!');
            }}>
                <div className='bg-white rounded-lg p-4 w-96' onClick={e => e.stopPropagation()}>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='flex flex-row items-center justify-end w-full '>
                            <button className="rounded-lg hover:bg-gray-200 cursor-pointer" onClick={e => {
                                e.stopPropagation();
                                setOpened(false);
                                setUser('');
                                setMessage('Hey, check out this recipe!');
                            }}>
                                <Image src={reject} alt="reject" className="w-12 h-12 rounded-full " />
                            </button>
                        </div>
                        <h2 className='text-2xl font-bold'>Share recipe</h2>
                        <div className='flex flex-col items-center justify-center mt-2' >
                            <Image src={getRecipeImage(recipe)} alt={recipe}></Image>
                            <h1 className="text-xl font-bold mb-2 mt-2">{recipe}</h1>
                        </div>
                        <input
                         type='text'
                         value={message}
                         onChange={(e) => setMessage(e.target.value)}
                         className='border border-gray-300 rounded-lg p-2 w-full mb-4'
                         placeholder='Type a message...'
                        />
                        <SearchBar onSearch={setUser} label="search user..."/>
                        <div className='flex flex-col w-full gap-4 justify-start mt-6 flex-grow overflow-y-scroll custom-scrollbar-hidden max-h-75'>
                            {filteredUsers.map((username) => (
                                <div className="flex flex-row items-center gap-2 cursor-pointer" key={username} onClick={(e) => {
                                    e.stopPropagation();
                                    setOpened(false);
                                    setMessageData({
                                        recipe: recipe,
                                        message: message,
                                    });
                                    setUser('');
                                    setMessage('Hey, check out this recipe!');
                                    router.push(`/message/chat/${turnUsernameToUrl(username)}/`);
                                    
                                }}>
                                    <Image src={getUserImage(username)} alt={username} className='w-12 h-12 rounded-full' />
                                    <div>{username}</div>
                                </div>
                            ))} 
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};
