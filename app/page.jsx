// app/page.jsx (or app/home/page.jsx)
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-black p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Mangia Mogo!</h1>
      
      <div className="max-w-md text-center space-y-6">
        <p className="text-lg">
          Your place to discover, share and connect over amazing recipes
        </p>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Get Started</h2>
          <div className="space-y-3 text-left">
            <p className="flex items-center">
              <span className="mr-2">🔍</span>
              Search for recipes!
            </p>
            <p className="flex items-center">
              <span className="mr-2">👩‍🍳</span>
              Follow your favorite chefs!
            </p>
            <p className="flex items-center">
              <span className="mr-2">💬</span>
              Connect with other food lovers!
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Good luck chef!
        </p>
      </div>
    </div>
  );
}