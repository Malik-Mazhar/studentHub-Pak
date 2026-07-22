import Image from "next/image";
import { Download, Eye, File, Star } from "lucide-react";
import { userPostType } from "@/src/types/dataTaype";
import { handleLikesAndComments } from "@/src/services/ApiServices/handleLikesAndComments";
import { useAppDispatch } from "@/src/store/useSelecterhook";

type RecentNoteCardProps = userPostType;

export default function RecentNoteCard({
    title,
    content,
    postType,
    postImageUrl,
    notesCategory,
    author,
    _id,
    isLiked
}: RecentNoteCardProps) {
  const dispatch = useAppDispatch()

  return (
    <div className="min-w-60 bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-lg duration-300">

      <div className="relative h-36 w-full">
        {/* {postImageUrl?.[0]? */}
        <Image
          src={postImageUrl?.[0] || "/img/FileImg.png"}
          alt={title}
          fill
          className="object-cover"
        /> 
        {/* //   <File />} */}

        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
          {notesCategory}
        </span>

      </div>

      <div className="p-4">

        <h3 className="font-semibold line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          {author.userProfile?.profileName}
        </p>

        <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">

          <div className="flex items-center gap-1">
            <Download size={15} />
            76
          </div>

          <div className="flex items-center gap-1">
            <Eye size={15} />
            100
          </div>

          <button onClick={() => handleLikesAndComments(_id, dispatch)} className={`flex items-center gap-1 cursor-pointer ${isLiked && "text-yellow-500"}`}>
            <Star size={15} fill="currentColor" />
            ii
          </button>

        </div>

      </div>

    </div>
  );
}