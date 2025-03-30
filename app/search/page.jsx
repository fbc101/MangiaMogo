'use client';

import { useState } from 'react'; 
import SearchBar from "../components/SearchBar";

export default function SearchPage() {
    const [searchText, setSearchText] = useState(''); 

    return (
        <div className="flex flex-col items-center justify-center flex-grow text-black text-2xl">
            <h1>Search page</h1>
            <SearchBar onSearch={setSearchText} /> 
            <div className="flex flex-col items-center justify-center flex-grow">
                {searchText && <p>You searched for: {searchText}</p>} 
            </div>
        </div>
    );
}