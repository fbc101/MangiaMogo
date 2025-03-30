import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <h1 className="font-italianno text-7xl text-title text-center pt-5 pb-5 w-full">Mangia Mogo</h1>
      </Link>
    </header>
  );
}