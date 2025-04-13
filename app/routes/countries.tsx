import { Link } from "react-router";
import type { Route } from "./+types/countries";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export async function clientLoader() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  return data;
}

export default function Countries({ loaderData }: Route.ComponentProps) {
  const [search, setSearch] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const filteredCountries = loaderData.filter((country: any) => {
    const matchesRegion =
      !region || country.region.toLowerCase() === region.toLowerCase();
    const matchesSearch =
      !search ||
      country.name.common.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black text-indigo-600 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-16 text-center"
        >
          🌍 Discover Our World
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-6 mb-12"
        >
          <div className="relative w-full sm:w-1/2 group">
            <input
              type="text"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-gray-300 border border-white/20 focus:border-purple-500 focus:ring-purple-500 transition-all shadow-lg"
            />
            <svg className="w-6 h-6 absolute right-4 top-4 text-gray-300 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full sm:w-1/2 px-6 py-4 rounded-full bg-white/10 backdrop-blur-md text-balck border border-white/20 focus:border-purple-500 focus:ring-purple-500 transition-all shadow-lg"
          >
            <option value="">All Regions</option>
            <option value="africa">Africa</option>
            <option value="americas">Americas</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </motion.div>

        <AnimatePresence>
          {filteredCountries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 text-white/80"
            >
              <span className="text-6xl">🔍</span>
              <p className="mt-4 text-xl">No countries match your search criteria.</p>
            </motion.div>
          ) : (
            <motion.ul 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredCountries.map((country: any, index: number) => (
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  key={country.cca3}
                  className="group bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20"
                >
                  <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                    <img
                      src={country.flags.svg}
                      alt={`Flag of ${country.name.common}`}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <Link
                      to={`/countries/${country.name.common}`}
                      className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors"
                    >
                      {country.name.common}
                    </Link>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center space-x-2 text-white/80">
                        <span>🌎</span>
                        <span className="font-medium">Region:</span>
                        <span>{country.region}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/80">
                        <span>👥</span>
                        <span className="font-medium">Population:</span>
                        <span>{country.population.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}