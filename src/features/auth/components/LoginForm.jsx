import { useNavigate } from "react-router-dom";

// Agregamos { onForgot } como parámetro (prop)
export const LoginForm = ({ onForgot }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Usuario o Correo</label>
                <input 
                    type="text" 
                    placeholder="admin@kinalrest.com"
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>Contraseña</label>
                    {/* Conectamos la función onForgot al botón */}
                    <button 
                        type="button" 
                        onClick={onForgot} 
                        style={{ background: 'none', border: 'none', color: '#e11d48', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
                <input 
                    type="password" 
                    placeholder="••••••••"
                    className="form-input"
                    required
                />
            </div>

            <button type="submit" className="btn-submit">
                Ingresar al Sistema
            </button>
        </form>
    );
};