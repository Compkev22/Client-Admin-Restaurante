import { useState } from "react"; 
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm"; 
import logo from "../../../assets/img/KinalFriedChickenLogo.png";

export const AuthPage = () => {
    const [isForgot, setIsForgot] = useState(false);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-kinal-yellow/20 relative overflow-hidden">
            
            <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl z-10 mx-4 border border-gray-100 animate-fadeIn">
                
                <div className="flex flex-col items-center mb-8">
                    <img 
                        src={logo} 
                        alt="Kinal Fried Chicken Logo" 
                        className="h-32 w-auto object-contain mb-4" 
                    />
                    
                    <h2 className="text-3xl font-black italic tracking-tighter text-center leading-none">
                        {isForgot 
                            ? "RECUPEAR ACCESO" 
                            : <><span className="text-kinal-red">KINAL</span><br/><span className="text-kinal-orange text-xl">FRIED CHICKEN</span></>
                        }
                    </h2>
                    
                    <p className="text-gray-500 text-sm font-medium mt-2">
                        {isForgot 
                            ? "Ingresa tu correo para continuar" 
                            : "PANEL ADMINISTRATIVO"
                        }
                    </p>
                </div>

                {isForgot ? (
                    <ForgotPasswordForm onSwitch={() => setIsForgot(false)} />
                ) : (
                    <LoginForm onForgot={() => setIsForgot(true)} />
                )}
            </div>
        </div>
    );
};