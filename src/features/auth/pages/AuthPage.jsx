import { useState } from "react"; 
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm"; 
import logo from "../../../assets/img/KinalFriedChickenLogo.png";
import './auth.css'; 

export const AuthPage = () => {
    const [isForgot, setIsForgot] = useState(false);

    return (
        <div className="login-wrapper">
            <div className="login-card">
                
                <div className="login-header">
                    <img 
                        src={logo} 
                        alt="Kinal Fried Chicken Logo" 
                        className="login-logo" 
                    />
                    
                    {/* Título Actualizado con salto de línea (br) para que se vea ordenado */}
                    <h2 className="login-title" style={{ textAlign: 'center' }}>
                        {isForgot 
                            ? "Recuperar Acceso" 
                            : <>
                                <span className="text-red">KINAL</span>
                                <br />
                                <span className="text-orange" style={{ fontSize: '1.25rem' }}>FRIED CHICKEN</span>
                              </>
                        }
                    </h2>
                    
                    <p className="login-subtitle">
                        {isForgot 
                            ? "Ingresa tu correo para recuperar tu contraseña" 
                            : "Acceso Administrativo"
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