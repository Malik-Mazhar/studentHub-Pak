import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">

        <div>

          <h2 className="text-2xl font-bold text-blue-600">
            NotesHub
          </h2>

          <p className="mt-4 text-sm text-gray-500">
            Helping students learn with high-quality notes
            uploaded by the community.
          </p>

        </div>

        <div>

          <h3 className="font-semibold">
            Quick Links
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-gray-500">

            <li><Link href="/">Home</Link></li>
            <li><Link href="/notes">Notes</Link></li>
            <li><Link href="/community">Community</Link></li>
            <li><Link href="">Jobs</Link></li>

          </ul>

        </div>

        <div>

          <h3 className="font-semibold">
            Support
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-gray-500">

            <li>Contact Us</li>
            <li>Report a Problem</li>
            <li>Feedback</li>

          </ul>

        </div>

        <div>

          <h3 className="font-semibold">
            Follow Us
          </h3>

          <div className="mt-4 flex gap-3">

            <button className="rounded-lg border p-3 hover:bg-blue-50">
              <FaFacebookF size={18} />
            </button>

            <button className="rounded-lg border p-3 hover:bg-blue-50">
              <FaInstagram size={18} />
            </button>

            <button className="rounded-lg border p-3 hover:bg-blue-50">
              <FaGithub size={18} />
            </button>

            <button className="rounded-lg border p-3 hover:bg-blue-50">
              <FaXTwitter size={18} />
            </button>

          </div>

        </div>

      </div>

      <div className="border-t py-5 text-center text-sm text-gray-500">
        © 2026 NotesHub. All Rights Reserved.
      </div>

    </footer>
  );
}