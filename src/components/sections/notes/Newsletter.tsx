import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="mt-20 overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600">

      <div className="grid items-center gap-10 px-8 py-12 lg:grid-cols-2">

        <div>

          <span className="rounded-full bg-white/20 px-3 py-1 text-sm text-white">
            📚 Free Study Resources
          </span>

          <h2 className="mt-5 text-4xl font-bold text-white">
            Never Miss New Notes
          </h2>

          <p className="mt-4 text-blue-100">
            Subscribe and get notified whenever new notes,
            guess papers and study resources are uploaded.
          </p>

        </div>

        <div>

          <div className="flex rounded-2xl bg-white p-2">

            <div className="flex flex-1 items-center gap-3 px-3">

              <Mail
                className="text-gray-400"
                size={18}
              />

              <input
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none"
              />

            </div>

            <button className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
              Subscribe
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}