import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="mt-12 sm:mt-20 overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600">

      <div className="grid items-center gap-6 sm:gap-10 px-4 sm:px-8 py-8 sm:py-12 lg:grid-cols-2">

        <div>

          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs sm:text-sm text-white">
            📚 Free Study Resources
          </span>

          <h2 className="mt-4 sm:mt-5 text-2xl sm:text-4xl font-bold text-white">
            Never Miss New Notes
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-100 leading-6">
            Subscribe and get notified whenever new notes,
            guess papers and study resources are uploaded.
          </p>

        </div>

        <div>

          <div className="flex flex-col sm:flex-row gap-2 rounded-2xl bg-white p-2">

            <div className="flex flex-1 items-center gap-3 px-3">

              <Mail
                className="text-gray-400 shrink-0"
                size={18}
              />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full min-w-0 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm sm:text-base"
              />

            </div>

            <button className="w-full sm:w-auto rounded-xl bg-blue-600 px-5 sm:px-6 py-2.5 sm:py-3 font-medium text-white hover:bg-blue-700 transition cursor-pointer">
              Subscribe
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}