import burger from "../assets/Burger.svg";
import Link from "next/link"; 
import Image from "next/image";

export default function Recipe({ name, ingredients, description, username }) {
    const sanitizedUsername = username.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    const sanitizedRecipe = name.toLowerCase().replace(/[^a-z0-9-]+/g, '-');


    return (
        <div className="flex flex-row justify-center p-5">
            <Link href={`/search/${sanitizedUsername}/${sanitizedRecipe}`}>
                <Image src={burger} alt="recipe" className="w-35 h-35 cursor-pointer" />
            </Link>
            <div className="justify-self-start pl-10 max-w-xl">
                <Link href={`/search/${sanitizedUsername}/${sanitizedRecipe}`}>
                    <h1 className="text-2xl font-bold cursor-pointer">{name}</h1>
                </Link>
                <Link href={`/search/${sanitizedUsername}`}>
                    <p className="text-sm">by {username}</p>
                </Link>
                <p>Ingredients: {ingredients}</p>
                <p className="text-lg">{description}</p>
                
            </div>
        </div>
    );
}