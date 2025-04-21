'use client';

import { useState } from 'react';
import Image from 'next/image';
import cartIcon from '../assets/cart.svg'; // You'll need to add this icon

export default function IngredientsCart({ ingredients, onSuggestRecipes }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="cursor-pointer flex items-center">
                <div className="relative">
                    <Image
                        src={cartIcon}
                        alt="Ingredients Cart"
                        width={24}
                        height={24}
                    />
                    {ingredients.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {ingredients.length}
                        </span>
                    )}
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 p-4">
                    <h3 className="font-semibold mb-2">Your Ingredients</h3>
                    {ingredients.length === 0 ? (
                        <p className="text-gray-500">No ingredients added</p>
                    ) : (
                        <>
                            <ul className="max-h-48 overflow-y-auto mb-4">
                                {ingredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-center justify-between py-1">
                                        <span>{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={onSuggestRecipes}
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                What to make!
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
} 