import { useState, useEffect } from "react";
import { useComboStore } from "../../users/store/adminStore";
import { getProducts } from "../../../shared/api/admin";
import { ComboListTable } from "./ComboListTable";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const ComboModal = ({ isOpen, onClose }) => {
  const [comboData, setComboData] = useState({ 
    ComboName: "", 
    ComboPrice: "", 
    ComboDescription: "" 
  });
  const [comboList, setComboList] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const { saveCombo } = useComboStore();

  useEffect(() => {
    if (isOpen) {
      getProducts().then(res => setAvailableProducts(res.data.data));
    }
  }, [isOpen]);

  const handleAddProduct = () => {
    if (!selectedProduct) return;
    const p = availableProducts.find(p => p._id === selectedProduct);
    const exists = comboList.find(item => item.productId === selectedProduct);
    
    if (exists) {
      setComboList(comboList.map(i => i.productId === selectedProduct ? { ...i, cantidad: i.cantidad + 1 } : i));
    } else {
      setComboList([...comboList, { productId: p._id, nombre: p.nombre, precio: p.precio, cantidad: 1 }]);
    }
    setSelectedProduct("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comboList.length === 0) return showError("El combo debe tener productos");

    const finalData = {
        ...comboData,
        ComboPrice: Number(comboData.ComboPrice),
        ComboList: comboList.map(item => ({ productId: item.productId, cantidad: item.cantidad }))
    };
    
    const success = await saveCombo(finalData);
    if (success) {
        showSuccess("Combo creado con éxito");
        setComboList([]);
        setComboData({ ComboName: "", ComboPrice: "", ComboDescription: "" });
        onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-black italic text-gray-800 uppercase mb-6">
          Armar <span className="text-kinal-red">Combo</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <input 
              type="text" 
              placeholder="Nombre del Combo"
              value={comboData.ComboName}
              onChange={e => setComboData({...comboData, ComboName: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange" 
            />
            <textarea 
              placeholder="Descripción del combo (ej: 2 piezas de pollo...)"
              value={comboData.ComboDescription}
              onChange={e => setComboData({...comboData, ComboDescription: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange h-20 resize-none" 
            />
            <input 
              type="number" 
              placeholder="Precio Final (Q)"
              value={comboData.ComboPrice}
              onChange={e => setComboData({...comboData, ComboPrice: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange font-bold text-kinal-red" 
            />
          </div>

          <div className="flex gap-2">
            <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none">
                <option value="">Selecciona producto...</option>
                {availableProducts.map(p => <option key={p._id} value={p._id}>{p.nombre} (Q{p.precio})</option>)}
            </select>
            <button type="button" onClick={handleAddProduct} className="bg-kinal-orange text-white px-6 rounded-xl font-bold hover:bg-orange-600 transition-colors">Agregar</button>
          </div>

          <ComboListTable 
            comboList={comboList} 
            onQuantityChange={(id, qty) => setComboList(comboList.map(i => i.productId === id ? {...i, cantidad: parseInt(qty) || 1} : i))}
            onRemove={(id) => setComboList(comboList.filter(i => i.productId !== id))}
          />

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500">Cancelar</button>
            <button type="submit" className="flex-[2] bg-kinal-red text-white py-3 rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-red-700">Guardar Combo</button>
          </div>
        </form>
      </div>
    </div>
  );
};