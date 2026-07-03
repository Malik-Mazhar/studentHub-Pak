import { LucideIcon } from "lucide-react";

interface SubjectCardProps {
  title: string;
  totalNotes: string;
  icon: LucideIcon;
  bg: string;
}

export default function SubjectCard({
  title,
  totalNotes,
  icon: Icon,
  bg
}: SubjectCardProps) {
  return (
    <div className="group rounded-xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">

      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-50">
        <Icon size={24} className={`bg-${bg}`} />
      </div>

      <h3 className="mt-4 font-semibold text-gray-800">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {totalNotes} Notes
      </p>

    </div>
  );
}