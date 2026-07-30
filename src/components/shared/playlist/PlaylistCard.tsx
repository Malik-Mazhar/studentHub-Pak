import Image from "next/image";
import { Clock3, Play, PlayCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PlaylistCardProps {
  thumbnail: string;
  title: string;
  category: string;
  videoCount: number;
  duration: string;
  description: string;
  createdAt: Date;
  profileImage: string;
  fullname: string;
  onClick?: () => void;
}

export default function PlaylistCard({
  thumbnail,
  title,
  category,
  videoCount,
  duration,
  description,
  createdAt,
  profileImage,
  fullname,
  onClick,
}: PlaylistCardProps) {

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-xl transition-all duration-300">

      {/* Thumbnail */}
        <div onClick={onClick} className="relative h-44 overflow-hidden rounded-t-2xl cursor-pointer group">

            <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                    <Play
                        size={30}
                        className="text-gray-600 fill-gray-600 ml-1"
                    />
                </div>
            </div>

        </div>

        {/* Body */}
        <div className="px-6 py-2">

            <h2 className="py-1 text-md font-bold line-clamp-2">
                {title}
            </h2>
            

            <div className="flex items-center gap-6 text-gray-500 mt-2">

                <div className="flex items-center text-sm gap-2">
                    <PlayCircle size={14} />
                    {videoCount} Videos
                </div>

                <div className="flex items-center text-sm gap-2">
                    <Clock3 size={14} />
                    {duration}
                </div>

            </div>

            <p className="text-gray-600 mt-3 text-sm line-clamp-3">
                {description}
            </p>

            <div className="flex items-center gap-3 mt-2">
                <Image
                    src={profileImage || "/img/defaultProfile.jfif"}
                    alt={fullname}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                />

               <div className="flex flex-col">
                    <span className="font-semibold">
                        {fullname}
                    </span>

                    <span className="text-sm bg-blue-100 text-blue-500 px-3 py-1 rounded-2xl">
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