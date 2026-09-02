import Image from "next/image";
import { Download, Eye, File, Star } from "lucide-react";
import { userPostType } from "@/src/types/dataTaype";
import { handleLikesAndComments } from "@/src/services/ApiServices/handleLikesAndComments";
import { useAppDispatch } from "@/src/store/useSelecterhook";
import { useState } from "react";

type RecentNoteCardProps = userPostType & {
  image?: string;
  subject?: string;
};

export default function RecentNoteCard({
    title,
    content,
    postType,
    postImageUrl,
    notesCategory,
    author,
    postDocumentUrl,
    _id,
    isLiked,
    image,
    subject,

}: RecentNoteCardProps) {
  const dispatch = useAppDispatch();
  const [showPdf, setShowPdf] = useState(false);

  return (
   <div className="w-full sm:w-56 bg-white dark:bg-[#101827] rounded-2xl overflow-hidden shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 hover:shadow-lg duration-300">
    
      <div className="relative h-32 sm:h-36 w-full">

        <Image
          src={postImageUrl?.[0] || image || "/img/FileImg.png"}
          alt={title}
          fill
          className="object-cover"
        />

        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
          {notesCategory}
        </span>

      </div>

      <div className="p-3 sm:p-4">

        <h3 className="font-semibold line-clamp-2 text-sm sm:text-base text-gray-900 dark:text-white">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 truncate">
          {author.userProfile?.profileName}
        </p>

        <div className="flex items-center justify-between mt-3 sm:mt-4 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">

          <a   href={`/api/user/get/pdf/${_id}?download=true`} className="flex items-center gap-1">
            <Download size={14} />
            
          </a>

          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setShowPdf(true)} >
            <Eye size={14} />
               View PDF
          </div>

          <button
            onClick={() =>
              handleLikesAndComments({
                dispatch,
                postId: _id
              })
            }
            className={`flex items-center gap-1 cursor-pointer ${
              isLiked
                ? "text-yellow-500"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <Star size={14} fill="currentColor" />
            ii
          </button>

          {showPdf && (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl w-full max-w-5xl h-[90vh] relative overflow-hidden">

                {/* Close */}
                <button
                  onClick={() => setShowPdf(false)}
                  className="absolute right-3 top-3 z-10 bg-black text-white px-3 py-1 rounded"
                >
                  ✕
                </button>

                {/* PDF */}
                <iframe
                  src={`/api/user/get/pdf/${_id}`}
                  className="w-full h-full"
                  title="PDF Preview"
                />
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}