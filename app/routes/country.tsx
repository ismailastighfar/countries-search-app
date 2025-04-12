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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {country.flagUrl && (
              <div className="lg:w-1/2 relative">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <img
                  src={country.flagUrl}
                  className="w-full h-full object-cover"
                  alt={`Flag of ${country.name}`}
                />
              </div>
            )}
            
            <div className="lg:w-1/2 p-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                {country.name}
              </h1>
              
              <div className="space-y-4">
                <InfoItem label="Official Name" value={country.officialName} />
                <InfoItem label="Capital" value={country.capital} />
                <InfoItem label="Region" value={country.region} />
                <InfoItem label="Subregion" value={country.subregion} />
                <InfoItem 
                  label="Population" 
                  value={country.population.toLocaleString()} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
      <div className="text-sm text-gray-500 uppercase tracking-wider">
        {label}
      </div>
      <div className="text-lg text-gray-800 font-medium group-hover:text-blue-600 transition-colors duration-200">
        {value}
      </div>
    </div>
  );
}