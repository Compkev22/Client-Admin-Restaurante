// features/menu/components/MenuFilters.jsx
export const MenuFilters = ({ categories, activeCategory, onSelect }) => (
  /* scrollbar-hide + overflow-x-auto para que los filtros se deslicen
     en móvil sin saltar a una segunda línea */
  <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onSelect(cat)}
        className={`px-4 md:px-6 py-2 rounded-full font-black text-xs md:text-sm uppercase transition-all whitespace-nowrap shrink-0 ${
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