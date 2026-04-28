// src/features/auth/components/ResetPasswordForm.jsx
export const ResetPasswordForm = ({ onSwitch }) => {
    return (
        <form className="space-y-5">
            {/* Nueva contraseña */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1.5">
                    Nueva contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-kinal-red"
                />
                {/* Ocultamos el error por defecto hasta que usemos react-hook-form */}
                <p className="text-red-600 text-xs mt-1 hidden">La contraseña es obligatoria</p>
            </div>

            {/* Confirmar contraseña */}
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-1.5">
                    Confirmar contraseña
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-kinal-red"
                />
                <p className="text-red-600 text-xs mt-1 hidden">Las contraseñas no coinciden</p>
            </div>

            {/* Error backend (mock) */}
            <p className="text-red-600 text-sm text-center hidden">
                Error al actualizar la contraseña
            </p>

            {/* Botón */}
            <button
                type="button"
                className="w-full bg-kinal-red text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-kinal-dark-red transition-colors"
            >
                Actualizar contraseña
            </button>

            {/* Volver al login */}
            <p className="text-center text-sm text-gray-600">
                ¿Recordaste tu contraseña?{" "}
                <button
                    type="button"
                    onClick={onSwitch}
                    className="text-kinal-orange font-medium hover:underline"
                >
                    Iniciar sesión
                </button>
            </p>
        </form>
    );
};