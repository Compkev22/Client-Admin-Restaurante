import DeleteIcon from "../../../assets/icons/Delete.svg";

export const ComboCard = ({ combo }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 animate-fadeIn">
      {/* Imagen del Combo con Badge de Precio */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={combo.image} 
          alt={combo.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-kinal-red text-white font-black px-4 py-2 rounded-2xl shadow-lg transform rotate-3">
          Q {combo.price.toFixed(2)}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-black text-gray-800 uppercase italic mb-2 leading-tight">
          {combo.name}
        </h3>
        
        <p className="text-gray-500 text-sm font-medium mb-4 line-clamp-2">
          {combo.description}
        </p>

        {/* Lista de Items del Combo */}
        <div className="flex flex-wrap gap-2 mb-6">
          {combo.items.map((item, index) => (
            <span key={index} className="bg-orange-50 text-kinal-orange text-[10px] font-black px-3 py-1 rounded-full uppercase border border-orange-100">
              {item}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-kinal-red text-white text-xs font-black py-3 rounded-xl hover:bg-red-700 transition-colors uppercase tracking-widest">
            Editar
          </button>
          <button className="px-4 py-3 border border-gray-100 text-gray-400 rounded-xl hover:bg-gray-50 transition-all hover:text-red-500">
            <img src={DeleteIcon} alt="Delete" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};