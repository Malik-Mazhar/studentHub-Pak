import SearchBar from "@/src/components/sections/notes/SearchBar";
import FilterTabs from "@/src/components/sections/notes/FilterTabs";
import HeroBanner from "@/src/components/sections/notes/HeroBanner";
import RecentNotes from "@/src/components/sections/notes/RecentNotes";
import SubjectsSection from "@/src/components/sections/notes/SubjectsSection";
import TopNotesSection from "@/src/components/sections/notes/TopNotesSection";
import Newsletter from "@/src/components/sections/notes/Newsletter";
import Footer from "@/src/components/sections/notes/Footer";

export default function NotesPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Top Notes For You
          </h1>

          <p className="text-gray-500 mt-1">
            High quality notes shared by students
          </p>
        </div>

        <SearchBar />

        <FilterTabs />

        <HeroBanner />
        <RecentNotes />
        <SubjectsSection />
        <TopNotesSection />
        <Newsletter />
        <Footer />

      </div>
    </main>
  );
}