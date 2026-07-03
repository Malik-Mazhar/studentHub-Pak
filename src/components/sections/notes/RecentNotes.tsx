import RecentNoteCard from "./RecentNoteCard";

const notes = [
  {
    image: "/img/math.jpg",
    subject: "Math",
    title: "Full Chapter Notes",
    author: "Ali Khan",
    downloads: "1.2k",
    views: "5k",
    rating: 4.8,
  },
  {
    image: "/img/phisics.jpg",
    subject: "Physics",
    title: "Numerical Notes",
    author: "Usman",
    downloads: "980",
    views: "4.2k",
    rating: 4.9,
  },
  {
    image: "/img/Biology.jfif",
    subject: "Chemistry",
    title: "Organic Chemistry",
    author: "Ahmed",
    downloads: "850",
    views: "3.5k",
    rating: 4.7,
  },
  {
    image: "/img/math.jpg",
    subject: "Biology",
    title: "Complete Chapter",
    author: "Fatima",
    downloads: "730",
    views: "2.9k",
    rating: 4.8,
  },
  
];

export default function RecentNotes() {
  return (
    <section className="mt-10">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold">
          Recently Added Notes
        </h2>

        <button className="text-blue-600 hover:underline">
          View All
        </button>

      </div>

      <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide">

        {notes.map((note) => (
          <RecentNoteCard
            key={note.title}
            {...note}
          />
        ))}

      </div>

    </section>
  );
}