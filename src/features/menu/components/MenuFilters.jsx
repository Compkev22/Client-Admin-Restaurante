// MenuFilters.jsx
export const MenuFilters = ({ categories, activeCategory, onSelect }) => (
  <div className="flex gap-3 overflow-x-auto pb-2">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onSelect(cat)}
        className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all whitespace-nowrap ${
          activeCategory === cat
            ? "bg-kinal-red text-white shadow-md"
            : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);