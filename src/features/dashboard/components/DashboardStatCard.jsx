export const DashboardStatCard = ({
    iconSrc,
    iconAlt,
    iconBg,
    iconFilter,
    badge,
    badgeColor,
    label,
    value,
    valueSuffix,
}) => {
    return (
        <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-shadow animate-fadeIn">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
                    <img
                        src={iconSrc}
                        alt={iconAlt}
                        className="w-5 h-5 md:w-6 md:h-6 opacity-80"
                        style={iconFilter ? { filter: iconFilter } : undefined}
                    />
                </div>
                {badge && (
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full ${badgeColor}`}>
                        {badge}
                    </span>
                )}
            </div>
            <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">
                {label}
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mt-1">
                {value}
                {valueSuffix && (
                    <span className="text-sm text-gray-400 font-medium ml-1">{valueSuffix}</span>
                )}
            </h2>
        </div>
    );
};