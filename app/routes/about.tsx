export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Explore Countries
            <span className="block text-indigo-600">Your Global Guide</span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
            Discover detailed information about countries around the world, from population statistics to cultural insights.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="group relative rounded-lg p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Global Coverage</h3>
              <p className="mt-4 text-base text-gray-500">
                Comprehensive information about countries from all continents and regions.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative rounded-lg p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Advanced Filters</h3>
              <p className="mt-4 text-base text-gray-500">
                Easy-to-use search and filter options to find exactly what you're looking for.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative rounded-lg p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Detailed Info</h3>
              <p className="mt-4 text-base text-gray-500">
                Access to demographics, geography, languages, and cultural information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}