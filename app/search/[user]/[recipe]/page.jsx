import Avatar from "../../../components/Avatar";
import gordon from "../../../assets/Gordon_Ramsay.png";   
import burger from "../../../assets/Burger.svg";
import Image from "next/image";

// app/search/[recipe]/page.jsx
export default async function RecipePage({ params }) {
    const { user, recipe } = await params;
    // Replace hyphens with spaces and capitalize the first letter of each word
    const cleanedRecipe = recipe.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    const cleanedUser = user.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center p-4"> {/* Change justify-between to justify-center */}
                <Avatar src={gordon} alt="user avatar"/>
                <h1 className="text-4xl font-bold pl-15">{cleanedUser}</h1>
            </div>
            <div className="flex flex-col items-center justify-center p-4 w-1/3 h-1/3">
                <Image src={burger} alt="recipe" className="w-full h-full" />
            </div>
            <h1 className="text-4xl font-bold">{cleanedRecipe}</h1>
        </div>
    );
}