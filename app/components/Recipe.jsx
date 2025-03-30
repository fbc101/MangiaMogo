import burger from "../assets/Burger.svg";
import Image from "next/image";

export default function Recipe({name, ingredients, description}) {
    return (
        <div className="flex flex-row justify-center p-5">
            <Image src={burger} alt="recipe" className="w-35 h-35" />
            <div className="justify-self-start pl-10 max-w-xl">  
                <h1 className="text-2xl font-bold">{name}</h1>
                <p>Ingredients: {ingredients}</p>
                <p className="text-lg">{description}</p>
            </div>
        </div>
    );
}