import { Code2, BookOpen, Users, Clock3, ArrowRight, } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="mb-8">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-lg">

        {/* Background Blur */}
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">

          {/* Left Side */}
          <div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
              <Code2 size={18} />
              Programming Category
            </div>

            <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
              Master Programming
              <br />
              From Beginner to Pro 🚀
            </h1>

            <p className="mt-5 max-w-xl text-blue-100 leading-8">
              Explore hundreds of high-quality programming courses including
              JavaScript, React, Next.js, Node.js, Python, Java, C++, Data
              Structures, Algorithms and much more.
            </p>

            {/* Stats */}

            <div className="mt-8 flex flex-wrap gap-4">

              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                <BookOpen className="text-yellow-300" />
                <div>
                  <h3 className="font-semibold">120+</h3>
                  <p className="text-sm text-blue-100">
                    Courses
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                <Users className="text-green-300" />
                <div>
                  <h3 className="font-semibold">18K+</h3>
                  <p className="text-sm text-blue-100">
                    Students
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                <Clock3 className="text-pink-300" />
                <div>
                  <h3 className="font-semibold">350+</h3>
                  <p className="text-sm text-blue-100">
                    Hours
                  </p>
                </div>
              </div>

            </div>

            {/* Buttons */}

            <div className="mt-8 flex flex-wrap gap-4">

              <button className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:scale-105">
                Explore Courses
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 transition hover:bg-white/10">
                View Roadmap
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

          {/* Right Side */}

          <div className="hidden lg:flex justify-center">

            <div className="relative">

              <div className="absolute -top-6 -left-6 h-24 w-24 rounded-2xl bg-yellow-400/30 blur-xl"></div>

              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-2xl bg-pink-500/30 blur-xl"></div>

              <div className="rounded-3xl bg-white p-8 shadow-2xl">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/6062/6062646.png"
                  alt="Programming"
                  className="h-72 w-72 object-contain"
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}