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
    <>
      {/* ── TARJETAS MÓVIL (< md) ── */}
      <div className="grid md:hidden gap-4">
        {coupons.map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3"
          >
            {/* Cabecera de la tarjeta */}
            <div className="flex justify-between items-start">
              <span className="text-lg font-black text-kinal-red tracking-wider">{c.code}</span>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                  c.status === "ACTIVE"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {c.status === "ACTIVE" ? "Activo" : "Inactivo"}
              </span>
            </div>

            {/* Datos */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Descuento</p>
                <p className="font-bold text-gray-700">{c.discountPercentage}%</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Uso</p>
                <p className="font-bold text-gray-700">
                  <span className="text-kinal-orange">{c.usedCount || 0}</span> / {c.usageLimit}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] font-black text-gray-400 uppercase">Expira</p>
                <p className="font-bold text-gray-700">
                  {c.expirationDate
                    ? new Date(c.expirationDate).toLocaleDateString("es-GT", { timeZone: "UTC" })
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={() => onEdit(c)}
                className="flex items-center gap-2 flex-1 justify-center py-2 rounded-xl border border-gray-200 hover:bg-orange-50 transition-colors font-bold text-xs text-gray-600"
                aria-label="Editar cupón"
              >
                <img src={iconEdit} className="w-4 h-4 opacity-60" alt="Editar" />
                Editar
              </button>
              <button
                onClick={() => onToggleStatus(c)}
                className={`flex items-center gap-2 flex-1 justify-center py-2 rounded-xl border transition-colors font-bold text-xs ${
                  c.status === "ACTIVE"
                    ? "border-red-200 hover:bg-red-50 text-red-500"
                    : "border-green-200 hover:bg-green-50 text-green-600"
                }`}
                aria-label="Cambiar estado"
              >
                <img
                  src={iconDelete}
                  className={`w-4 h-4 opacity-60 ${c.status === "INACTIVE" ? "grayscale sepia" : ""}`}
                  alt="Cambiar estado"
                />
                {c.status === "ACTIVE" ? "Desactivar" : "Activar"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── TABLA ESCRITORIO (≥ md) ── */}
      <div className="hidden md:block overflow-x-auto">
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
    </>
  );
};