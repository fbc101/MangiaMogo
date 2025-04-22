'use client';

import { use, useState } from 'react';
import Avatar from "../../../components/Avatar";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Dropdown from "../../../components/Dropdown";
import ShareButton from "../../../components/Share-btn";
import gen from "../../../assets/gen.png";
import reject from "../../../assets/reject.png";
import Assistant from '@/app/components/Assistant';
import recipeData from '../../../../data/recipes.json';
import { getRecipeImage, getUserImage } from '@/app/utils/utils';
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
            avatar: getUserImage('Gordon Ramsay'),
            bio: 'Celebrity chef and restaurateur. Love creating simple yet delicious recipes that anyone can make at home.',
            followers: 1200,
            following: 350,
            friends: 425
        },
        'Julia Child': {
            name: 'Julia Child',
            avatar: getUserImage('Julia Child'),
            bio: 'American cooking teacher and author. Bringing French cuisine to everyday American cooks.',
            followers: 800,
            following: 200,
            friends: 275
        }
    };

    const recipeDetails = recipeData[cleanedRecipe] || null;

    const [isGenerated, setIsGenerated] = useState(recipeData[cleanedRecipe]?.generated);
    
    const handleGenerateClick = (index, event) => {
        event.stopPropagation();
        setIsGenerated(prevIsGenerated => {
            const updatedIsGenerated = [...prevIsGenerated];
            updatedIsGenerated[index] = !updatedIsGenerated[index]; // Hide the button
            return updatedIsGenerated;
        });
       
        console.log(recipeDetails?.generated?.[index]); // Log the updated value
    };

    if (!recipeDetails) {
        return <div>Recipe not found</div>;
    }

    const currentIngredients = selectedDiet ? recipeDetails.ingredients[selectedDiet] : recipeDetails.ingredients.default;

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#E6F2FF] p-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                {/* Header with Avatar and User */}
                <div className="flex items-center gap-4 mb-4">
                    <div onClick={() => setShowProfile(true)} className="cursor-pointer">
                        <Avatar src={getUserImage(recipeDetails.avatar)} alt="user avatar" className="w-12 h-12" />
                    </div>
                    <h2 className="text-xl font-semibold">{cleanedUser}</h2>
                </div>

                {/* Profile Modal */}
                {showProfile && (
                    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-96">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src={getUserImage(recipeDetails.avatar)}
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
                        src={getRecipeImage(recipeDetails.image)}
                        alt="recipe" 
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                
                {/* Video Section */}
                {recipeDetails.videoUrl && (
                    <div className="w-full aspect-video mb-6">
                        <iframe
                            src={`${recipeDetails.videoUrl}?autoplay=1&mute=1&rel=0&controls=1`}
                            className="w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="eager"
                        />
                    </div>
                )}

                {/* Recipe Title */}
                <div className='flex justify-between items-center mb-2'>
                    <h1 className="text-2xl font-bold">{cleanedRecipe}</h1>
                    <ShareButton recipe={cleanedRecipe} />
                </div>

                {/* Rating Stars Read Only*/}
                {cleanedRecipe === "Chicken Burger" && <div className="flex justify-start items-center gap-2"> 
                        <div className="text-lg font-bold">4.5</div>
                        <Box>
                            <Rating name="size-large" defaultValue={4.5} precision={0.5} size="large" readOnly />
                        </Box>
                        <div className="text-2xl font-bold">(283)</div>
                    </div>}
                    {cleanedRecipe === "Chocolate Cookie" && <div className="flex justify-start items-center gap-2"> 
                        <div className="text-lg font-bold">4.8</div>
                        <Box>
                            <Rating name="size-large" defaultValue={4.5} precision={0.5} size="large" readOnly />
                        </Box>
                        <div className="text-2xl font-bold">(567)</div>
                    </div>}

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
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowSubstitutions(false)} 
                    >
                        <div
                            className="bg-white rounded-lg p-4 w-80"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <div className='flex justify-between items-center'>
                                <h3 className="text-lg font-semibold">Choose Diet Type</h3>
                                <button className="rounded-lg  cursor-pointer" onClick={(e) => {
                                    e.stopPropagation();
                                    setShowSubstitutions(false);
                                }}>
                                    <Image src={reject} alt="reject" className="w-8 h-8 rounded-full " />
                                </button>
                            </div>
                            {['default', 'vegetarian', 'vegan', 'dairy-free'].map((diet) => (
                                <button
                                    key={diet}
                                    className="block w-full text-left px-4 py-3 hover:bg-gray-100 rounded-md capitalize"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedDiet(diet === 'default' ? null : diet);
                                        setShowSubstitutions(false);
                                    }}
                                >
                                    {diet === 'default' ? 'Original Recipe' : diet}
                                </button>
                            ))}
                        </div>
                    </div>)}

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
                                <div>
                                    <div className='flex justify-between items-center'>
                                        <p className="text-gray-700">{instruction.substring(instruction.indexOf(' ') + 1)}</p>
                                        {!isGenerated[index] && !recipeDetails?.generated?.[index] && (
                                            <Image
                                            src={gen}
                                            alt="gen"
                                            className='h-8 w-8 cursor-pointer'
                                            onClick={(e) => handleGenerateClick(index, e)}
                                            />
                                        )}
                                    </div>
                                    {/* AI VIDEOS */}
                                    { cleanedRecipe === "Chicken Burger" && isGenerated[index] === true &&  (
                                        <div className="flex flex-col items-center mt-2">    
                                            <video controls className="rounded-lg w-full h-full">
                                                <source src={`/assets/videos/chicken-burger-step-${index + 1}.mp4`} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                            <div className='flex items-center justify-center bg-blue-500 text-white cursor-pointer rounded-lg w-full h-full mt-1' 
                                            onClick={(e) => handleGenerateClick(index, e)}>
                                                hide
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rating Stars */}
                <div className="flex mb-4">
                    <div className="text-2xl flex-col items-center">
                        <div className="text-2xl font-bold">Rate this recipe</div>
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
                </div>

                {/* Assistant Section */}
                <Assistant />       
            </div>
        </div>
    );
}