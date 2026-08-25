import { Loader2 } from "lucide-react";

export default function MinLoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-blue-100"></div>

          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>

        <h2 className="text-lg font-semibold text-gray-800">
          StudentHub Pakistan
        </h2>

        <p className="text-sm text-gray-500">
          Loading your content...
        </p>
      </div>
    </div>
  );
}


export function LoadingSpinner() {
    return (

      <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 bg-gray-50 dark:bg-[#0b1120]">

        <div className="flex items-center justify-center py-20">

          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">

            <Loader2
              className="w-6 h-6 animate-spin"
            />

            Loading your posts...

          </div>

        </div>

      </main>

    );
}
