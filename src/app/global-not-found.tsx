import "@/app/style/globals.css";
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="px-6 text-center">
          <h1 className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-9xl font-bold text-transparent">
            404
          </h1>
          <h2 className="mt-4 text-4xl font-bold text-white">Page Not Found</h2>
          <p className="mt-4 mb-8 text-lg text-gray-300">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
          >
            Go Back Home
          </Link>
        </div>
      </body>
    </html>
  );
}
