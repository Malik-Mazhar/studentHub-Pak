import Image from "next/image";
import { Clock3, Play, PlayCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PlaylistCardProps {
  thumbnail: string;
  title: string;
  videoCount: number;
  duration: string;
  description: string;
  createdAt: string;
  profileImage: string;
  fullname: string;
  onClick?: () => void;
}

export default function PlaylistCard({
  thumbnail,
  title,
  videoCount,
  duration,
  description,
  createdAt,
  profileImage,
  fullname,
  onClick,
}: PlaylistCardProps) {

  return (
    <div className="group w-full min-w-0 bg-[#FBFCFE] dark:bg-[#0F172A] text-gray-900 dark:text-[#FBFCFE] rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">

    {/* Thumbnail */}
    <div
        onClick={onClick}
        className="relative h-32 sm:h-40 md:h-44 overflow-hidden rounded-t-2xl cursor-pointer group"
    >

        <Image
        src={thumbnail}
        alt={title}
        fill
        sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
            <Play
            size={20}
            className="sm:w-6 sm:h-6 md:w-7.5 md:h-7.5 text-gray-600 fill-gray-600 ml-1"
            />
        </div>
        </div>

    </div>

    {/* Body */}
    <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">

        {/* Title */}
        <h2 className="py-1 text-sm sm:text-base font-bold text-gray-900 dark:text-[#FBFCFE] line-clamp-2">
            {title}
        </h2>

        {/* Video + Duration */}
        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1 text-gray-500 dark:text-gray-400 mt-2">

        <div className="flex items-center text-xs sm:text-sm gap-1.5 sm:gap-2">
            <PlayCircle size={13} className="sm:w-3.5 sm:h-3.5" />
            <span>{videoCount} Videos</span>
        </div>

        <div className="flex items-center text-xs sm:text-sm gap-1.5 sm:gap-2">
            <Clock3 size={13} className="sm:w-3.5 sm:h-3.5" />
            <span>{duration}</span>
        </div>

        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mt-2 sm:mt-3 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
        {description}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 sm:gap-3 mt-3">

        <Image
            src={profileImage || "/img/defaultProfile.jfif"}
            alt={fullname}
            width={36}
            height={36}
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover shrink-0"
        />

        <div className="flex flex-col min-w-0">

            <span className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-[#FBFCFE] truncate">
            {fullname}
            </span>

            <span className="w-fit text-[10px] sm:text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-500 dark:text-blue-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-2xl">
            {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
            })}
            </span>

        </div>

        </div>

    </div>

    </div>
  );
}