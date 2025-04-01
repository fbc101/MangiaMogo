'use client';

import { use, useState, useEffect } from 'react';
import Avatar from "../../../components/Avatar";
import gordon from "../../../assets/Gordon_Ramsay.png";
import granny from "../../../assets/grandma.jpg";
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

    // Replace hyphens with spaces and capitalize the first letter of each word
    const cleanedRecipe = recipe.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    const cleanedUser = user.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    const ingredientsCookie = [{amount: 2, name: "cups of flour"}, {amount: 1, name: "cup of sugar"}, {amount: 1, name: "cup of milk"}];
    const ingredientsBurger = [{amount: 1, name: "pound extra-lean ground chicken"},
          {amount: 0.5, name: "cup Italian-seasoned bread crumbs, divided"},
          {amount: 0.5, name: "small onion, finely grated"},
          {amount: 1, name: "egg"},
          {amount: 2, name: "cloves garlic, minced"},
          {amount: 2, name: "teaspoons olive oil"},
          {amount: null, name: "salt and ground black pepper to taste"},
        ];

    const recipeImage = (recipe) => {
        if (recipe === "Chocolate Cookie") {
            return cookie;
        }
        return burger;
    }

    const userImage = (user) => {
        if (user === "Granny") {
            return granny;
        }
        return gordon;
    }

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

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center p-4">
                <Avatar src={userImage(cleanedUser)} alt="user avatar" />
                <h1 className="text-4xl font-bold pl-15">{cleanedUser}</h1>
            </div>
            <div className="flex flex-col items-center justify-center w-1/2 h-1/2">
                <div className="flex flex-col items-center justify-center p-3 w-full h-full">
                <Image src={recipeImage(cleanedRecipe)} alt="recipe" className="w-[400px] h-[300px] rounded-xl" />
                </div>
                <h1 className="text-4xl font-bold">{cleanedRecipe}</h1>
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
                <div className="flex flex-row items-center justify-start pt-3 pl-3 w-full h-full">
                    <div className="text-2xl">Description</div>
                </div>
                <div className="flex flex-row items-center justify-start pb-3 pl-3 w-full h-full">
                    {cleanedRecipe === "Chocolate Cookie" && <div className="text-xl">Who doesn’t love chocolate chip cookies?! When I got married I made chocolate chip cookies for my new husband after finding out chocolate chip cookies were his favorite cookie. I used the recipe on the back of the chocolate chip bag and his response was “they’re not my Mom’s chocolate chip cookie”. Of course, my feelings were hurt and I didn’t make him chocolate chip cookies for a while. I eventually asked his Mom for her recipe and have been making her chocolate chip cookies ever since. This is her recipe, which has become a family favorite. I hope you enjoy these cookies as much as we do.</div>}
                    {cleanedRecipe === "Chicken Burger" && <div className="text-xl">A chicken burger the whole family enjoys! Natasha is my eldest daughter, and her eyes light up when I announce we're having these for dinner. The onion can be finely chopped, but with three kids, we prefer grating it so as to hide it. I usually serve these with mashed potatoes and Caesar salad for a very comforting meal!</div>}
                </div>
                <div className="flex flex-row items-center justify-start pt-3 pl-3 w-full h-full">
                    <div>
                        <h1 className="text-4xl font-bold">Ingredients</h1>
                        <ul className="text-2xl">
                            {cleanedRecipe === "Chocolate Cookie" && ingredientsCookie.map((ingredient) => (
                                <li key={ingredient.name}>{fraction(serving * ingredient.amount).toFraction() == "0" ? "" : fraction(serving * ingredient.amount).toFraction()} {ingredient.name}</li>
                            ))}
                            {cleanedRecipe === "Chicken Burger" && ingredientsBurger.map((ingredient) => (
                                <li key={ingredient.name}>{fraction(serving * ingredient.amount).toFraction() == "0" ? "" : fraction(serving * ingredient.amount).toFraction()} {ingredient.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-start w-full h-full pl-3 pt-2">
                    <div className="text-2xl">serving size</div>
                    <Dropdown options={['1', '2', '3', '1/2', '1/3', '2/3', '3/4']} onChange={handleServingChange} />
                </div>
            </div>
        </div>
    );
}