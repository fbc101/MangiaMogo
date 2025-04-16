import Image from 'next/image';
import { getRecipeImage, turnRecipeToUrl, turnUsernameToUrl } from '../utils/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ChatMessage({ message }) {
    const { type, content, recipe, username } = message;
    const router = useRouter();

    return (
      <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div 
          className={`p-3 rounded-lg max-w-[80%] ${
            type === 'user' 
              ? 'bg-nav text-black' 
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {recipe && <div className="flex flex-col items-center cursor-pointer" onClick={(e) => {
            e.stopPropagation();
            router.push(`/search/${turnUsernameToUrl(username)}/${turnRecipeToUrl(recipe)}`);
          }}>
            <Image src={getRecipeImage(recipe)} alt="recipe" className="w-50 h-50 rounded-lg" />
            <Link href={`/search/${turnUsernameToUrl(username)}/${turnRecipeToUrl(recipe)}`} className="text-xl font-bold mb-2 mt-2">{recipe}</Link>
          </div>}
          {content}
        </div>
      </div>
    );
}