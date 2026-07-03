import {
  Download,
  Eye,
  Star,
  User,
  ArrowRight,
} from "lucide-react";

interface Props {
  title: string;
  subject: string;
  author: string;
  downloads: string;
  views: string;
  rating: number;
}

export default function TopNoteCard({
  title,
  subject,
  author,
  downloads,
  views,
  rating,
}: Props) {
  return (
    <div className="group rounded-2xl border bg-white p-5 hover:shadow-xl transition">

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

        <div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            {subject}
          </span>

          <h3 className="mt-3 text-lg font-semibold group-hover:text-blue-600">
            {title}
          </h3>

          <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-500">

            <div className="flex items-center gap-1">
              <User size={16} />
              {author}
            </div>

            <div className="flex items-center gap-1">
              <Download size={16} />
              {downloads}
            </div>

            <div className="flex items-center gap-1">
              <Eye size={16} />
              {views}
            </div>

            <div className="flex items-center gap-1 text-yellow-500">
              <Star
                fill="currentColor"
                size={16}
              />
              {rating}
            </div>

          </div>

        </div>

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">

          View Notes

          <ArrowRight size={18} />

        </button>

      </div>

    </div>
  );
}