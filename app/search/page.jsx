import SearchBar from "../components/SearchBar";

export default function SearchPage() {
    return (
      <div className="flex flex-col items-center justify-center flex-grow text-black font-bold">
        <h1>Search page</h1>
        <SearchBar/>
      </div>
    );
  }