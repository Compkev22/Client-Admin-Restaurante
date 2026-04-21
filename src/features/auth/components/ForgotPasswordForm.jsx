export const ForgotPasswordForm = ({ onSwitch }) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la petición Axios para recuperar la clave
        alert("Si el correo existe, te enviaremos las instrucciones.");
        onSwitch(); // Regresa al login después de enviar
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Correo Electrónico</label>
                <input 
                    type="email" 
                    placeholder="admin@kinalrest.com"
                    className="form-input"
                    required
                />
            </div>

            <button type="submit" className="btn-submit">
                Enviar Instrucciones
            </button>
            
            {/* Botón para regresar al Login */}
            <button 
                type="button" 
                onClick={onSwitch}
                className="btn-submit" 
                style={{ backgroundColor: '#6b7280', marginTop: '1rem' }}
            >
                Volver al Login
            </button>
        </form>
    );
};