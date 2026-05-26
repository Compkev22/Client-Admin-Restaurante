// BillingFormFields.jsx
export const BillingFormFields = ({ formData, handleChange, users, branches, orders }) => (
  <>
    {/* CLIENTE */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Cliente</label>
      <select
        name="client"
        value={formData.client}
        onChange={handleChange}
        required
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white text-sm"
      >
        <option value="">Seleccionar cliente</option>
        {users
          ?.filter((u) => u.role === "CLIENT")
          .map((u) => (
            <option key={u._id || u.uid} value={u._id || u.uid}>
              {u.UserName}
            </option>
          ))}
      </select>
    </div>

    {/* SUCURSAL */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Sucursal</label>
      <select
        name="branchId"
        value={formData.branchId}
        onChange={handleChange}
        required
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white text-sm"
      >
        <option value="">Seleccionar sucursal</option>
        {branches?.map((branch) => (
          <option key={branch._id} value={branch._id}>
            {branch.name}
          </option>
        ))}
      </select>
    </div>

    {/* ORDEN */}
    <div className="sm:col-span-2 flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Orden</label>
      <select
        name="orderId"
        value={formData.orderId}
        onChange={handleChange}
        required
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white text-sm"
      >
        <option value="">Seleccionar orden</option>
        {orders?.map((order) => (
          <option key={order._id} value={order._id}>
            ORD-{order._id.slice(-4).toUpperCase()}
          </option>
        ))}
      </select>
    </div>

    {/* SERIE */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Serie</label>
      <input
        type="text"
        name="BillSerie"
        value={formData.BillSerie}
        onChange={handleChange}
        placeholder="Ej: A-001"
        minLength={3}
        maxLength={35}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none text-sm"
      />
    </div>

    {/* MÉTODO DE PAGO */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Método de Pago</label>
      <select
        name="BillPaymentMethod"
        value={formData.BillPaymentMethod}
        onChange={handleChange}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white text-sm"
      >
        <option value="CASH">Efectivo (CASH)</option>
        <option value="CARD">Tarjeta (CARD)</option>
      </select>
    </div>

    {/* SUBTOTAL */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Subtotal</label>
      <input
        type="number"
        step="0.01"
        min="0"
        name="BillSubtotal"
        value={formData.BillSubtotal}
        onChange={handleChange}
        onInput={(e) => { if (e.target.value < 0) e.target.value = 0; }}
        placeholder="0.00"
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none text-sm"
      />
    </div>

    {/* IVA */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">IVA</label>
      <input
        type="number"
        step="0.01"
        min="0"
        name="BillIVA"
        value={formData.BillIVA}
        onChange={handleChange}
        onInput={(e) => { if (e.target.value < 0) e.target.value = 0; }}
        placeholder="0.00"
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none text-sm"
      />
    </div>

    {/* ESTADO */}
    <div className="sm:col-span-2 flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">Estado de Factura</label>
      <select
        name="BillStatus"
        value={formData.BillStatus}
        onChange={handleChange}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white text-sm"
      >
        <option value="GENERATED">Generada (GENERATED)</option>
        <option value="PAYED">Pagada (PAYED)</option>
      </select>
    </div>
  </>
);