// src/features/auth/components/Spinner.jsx
export const Spinner = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50/50">
            {/* Spinner en colores corporativos */}
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-kinal-yellow border-t-kinal-red"></div>
            <p className="mt-4 font-bold text-gray-500 animate-pulse">Cargando...</p>
        </div>
    );
};