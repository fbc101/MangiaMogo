'use client';

import { useState } from 'react';
import SearchBar from "../components/SearchBar";
import Recipe from "../components/Recipe";
import burger from "../assets/Burger.svg";
import cookie from "../assets/Choco_cookie.jpg";
import curry from "../assets/jap-curry.png";
import friedChicken from "../assets/korean-fried-chicken.png";
import lamb from "../assets/lamb-skewer.png";
import meatballs from "../assets/meatballs.png";
import cornbread from "../assets/cornbread.png";
import peppers from "../assets/peppers.png";
import porkchop from "../assets/pork-chop.png";
import shrimp from "../assets/shrimp.png";
import sloppy from "../assets/sloppy.png";

import CostSlider from '../components/CostSlider';
import CostCheckbox from '../components/CostCheckbox';

import { useRouter } from 'next/navigation';

export default function SearchPage() {
    const [searchText, setSearchText] = useState(''); 
    const [allergens, setAllergens] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [country, setCountry] = useState('');
    const [costSliderRange, setCostSliderRange] = useState([0, 25]);
    const [currentlySelectedRanges, setCurrentlySelectedRanges] = useState([]);

    const costRanges = [
        { id: 'under50', label: 'Under $10', range: [0, 9] },
        { id: '50to100', label: '$10 - $20', range: [10, 20] },
        { id: '100to200', label: '$20 - $30', range: [20, 30]},
        { id: 'over200', label: 'Over $30', range: [31, 100] },
    ];

    const router = useRouter();

    const handleRecipeClick = (username, recipeName) => {
        const urlUsername = username.replace(/\s+/g, '-').toLowerCase();
        const urlRecipe = recipeName.replace(/\s+/g, '-').toLowerCase();
        router.push(`/search/${urlUsername}/${urlRecipe}`);
    };

    const recipes = [
        {
            name: "Chicken Burger",
            ingredients: "ground chicken, lettuce, tomato",
            description: "Perfect for a quick lunch. It's easy to make and tastes great. My grandma used to make this when I was a kid.",
            username: "Gordon Ramsay",
            image: burger,
            cost: 10,
            difficulty: "easy",
            country: "USA",
            allergens: []
        },
        {
            name: "Chocolate Cookie",
            ingredients: "milk, flour, eggs, sugar, cocoa",
            description: "A classic chocolate cookie recipe perfected over decades. Rich, chewy, and absolutely delightful.",
            username: "Julia Child",
            image: cookie,
            cost: 8,
            difficulty: "medium",
            country: "France",
            allergens: ["eggs", "milk"]
        },
        {
            name: "Japanese Curry",
            ingredients: "curry, rice, chicken",
            description: "Japanese curry is different from Indian or Thai curries. It is more of a brown stew and it can be mild or spicy, depending on your...",
            username: "Julia Child",
            image: curry,
            cost: 12,
            difficulty: "medium",
            country: "Japan",
            allergens: ["milk"]
        },
        {
            name: "Korean Fried Chicken",
            ingredients: "chicken, flour, eggs, sugar, cocoa",
            description: "This Korean fried chicken recipe is officially my favorite. I've had every style of fried chicken known to man, so I've always considered myself an expert...",
            username: "Gordon Ramsay",
            image: friedChicken,
            cost: 21,
            difficulty: "hard",
            country: "Korea",
            allergens: ["eggs"]
        },
        {
            name: "Lamb Skewer",
            ingredients: "lamb, skewers, spices",
            description: "Lamb souvlaki with marinated pieces of lamb, threaded on skewers, and char-grilled to perfection...",
            username: "Gordon Ramsay",
            image: lamb,
            cost: 25,
            difficulty: "hard",
            country: "Greece",
            allergens: []
        },
        {
            name: "Sloppy Joe",
            ingredients: "ground beef, tomato sauce, onions, spices",
            description: "A classic American dish, Sloppy Joes are a messy but delicious sandwich that everyone loves.",
            username: "Gordon Ramsay",
            image: sloppy,
            cost: 5,
            difficulty: "easy",
            country: "USA",
            allergens: []
        },
        {
            name: "Shrimp Stir Fry",
            ingredients: "shrimp, vegetables, soy sauce",
            description: "A quick and easy shrimp stir fry that is packed with flavor and nutrients.",
            username: "Gordon Ramsay",
            image: shrimp,
            cost: 20,
            difficulty: "easy",
            country: "USA",
            allergens: ["shellfish"]
        },
        {
            name: "Cornbread",
            ingredients: "cornmeal, milk, eggs, butter",
            description: "A deliciously moist cornbread that pairs perfectly with chili or soup.",
            username: "Gordon Ramsay",
            image: cornbread,
            cost: 25,
            difficulty: "easy",
            country: "USA",
            allergens: ["milk", "eggs"]
        },
        {
            name: "peppers",
            ingredients: "peppers, spices, olive oil",
            description: "A simple yet flavorful dish made with roasted peppers and spices. Perfect as a side or a topping.",
            username: "Gordon Ramsay",
            image: peppers,
            cost: 25,
            difficulty: "easy",
            country: "USA",
            allergens: []
        },
        {
            name: "Meatballs",
            ingredients: "ground beef, breadcrumbs, spices",
            description: "Classic meatballs made with ground beef and spices. Perfect for spaghetti or as an appetizer.",
            username: "Gordon Ramsay",
            image: meatballs,
            cost: 25,
            difficulty: "easy",
            country: "USA",
            allergens: []
        }
    ];

    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = !searchText || 
            recipe.name.toLowerCase().startsWith(searchText.trim().toLowerCase()) ||
            recipe.name.toLowerCase().includes(searchText.trim().toLowerCase()) ||
            recipe.name.split(' ').some(word => {
                return searchText.trim().split(' ').some(searchWord => {
                  return word.toLowerCase().includes(searchWord.toLowerCase()) || searchWord.toLowerCase().includes(word.toLowerCase());
                });
              });
        
        const matchesAllergens = !allergens || !recipe.allergens.includes(allergens);
        const matchesDifficulty = !difficulty || recipe.difficulty === difficulty;
        const matchesCountry = !country || recipe.country.toLowerCase().includes(country.toLowerCase());
        const matchesCost = recipe.cost >= costSliderRange[0] && recipe.cost <= costSliderRange[1];
        const matchesMultipleCost = currentlySelectedRanges.length == 0 ? true : currentlySelectedRanges.some(([min, max]) =>
            recipe.cost >= min && recipe.cost <= max
        );

        // For slider budget
        // return matchesSearch && matchesAllergens && matchesDifficulty && matchesCountry && matchesCost;

        // For checkbox budget
        return matchesSearch && matchesAllergens && matchesDifficulty && matchesCountry && matchesMultipleCost;
    });

    const handleCostRangeChange = (range) => {
        setCostSliderRange(range);
    };

    const handleCheckboxSelection = (ranges) => {
        setCurrentlySelectedRanges(ranges);
        console.log('Currently Selected Ranges:', ranges);
    };

    return (
        <div className="flex flex-col items-center justify-center flex-grow text-black text-2xl">
            <h1>Search page</h1>
            <SearchBar onSearch={setSearchText} />
            <div className="flex items-center justify-start flex-grow">
                {searchText && <p>You searched for: {searchText}</p>}
            </div>
            
            {/* Filters Section */}
            <div className="flex max-w-3xl pl-4">
                <div className='flex gap-4 mt-4 mb-6 w-full'>
                    <CostCheckbox ranges={costRanges} onSelectionChange={handleCheckboxSelection} />
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="text-sm mb-1">Allergens</label>
                            <select 
                                className="px-4 py-2 border rounded-md text-base"
                                value={allergens}
                                onChange={(e) => setAllergens(e.target.value)}
                            >
                                <option value="">None</option>
                                <option value="eggs">Eggs</option>
                                <option value="milk">Milk</option>
                                <option value="treenuts">Tree Nuts</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm mb-1">Difficulty</label>
                            <select 
                                className="px-4 py-2 border rounded-md text-base"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm mb-1">Country</label>
                            <input 
                                type="text"
                                className="px-4 py-2 border rounded-md text-base"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="Enter country"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <CostSlider range={costSliderRange} onChange={handleCostRangeChange} /> */}
            
            <div className="flex flex-col w-full max-w-3xl p-2">
                <div className="flex justify-start items-center pl-2 pr-4 text-3xl font-bold text-title mt-2">Recipes</div>
            </div>

            <div className="flex flex-col items-center justify-center flex-grow">
                {filteredRecipes.map((recipe, index) => (
                    <div key={index} className="flex flex-row items-center justify-center flex-grow">
                        <div onClick={() => handleRecipeClick(recipe.username, recipe.name)}>
                            <Recipe 
                                name={recipe.name}
                                ingredients={recipe.ingredients}
                                description={recipe.description}
                                username={recipe.username}
                                image={recipe.image}
                                cost={recipe.cost}
                                difficulty={recipe.difficulty}
                                country={recipe.country}
                            />
                        </div>
                    </div>
                ))}
                { filteredRecipes.length == 0 && <div className="font-bold mt-5"> No recipes Found ☹️ </div>}
            </div>
        </div>
    );
}