import TopNoteCard from "./TopNoteCard";

const notes = [
  {
    id: 1,
    title: "Physics Chapter 1 Complete Notes",
    subject: "Physics",
    author: "Ali Khan",
    downloads: "18.5K",
    views: "42K",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Mathematics Solved Exercise",
    subject: "Mathematics",
    author: "Ahmed",
    downloads: "15K",
    views: "37K",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Organic Chemistry Short Notes",
    subject: "Chemistry",
    author: "Fatima",
    downloads: "13K",
    views: "29K",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Computer Chapter Wise Notes",
    subject: "Computer",
    author: "Usman",
    downloads: "11K",
    views: "25K",
    rating: 4.9,
  },
];

export default function TopNotesSection() {
  return (
    <section className="mt-16">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Most Downloaded Notes
          </h2>

          <p className="text-gray-500 text-sm">
            Trending notes loved by students
          </p>
        </div>

        <button className="text-blue-600 hover:underline">
          View All
        </button>

      </div>

      <div className="space-y-4">

        {notes.map((note) => (
          <TopNoteCard
            key={note.id}
            {...note}
          />
        ))}

      </div>

    </section>
  );
}