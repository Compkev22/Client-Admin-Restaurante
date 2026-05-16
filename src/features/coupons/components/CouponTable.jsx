// features/coupons/components/CouponTable.jsx
import { Spinner } from "../../auth/components/Spinner.jsx";
import iconEdit from "../../../assets/icons/Edit.svg";
import iconDelete from "../../../assets/icons/Delete.svg";

export const CouponTable = ({ coupons, loading, error, onEdit, onToggleStatus }) => {
  if (loading)
    return (
      <div className="p-16 md:p-20 flex justify-center">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="p-10 md:p-20 text-center text-red-500 font-bold">
        No se pudieron cargar los datos. {error}
      </div>
    );

  return (
    /* overflow-x-auto da scroll horizontal en móvil sin romper el layout */
    <div className="overflow-x-auto -mx-4 md:mx-0">
      <table className="w-full text-left min-w-[580px]">
        <thead className="bg-gray-50">
          <tr>
            {["Código", "Descuento", "Uso", "Expira", "Estado", "Acciones"].map((col) => (
              <th
                key={col}
                className="p-3 md:p-4 text-xs font-black text-gray-400 uppercase italic"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {coupons.map((c) => (
            <tr key={c._id} className="hover:bg-orange-50/30 transition-colors">
              <td className="p-3 md:p-4 font-black text-kinal-red tracking-wider text-sm">
                {c.code}
              </td>
              <td className="p-3 md:p-4 font-bold text-gray-700 text-sm">
                {c.discountPercentage}%
              </td>
              <td className="p-3 md:p-4 text-sm font-medium text-gray-500">
                <span className="text-kinal-orange font-bold">{c.usedCount || 0}</span>{" "}
                / {c.usageLimit}
              </td>
              <td className="p-3 md:p-4 text-gray-500 text-sm">
                {c.expirationDate
                  ? new Date(c.expirationDate).toLocaleDateString("es-GT", { timeZone: "UTC" })
                  : "N/A"}
              </td>
              <td className="p-3 md:p-4">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    c.status === "ACTIVE"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {c.status === "ACTIVE" ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="p-3 md:p-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onEdit(c)}
                    className="hover:scale-110 transition-transform p-1"
                    aria-label="Editar cupón"
                  >
                    <img
                      src={iconEdit}
                      className="w-5 h-5 opacity-60 hover:opacity-100"
                      alt="Editar"
                    />
                  </button>
                  <button
                    onClick={() => onToggleStatus(c)}
                    className="hover:scale-110 transition-transform p-1"
                    aria-label="Cambiar estado"
                  >
                    <img
                      src={iconDelete}
                      className={`w-5 h-5 opacity-60 hover:opacity-100 ${
                        c.status === "INACTIVE" ? "grayscale sepia" : ""
                      }`}
                      alt="Cambiar estado"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};