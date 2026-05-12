import { useState, useEffect } from "react";
import { OrderFormFields } from "./OrderFormFields";
import { OrderCart } from "./OrderCart";
import { getMenu } from "../../../shared/api/admin";
import {
  useOrderStore,
  useTableStore,
  useBranchStore,
  useUserStore,
} from "../../users/store/adminStore";
import { useAuthStore } from "../../auth/store/authStore";
import { showError, showSuccess } from "../../../shared/utils/toast";

// RECIBIMOS orderToEdit
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
    if (isOpen) {
      getMenu().then((res) => setMenuProducts(res.data.menu || []));
      getTables();
      getBranches();
      getUsers();

      setOrderList([]); // El carrito empieza vacío, solo agregaremos lo nuevo

      if (orderToEdit) {
        // Modo Edición: Precargar datos y bloquearlos
        setSelectedBranchId(orderToEdit.branchId?._id || orderToEdit.branchId);
        setSelectedEmpleadoId(
          orderToEdit.empleadoId?._id || orderToEdit.empleadoId,
        );
        setOrderType(orderToEdit.orderType);
        setMesaId(orderToEdit.mesaId?._id || orderToEdit.mesaId || "");
      } else {
        // Modo Nueva Orden
        setMesaId("");
        const userBranch = user?.branchId || user?.branch?._id || "";
        setSelectedBranchId(userBranch);
        setSelectedEmpleadoId(user?._id || "");
      }
    }
  }, [isOpen, orderToEdit, user]);

  const filteredEmployees = users.filter(
    (u) =>
      u.branchId === selectedBranchId || u.branch?._id === selectedBranchId,
  );

  const handleAddProduct = () => {
    if (!selectedProduct) return;
    const exists = orderList.find((item) => item.productId === selectedProduct);
    if (exists) {
      setOrderList(
        orderList.map((item) =>
          item.productId === selectedProduct
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      const p = menuProducts.find((p) => p._id === selectedProduct);
      if (!p) return;
      setOrderList([
        ...orderList,
        {
          productId: selectedProduct,
          type: p.type || p.categoria || "Individual", // Fallback seguro
          name: p.name || p.nombre,
          price: p.price || p.precio,
          quantity: 1,
        },
      ]);
    }
    setSelectedProduct("");
  };

  const handleRemoveProduct = (id) =>
    setOrderList(orderList.filter((item) => item.productId !== id));
  const totalOrder = orderList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleSubmit = async () => {
    if (!selectedBranchId) return showError("Debes seleccionar una sucursal.");
    if (!selectedEmpleadoId) return showError("Debes seleccionar un empleado.");
    if (orderList.length === 0) return showError("Debes agregar productos.");

    try {
      if (orderToEdit) {
        await addItemsToExistingOrder(orderToEdit._id, orderList);
        showSuccess("Productos agregados y factura actualizada");
      } else {
        const finalEmpleadoId =
          selectedEmpleadoId.length < 24
            ? user?._id || user?.uid
            : selectedEmpleadoId;
        const orderData = {
          branchId: selectedBranchId,
          orderType: orderType,
          mesaId: orderType === "DINE_IN" ? mesaId : null,
          empleadoId: finalEmpleadoId,
        };
        await createFullOrder(orderData, orderList);
        showSuccess("Orden creada y facturada automáticamente");
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8 mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic text-gray-800 uppercase">
            {isEditMode ? "Editar" : "Nueva"}{" "}
            <span className="text-kinal-red">Orden</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-2xl"
          >
            ×
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* SELECTORES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-orange-50 p-5 rounded-2xl border border-orange-100">
            {/* SUCURSAL */}
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
                disabled={!!orderToEdit}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white font-bold text-gray-700 disabled:bg-gray-100"
              >
                <option value="">-- Seleccionar --</option>
                {branches?.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* EMPLEADO */}
            <div className="space-y-1">
              <label className="text-xs font-black text-kinal-orange uppercase tracking-widest">
                Empleado
              </label>
              <select
                value={selectedEmpleadoId}
                onChange={(e) => setSelectedEmpleadoId(e.target.value)}
                disabled={!selectedBranchId || !!orderToEdit}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white font-bold text-gray-700 disabled:bg-gray-100"
              >
                <option value="">-- Seleccionar --</option>
                {filteredEmployees.map((emp) => (
                  <option key={emp._id || emp.uid} value={emp._id || emp.uid}>
                    {emp.UserName} {emp.UserSurname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <OrderFormFields
            orderType={orderType}
            setOrderType={setOrderType}
            tables={tables}
            mesaId={mesaId}
            setMesaId={setMesaId}
          />

          <OrderCart
            menuProducts={menuProducts}
            orderList={orderList}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            onAdd={handleAddProduct}
            onRemove={handleRemoveProduct}
          />

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100 mt-4">
            <div className="text-left w-full sm:w-auto">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                Total a cobrar
              </p>
              <p className="text-4xl font-black text-kinal-red leading-none">
                Q {totalOrder.toFixed(2)}
              </p>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={orderList.length === 0}
                className={`px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg transition-all ${orderList.length > 0 ? "bg-kinal-red text-white hover:bg-red-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
              >
                Enviar a Cocina
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
