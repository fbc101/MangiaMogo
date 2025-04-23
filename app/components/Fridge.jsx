'use client';

import { useState } from 'react';
import fridge from "../assets/fridge.png";
import Image from "next/image";

export default function Fridge({ items, onRemove }) {
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const totalItems = items.length;

    // Mock function to generate recipe suggestions based on ingredients
    const generateSuggestions = () => {
        setIsGenerating(true);
        // Simulate API call delay
        setTimeout(() => {
            const mockSuggestions = [
                {
                    id: 1,
                    name: "Pasta with Tomato Sauce",
                    matchedIngredients: ["Tomatoes", "Garlic", "Onions"],
                    missingIngredients: ["Pasta", "Basil"]
                },
                {
                    id: 2,
                    name: "Beef Stew",
                    matchedIngredients: ["Ground Beef", "Onions"],
                    missingIngredients: ["Carrots", "Potatoes", "Beef Stock"]
                },
                {
                    id: 3,
                    name: "Garden Salad",
                    matchedIngredients: ["Tomatoes", "Onions"],
                    missingIngredients: ["Lettuce", "Cucumber", "Dressing"]
                },
                {
                    id: 4,
                    name: "Chicken Burger",
                    matchedIngredients: ["Ground Chicken", "Tomatoes", "Bun"],
                    missingIngredients: ["Lettuce", "Bun"]
                },
                {
                    id: 5,
                    name: "Chocolate Cookie",
                    matchedIngredients: ["Flour", "Sugar", "Milk"],
                    missingIngredients: ["Eggs", "Butter"]
                },
                {
                    id: 6,
                    name: "Beef and Potato Stew",
                    matchedIngredients: ["Ground Beef", "Potatoes", "Carrots", "Onions"],
                    missingIngredients: ["Beef Broth", "Celery", "Bay Leaf"]
                },
                {
                    id: 7,
                    name: "Open-Faced Ground Chicken Sandwich",
                    matchedIngredients: ["Ground Chicken", "Tomatoes", "Onions", "Bun"],
                    missingIngredients: ["Lettuce", "Mayonnaise", "Pickles"]
                },
                {
                    id: 8,
                    name: "Quick Tomato Pasta",
                    matchedIngredients: ["Tomatoes", "Pasta", "Garlic"],
                    missingIngredients: ["Olive Oil", "Basil", "Parmesan Cheese"]
                  },
                  {
                    id: 9,
                    name: "Meatball Subs",
                    matchedIngredients: ["Ground Beef", "Tomatoes", "Bun", "Onions", "Garlic"],
                    missingIngredients: ["Italian Bread", "Mozzarella Cheese", "Bell Peppers"]
                  },
                  {
                    id: 10,
                    name: "Chicken and Potato Hash",
                    matchedIngredients: ["Ground Chicken", "Potatoes", "Onions"],
                    missingIngredients: ["Bell Peppers", "Butter", "Eggs (optional)"]
                  },
                  {
                    id: 11,
                    name: "Shrimp Scampi with Pasta",
                    matchedIngredients: ["Shrimp", "Garlic", "Pasta"],
                    missingIngredients: ["Butter", "White Wine", "Lemon Juice"]
                  },
                  {
                    id: 12,
                    name: "Creamy Chicken and Tomato Pasta",
                    matchedIngredients: ["Ground Chicken", "Tomatoes", "Pasta", "Milk"],
                    missingIngredients: ["Heavy Cream", "Onion", "Italian Herbs"]
                  },
                  {
                    id: 13,
                    name: "Beef and Carrot Stir-Fry (Simple)",
                    matchedIngredients: ["Ground Beef", "Carrots", "Onions"],
                    missingIngredients: ["Soy Sauce", "Ginger", "Broccoli"]
                  },
                  {
                    id: 14,
                    name: "Garlic Tomato Bruschetta (DIY)",
                    matchedIngredients: ["Tomatoes", "Garlic", "Bun"],
                    missingIngredients: ["Olive Oil", "Basil", "Balsamic Glaze"]
                  },
                  {
                    id: 15,
                    name: "Chicken Noodle Soup",
                    matchedIngredients: ["Ground Chicken", "Pasta", "Carrots", "Onions"],
                    missingIngredients: ["Chicken Broth", "Celery", "Bay Leaf"]
                  },
                  {
                    id: 16,
                    name: "Potato and Onion Frittata (Basic)",
                    matchedIngredients: ["Potatoes", "Onions", "Milk"],
                    missingIngredients: ["Eggs", "Cheese", "Spinach"]
                  },
                  {
                    id: 17,
                    name: "Shrimp and Tomato Skewers",
                    matchedIngredients: ["Shrimp", "Tomatoes", "Garlic"],
                    missingIngredients: ["Olive Oil", "Lemon", "Bell Peppers"]
                  }
                
            ].filter(suggestion => 
                suggestion.matchedIngredients.some(ing => 
                    items.some(item => item.name.includes(ing))
                )
            );
            
            setSuggestions(mockSuggestions);
            setIsGenerating(false);
        }, 1000);
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-full"
            >
                <Image src={fridge} alt="Fridge" className="w-6 h-6" />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 max-h-[80vh] overflow-hidden">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">What's in your fridge?</h3>
                        {items.length > 0 ? (
                            <>
                                <div className="max-h-48 overflow-y-auto mb-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center py-2">
                                            <div>
                                                <p className="text-sm font-medium">{item.name}</p>
                                            </div>
                                            <button
                                                onClick={() => onRemove(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t pt-4">
                                    <button
                                        onClick={generateSuggestions}
                                        disabled={isGenerating}
                                        className="w-full bg-nav text-white py-2 px-4 rounded-full text-sm hover:bg-nav-hover disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isGenerating ? 'Generating...' : 'Generate Recipe Ideas'}
                                    </button>
                                </div>

                                {suggestions.length > 0 && (
                                    <div className="mt-4 border-t pt-4">
                                        <h4 className="text-md font-semibold mb-2">Recipe Suggestions</h4>
                                        <div className="max-h-48 overflow-y-auto">
                                            {suggestions.map((suggestion) => (
                                                <div key={suggestion.id} className="bg-gray-50 rounded-lg p-3 mb-2">
                                                    <h5 className="text-sm font-medium">{suggestion.name}</h5>
                                                    <div className="mt-2">
                                                        <p className="text-xs text-green-600">
                                                            ✓ You have: {suggestion.matchedIngredients.join(', ')}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Still needed: {suggestion.missingIngredients.join(', ')}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="text-sm text-gray-500">Your fridge is empty</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
} 