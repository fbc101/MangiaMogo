import { Hanuman, Italianno } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { MessageProvider } from './components/MessageProvider';
import { StrictMode } from 'react';

const italianno = Italianno({
  variable: '--font-italianno',
  subsets: ['latin'],
  weight: ['400'],
});

const hanuman = Hanuman({
  variable: "--font-hanuman",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Mangia Mogo",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <StrictMode>
      <html lang="en">
        <head>
          {/* Set viewport to device width for responsiveness */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={`${hanuman.variable} ${italianno.variable} antialiased`}>
          <div className="flex flex-col items-center min-h-screen bg-gray-100 overscroll-contain">
            {/* Container to mimic iPhone 11 screen size */}
            <div className="w-full max-w-[414px] h-screen bg-off-white shadow-lg relative flex flex-col">
              <div className="sticky top-0 z-20 bg-off-white shadow-sm">
                <Header />
              </div>
              <MessageProvider>
                <main className="flex-1 overflow-y-auto scrollbar-hide pb-20">
                  {children}
                </main>
              </MessageProvider>
              <NavBar />
            </div>
          </div>
        </body>
      </html>
    </StrictMode>
  );
}
