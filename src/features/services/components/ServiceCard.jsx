// features/services/components/ServiceCard.jsx
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";

export const ServiceCard = ({ service, onEdit, onChangeStatus }) => {
  const isActive = service.status === "ACTIVE";

  return (
    <div className={`bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all relative flex flex-col ${
      !isActive ? "opacity-60 grayscale bg-gray-50" : ""
    }`}>
      {/* Badge de estado */}
      <div className="absolute top-4 right-4 shrink-0">
        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
          isActive
            ? "bg-green-100 text-green-700 border-green-200"
            : "bg-gray-200 text-gray-500 border-gray-300"
        }`}>
          {isActive ? "Activo" : "Inactivo"}
        </span>
      </div>

      {service.image?.url && (
        <img
          src={service.image.url}
          alt={service.Name}
          className="w-full h-36 md:h-40 object-cover rounded-xl mb-4"
        />
      )}

      {/* Nombre y precio */}
      <div className="mb-3 pr-16">
        <h3 className="text-lg md:text-xl font-black text-gray-800 leading-tight mb-1 line-clamp-1">
          {service.Name}
        </h3>
        <p className="text-xl md:text-2xl font-black text-kinal-red">
          + Q {Number(service.AdditionalPrice || 0).toFixed(2)}
        </p>
      </div>

      {/* Descripción */}
      <p className="text-sm text-gray-600 font-medium flex-grow mb-5 bg-orange-50/50 p-3 md:p-4 rounded-xl border border-orange-100/50 line-clamp-3">
        {service.Description}
      </p>

      {/* Botones */}
      <div className="flex justify-end gap-2 pt-4 border-t border-gray-50 mt-auto">
        <button
          type="button"
          onClick={() => onEdit(service)}
          className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
          title="Editar servicio"
        >
          <img src={iconEdit} className="w-5 h-5 opacity-70" alt="Edit" />
        </button>
        <button
          type="button"
          onClick={() => onChangeStatus(service)}
          className={`p-2 rounded-lg transition-colors ${
            isActive
              ? "bg-red-50 hover:bg-red-100 text-red-600"
              : "bg-green-50 hover:bg-green-100 text-green-600"
          }`}
          title={isActive ? "Desactivar servicio" : "Activar servicio"}
        >
          <img src={iconDelete} className="w-5 h-5 opacity-70" alt="Toggle status" />
        </button>
      </div>
    </div>
  );
};