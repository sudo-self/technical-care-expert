import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Metadata
export const metadata: Metadata = {
  title: "Technical Care Expert",
  description: "Internet, Fiber, Voice & IPTV Support",
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        {/* Global header */}
        <header className="w-full bg-gray-800 shadow-md p-4 flex items-center space-x-3">
          <img src="/support.png" alt="Agent" className="w-10 h-10 rounded-full" />
          <h1 className="text-xl font-bold">
            Technical Care Expert
          </h1>
          <span className="text-gray-400 text-sm ml-auto">
            Internet, Fiber, Voice & IPTV
          </span>
        </header>

        <main className="min-h-[80vh]">{children}</main>

        {/* Global footer */}
        <footer className="bg-gray-700 text-gray-300 text-center py-3 hover:text-yellow-500 transition cursor-pointer">
          <a href="https://technical-care-expert.vercel.app" target="_blank" rel="noopener noreferrer">
            Technical Care Expert
          </a>
        </footer>
      </body>
    </html>
  );
}

