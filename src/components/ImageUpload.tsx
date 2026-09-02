import { useRef } from "react";
import { Camera } from "lucide-react";
import { ImageUploadProps, UploadType } from "../types/dataTaype";

function ImageUpload<T extends UploadType>({ onFileSelect, type, content }: ImageUploadProps<T> ) {
  const fileRef = useRef<HTMLInputElement | null>(null);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  onFileSelect(file, type);
};

  return (
    <div className="relative">

      {/* Hidden input */}
      <input
        type="file"
        ref={fileRef}
        className="hidden"
        onChange={handleChange}
      />

      {/* Custom button */}
      {content ? (
        <h3
          className="cursor-pointer text-sm sm:text-base text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          {content}
        </h3>
      ) : (
        <button
          onClick={() => fileRef.current?.click()}
          type="button"
          className="absolute bottom-0 right-0 sm:right-1 p-1.5 sm:p-2 rounded-full cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
        >
          <Camera size={17} className="sm:w-4.75 sm:h-4.75" />
        </button>
      )}

    </div>
  )
}

export default ImageUpload