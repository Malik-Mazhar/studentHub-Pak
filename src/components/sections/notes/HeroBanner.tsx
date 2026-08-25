import Image from "next/image";
import Link from "next/link";

interface HerroBannerProps {
  img: string,
  someClasses: string
};

export default function HeroBanner({ img, someClasses }: HerroBannerProps) {
  return (
    <section className="rounded-2xl overflow-hidden bg-linear-to-r from-green-100 to-blue-100 dark:from-slate-800 dark:to-slate-900 mt-2">
      <div className="w-full relative">
        <img src={img} alt="" className="w-full h-auto object-cover" />

        <Link
          href="/notes/viewAllnotes"
          className={`absolute bottom-4 sm:bottom-8 md:bottom-18 ${someClasses} bg-transparent px-4 sm:px-5 py-2.5 sm:py-3 w-36 sm:w-46 h-11 sm:h-13 rounded-xl cursor-pointer`}
        ></Link>
      </div>
    </section>
  );
}