// features/orders/components/OrderFormFields.jsx
export const OrderFormFields = ({
  orderType,
  setOrderType,
  tables,
  mesaId,
  setMesaId,
  disabled = false,
  // Props para el selector de empleado
  users = [],
  selectedEmpleadoId = "",
  setSelectedEmpleadoId = () => {},
  showEmpleado = true,
}) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">

      {/* Tipo de Orden */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
          Tipo de Orden
        </label>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          disabled={disabled}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-bold text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="DINE_IN">Para Comer Aquí (DINE_IN)</option>
          <option value="TAKEAWAY">Para Llevar (TAKEAWAY)</option>
          <option value="DELIVERY">A Domicilio (DELIVERY)</option>
        </select>
      </div>

      {/* Mesa (solo DINE_IN) o nombre de cliente (solo no-DINE_IN) */}
      {orderType === "DINE_IN" ? (
        <div className="flex flex-col gap-1 animate-fadeIn">
          <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
            Seleccionar Mesa
          </label>
          <select
            value={mesaId}
            onChange={(e) => setMesaId(e.target.value)}
            disabled={disabled}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-bold text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">-- Elige una mesa --</option>
            {tables
              ?.filter((t) => t.availability === "Disponible" || t._id === mesaId)
              .map((t) => (
                <option key={t._id} value={t._id}>
                  Mesa {t.numberTable} (Cap: {t.capacity})
                </option>
              ))}
          </select>
        </div>
      ) : (
        <div className="flex flex-col gap-1 animate-fadeIn">
          <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
            Nombre del Cliente (Opcional)
          </label>
          <input
            type="text"
            placeholder="Ej: Carlos López"
            disabled={disabled}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-bold text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      )}
    </div>

    {showEmpleado && orderType === "DINE_IN" && (
      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 animate-fadeIn">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
            Empleado Asignado
          </label>
          <select
            value={selectedEmpleadoId}
            onChange={(e) => setSelectedEmpleadoId(e.target.value)}
            disabled={disabled}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-bold text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">-- Seleccionar empleado --</option>
            {users.map((emp) => (
              <option key={emp._id || emp.uid} value={emp._id || emp.uid}>
                {emp.UserName} {emp.UserSurname}
              </option>
            ))}
          </select>
        </div>
      </div>
    )}
  </div>
);