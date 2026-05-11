import { useState, useEffect } from "react";
import {
  useBillingStore,
  useUserStore,
  useBranchStore,
  useOrderStore,
} from "../../users/store/adminStore";

import { Spinner } from "../../auth/components/Spinner";

export const BillingModal = ({ isOpen, onClose, orderData }) => {
  const createBilling = useBillingStore((state) => state.createBilling);

  const { users, getUsers } = useUserStore();
  const { branches, getBranches } = useBranchStore();
  const { orders, getOrders } = useOrderStore();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    BillSerie: "",
    BillPaymentMethod: "CASH",

    BillSubtotal: "",
    BillIVA: "",

    BillStatus: "GENERATED",

    client: "",
    branchId: "",
    orderId: "",
  });

  useEffect(() => {
    if (isOpen) {
      getUsers();
      getBranches();
      getOrders();

      setFormData((prev) => ({
        ...prev,
        client: orderData?.client?._id || orderData?.client || "",
        branchId: orderData?.branchId?._id || orderData?.branchId || "",
        orderId: orderData?._id || "",
      }));
    }
  }, [isOpen, orderData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        branchId: formData.branchId,
        Order: formData.orderId,
        BillSerie: formData.BillSerie,
        BillPaymentMethod: formData.BillPaymentMethod,
        BillSubtotal: Number(formData.BillSubtotal) || 0,
        BillIVA: Number(formData.BillIVA) || 0,
        BillTotal:
          Number(formData.BillSubtotal || 0) + Number(formData.BillIVA || 0),
        BillStatus: formData.BillStatus,
        clientId: formData.client,
      };

      console.log("PAYLOAD LISTO:", payload);
      await createBilling(payload);

      alert("Factura generada con éxito");

      onClose();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Error al generar factura");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 mx-4">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic text-gray-800 uppercase">
            Generar <span className="text-kinal-red">Factura</span>
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-xl"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* CLIENTE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Cliente</label>

            <select
              name="client"
              value={formData.client}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white"
            >
              <option value="">Seleccionar sucursal</option>

              {branches?.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          {/* Orden */}
          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Orden</label>
            <select
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white"
            >
              <option value="">Seleccionar orden</option>
              {orders?.map((order) => (
                <option key={order._id} value={order._id}>
                  {/* Tip: podrías mostrar algo más útil como ORD-820 */}
                  ORD-{order._id.slice(-4).toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* SERIE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">
              Serie (BillSerie)
            </label>

            <input
              type="text"
              name="BillSerie"
              value={formData.BillSerie}
              onChange={handleChange}
              placeholder="Ej: A-001"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none"
            />
          </div>

          {/* MÉTODO DE PAGO */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">
              Método de Pago
            </label>

            <select
              name="BillPaymentMethod"
              value={formData.BillPaymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white"
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
              name="BillSubtotal"
              value={formData.BillSubtotal}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none"
            />
          </div>

          {/* IVA */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">IVA</label>

            <input
              type="number"
              step="0.01"
              name="BillIVA"
              value={formData.BillIVA}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none"
            />
          </div>

          {/* ESTADO */}
          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">
              Estado de Factura
            </label>

            <select
              name="BillStatus"
              value={formData.BillStatus}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white"
            >
              <option value="GENERATED">Generada (GENERATED)</option>

              <option value="PAYED">Pagada (PAYED)</option>
            </select>
          </div>

          {/* BOTONES */}
          <div className="col-span-2 pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-kinal-red text-white font-black py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest flex justify-center items-center"
            >
              {loading ? <Spinner size="sm" /> : "Crear Factura"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
