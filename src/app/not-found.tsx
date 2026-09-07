import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-[#0B1120]">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
          404
        </h1>

        <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
          Page not found
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          The page you're looking for doesn't exist or may have been removed.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-[#017D63] text-white text-sm font-semibold hover:bg-[#0aa382] transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}