'use client';

import { useState } from 'react'; 
import SearchBar from "../components/SearchBar";
import Recipe from "../components/Recipe";

export default function SearchPage() {
    const [searchText, setSearchText] = useState(''); 

    return (
        <div className="flex flex-col items-center justify-center flex-grow text-black text-2xl">
            <h1>Search page</h1>
            <SearchBar onSearch={setSearchText} /> 
            <div className="flex items-center justify-center flex-grow">
                {searchText && <p>You searched for: {searchText}</p>} 
            </div>
            {searchText && (searchText.toLowerCase().startsWith('c') || searchText.toLowerCase().includes('chicken')) && (
                <Recipe name="Chicken Burger" 
                    ingredients="ground chicken, lettuce, tomato" 
                    description="Perfect for a quick lunch. It's easy to make and tastes great. My grandma used to make this when I was a kid." 
                    username="Gordon Ramsay"/>
            )}
        </div>
    );
}