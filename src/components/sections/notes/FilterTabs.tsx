"use client";

interface FilterTabsProps {
  selectedNotes: string | null;
  setSelectedNotes: React.Dispatch<React.SetStateAction<string | null>>;
}

const filters = [
  "All Notes",
  "Class 9",
  "Class 10",
  "1st Year",
  "2nd Year",
  "ICS",
  "Medical",
];

export default function FilterTabs({selectedNotes, setSelectedNotes}:FilterTabsProps) {
  return (
                <div className="flex gap-3 overflow-x-auto pb-5">

              {filters.map((item, index) => (

                <button
                  onClick={() => setSelectedNotes(item)}
                  key={index}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm transition cursor-pointer

                  ${
                    (selectedNotes === item) || (selectedNotes === null && index === 0) ?"bg-blue-600 text-white"  : ""
                  }
                  
                  `}
                >
                  {item}
                </button>

              ))}

            </div>
  );
}