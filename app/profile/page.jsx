"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import gordon from '../assets/Gordon_Ramsay.png';
import { useRouter } from 'next/navigation';
import { turnUsernameToUrl, turnRecipeToUrl, getRecipeImage, getUserImage } from '../utils/utils';
import { useMessage } from "@/app/components/MessageProvider";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('saved');
    const router = useRouter();
    const { messageData, setMessageData } = useMessage();

    const mockUser = {
        name: "Gordon Ramsay",
        avatar: gordon,
        bio: "Celebrity chef and restaurateur. Love creating simple yet delicious recipes that anyone can make at home.",
        followers: 1200,
        following: 350,
        friends: 425
    };

    const [savedRecipes, setSavedRecipes] = useState([
        {
            name: "Japanese Curry",
            author: "Julia Child"
        },
        {
            name: "Chocolate Cookie",
            author: "Julia Child"
        }
    ]);

    const recentlyViewed = [
        {
            name: "Chocolate Cookie",
            author: "Julia Child"
        }
    ];

    useEffect(() => {
        console.log("Message data:", messageData);
        if (messageData) {
            setSavedRecipes(prevRecipes => {
                const isDuplicate = prevRecipes.some(
                    recipe => recipe.name === messageData.name && recipe.author === messageData.author
                );
    
                if (!isDuplicate) {
                    return [...prevRecipes, {
                        name: messageData.name,
                        author: messageData.author,
                    }];
                }
                return prevRecipes; // Return the existing array if it's a duplicate
            });
        }
        console.log("Updated saved recipes:", savedRecipes);
    
    }, [messageData]);

    useEffect(() => {
        setMessageData(null); 
    }, []); 

    return (
        <div className="flex flex-col items-center text-black p-4">
            <div className="bg-off-white rounded-2xl p-4 shadow-lg w-full">
                {/* Profile Header */}
                <div className="flex flex-col items-center gap-4 mb-6">
                    <div className="relative w-24 h-24">
                        <Image
                            src={getUserImage(mockUser.avatar)}
                            alt="Profile picture"
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">{mockUser.name}</h1>
                        <p className="text-gray-600 mb-4">{mockUser.bio}</p>
                        <div className="flex justify-center gap-6">
                            <div className="text-center">
                                <p className="font-bold">{mockUser.followers}</p>
                                <p className="text-sm text-gray-500">Followers</p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold">{mockUser.following}</p>
                                <p className="text-sm text-gray-500">Following</p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold">{mockUser.friends}</p>
                                <p className="text-sm text-gray-500">Friends</p>
                            </div>
                        </div>
                    </div>
                    <button className="ml-auto px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                        Account Settings
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b mb-6">
                    <button 
                        className={`pb-2 px-4 ${activeTab === 'saved' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                        onClick={() => setActiveTab('saved')}
                    >
                        Saved Recipes
                    </button>
                    <button 
                        className={`pb-2 px-4 ${activeTab === 'recent' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                        onClick={() => setActiveTab('recent')}
                    >
                        Recently Viewed
                    </button>
                </div>

                {/* Recipe Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {(activeTab === 'saved' ? savedRecipes : recentlyViewed).map((recipe, index) => (
                        <div
                            key={index}
                            className="bg-off-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                            onClick={() => router.push(`/search/${turnUsernameToUrl(recipe.author)}/${turnRecipeToUrl(recipe.name)}`)}
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src={getRecipeImage(recipe.name)}
                                    alt={recipe.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg">{recipe.name}</h3>
                                <p className="text-gray-600">by {recipe.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
