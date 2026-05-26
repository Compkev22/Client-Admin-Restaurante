import imgLogo from "../../../assets/img/KinalFriedChickenLogo.png";
import { AvatarUser } from "../../ui/AvatarUser.jsx";

export const Navbar = ({ onMenuToggle }) => {
  return (
    <nav className="bg-gray-100 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">

        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-200 transition-colors flex flex-col gap-1.5 shrink-0"
            aria-label="Abrir menú"
          >
            <span className="block w-5 h-0.5 bg-gray-700 rounded-full" />
            <span className="block w-5 h-0.5 bg-gray-700 rounded-full" />
            <span className="block w-5 h-0.5 bg-gray-700 rounded-full" />
          </button>

          <img
            src={imgLogo}
            alt="Kinal Fried Chicken Logo"
            className="h-9 md:h-10 w-auto object-contain drop-shadow-sm shrink-0"
          />

          <h1 className="font-black text-lg md:text-2xl tracking-tight italic hidden sm:block">
            <span className="text-kinal-red">KINAL</span>
            <span className="text-kinal-orange">FRIEDCHICKEN</span>
            <span className="text-gray-500 text-xs md:text-sm ml-1 md:ml-2 font-normal not-italic">ADMIN</span>
          </h1>
        </div>

        <AvatarUser />
      </div>
    </nav>
  );
};