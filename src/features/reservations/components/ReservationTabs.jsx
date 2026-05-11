// features/reservations/components/ReservationTabs.jsx
const TABS = ["Todas", "Pendiente", "Confirmada", "Completada", "Cancelada"];

export const ReservationTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-2 rounded-full font-black text-xs uppercase transition-all whitespace-nowrap border-2 ${
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
};