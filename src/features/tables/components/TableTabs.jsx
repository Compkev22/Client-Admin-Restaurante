// features/tables/components/TableTabs.jsx
const TABS = ["Todas", "Disponible", "Ocupada", "Mantenimiento"];

export const TableTabs = ({ activeTab, onTabChange }) => (
  <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
    {TABS.map((tab) => (
      <button
        key={tab}
        onClick={() => onTabChange(tab)}
        className={`px-4 md:px-6 py-2 rounded-full font-black text-xs md:text-sm uppercase transition-all whitespace-nowrap ${
          activeTab === tab
            ? "bg-kinal-red text-white shadow-md"
            : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);