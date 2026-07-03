"use client";

const filters = [
  "All Notes",
  "Class 9",
  "Class 10",
  "1st Year",
  "2nd Year",
  "ICS",
  "Medical",
];

export default function FilterTabs() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-5">

      {filters.map((item, index) => (

        <button
          key={index}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm transition

          ${
            index === 0
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-blue-50"
          }
          
          `}
        >
          {item}
        </button>

      ))}

    </div>
  );
}