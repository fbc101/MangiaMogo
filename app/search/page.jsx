'use client';

import { useState } from 'react';
import SearchBar from "../components/SearchBar";
import Recipe from "../components/Recipe";
import burger from "../assets/Burger.svg";
import cookie from "../assets/Choco_cookie.jpg";
import { useRouter } from 'next/navigation';

export default function SearchPage() {
    const [searchText, setSearchText] = useState(''); 
    const chickenRecipe = ['chicken', 'burger', 'chicken burger'];
    const cookieRecipe = ['cookie', 'chocolate cookie', 'chocolate'];
    const [allergens, setAllergens] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [country, setCountry] = useState('');
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
            price: 10,
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
            price: 8,
            difficulty: "medium",
            country: "France",
            allergens: ["eggs", "milk"]
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

        return matchesSearch && matchesAllergens && matchesDifficulty && matchesCountry;
    });

    return (
        <div className="flex flex-col items-center justify-center flex-grow text-black text-2xl">
            <h1>Search page</h1>
            <SearchBar onSearch={setSearchText} />
            
            {/* Filters Section */}
            <div className="flex gap-4 mt-4 mb-6">
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

            <div className="flex items-center justify-center flex-grow">
                {searchText && <p>You searched for: {searchText}</p>}
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
                                price={recipe.price}
                                difficulty={recipe.difficulty}
                                country={recipe.country}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}