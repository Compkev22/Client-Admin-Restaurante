import { useNavigate } from "react-router-dom";

export const LoginForm = ({ onForgot }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700">Usuario o Correo</label>
                <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kinal-orange transition-all"
                    placeholder="admin@kinalrest.com"
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-700">Contraseña</label>
                    <button type="button" onClick={onForgot} className="text-xs font-bold text-kinal-red hover:underline">
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
                <input 
                    type="password" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kinal-orange transition-all"
                    placeholder="••••••••"
                    required
                />
            </div>

            <button type="submit" className="w-full bg-kinal-red text-white font-black py-4 rounded-xl shadow-lg hover:bg-red-700 transition-colors uppercase tracking-widest mt-2">
                Ingresar al Sistema
            </button>
        </form>
    );
};