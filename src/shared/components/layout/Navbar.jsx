// src/shared/components/layout/Navbar.jsx
import imgLogo from "../../../assets/img/KinalFriedChickenLogo.png";
import { AvatarUser } from "../../ui/AvatarUser";

export const Navbar = () => {
    return (
        <nav className="bg-gray-100 border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-full mx-auto px-6 h-16 flex items-center justify-between">
                
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img 
                        src={imgLogo} 
                        alt="Kinal Fried Chicken Logo" 
                        className="h-10 w-auto object-contain drop-shadow-sm"
                    />
                    <h1 className="font-black text-2xl tracking-tight italic hidden sm:block">
                        <span className="text-kinal-red">KINAL</span>
                        <span className="text-kinal-orange">FRIEDCHICKEN</span>
                        <span className="text-gray-500 text-sm ml-2 font-normal not-italic">ADMIN</span>
                    </h1>
                </div>

                {/* Perfil Refactorizado */}
                <AvatarUser />
            </div>
        </nav>
    );
};