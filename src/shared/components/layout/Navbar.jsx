import imgLogo from "../../../assets/img/KinalFriedChickenLogo.png";

export const Navbar = () => {
    return (
        <nav className="bg-gray-100 border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-full mx-auto px-6 h-16 flex items-center justify-between">
                
                {/* Logo con la ruta corregida */}
                <div className="flex items-center gap-3">
                    <img 
                        src={imgLogo} 
                        alt="Kinal Fried Chicken Logo" 
                        className="h-10 w-auto object-contain drop-shadow-sm"
                    />
                    <h1 className="font-black text-2xl tracking-tight italic hidden sm:block">
                        <span className="text-kinal-red">KINAL</span>
                        <span className="text-kinal-orange">REST</span>
                        <span className="text-gray-500 text-sm ml-2 font-normal not-italic">ADMIN</span>
                    </h1>
                </div>

                {/* Perfil / Acciones */}
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-gray-500 font-medium">Administrador</p>
                        <p className="text-sm font-bold text-gray-800">Kevin Velásquez</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-kinal-yellow bg-white overflow-hidden shadow-sm">
                        <img src="https://ui-avatars.com/api/?name=Kevin+Velasquez&background=facc15&color=7f1d1d" alt="Profile" />
                    </div>
                </div>
            </div>
        </nav>
    );
};