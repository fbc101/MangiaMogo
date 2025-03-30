import Avatar from "../../components/Avatar";
import gordon from "../../assets/Gordon_Ramsay.png";   
import burger from "../../assets/Burger.svg";
import Image from "next/image";

// app/products/[id]/page.js
export default function RecipePage({ params }) {
    const { recipe } = params; 
  
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center p-4"> {/* Change justify-between to justify-center */}
                <Avatar src={gordon} alt="user avatar"/>
                <h1 className="text-4xl font-bold pl-15">Gordon Ramsay</h1>
            </div>
            <div className="flex flex-col items-center justify-center p-4 w-1/3 h-1/3">
                <Image src={burger} alt="recipe" className="w-full h-full" />
            </div>
            <h1 className="text-4xl font-bold">{recipe}</h1>
        </div>
    );
}