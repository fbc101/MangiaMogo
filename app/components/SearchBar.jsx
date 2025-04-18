'use client';

import Image from "next/image";
import searchIcon from "../assets/Search.svg";
import { useRef } from 'react'; 

export default function SearchBar({ onSearch, label }) {
    const inputRef = useRef(null); 

    const handleSearch = () => {
        if (inputRef.current && onSearch) {
            onSearch(inputRef.current.value);
            console.log(inputRef.current.value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex w-full max-w-3xl ">
            <input
                type="text"
                placeholder={label || "Type the dish you want to cook"}
                className="w-full pl-4 rounded-full border border-gray-300 bg-search"
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