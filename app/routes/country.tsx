import type { Route } from "./+types/country";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const countryName = params.countryName;
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );
  const data = await res.json();
  return data;
}

export default function Country({ loaderData }: Route.ComponentProps) {
  const country = {
    name: loaderData[0]?.name?.common || "N/A",
    officialName: loaderData[0]?.name?.official || "N/A",
    region: loaderData[0]?.region || "N/A",
    subregion: loaderData[0]?.subregion || "N/A",
    capital: loaderData[0]?.capital || "N/A",
    population: loaderData[0]?.population || "N/A",
    flagUrl: loaderData[0]?.flags?.png || "",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-lg bg-white/80 rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row items-stretch">
            {country.flagUrl && (
              <div className="lg:w-1/2 p-8 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-[3/2] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={country.flagUrl}
                    className="w-full h-full object-contain"
                    alt={`Flag of ${country.name}`}
                    style={{ backgroundColor: '#f8f9fa' }}
                  />
                </div>
              </div>
            )}
            
            <div className="lg:w-1/2 p-8 md:p-12 bg-gradient-to-br from-white to-gray-50">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-8">
                {country.name}
              </h1>
              
              <div className="space-y-6">
                <InfoItem label="Official Name" value={country.officialName} icon="🏛️" />
                <InfoItem label="Capital" value={country.capital} icon="🏰" />
                <InfoItem label="Region" value={country.region} icon="🌍" />
                <InfoItem label="Subregion" value={country.subregion} icon="📍" />
                <InfoItem 
                  label="Population" 
                  value={country.population.toLocaleString()} 
                  icon="👥"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="group hover:bg-white/80 p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-transparent hover:border-gray-100">
      <div className="flex items-center space-x-3">
        <span className="text-xl">{icon}</span>
        <div>
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {label}
          </div>
          <div className="text-lg text-gray-800 font-semibold group-hover:text-indigo-600 transition-colors duration-200">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}