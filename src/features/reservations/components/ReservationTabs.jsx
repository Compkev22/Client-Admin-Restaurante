// features/reservations/components/ReservationTabs.jsx
const TABS = ["Todas", "Pendiente", "Confirmada", "Completada", "Cancelada"];

export const ReservationTabs = ({ activeTab, onTabChange }) => (
  <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
    {TABS.map((tab) => (
      <button
        key={tab}
        onClick={() => onTabChange(tab)}
        className={`px-4 md:px-6 py-2 rounded-full font-black text-xs md:text-sm uppercase transition-all whitespace-nowrap border-2 ${
          activeTab === tab
            ? "bg-kinal-red border-kinal-red text-white shadow-md"
            : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);