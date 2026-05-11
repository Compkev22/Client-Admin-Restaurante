// features/tables/components/TableTabs.jsx
const TABS = ["Todas", "Disponible", "Ocupada", "Mantenimiento"];

export const TableTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all ${
            activeTab === tab
              ? "bg-kinal-red text-white"
              : "bg-white text-gray-500 border border-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};