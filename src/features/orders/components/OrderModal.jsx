// features/orders/components/OrderModal.jsx
import { useState, useEffect } from "react";
import { OrderFormFields } from "./OrderFormFields.jsx";
import { OrderCart } from "./OrderCart.jsx";
import { getMenu } from "../../../shared/api/admin.js";
import {
  useOrderStore,
  useTableStore,
  useBranchStore,
  useUserStore,
} from "../../users/store/adminStore.js";
import { useAuthStore } from "../../auth/store/authStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";

export const OrderModal = ({ isOpen, onClose, orderToEdit = null }) => {
  const isEditMode = !!orderToEdit;

  const [orderType, setOrderType] = useState("TAKEAWAY");
  const [orderList, setOrderList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [menuProducts, setMenuProducts] = useState([]);
  const [mesaId, setMesaId] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedEmpleadoId, setSelectedEmpleadoId] = useState("");

  const { createFullOrder, addItemsToExistingOrder } = useOrderStore();
  const { tables, getTables } = useTableStore();
  const { branches, getBranches } = useBranchStore();
  const { users, getUsers } = useUserStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!isOpen) return;

    getMenu().then((res) => setMenuProducts(res.data.menu || []));
    getTables();
    getBranches();
    getUsers();
    setOrderList([]);

    if (!isEditMode) {
      setOrderType("TAKEAWAY");
      setMesaId("");
      setSelectedBranchId(user?.branchId || user?.branch?._id || "");
      setSelectedEmpleadoId(user?._id || user?.uid || "");
    } else {
      setOrderType(orderToEdit.orderType || "TAKEAWAY");
      setSelectedBranchId(orderToEdit.branchId?._id || orderToEdit.branchId || "");
      setMesaId(orderToEdit.mesaId?._id || orderToEdit.mesaId || "");
      setSelectedEmpleadoId(
        orderToEdit.empleadoId?._id || orderToEdit.empleadoId || ""
      );
    }
  }, [isOpen, orderToEdit]);

  // Empleados filtrados por sucursal seleccionada (solo para creación nueva)
  const filteredEmployees = users.filter((u) => {
    const uBranchId = u.branchId?._id || u.branchId || u.branch?._id || "";
    return uBranchId.toString() === selectedBranchId.toString();
  });

  const handleAddProduct = () => {
    if (!selectedProduct) return;
    const exists = orderList.find((item) => item.productId === selectedProduct);
    if (exists) {
      setOrderList(
        orderList.map((item) =>
          item.productId === selectedProduct
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const p = menuProducts.find((p) => p._id === selectedProduct);
      if (!p) return;
      setOrderList([
        ...orderList,
        {
          productId: selectedProduct,
          type:      p.type || p.categoria || "Individual",
          name:      p.name || p.nombre,
          price:     p.price || p.precio,
          quantity:  1,
        },
      ]);
    }
    setSelectedProduct("");
  };

  const handleRemoveProduct = (id) =>
    setOrderList(orderList.filter((item) => item.productId !== id));

  const totalOrder = orderList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = async () => {
    if (!selectedBranchId) return showError("Debes seleccionar una sucursal.");

    // Empleado solo obligatorio para órdenes DINE_IN nuevas
    if (!isEditMode && orderType === "DINE_IN" && !selectedEmpleadoId) {
      return showError("Debes seleccionar un empleado para órdenes en mesa.");
    }

    if (orderList.length === 0) return showError("Debes agregar al menos un producto.");

    try {
      if (isEditMode) {
        await addItemsToExistingOrder(orderToEdit._id, orderList);
        showSuccess(
          `${orderList.length} producto(s) agregado(s) y factura actualizada correctamente.`
        );
      } else {
        const finalEmpleadoId =
          selectedEmpleadoId && selectedEmpleadoId.length >= 24
            ? selectedEmpleadoId
            : user?._id || user?.uid || null;

        const orderData = {
          branchId:   selectedBranchId,
          orderType,
          // Solo enviamos mesaId y empleadoId si es DINE_IN
          mesaId:     orderType === "DINE_IN" ? mesaId     : undefined,
          empleadoId: orderType === "DINE_IN" ? finalEmpleadoId : undefined,
        };
        await createFullOrder(orderData, orderList);
        showSuccess("Orden creada y facturada automáticamente.");
      }
      onClose();
    } catch (error) {
      showError(
        error?.response?.data?.message ||
          "Ocurrió un error. Revisa los datos e intenta de nuevo."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">

        {/* Cabecera fija */}
        <div className="flex justify-between items-center px-6 md:px-8 pt-6 md:pt-8 pb-4 shrink-0 border-b border-gray-100">
          <div>
            <h2 className="text-xl md:text-2xl font-black italic text-gray-800 uppercase">
              {isEditMode ? "Agregar a" : "Nueva"}{" "}
              <span className="text-kinal-red">Orden</span>
            </h2>
            {isEditMode && (
              <p className="text-xs font-bold text-gray-400 mt-1">
                ORD-{orderToEdit._id.slice(-4).toUpperCase()} •{" "}
                <span className="text-kinal-orange">{orderToEdit.estado}</span>
                {" "}• Total actual: Q {(orderToEdit.total || 0).toFixed(2)}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 font-bold text-xl transition-colors"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        {/* Banner informativo en modo edición */}
        {isEditMode && (
          <div className="mx-6 md:mx-8 mt-4 bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 flex items-start gap-3 shrink-0">
            <span className="text-kinal-orange text-lg leading-none mt-0.5">ℹ</span>
            <p className="text-xs font-bold text-orange-700 leading-relaxed">
              Estás agregando productos a una orden existente. Los nuevos items
              se sumarán al total y la factura vinculada se actualizará automáticamente.
              <br />
              <span className="font-black">No puedes modificar la sucursal, el tipo de orden ni la mesa.</span>
            </p>
          </div>
        )}

        {/* Cuerpo con scroll */}
        <div className="overflow-y-auto flex-1 px-6 md:px-8 py-6">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

            {/* Sucursal — siempre visible, solo bloqueada en edición */}
            <div className="bg-orange-50 p-4 md:p-5 rounded-2xl border border-orange-100">
              <div className="space-y-1">
                <label className="text-xs font-black text-kinal-orange uppercase tracking-widest">
                  Sucursal
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => {
                    setSelectedBranchId(e.target.value);
                    setSelectedEmpleadoId("");
                  }}
                  disabled={isEditMode}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white font-bold text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">-- Seleccionar --</option>
                  {branches?.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tipo de orden, mesa/cliente y empleado (condicional) */}
            <OrderFormFields
              orderType={orderType}
              setOrderType={setOrderType}
              tables={tables}
              mesaId={mesaId}
              setMesaId={setMesaId}
              disabled={isEditMode}
              // Empleado solo se muestra si NO estamos en modo edición
              // (en edición ya está bloqueado e irrelevante cambiarlo)
              showEmpleado={!isEditMode}
              users={filteredEmployees}
              selectedEmpleadoId={selectedEmpleadoId}
              setSelectedEmpleadoId={setSelectedEmpleadoId}
            />

            <OrderCart
              menuProducts={menuProducts}
              orderList={orderList}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              onAdd={handleAddProduct}
              onRemove={handleRemoveProduct}
            />
          </form>
        </div>

        {/* Footer fijo */}
        <div className="shrink-0 px-6 md:px-8 pb-6 md:pb-8 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
              {isEditMode ? "Suma a agregar" : "Total a cobrar"}
            </p>
            <p className="text-3xl md:text-4xl font-black text-kinal-red leading-none">
              Q {totalOrder.toFixed(2)}
            </p>
            {isEditMode && totalOrder > 0 && (
              <p className="text-xs text-gray-400 font-bold mt-1">
                Nuevo total:{" "}
                <span className="text-gray-700">
                  Q {((orderToEdit.total || 0) + totalOrder).toFixed(2)}
                </span>
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={orderList.length === 0}
              className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest shadow-lg transition-all ${
                orderList.length > 0
                  ? "bg-kinal-red text-white hover:bg-red-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isEditMode ? "Agregar a la Orden" : "Enviar a Cocina"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};