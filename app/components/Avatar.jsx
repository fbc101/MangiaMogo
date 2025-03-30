import Image from "next/image";

export default function Avatar({ src, alt }) {
    return (
        <div className="flex flex-row items-center justify-center">
            <Image src={src} alt={alt} className="rounded-full w-20 h-20 "/>
        </div>
    );
}