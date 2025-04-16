// app/page.jsx (or app/home/page.jsx)
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black p-4">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Mangia Mogo!</h1>
        
        <div className="w-full max-w-md space-y-6 flex flex-col items-center">
          <p className="text-lg text-center">
            Your place to discover, share and connect over amazing recipes
          </p>

          <div className="bg-[#E6F2FF] rounded-lg p-6 shadow-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">Get Started</h2>
            <div className="space-y-3">
              <p className="flex items-center justify-center">
                <span className="mr-2">🔍</span>
                Search for recipes!
              </p>
              <p className="flex items-center justify-center">
                <span className="mr-2">👩‍🍳</span>
                Follow your favorite chefs!
              </p>
              <p className="flex items-center justify-center">
                <span className="mr-2">💬</span>
                Connect with other food lovers!
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 text-center">
            Good luck chef!
          </p>
        </div>
      </div>
    </div>
  );
}