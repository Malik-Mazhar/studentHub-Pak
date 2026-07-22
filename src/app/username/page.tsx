// import SearchBar from "@/src/components/sections/notes/SearchBar";
// import FilterTabs from "@/src/components/sections/notes/FilterTabs";
// import HeroBanner from "@/src/components/sections/notes/HeroBanner";
// import RecentNotes from "@/src/components/sections/notes/RecentNotes";
// import SubjectsSection from "@/src/components/sections/notes/SubjectsSection";
// import TopNotesSection from "@/src/components/sections/notes/TopNotesSection";
// import Newsletter from "@/src/components/sections/notes/Newsletter";
// import Footer from "@/src/components/sections/notes/Footer";
// import { FaDownload, FaRegBookmark, FaStar } from "react-icons/fa6";
// import NotesCard from "@/src/components/sections/notes/SubjectsNotes/NotesCard";

// export default function NotesPage() {
//   return (
//     // <main className="bg-slate-50 min-h-screen">
//     //   <div className="max-w-7xl mx-auto px-6 py-8">

//     //     <div className="mb-8">
//     //       <h1 className="text-3xl font-bold">
//     //         Top Notes For You
//     //       </h1>

//     //       <p className="text-gray-500 mt-1">
//     //         High quality notes shared by students
//     //       </p>
//     //     </div>

//     //     <SearchBar />

//     //     <FilterTabs />

//     //     <HeroBanner />
//     //     <RecentNotes />
//     //     <SubjectsSection />
//     //     <TopNotesSection />
//     //     <Newsletter />
//     //     <Footer />

//     //   </div>
//     // </main>    <div className="bg-white rounded-2xl border hover:shadow-lg transition overflow-hidden">
//         <div className="bg-slate-50 min-h-screen">
//           <h1>Mazhar</h1>
//               <NotesCard
//                   title="Integration Complete Notes"
//                   thumbnail="/img/math.jpg"
//                   author="Fatima Noor"
//                   subject="Mathematics"
//                   className="FSc Part 2"
//                   downloads={2300}
//                   rating={4.8}
//                   fileType="PDF"
//                   isNew
//               />
//         </div>
//   );
// }


import NotesCard from "@/src/components/sections/notes/SubjectsNotes/NotesCard";
import { AppSidebar } from "@/src/components/shared/app-user-sidebar";

export default function NotesPage() {
  return (
    <main className="bg-slate-50 min-h-screen">

      {/* Hero/Search */}
      <section className="mb-10">

        <h1 className="text-4xl font-bold">
          Find Study Notes
        </h1>

        <input
          type="text"
          placeholder="Search Notes..."
          className="mt-5 w-full rounded-xl border p-3"
        />

      </section>

      {/* Latest Notes */}
      <section>

        <h2 className="mb-6 text-3xl font-semibold">
          Latest Notes
        </h2>

        <div className="space-y-5">

          <NotesCard 
              title="Integration Complete Notes"
              thumbnail="/img/math.jpg"
              authorName="Fatima Noor"
              authorImg="/img/defaultProfile.jfif"
              subject="Mathematics"
              className="FSc Part 2"
          />
          <NotesCard 
              title="Integration Complete Notes"
              thumbnail="/img/math.jpg"
              authorName="Fatima Noor"
              authorImg="/img/defaultProfile.jfif"
              subject="Mathematics"
              className="FSc Part 2"
          />

            <NotesCard 
              title="Integration Complete Notes"
              thumbnail="/img/math.jpg"
              authorName="Fatima Noor"
              authorImg="Fatima Noor"
              subject="Mathematics"
              className="FSc Part 2"
          />

        </div>

      </section>

    </main>
  );
}