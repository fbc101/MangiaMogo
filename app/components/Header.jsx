import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-nav">
      <Link href="/">
        <h1 className="font-italianno text-6xl text-title text-center py-3">Mangia Mogo</h1>
      </Link>
    </header>
  );
}