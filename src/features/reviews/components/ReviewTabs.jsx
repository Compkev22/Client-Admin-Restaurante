export const ReviewTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["TODAS", "5 ESTRELLAS", "BUENAS (3-4)", "CRÍTICAS (1-2)", "OCULTAS"];

  return (
    <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 md:px-6 py-2 rounded-full text-[10px] md:text-[11px] font-black tracking-wider transition-all border-2 whitespace-nowrap ${
            activeTab === tab
              ? "bg-[#1a202c] border-[#1a202c] text-white shadow-lg"
              : "bg-white border-gray-100 text-gray-400 hover:border-gray-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};