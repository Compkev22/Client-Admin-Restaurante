import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore"; 
import defaultAvatarImg from "../../assets/img/defaultAvatar.jpeg";

export const AvatarUser = () => {
    const { user, logout } = useAuthStore() || { user: { username: "Kevin Velásquez", email: "admin@kfc.com" }, logout: () => {} };
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    const avatarSrc = user?.profilePictureUrl && user.profilePictureUrl.trim() !== ""
        ? user.profilePictureUrl
        : defaultAvatarImg;

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div className="flex items-center gap-4 cursor-pointer" onClick={toggleMenu}>
                <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-500 font-medium">Administrador</p>
                    <p className="text-sm font-bold text-gray-800">{user?.username}</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-kinal-yellow bg-white overflow-hidden shadow-sm">
                    <img 
                        src={avatarSrc} 
                        alt={user?.username} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultAvatarImg;
                        }}
                    />
                </div>
            </div>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg animate-fadeIn z-50">
                    <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-gray-800">{user?.username}</p>
                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                    </div>

                    <ul className="p-2 text-sm text-gray-700 font-medium">
                        <li>
                            <Link to="/dashboard" className="block w-full p-2 rounded-md hover:bg-orange-50 hover:text-kinal-orange transition-colors">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/users" className="block w-full p-2 rounded-md hover:bg-orange-50 hover:text-kinal-orange transition-colors">
                                Usuarios
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="block w-full text-left p-2 rounded-md hover:bg-red-100 text-red-600 font-semibold transition-colors mt-1 border-t border-gray-100 pt-2">
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};