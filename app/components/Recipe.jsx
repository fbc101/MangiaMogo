import Link from "next/link";
import Image from "next/image";

export default function Recipe({ name, ingredients, description, username, image, difficulty, country, cost }) {
  const sanitizedUsername = username.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
  const sanitizedRecipe = name.toLowerCase().replace(/[^a-z0-9-]+/g, '-');

  return (
    <div className="flex flex-row justify-center p-5">
      <Link href={`/search/${sanitizedUsername}/${sanitizedRecipe}`}>
        <div className="w-[175px] h-[175px]">
          <Image
            src={image}
            alt="recipe"
            className="rounded-xl object-cover object-center cursor-pointer w-full h-full" // Add object-center
          />
        </div>
      </Link>
      <div className="justify-self-start pl-5 max-w-xl w-full">
        <Link href={`/search/${sanitizedUsername}/${sanitizedRecipe}`}>
          <h1 className="text-2xl font-bold cursor-pointer">{name}</h1>
        </Link>
        <Link href={`/${sanitizedUsername}`}>
          <p className="text-sm pb-4">by {username}</p>
        </Link>
        <p>Ingredients: {ingredients}</p>
        <p>Cost: ${cost}</p>
        <p>Difficulty: {difficulty}</p>
        <p>Country: {country}</p>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
}