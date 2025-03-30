'use client';

import Image from "next/image";
import searchIcon from "../assets/Search.svg";
import { useRef } from 'react'; 

export default function SearchBar() {
    const inputRef = useRef(null); 

    const handleSearch = () => {
        if (inputRef.current) {
            console.log(inputRef.current.value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex w-3/4">
            <h1 className="flex justify-center items-center pl-2 pr-2 text-3xl font-bold text-title">
                Search
            </h1>
            <input
                type="text"
                placeholder="Type the dish you want to cook"
                className="w-full pl-2 rounded-full border border-gray-300 bg-search"
                ref={inputRef} 
                onKeyDown={handleKeyDown}
            />
            <div className="flex justify-center items-center pl-2">
                <Image
                    src={searchIcon}
                    className="w-12 h-12 cursor-pointer" 
                    alt="Search Icon"
                    style={{ transform: 'scaleX(-1)' }}
                    onClick={handleSearch} 
                />
            </div>
        </div>
    );
}