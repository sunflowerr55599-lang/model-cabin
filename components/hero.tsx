export default function Hero() {
  return (
    <section className="bg-[#c21807] py-16 px-4 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-xl max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Check availability for all our cabins
        </h2>
        <div className="text-left mb-6">
          <label className="block text-sm font-semibold mb-2">
            Choose your dates
          </label>
          <div className="border p-3 flex justify-between items-center text-gray-400">
            Start date <span>→</span> End date
          </div>
        </div>
        <button className="w-full bg-[#222] text-white py-4 font-bold uppercase hover:bg-black transition">
          Search
        </button>
      </div>
    </section>
  );
}
