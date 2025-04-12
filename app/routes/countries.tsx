import { Link } from "react-router";
import type { Route } from "./+types/countries";
import { useState } from "react";

export async function clientLoader() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  return data;
}

export default function Countries({ loaderData }: Route.ComponentProps) {
  const [search, setSearch] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  const filteredCountries = loaderData.filter((country: any) => {
    const matchesRegion =
      !region || country.region.toLowerCase() === region.toLowerCase();
    const matchesSearch =
      !search ||
      country.name.common.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <h2 className="text-4xl font-extrabold bg-clip-text bg-gradient-to-r text-indigo-600 mb-8">
        Explore Countries
      </h2>
      
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white shadow-sm border-0 focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <svg className="w-5 h-5 absolute right-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 rounded-lg bg-white shadow-sm border-0 focus:ring-2 focus:ring-indigo-500 transition-all"
        >
          <option value="">All Regions</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      {filteredCountries.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No countries match your filters.
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCountries.map((country: any) => (
            <li
              key={country.cca3}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                <img
                  src={country.flags.svg}
                  alt={`Flag of ${country.name.common}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <Link
                  to={`/countries/${country.name.common}`}
                  className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors"
                >
                  {country.name.common}
                </Link>
                <div className="mt-3 space-y-1 text-gray-600">
                  <div className="flex items-center">
                    <span className="font-medium">Region:</span>
                    <span className="ml-2">{country.region}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Population:</span>
                    <span className="ml-2">{country.population.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}