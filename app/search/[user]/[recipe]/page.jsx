import Avatar from "../../../components/Avatar";
import gordon from "../../../assets/Gordon_Ramsay.png";
import granny from "../../../assets/grandma.jpg";
import burger from "../../../assets/Burger.svg";
import cookie from "../../../assets/Choco_cookie.jpg";
import Image from "next/image";

// app/search/[recipe]/page.jsx
export default async function RecipePage({ params }) {
    const { user, recipe } = await params;
    // Replace hyphens with spaces and capitalize the first letter of each word
    const cleanedRecipe = recipe.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    const cleanedUser = user.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    
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

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center p-4"> {/* Change justify-between to justify-center */}
                <Avatar src={userImage(cleanedUser)} alt="user avatar"/>
                <h1 className="text-4xl font-bold pl-15">{cleanedUser}</h1>
            </div>
            <div className="flex flex-col items-center justify-center p-4 w-1/3 h-1/3">
                <Image src={recipeImage(cleanedRecipe)} alt="recipe" className="w-full h-full rounded-xl" />
            </div>
            <h1 className="text-4xl font-bold">{cleanedRecipe}</h1>
        </div>
    );
}