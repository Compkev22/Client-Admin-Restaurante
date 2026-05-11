import { useState, useEffect } from "react";
import { OrderFormFields } from "./OrderFormFields";
import { OrderCart } from "./OrderCart";
import { getMenu } from "../../../shared/api/admin";
import { useOrderActions } from "../hooks/useOrderActions";
import { useTableStore } from "../../users/store/adminStore";
import { useAuthStore } from "../../auth/store/authStore";

export const OrderModal = ({ isOpen, onClose }) => {
  const [orderType, setOrderType] = useState("TAKEAWAY"); // Por ahora usamos TAKEAWAY por defecto
  const [orderList, setOrderList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [menuProducts, setMenuProducts] = useState([]);
  const [mesaId, setMesaId] = useState("");

  const { saveOrder } = useOrderActions();
  const { tables, getTables } = useTableStore();
  const { user } = useAuthStore();
  useEffect(() => {
    if (isOpen) {
      // Traemos el Menú de la base de datos al abrir
      getMenu().then(res => setMenuProducts(res.data.menu || []));
      getTables(); 
      setOrderList([]);
      setMesaId("");
    }
  }, [isOpen, getTables]);

  const handleAddProduct = () => {
    if (!selectedProduct) return;
    const exists = orderList.find(item => item.productId === selectedProduct);
    if (exists) {
      setOrderList(orderList.map(item => item.productId === selectedProduct ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      const p = menuProducts.find(p => p._id === selectedProduct);
      // Mapeamos los campos según lo que devuelve tu backend de Menú
      setOrderList([...orderList, { productId: selectedProduct, type: p.type, name: p.name, price: p.price, quantity: 1 }]);
    }
    setSelectedProduct("");
  };

  const handleRemoveProduct = (id) => setOrderList(orderList.filter(item => item.productId !== id));
  const totalOrder = orderList.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSubmit = async () => {
    const orderData = {
      branchId: user?.branchId || user?.branch?._id, // <-- OJO: Reemplaza esto con un string de un ObjectId de tu Mongo
      orderType: orderType,
      mesaId: orderType === "DINE_IN" ? mesaId : null,
      empleadoId: user?._id || user?._id // <-- Usamos el ID del usuario autenticado
      // mesaId y empleadoId los mandaremos cuando conectemos el login y las mesas
    };
    console.log("Datos de la orden a enviar:", orderData);

    const success = await saveOrder(orderData, orderList);
    if (success) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8 mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic text-gray-800 uppercase">Nueva <span className="text-kinal-red">Orden</span></h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
        </div>
        <form className="space-y-6">
          <OrderFormFields orderType={orderType} setOrderType={setOrderType} tables={tables} mesaId={mesaId} setMesaId={setMesaId} />
          {/* Le pasamos el menú real al componente del carrito */}
          <OrderCart menuProducts={menuProducts} orderList={orderList} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} onAdd={handleAddProduct} onRemove={handleRemoveProduct} />
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
            <div className="text-left w-full sm:w-auto">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total</p>
              <p className="text-3xl font-black text-kinal-red leading-none">Q {totalOrder.toFixed(2)}</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button type="button" onClick={onClose} className="px-6 py-4 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50">Cancelar</button>
              {/* Cambiamos a handleSubmit */}
              <button type="button" onClick={handleSubmit} className={`px-8 py-4 rounded-xl font-black uppercase tracking-widest shadow-lg ${orderList.length > 0 ? 'bg-kinal-red text-white hover:bg-red-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                Enviar a Cocina
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};