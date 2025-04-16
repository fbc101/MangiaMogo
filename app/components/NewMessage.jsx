import React, { useState } from 'react';
import Image from 'next/image';
import SearchBar from './SearchBar';
import chat from '../assets/chat.png';
import { getUserImage, turnUsernameToUrl } from '../utils/utils';
import { useRouter } from 'next/navigation';
import reject from '../assets/reject.png';

export default function NewMessage() {
    const [opened, setOpened] = useState(false);
    const [user, setUser] = useState('');
    const users = ['Gordon Ramsay', 'Jamie Oliver', 'Julia Child', 'Jack Black', 'Big Smoke', 'Nick', 'Carmy Berzatto'];
    const friends = ['Gordon Ramsay', 'Jamie Oliver', 'Julia Child'];
    const router = useRouter();

    const filteredUsers = users.filter((username) => {
        return username.toLowerCase().includes(user.toLowerCase());
    });

    return (
        <div className='flex flex-col justify-center items-center'>
            <Image 
                src={chat}
                alt="chat"
                className='w-12 h-12 cursor-pointer'
                onClick={() => setOpened(!opened)}
            />
            {opened && <div className='fixed inset-0 bg-black/75 flex items-center justify-center z-50' onClick={() => {
                setOpened(false);
                setUser('');
            }}>
                <div className='bg-white rounded-lg p-4 w-96' onClick={e => e.stopPropagation()}>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='flex flex-row items-center justify-end w-full '>
                            <button className="rounded-lg hover:bg-gray-200 cursor-pointer" onClick={e => {
                                e.stopPropagation();
                                setOpened(false);
                                setUser('');
                            }}>
                                <Image src={reject} alt="reject" className="w-12 h-12 rounded-full " />
                            </button>
                        </div>
                        <h2 className='text-2xl font-bold'>New Message</h2>

                        <SearchBar onSearch={setUser} label="search user..."/>
                        <div className='flex flex-col w-full gap-4 justify-start mt-6 flex-grow overflow-y-scroll custom-scrollbar-hidden max-h-75'>
                            {filteredUsers.map((username) => (
                                <div className="flex flex-row items-center gap-2 cursor-pointer" key={username} onClick={(e) => {
                                    e.stopPropagation();
                                    setOpened(false);
                                    setUser('');
                                    router.push(`/message/chat/${turnUsernameToUrl(username)}`);
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
    )
}