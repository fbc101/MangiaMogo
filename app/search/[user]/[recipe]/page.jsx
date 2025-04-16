'use client';

import { use, useState } from 'react';
import Avatar from "../../../components/Avatar";
import gordon from "../../../assets/Gordon_Ramsay.png";
import julia from "../../../assets/JuliaChild.jpg";
import burger from "../../../assets/Burger.svg";
import cookie from "../../../assets/Choco_cookie.jpg";
import curry from "../../../assets/jap-curry.png";
import friedChicken from "../../../assets/korean-fried-chicken.png";
import lamb from "../../../assets/lamb-skewer.png";
import reject from '../../../assets/reject.png';
import Image from "next/image";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Dropdown from "../../../components/Dropdown";
import ShareButton from '../../../components/Share-btn';

import { fraction, floor } from 'mathjs';

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
                'dairy-free': [
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
                'dairy-free': [
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
        },
        'Japanese Curry': {
            image: curry,
            avatar: julia,
            ingredients: {
                default: [
                    {amount: 2, name: "tablespoon vegetable oil, or more as needed"},
                    {amount: 1.75, name: "pounds beef chuck, cut into 2-inch cubes"},
                    {amount: 3, name: "onions, quartered"},
                    {amount: 1, name: "tablespoon ketchup"},
                    {amount: 1.5, name: "teaspoons Worcestershire sauce"},
                    {amount: 1, name: "pinch cayenne pepper, or to taste (Optional)"},
                    {amount: null, name: "water to cover"},
                    {amount: 4, name: "carrots, cut into 2-inch pieces"},
                    {amount: 1, name: "cube chicken bouillon (Optional)"},
                    {amount: 3, name: "medium potatoes, cut into 3-inch chunks"},
                    {amount: 1.5, name: "containers Japanese curry roux, or more to taste"},
                ],
                vegetarian: [
                    {amount: 2, name: "tablespoon vegetable oil, or more as needed"},
                    {amount: 1.75, name: "pounds plant-based ground chicken, cut into 2-inch cubes"},
                    {amount: 3, name: "onions, quartered"},
                    {amount: 1, name: "tablespoon ketchup"},
                    {amount: 1.5, name: "teaspoons Worcestershire sauce"},
                    {amount: 1, name: "pinch cayenne pepper, or to taste (Optional)"},
                    {amount: null, name: "water to cover"},
                    {amount: 4, name: "carrots, cut into 2-inch pieces"},
                    {amount: 1, name: "cube chicken bouillon (Optional)"},
                    {amount: 3, name: "medium potatoes, cut into 3-inch chunks"},
                    {amount: 1.5, name: "containers Japanese curry roux, or more to taste"},
                ],
                vegan: [
                    {amount: 2, name: "tablespoon vegetable oil, or more as needed"},
                    {amount: 1.75, name: "pounds plant-based ground chicken, cut into 2-inch cubes"},
                    {amount: 3, name: "onions, quartered"},
                    {amount: 1, name: "tablespoon ketchup"},
                    {amount: 1.5, name: "teaspoons Worcestershire sauce"},
                    {amount: 1, name: "pinch cayenne pepper, or to taste (Optional)"},
                    {amount: null, name: "water to cover"},
                    {amount: 4, name: "carrots, cut into 2-inch pieces"},
                    {amount: 1, name: "cube chicken bouillon (Optional)"},
                    {amount: 3, name: "medium potatoes, cut into 3-inch chunks"},
                    {amount: 1.5, name: "containers Japanese curry roux, or more to taste"},
                ],
                'dairy-free': [
                    {amount: 2, name: "tablespoon vegetable oil, or more as needed"},
                    {amount: 1.75, name: "pounds plant-based ground chicken, cut into 2-inch cubes"},
                    {amount: 3, name: "onions, quartered"},
                    {amount: 1, name: "tablespoon ketchup"},
                    {amount: 1.5, name: "teaspoons Worcestershire sauce"},
                    {amount: 1, name: "pinch cayenne pepper, or to taste (Optional)"},
                    {amount: null, name: "water to cover"},
                    {amount: 4, name: "carrots, cut into 2-inch pieces"},
                    {amount: 1, name: "cube chicken bouillon (Optional)"},
                    {amount: 3, name: "medium potatoes, cut into 3-inch chunks"},
                    {amount: 1.5, name: "containers Japanese curry roux, or more to taste"},
                ]
            },
            description: "Japanese curry is different from Indian or Thai curries. It is more of a brown stew and it can be mild or spicy, depending on your tastes. It can be served over white rice or with udon noodles. This recipe is very flexible; it can easily be made for more or less people.",
            instructions: [
                "1. Heat oil in a 6-quart pot over medium-high heat. Add beef and saute until brown, 5 to 7 minutes. ",
                "2. Add onions and cook until starting to soften, about 3 minutes. Add ketchup and Worcestershire sauce. Stir to coat. Add cayenne pepper. Pour in water to cover mixture by 1 or 2 inches. Add carrots and bouillon.",
                "3. Simmer, skimming fat off the surface of the broth as needed, for 30 minutes. Add potatoes. Stir in 1 package of curry roux and let dissolve; add remaining curry as needed to achieve desired thickness. Continue simmering until beef and vegetables are tender, about 30 minutes more.",
                "4. Remove beef and vegetables to a bowl. Stir remaining curry roux into broth until thickened. Return beef and vegetables to the pot. Simmer until heated through, about 5 minutes more.",
                "5. Serve hot, garnished with green onions and cilantro."
            ]
        },
        'Korean Fried Chicken': {
            image: friedChicken,
            avatar: gordon,
            ingredients: {
                default: [
                    {amount: 1, name: "pound skinless, boneless chicken thighs, quartered"},
                    {amount: .5, name: "yellow onion, grated"},
                    {amount: 4, name: "cloves garlic, minced"},
                    {amount: 1, name: "teaspoon fine salt"},
                    {amount: .5, name: "teaspoon freshly ground black pepper"},
                    {amount: 4, name: "cups oil for frying, or as needed"},
                    {amount: .75, name: "cup cornstarch"},
                    {amount: .5, name: "cup self-rising flour"},
                    {amount: 1, name: "teaspoon white sugar"},
                    {amount: .5, name: "teaspoon ground black pepper"},
                    {amount: .25, name: "teaspoon salt"},
                    {amount: 1, name: "cup very cold water, or as needed"},
                ],
                vegetarian: [
                    {amount: 1, name: "pound skinless, boneless chicken thighs, quartered"},
                    {amount: .5, name: "yellow onion, grated"},
                    {amount: 4, name: "cloves garlic, minced"},
                    {amount: 1, name: "teaspoon fine salt"},
                    {amount: .5, name: "teaspoon freshly ground black pepper"},
                    {amount: 4, name: "cups oil for frying, or as needed"},
                    {amount: .75, name: "cup cornstarch"},
                    {amount: .5, name: "cup self-rising flour"},
                    {amount: 1, name: "teaspoon white sugar"},
                    {amount: .5, name: "teaspoon ground black pepper"},
                    {amount: .25, name: "teaspoon salt"},
                    {amount: 1, name: "cup very cold water, or as needed"}
                ],
                vegan: [
                    {amount: 1, name: "pound skinless, boneless chicken thighs, quartered"},
                    {amount: .5, name: "yellow onion, grated"},
                    {amount: 4, name: "cloves garlic, minced"},
                    {amount: 1, name: "teaspoon fine salt"},
                    {amount: .5, name: "teaspoon freshly ground black pepper"},
                    {amount: 4, name: "cups oil for frying, or as needed"},
                    {amount: .75, name: "cup cornstarch"},
                    {amount: .5, name: "cup self-rising flour"},
                    {amount: 1, name: "teaspoon white sugar"},
                    {amount: .5, name: "teaspoon ground black pepper"},
                    {amount: .25, name: "teaspoon salt"},
                    {amount: 1, name: "cup very cold water, or as needed"},
                ],
                'dairy-free': [
                    {amount: 1, name: "pound skinless, boneless chicken thighs, quartered"},
                    {amount: .5, name: "yellow onion, grated"},
                    {amount: 4, name: "cloves garlic, minced"},
                    {amount: 1, name: "teaspoon fine salt"},
                    {amount: .5, name: "teaspoon freshly ground black pepper"},
                    {amount: 4, name: "cups oil for frying, or as needed"},
                    {amount: .75, name: "cup cornstarch"},
                    {amount: .5, name: "cup self-rising flour"},
                    {amount: 1, name: "teaspoon white sugar"},
                    {amount: .5, name: "teaspoon ground black pepper"},
                    {amount: .25, name: "teaspoon salt"},
                    {amount: 1, name: "cup very cold water, or as needed"}
                ]
            },
            description: "This Korean fried chicken recipe is officially my favorite. I've had every style of fried chicken known to man, so I've always considered myself an expert. No other method I've come across has the same combination of tender, juicy, flavorful chicken and plate-scratching crispiness as this recipe does. It's simply a must-try!",
            instructions: [
                "1. Gather all ingredients.",
                "2. Make marinade: Stir together chicken, onion, garlic, salt, and pepper in a medium bowl until chicken is coated. Cover the bowl with plastic wrap and refrigerate, 4 hours to overnight.",
                "3. Heat oil in a deep fryer or large saucepan to 340 degrees F (171 degrees C).",
                "4. While oil is heating, make the batter: Whisk cornstarch, flour, sugar, pepper, and salt together in a large bowl. Gradually whisk in cold water until mixture resembles a smooth batter. Use tongs to remove chicken from marinade to batter; stir to coat chicken completely. Discard marinade.",
                "5. Working in batches, fry chicken in hot oil for 4 minutes. Transfer chicken to a cooling rack.",
                "6. Increase oil temperature to 375 degrees F (190 degrees C).",
                "7. Working in batches, fry chicken again in hot oil until golden brown and crispy, 3 to 4 minutes. Transfer to a wire rack to drain.",
                "8. Enjoy!"
            ]
        },
        'Lamb Skewer': {
            image: lamb,
            avatar: gordon,
            ingredients: {
                default: [
                    {amount: .33, name: "cup olive oil"},
                    {amount: 1.5, name: "tablespoons freshly squeezed lemon juice"},
                    {amount: 1.5, name: "tablespoons red wine vinegar"},
                    {amount: 1.5, name: "tablespoons chopped fresh oregano"},
                    {amount: 2, name: "cloves garlic, minced"},
                    {amount: .5, name: "teaspoon salt"},
                    {amount: .25, name: "teaspoon ground black pepper"},
                    {amount: 1.5, name: "pounds boneless leg of lamb, trimmed of all fat and cut into 1-inch cubes"},
                ],
                vegetarian: [
                    {amount: .33, name: "cup olive oil"},
                    {amount: 1.5, name: "tablespoons freshly squeezed lemon juice"},
                    {amount: 1.5, name: "tablespoons red wine vinegar"},
                    {amount: 1.5, name: "tablespoons chopped fresh oregano"},
                    {amount: 2, name: "cloves garlic, minced"},
                    {amount: .5, name: "teaspoon salt"},
                    {amount: .25, name: "teaspoon ground black pepper"},
                    {amount: 1.5, name: "pounds boneless leg of plant-based ground lamb, trimmed of all fat and cut into 1-inch cubes"},
                ],
                vegan: [
                    {amount: .33, name: "cup olive oil"},
                    {amount: 1.5, name: "tablespoons freshly squeezed lemon juice"},
                    {amount: 1.5, name: "tablespoons red wine vinegar"},
                    {amount: 1.5, name: "tablespoons chopped fresh oregano"},
                    {amount: 2, name: "cloves garlic, minced"},
                    {amount: .5, name: "teaspoon salt"},
                    {amount: .25, name: "teaspoon ground black pepper"},
                    {amount: 1.5, name: "pounds boneless leg of plant-based ground lamb, trimmed of all fat and cut into 1-inch cubes"},
                ],
                'dairy-free': [
                    {amount: .33, name: "cup olive oil"},
                    {amount: 1.5, name: "tablespoons freshly squeezed lemon juice"},
                    {amount: 1.5, name: "tablespoons red wine vinegar"},
                    {amount: 1.5, name: "tablespoons chopped fresh oregano"},
                    {amount: 2, name: "cloves garlic, minced"},
                    {amount: .5, name: "teaspoon salt"},
                    {amount: .25, name: "teaspoon ground black pepper"},
                    {amount: 1.5, name: "pounds boneless leg of plant-based ground lamb, trimmed of all fat and cut into 1-inch cubes"},
                ],
            },
            description: "Lamb souvlaki with marinated pieces of lamb, threaded on skewers, and char-grilled to perfection. I like to serve these with rosemary garlic roasted potatoes, a Greek salad, and pita bread.",
            instructions: [
                "1. Whisk olive oil, lemon juice, red wine vinegar, oregano, garlic, salt, and pepper together in a medium bowl. Add cubed lamb and stir until lamb is coated with marinade. Cover and refrigerate 3 hours, or overnight.",
                "2. Preheat an outdoor grill for medium-high heat and lightly oil the grate.",
                "3. Thread marinated lamb onto skewers, reserving any remaining marinade. Grill skewers until desired doneness, 10 to 12 minutes, basting with the reserved marinade and turning occasionally for even cooking.",
                
            ]
        }
    };

    const recipeDetails = recipeData[cleanedRecipe] || null;

    if (!recipeDetails) {
        return <div>Recipe not found</div>;
    }

    const currentIngredients = selectedDiet ? recipeDetails.ingredients[selectedDiet] : recipeDetails.ingredients.default;

    const handleFraction = (amount) => {
        const fract = fraction(amount).toFraction();
        console.log(fract);
        const [numerator, denominator] = fract.split('/').map(Number);
        console.log(numerator, denominator);

        if (denominator) {
            if (fract === "0") {
                return "";
            } else if (numerator < denominator) {
                return fract;
            } else {
                const remainder = numerator % denominator;
                const quotient = floor(numerator / denominator);
                return `${quotient} ${remainder}/${denominator}`;
            }
        } else {
            return amount == 0 ? "" : amount;
        }
    };

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
                <div className="flex-row items-center justify-start mb-3">
                    <h2 className="text-lg font-semibold">Ingredients</h2>
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
                    </div>
                )}

                <ul className="space-y-2">
                    {currentIngredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            {handleFraction(serving * ingredient.amount)} {ingredient.name}
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-2">
                    <div className="text-2xl">Serving Size</div>
                    <Dropdown options={['1', '2', '3', '1/2', '1/3', '2/3', '3/4']} onChange={handleServingChange} />
                </div>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-full text-2xl hover:bg-blue-600"
                    onClick={() => setShowSubstitutions(!showSubstitutions)}
                >
                    Dietary Options
                </button>
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
                    <button className="rounded-lg bg-blue-500 p-2 ml-4 text-white text-sm hover:bg-blue-600" onClick={() => setRating(0)}> clear </button>
                </div>
            </div>
        </div>
    );
}