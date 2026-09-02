import Image from "next/image";
import Link from "next/link";

interface HerroBannerProps {
  img: string,
  someClasses: string,
  href: string;
};

export default function HeroBanner({ img, someClasses, href }: HerroBannerProps) {
  return (
    <section className="rounded-2xl overflow-hidden bg-linear-to-r from-green-100 to-blue-100 dark:from-slate-800 dark:to-slate-900 mt-2">
      <div className="w-full relative">
        <img src={img} alt="" className="w-full h-auto object-cover" />

        <Link
          href={href}
          className={`absolute ${someClasses} bg-transparent md:px-5 rounded-xl cursor-pointer`}
        ></Link>
      </div>
    </section>
  );
}