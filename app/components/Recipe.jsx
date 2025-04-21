import Link from "next/link";
import Image from "next/image";

export default function Recipe({ name, ingredients, description, username, image, difficulty, country, cost }) {
  const sanitizedUsername = username.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
  const sanitizedRecipe = name.toLowerCase().replace(/[^a-z0-9-]+/g, '-');

  return (
    <div className="flex flex-col w-full border-b border-gray-200 pb-4 mb-4">
      <Link href={`/search/${sanitizedUsername}/${sanitizedRecipe}`}>
        <div className="w-full aspect-square">
          <Image
            src={image}
            alt="recipe"
            className="rounded-lg object-cover object-center cursor-pointer w-full h-full"
          />
        </div>
      </Link>
      <div className="w-full pt-3 px-2">
        <Link href={`/search/${sanitizedUsername}/${sanitizedRecipe}`}>
          <h1 className="text-lg font-bold cursor-pointer">{name}</h1>
        </Link>
        <Link href={`/${sanitizedUsername}`}>
          <p className="text-sm text-gray-600 pb-2">by {username}</p>
        </Link>
        <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
          <span>Cost: ${cost}</span>
          <span>•</span>
          <span>{difficulty}</span>
          <span>•</span>
          <span>{country}</span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}