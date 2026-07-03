import Image from "next/image";
import { Download, Eye, Star } from "lucide-react";

interface RecentNoteCardProps {
  image: string;
  subject: string;
  title: string;
  author: string;
  downloads: string;
  views: string;
  rating: number;
}

export default function RecentNoteCard({
  image,
  subject,
  title,
  author,
  downloads,
  views,
  rating,
}: RecentNoteCardProps) {
  return (
    <div className="min-w-60 bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-lg duration-300">

      <div className="relative h-36 w-full">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />

        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
          {subject}
        </span>

      </div>

      <div className="p-4">

        <h3 className="font-semibold line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          {author}
        </p>

        <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">

          <div className="flex items-center gap-1">
            <Download size={15} />
            {downloads}
          </div>

          <div className="flex items-center gap-1">
            <Eye size={15} />
            {views}
          </div>

          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={15} fill="currentColor" />
            {rating}
          </div>

        </div>

      </div>

    </div>
  );
}