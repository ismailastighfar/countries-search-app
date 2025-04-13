import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Countries Search App" },
    { name: "Countries Search", content: "Welcome to Countries Search App!" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container px-4 py-20 mx-auto lg:py-32">
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:justify-between">
          <div className="w-full space-y-8 text-center lg:text-left lg:w-1/2">
            <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Discover the World
              </span>
              <span className="mt-2 block text-gray-800">
                One Country at a Time
              </span>
            </h1>
            <p className="text-xl text-gray-600 lg:text-2xl">
              Embark on a virtual journey exploring cultures, capitals, and facts
              about every nation on Earth.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Link
                to="/countries"
                className="group relative overflow-hidden rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-indigo-700"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Start Exploring
                  <svg
                    className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
              <Link
                to="/about"
                className="rounded-full border-2 border-gray-300 bg-transparent px-8 py-4 text-lg font-semibold text-gray-600 transition-all hover:border-indigo-600 hover:text-indigo-600"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 blur-lg"></div>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3"
                  alt="World Map"
                  className="w-full transform object-cover transition-transform hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
