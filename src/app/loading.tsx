export default function LoadingSpinner() {
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