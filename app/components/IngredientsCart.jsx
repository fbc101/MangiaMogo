'use client';

import { useState } from 'react';

export default function IngredientsCart({ items, onRemove }) {
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const totalItems = items.length;
    const totalCost = items.reduce((sum, item) => sum + item.price, 0);

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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 max-h-[80vh] overflow-hidden">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">Shopping Cart</h3>
                        {items.length > 0 ? (
                            <>
                                <div className="max-h-48 overflow-y-auto mb-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center py-2">
                                            <div>
                                                <p className="text-sm font-medium">{item.name}</p>
                                                <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
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
                                    <div className="flex justify-between text-sm font-medium mb-4">
                                        <span>Total:</span>
                                        <span>${totalCost.toFixed(2)}</span>
                                    </div>
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
                            <p className="text-sm text-gray-500">Your cart is empty</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
} 