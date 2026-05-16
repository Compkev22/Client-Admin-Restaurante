// BillingStats.jsx
export const BillingStats = () => {
  const stats = [
    { label: "Ventas del Día", value: "Q 4,250.00", color: "bg-yellow-400", text: "text-red-900" },
    { label: "Facturas Emitidas", value: "128", color: "bg-orange-500", text: "text-white" },
    { label: "Ticket Promedio", value: "Q 33.20", color: "bg-red-600", text: "text-white" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.color} p-5 md:p-6 rounded-3xl shadow-lg transition-transform`}
        >
          <p className={`text-[10px] font-black uppercase tracking-widest ${stat.text} opacity-80`}>
            {stat.label}
          </p>
          <h3 className={`text-2xl md:text-3xl font-black mt-1 ${stat.text}`}>
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
};