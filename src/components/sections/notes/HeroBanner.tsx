import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="rounded-2xl overflow-hidden bg-linear-to-r from-green-100 to-blue-100 mt-2">

      <div className="w-full relative">

        <img src="/img/NotesPageBanner.png" alt="" />
        <Link href="/notes/viewAllnotes" className=' absolute bottom-18 left-14 bg-transparent px-5 py-3 w-46 h-13 rounded-xl b cursor-pointer'></Link>
      </div>

    </section>
  );
}