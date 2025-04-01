'use client';

import { use, useState } from 'react';
import Avatar from "../../../components/Avatar";
import gordon from "../../../assets/Gordon_Ramsay.png";
import granny from "../../../assets/grandma.jpg";
import julia from "../../../assets/JuliaChild.jpg";
import burger from "../../../assets/Burger.svg";
import cookie from "../../../assets/Choco_cookie.jpg";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Dropdown from "../../../components/Dropdown";
import { fraction } from 'mathjs';

// app/search/[recipe]/page.jsx
export default function RecipePage({ params }) {
    const unwrappedParams = use(params); // Unwrap params
    const { user,recipe } = unwrappedParams;
    const [serving, setServing] = useState(1);
    const [selectedDiet, setSelectedDiet] = useState(null);
    const [showSubstitutions, setShowSubstitutions] = useState(false);
    const [rating, setRating] = useState(0);
    const [showProfile, setShowProfile] = useState(false);
    
    // Replace hyphens with spaces and capitalize the first letter of each word
    const cleanedRecipe = recipe.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    const cleanedUser = user.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

    const handleServingChange = (serving) => {
        let numericValue;

        if (serving.includes('/')) {
            const [numerator, denominator] = serving.split('/').map(Number);
            if (denominator !== 0) {
                numericValue = numerator / denominator;
            } else {
                numericValue = 0; 
            }
        } else {
            numericValue = parseFloat(serving);
        }
        setServing(numericValue);
    }

    const profiles = {
        'Gordon Ramsay': {
            name: 'Gordon Ramsay',
            avatar: gordon,
            bio: 'Celebrity chef and restaurateur. Love creating simple yet delicious recipes that anyone can make at home.',
            followers: 1200,
            following: 350,
            friends: 425
        },
        'Julia Child': {
            name: 'Julia Child',
            avatar: julia,
            bio: 'American cooking teacher and author. Bringing French cuisine to everyday American cooks.',
            followers: 800,
            following: 200,
            friends: 275
        }
    };

    // Get the correct recipe details based on URL params
    const recipeData = {
        'Chicken Burger': {
            image: burger,
            avatar: gordon,
            ingredients: {
                default: [
                    {amount: 1, name: "pound ground chicken"},
                    {amount: 2, name: "large lettuce leaves"},
                    {amount: 2, name: "thick tomato slices"},
                    {amount: 1, name: "burger bun"},
                    {amount: 2, name: "tbsp mayonnaise"},
                    {amount: null, name: "Salt and pepper to taste"}
                ],
                vegetarian: [
                    {amount: 1, name: "pound plant-based ground meat"},
                    {amount: 2, name: "large lettuce leaves"},
                    {amount: 2, name: "thick tomato slices"},
                    {amount: 1, name: "burger bun"},
                    {amount: 2, name: "tbsp vegan mayonnaise"},
                    {amount: null, name: "Salt and pepper to taste"}
                ],
                vegan: [
                    {amount: 1, name: "pound plant-based ground meat"},
                    {amount: 2, name: "large lettuce leaves"},
                    {amount: 2, name: "thick tomato slices"},
                    {amount: 1, name: "vegan burger bun"},
                    {amount: 2, name: "tbsp vegan mayonnaise"},
                    {amount: null, name: "Salt and pepper to taste"}
                ],
                dairyFree: [
                    {amount: 1, name: "pound ground chicken"},
                    {amount: 2, name: "large lettuce leaves"},
                    {amount: 2, name: "thick tomato slices"},
                    {amount: 1, name: "burger bun"},
                    {amount: 2, name: "tbsp dairy-free mayonnaise"},
                    {amount: null, name: "Salt and pepper to taste"}
                ]
            },
            description: "Perfect for a quick lunch. It's easy to make and tastes great. My grandma used to make this when I was a kid.",
            instructions: [
                "1. Form ground chicken into a patty and season with salt and pepper",
                "2. Cook on medium-high heat for 5-6 minutes each side",
                "3. Toast the burger bun until golden brown",
                "4. Spread mayonnaise on both bun halves",
                "5. Assemble burger with lettuce, chicken patty, and tomato slices"
            ]
        },
        'Chocolate Cookie': {
            image: cookie,
            avatar: julia,
            ingredients: {
                default: [
                    {amount: 2, name: "cups all-purpose flour"},
                    {amount: 1, name: "cup whole milk"},
                    {amount: 2, name: "large eggs"},
                    {amount: 1.5, name: "cups granulated sugar"},
                    {amount: 0.5, name: "cup cocoa powder"},
                    {amount: 1, name: "tsp vanilla extract"},
                    {amount: 1, name: "tsp baking soda"}
                ],
                vegetarian: [
                    {amount: 2, name: "cups all-purpose flour"},
                    {amount: 1, name: "cup whole milk"},
                    {amount: 2, name: "large eggs"},
                    {amount: 1.5, name: "cups granulated sugar"},
                    {amount: 0.5, name: "cup cocoa powder"},
                    {amount: 1, name: "tsp vanilla extract"},
                    {amount: 1, name: "tsp baking soda"}
                ],
                vegan: [
                    {amount: 2, name: "cups all-purpose flour"},
                    {amount: 1, name: "cup almond milk"},
                    {amount: 2, name: "flax eggs (2 tbsp ground flaxseed + 6 tbsp water)"},
                    {amount: 1.5, name: "cups granulated sugar"},
                    {amount: 0.5, name: "cup cocoa powder"},
                    {amount: 1, name: "tsp vanilla extract"},
                    {amount: 1, name: "tsp baking soda"}
                ],
                dairyFree: [
                    {amount: 2, name: "cups all-purpose flour"},
                    {amount: 1, name: "cup almond milk"},
                    {amount: 2, name: "large eggs"},
                    {amount: 1.5, name: "cups granulated sugar"},
                    {amount: 0.5, name: "cup cocoa powder"},
                    {amount: 1, name: "tsp vanilla extract"},
                    {amount: 1, name: "tsp baking soda"}
                ]
            },
            description: "A classic chocolate cookie recipe perfected over decades. Rich, chewy, and absolutely delightful.",
            instructions: [
                "1. Preheat oven to 350°F (175°C)",
                "2. Mix dry ingredients in a large bowl",
                "3. Whisk wet ingredients separately",
                "4. Combine wet and dry ingredients until well incorporated",
                "5. Drop spoonfuls onto baking sheet",
                "6. Bake for 12-15 minutes until edges are set"
            ]
        }
    };

    const recipeDetails = recipeData[cleanedRecipe] || null;

    if (!recipeDetails) {
        return <div>Recipe not found</div>;
    }

    const currentIngredients = selectedDiet ? recipeDetails.ingredients[selectedDiet] : recipeDetails.ingredients.default;

    return (
        <div className="flex flex-col w-full min-h-screen bg-white p-4">
            {/* Header with Avatar and User */}
            <div className="flex items-center gap-4 mb-4">
                <div onClick={() => setShowProfile(true)} className="cursor-pointer">
                    <Avatar src={recipeDetails.avatar} alt="user avatar" className="w-12 h-12" />
                </div>
                <h2 className="text-xl font-semibold">{cleanedUser}</h2>
            </div>

            {/* Profile Modal */}
            {showProfile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src={profiles[cleanedUser].avatar}
                                alt="Profile picture"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-2xl font-bold">{profiles[cleanedUser].name}</h2>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">{profiles[cleanedUser].bio}</p>
                        <div className="flex justify-between mb-6">
                            <div className="text-center">
                                <p className="font-bold">{profiles[cleanedUser].followers}</p>
                                <p className="text-sm text-gray-500">Followers</p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold">{profiles[cleanedUser].following}</p>
                                <p className="text-sm text-gray-500">Following</p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold">{profiles[cleanedUser].friends}</p>
                                <p className="text-sm text-gray-500">Friends</p>
                            </div>
                        </div>
                        <button 
                            className="w-full bg-blue-500 text-white py-2 rounded-lg"
                            onClick={() => setShowProfile(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Recipe Image */}
            <div className="w-full aspect-square mb-6">
                <Image 
                    src={recipeDetails.image} 
                    alt="recipe" 
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Recipe Title */}
            <h1 className="text-2xl font-bold mb-2">{cleanedRecipe}</h1>

            {/* Rating Stars */}
            <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="text-3xl focus:outline-none text-yellow-400"
                    >
                        {star <= rating ? '★' : '☆'}
                    </button>
                ))}
            </div>

            {/* Description */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{recipeDetails.description}</p>
            </div>

            {/* Ingredients Section */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">Ingredients</h2>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm"
                        onClick={() => setShowSubstitutions(!showSubstitutions)}
                    >
                        Dietary Options
                    </button>
                </div>

                {/* Diet Selection Modal */}
                {showSubstitutions && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-4 w-80">
                            <h3 className="text-lg font-semibold mb-3">Choose Diet Type</h3>
                            {['default', 'vegetarian', 'vegan', 'dairyFree'].map((diet) => (
                                <button 
                                    key={diet}
                                    className="block w-full text-left px-4 py-3 hover:bg-gray-100 rounded-md capitalize"
                                    onClick={() => {
                                        setSelectedDiet(diet === 'default' ? null : diet);
                                        setShowSubstitutions(false);
                                    }}
                                >
                                    {diet === 'default' ? 'Original Recipe' : diet}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <ul className="space-y-2">
                    {currentIngredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            {fraction(serving * ingredient.amount).toFraction() == "0" ? "" : fraction(serving * ingredient.amount).toFraction()} {ingredient.name}
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-2">
                    <div className="text-2xl">serving size</div>
                    <Dropdown options={['1', '2', '3', '1/2', '1/3', '2/3', '3/4']} onChange={handleServingChange} />
                </div>
            </div>

            {/* Instructions Section */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Instructions</h2>
                <div className="space-y-4">
                    {recipeDetails.instructions.map((instruction, index) => (
                        <div key={index} className="flex gap-4 items-start">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                                {index + 1}
                            </span>
                            <p className="text-gray-700">{instruction.substring(instruction.indexOf(' ') + 1)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}