import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
<footer className=" mt-20 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172A]">

  <div className=" mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 sm:grid-cols-2 md:px-6 lg:grid-cols-4 lg:gap-12 lg:py-14">

    {/* Brand */}
    <div>
      <h2 className="text-2xl font-bold text-blue-600">
        NotesHub
      </h2>

      <p className=" mt-4 max-w-sm text-sm leading-6 text-gray-500 dark:text-gr ">
        Helping students learn with high-quality notes
        uploaded by the community.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="font-semibold text-gray-900 dark:text-[#FBFCFE]">
        Quick Links
      </h3>

      <ul className="mt-4 space-y-2 text-sm  text-gray-500 dark:text-gray-400">

        <li>
          <Link
            href="/"
            className="transition hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/notes"
            className="transition hover:text-blue-600 dark:hover:text-blue-400"
          >
            Notes
          </Link>
        </li>

        <li>
          <Link
            href="/community"
            className="transition hover:text-blue-600 dark:hover:text-blue-400"
          >
            Community
          </Link>
        </li>

        <li>
          <Link
            href="/jobs"
            className="transition hover:text-blue-600 dark:hover:text-blue-400"
          >
            Jobs
          </Link>
        </li>
      </ul>
    </div>

    {/* Support */}
    <div>
      <h3 className="font-semibold text-gray-900 dark:text-[#FBFCFE]">
        Support
      </h3>

      <ul
        className="
          mt-4
          space-y-2
          text-sm
          text-gray-500 dark:text-gray-400
        "
      >
        <li className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
          Contact Us
        </li>

        <li className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
          Report a Problem
        </li>

        <li className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
          Feedback
        </li>
      </ul>
    </div>

    {/* Social */}
    <div>
      <h3 className="font-semibold text-gray-900 dark:text-[#FBFCFE]">
        Follow Us
      </h3>

      <div className="mt-4 flex flex-wrap gap-3">

        <button
          aria-label="Facebook"
          className="
            rounded-lg
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-[#1E293B]
            p-3
            text-gray-700 dark:text-gray-300
            transition
            hover:bg-blue-50 hover:text-blue-600
            dark:hover:bg-[#334155] dark:hover:text-blue-400
          "
        >
          <FaFacebookF size={18} />
        </button>

        <button
          aria-label="Instagram"
          className="
            rounded-lg
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-[#1E293B]
            p-3
            text-gray-700 dark:text-gray-300
            transition
            hover:bg-blue-50 hover:text-blue-600
            dark:hover:bg-[#334155] dark:hover:text-blue-400
          "
        >
          <FaInstagram size={18} />
        </button>

        <button
          aria-label="GitHub"
          className="
            rounded-lg
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-[#1E293B]
            p-3
            text-gray-700 dark:text-gray-300
            transition
            hover:bg-blue-50 hover:text-blue-600
            dark:hover:bg-[#334155] dark:hover:text-blue-400
          "
        >
          <FaGithub size={18} />
        </button>

        <button
          aria-label="X"
          className="
            rounded-lg
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-[#1E293B]
            p-3
            text-gray-700 dark:text-gray-300
            transition
            hover:bg-blue-50 hover:text-blue-600
            dark:hover:bg-[#334155] dark:hover:text-blue-400
          "
        >
          <FaXTwitter size={18} />
        </button>

      </div>
    </div>

  </div>

  {/* Copyright */}
  <div className=" border-t border-gray-200 dark:border-gray-800 px-5 py-5 text-center text-sm text-gray-500 dark:text-gray-400">
    
    © 2026 NotesHub. All Rights Reserved.
  </div>
</footer>
  );
}