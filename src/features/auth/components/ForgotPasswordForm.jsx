// src/features/auth/components/ForgotPasswordForm.jsx
export const ForgotPasswordForm = ({ onSwitch }) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Integrar Axios
        alert("Si el correo existe, te enviaremos las instrucciones.");
        onSwitch(); 
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo de Email */}
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="admin@kinalrest.com"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-kinal-red"
                    required
                />
            </div>

            {/* Botón de Submit */}
            <button
                type="submit"
                className="w-full bg-kinal-red text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-kinal-dark-red transition-colors"
            >
                Enviar correo
            </button>

            {/* Link para regresar a Iniciar Sesión */}
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