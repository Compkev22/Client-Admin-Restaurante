export const OrderTabs = ({ tabs, activeTab, setActiveTab }) => (
  <div className="flex gap-3 overflow-x-auto pb-2 mb-6 scrollbar-hide">
    {tabs.map((tab) => (
      <button 
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all whitespace-nowrap ${
          activeTab === tab 
            ? 'bg-kinal-red text-white shadow-md' 
            : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);