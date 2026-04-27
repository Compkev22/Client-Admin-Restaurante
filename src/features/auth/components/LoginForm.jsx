import { useAuthStore } from '../authStore';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const LoginForm = ({ onForgot }) => {
    const navigate = useNavigate();
    
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const res = await login(data);
        if (res.success) {
            navigate("/dashboard");
            toast.success("¡Bienvenido al Panel de Administración!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-2">
                    Email o Usuario
                </label>
                <input 
                    type="text" 
                    placeholder="correo@kfc.com.gt o usuario"
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-kinal-red font-medium text-gray-800 transition-all" 
                    {...register("emailOrUsername", {
                        required: "Este campo es obligatorio",
                    })}
                />
                {errors.emailOrUsername && (
                    <p className="text-red-500 text-xs font-bold mt-2">{errors.emailOrUsername.message}</p>
                )}
            </div>

            <div>
                <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-2">
                    Contraseña
                </label>
                <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-kinal-red font-mono text-gray-800 transition-all" 
                    {...register("password", {
                        required: "La contraseña es obligatoria",
                    })}
                />
                {errors.password && (
                    <p className="text-red-500 text-xs font-bold mt-2">{errors.password.message}</p>
                )}
            </div>

            <button 
                type="submit"
                disabled={loading} 
                className={`w-full bg-kinal-red text-white font-black py-3.5 px-4 rounded-xl shadow-lg uppercase tracking-widest transition-all mt-4 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-red-700 hover:scale-[1.02]"}`}
            >
                {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>

            {/* Enlaces inferiores adaptados al contexto corporativo */}
            <div className="text-center text-sm space-y-4 pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onForgot}
                    className="text-kinal-orange font-bold hover:underline block w-full transition-colors"
                >
                    ¿Olvidaste tu contraseña?
                </button>
                
                <p className="text-gray-500 font-medium">
                    ¿Problemas de acceso?{' '}
                    <button type="button" className="text-kinal-red font-black hover:underline transition-colors">
                        Contactar Soporte
                    </button>
                </p>
            </div>
        </form>
    );
}