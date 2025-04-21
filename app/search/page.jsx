'use client';

import { useState } from 'react';
import SearchBar from "../components/SearchBar";
import Recipe from "../components/Recipe";
import IngredientsCart from "../components/IngredientsCart";
import burger from "../assets/Burger.svg";
import cookie from "../assets/Choco_cookie.jpg";
import curry from "../assets/jap-curry.png";
import friedChicken from "../assets/korean-fried-chicken.png";
import lamb from "../assets/lamb-skewer.png";
import CostSlider from '../components/CostSlider';
import cornbread from "../assets/cornbread.png";
import shrimp from "../assets/shrimp.png";
import porkchop from "../assets/pork-chop.png";
import peppers from "../assets/peppers.png";
import sloppy from "../assets/sloppy.png";
import meatballs from "../assets/meatballs.png";
import CostCheckbox from '../components/CostCheckbox';

import { useRouter } from 'next/navigation';

export default function SearchPage() {
    const [searchText, setSearchText] = useState(''); 
    const [searchType, setSearchType] = useState('recipes'); // 'recipes' or 'ingredients'
    const [allergens, setAllergens] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [country, setCountry] = useState('');
    const [costSliderRange, setCostSliderRange] = useState([0, 25]);
    const [cartItems, setCartItems] = useState([]);
    const [currentlySelectedRanges, setCurrentlySelectedRanges] = useState([]);

    const costRanges = [
        { id: 'under50', label: 'Under $10', range: [0, 10] },
        { id: '50to100', label: '$10 - $20', range: [10, 20] },
        { id: '100to200', label: '$20 - $30', range: [20, 30]},
        { id: 'over200', label: 'Over $30', range: [30, 100] },
    ];

    const router = useRouter();

    const handleRecipeClick = (username, recipeName) => {
        const urlUsername = username.replace(/\s+/g, '-').toLowerCase();
        const urlRecipe = recipeName.replace(/\s+/g, '-').toLowerCase();
        router.push(`/search/${urlUsername}/${urlRecipe}`);
    };

    const recipes = [
        {
            name: "Sloppy Joe",
            ingredients: "ground beef, tomato sauce, onions, spices",
            description: "A classic American dish, Sloppy Joes are a messy but delicious sandwich that everyone loves.",
            username: "Gordon Ramsay",
            image: sloppy,
            cost: 5,
            difficulty: "easy",
            country: "CANADA",
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
            name: "Cornbread",
            ingredients: "cornmeal, milk, eggs, butter",
            description: "A deliciously moist cornbread that pairs perfectly with chili or soup.",
            username: "Gordon Ramsay",
            image: cornbread,
            cost: 35,
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
            cost: 45,
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
            cost: 65,
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
            cost: 75,
            difficulty: "easy",
            country: "USA",
            allergens: ["shellfish"]
        },
    ];

    const ingredients = [
        { id: 1, name: "Tomatoes", category: "Vegetable", price: 2.99 },
        { id: 2, name: "Ground Beef", category: "Meat", price: 5.99 },
        { id: 3, name: "Pasta", category: "Grains", price: 1.99 },
        { id: 4, name: "Onions", category: "Vegetable", price: 0.99 },
        { id: 5, name: "Garlic", category: "Vegetable", price: 0.50 },
        // Add more ingredients as needed
    ];

    const filteredItems = searchType === 'recipes' ? 
        recipes.filter(recipe => {
            const matchesSearch = !searchText || 
                recipe.name.toLowerCase().includes(searchText.toLowerCase()) ||
                recipe.ingredients.toLowerCase().includes(searchText.toLowerCase());
            const matchesAllergens = !allergens || !recipe.allergens.includes(allergens);
            const matchesDifficulty = !difficulty || recipe.difficulty === difficulty;
            const matchesCountry = !country || recipe.country.toLowerCase().includes(country.toLowerCase());
            const matchesCost = recipe.cost >= costSliderRange[0] && recipe.cost <= costSliderRange[1];
            return matchesSearch && matchesAllergens && matchesDifficulty && matchesCountry && matchesCost;
        }) :
        ingredients.filter(ingredient => 
            !searchText || ingredient.name.toLowerCase().includes(searchText.toLowerCase())
        );

    const handleAddToCart = (ingredient) => {
        setCartItems(prev => [...prev, ingredient]);
    };

    const handleRemoveFromCart = (ingredientId) => {
        setCartItems(prev => prev.filter(item => item.id !== ingredientId));
    };

    const handleCostRangeChange = (range) => {
        setCostSliderRange(range);
    };

    const handleCheckboxSelection = (ranges) => {
        setCurrentlySelectedRanges(ranges);
        console.log('Currently Selected Ranges:', ranges);
    };

    return (
        <div className="flex flex-col items-center text-black text-xl pb-24 ">
            <div className="flex w-full p-2">
                <h1 className="flex justify-center items-center pl-2 pr-4 text-2xl font-bold text-title">
                    Search
                </h1>
                <div className="flex-1">
                    <SearchBar onSearch={setSearchText} label={`search ${searchType}...`}/>
                </div>
                <div className="relative">
                    <IngredientsCart 
                        items={cartItems}
                        onRemove={handleRemoveFromCart}
                    />
                </div>
            </div>

            <div className="flex gap-2 w-full px-4 mb-4">
                <button 
                    className={`flex-1 py-2 px-4 rounded-full ${searchType === 'recipes' ? 'bg-nav text-white' : 'bg-gray-200'}`}
                    onClick={() => setSearchType('recipes')}
                >
                    Recipes
                </button>
                <button 
                    className={`flex-1 py-2 px-4 rounded-full ${searchType === 'ingredients' ? 'bg-nav text-white' : 'bg-gray-200'}`}
                    onClick={() => setSearchType('ingredients')}
                >
                    Ingredients
                </button>
            </div>
            
            {searchType === 'recipes' && (
                <>
                    {/* Filters Section */}
                    <div className="flex flex-wrap gap-2 mt-4 mb-6 px-2">
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
                    <CostSlider range={costSliderRange} onChange={handleCostRangeChange} />
                </>
            )}

            <div className="w-full px-4">
                {searchType === 'recipes' ? (
                    <div className="space-y-4">
                        {filteredItems.map((recipe, index) => (
                            <Recipe key={index} {...recipe} />
                        ))}
                        {filteredItems.length === 0 && 
                            <div className="text-center py-4">No recipes found ☹️</div>
                        }
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {filteredItems.map((ingredient) => (
                            <div 
                                key={ingredient.id}
                                className="bg-white p-4 rounded-lg shadow-sm flex flex-col"
                            >
                                <h3 className="text-lg font-semibold">{ingredient.name}</h3>
                                <p className="text-sm text-gray-600">{ingredient.category}</p>
                                <p className="text-sm font-medium">${ingredient.price.toFixed(2)}</p>
                                <button
                                    onClick={() => handleAddToCart(ingredient)}
                                    className="mt-2 bg-nav text-white px-3 py-1 rounded-full text-sm hover:bg-nav-hover"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                        {filteredItems.length === 0 && 
                            <div className="col-span-2 text-center py-4">No ingredients found ☹️</div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
}
