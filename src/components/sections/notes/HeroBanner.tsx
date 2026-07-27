import Image from "next/image";
import Link from "next/link";

interface HerroBannerProps {
  img: string,
  someClasses: string
};

export default function HeroBanner({ img, someClasses }: HerroBannerProps) {
  return (
    <section className="rounded-2xl overflow-hidden bg-linear-to-r from-green-100 to-blue-100 mt-2">

      <div className="w-full relative">

        <img src={img} alt="" />
        <Link href="/notes/viewAllnotes" className={`absolute bottom-18 ${someClasses} bg-transparent px-5 py-3 w-46 h-13 rounded-xl b cursor-pointer`}></Link>
      </div>

    </section>
  );
}