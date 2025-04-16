'use client';

import { useState } from 'react';
import Image from 'next/image';
import gordon from '../assets/Gordon_Ramsay.png';
import burger from '../assets/Burger.svg';
import curry from '../assets/jap-curry.png';
import cookie from '../assets/Choco_cookie.jpg';
import { useRouter } from 'next/navigation';
import { turnUsernameToUrl, turnRecipeToUrl } from '../utils/utils';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('saved');
    const router = useRouter();

    const mockUser = {
        name: "Gordon Ramsay",
        avatar: gordon,
        bio: "Celebrity chef and restaurateur. Love creating simple yet delicious recipes that anyone can make at home.",
        followers: 1200,
        following: 350,
        friends: 425
    };

    const savedRecipes = [
        {
            name: "Japanese Curry",
            image: curry,
            author: "Julia Child"
        },
        {
            name: "Chocolate Cookie", 
            image: cookie,
            author: "Julia Child"
        }
    ];

    const recentlyViewed = [
        {
            name: "Chocolate Cookie",
            image: cookie,
            author: "Julia Child"
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-black p-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-4xl">
                {/* Profile Header */}
                <div className="flex items-center gap-6 mb-8">
                    <Image
                        src={mockUser.avatar}
                        alt="Profile picture"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{mockUser.name}</h1>
                        <p className="text-gray-600 mb-4">{mockUser.bio}</p>
                        <div className="flex gap-6">
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
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => router.push(`/search/${turnUsernameToUrl(recipe.author)}/${turnRecipeToUrl(recipe.name)}`)}>
                        <Image
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">{recipe.name}</h3>
                            <p className="text-gray-600">by {recipe.author}</p>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}