// ComboModal.jsx
import { useState, useEffect } from "react";
import { useComboStore } from "../../users/store/adminStore";
import { getProducts } from "../../../shared/api/admin";
import { ComboListTable } from "./ComboListTable";
import { ComboImageUpload } from "./ComboImageUpload";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const ComboModal = ({ isOpen, onClose, comboData = null }) => {
  const [formData, setFormData] = useState({
    ComboName: "",
    ComboDescription: "",
    ComboDiscount: 0,
  });
  const [comboList, setComboList] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { saveCombo, updateCombo } = useComboStore();

  // Cargar productos y precargar datos si es edición
  useEffect(() => {
    if (!isOpen) return;

    getProducts().then((res) => setAvailableProducts(res.data.data));

    if (comboData) {
      setFormData({
        ComboName: comboData.ComboName || "",
        ComboDescription: comboData.ComboDescription || "",
        ComboDiscount: comboData.ComboDiscount || 0,
      });
      setComboList(
        comboData.ComboList?.map((item) => ({
          productId: item.productId?._id || item.productId,
          nombre: item.productId?.nombre || "Producto",
          precio: item.productId?.precio || 0,
          cantidad: item.cantidad,
        })) || []
      );
      setPreview(comboData.image?.url || null);
    } else {
      setFormData({ ComboName: "", ComboDescription: "", ComboDiscount: 0 });
      setComboList([]);
      setPreview(null);
    }

    setImageFile(null);
  }, [isOpen, comboData]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddProduct = () => {
    if (!selectedProduct) return;
    const p = availableProducts.find((p) => p._id === selectedProduct);
    const exists = comboList.find((item) => item.productId === selectedProduct);

    if (exists) {
      setComboList(
        comboList.map((i) =>
          i.productId === selectedProduct
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        )
      );
    } else {
      setComboList([
        ...comboList,
        { productId: p._id, nombre: p.nombre, precio: p.precio, cantidad: 1 },
      ]);
    }
    setSelectedProduct("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comboList.length === 0) return showError("El combo debe tener productos");

    // Usar FormData para enviar imagen + datos juntos
    const payload = new FormData();
    payload.append("ComboName", formData.ComboName);
    payload.append("ComboDescription", formData.ComboDescription);
    payload.append("ComboDiscount", Number(formData.ComboDiscount) || 0);
    payload.append(
      "ComboList",
      JSON.stringify(
        comboList.map((item) => ({
          productId: item.productId,
          cantidad: item.cantidad,
        }))
      )
    );
    if (imageFile) payload.append("image", imageFile);

    const success = comboData
      ? await updateCombo(comboData._id, payload)
      : await saveCombo(payload);

    if (success) {
      showSuccess(comboData ? "Combo actualizado con éxito" : "Combo creado con éxito");
      onClose();
    } else {
      showError("Error al guardar el combo");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic text-gray-800 uppercase">
            {comboData ? "Editar" : "Armar"}{" "}
            <span className="text-kinal-red">Combo</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* IMAGEN */}
          <ComboImageUpload preview={preview} onFileChange={handleFileChange} />

          {/* DATOS */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <input
              type="text"
              placeholder="Nombre del Combo"
              value={formData.ComboName}
              onChange={(e) =>
                setFormData({ ...formData, ComboName: e.target.value })
              }
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange"
            />
            <textarea
              placeholder="Descripción del combo (ej: 2 piezas de pollo...)"
              value={formData.ComboDescription}
              onChange={(e) =>
                setFormData({ ...formData, ComboDescription: e.target.value })
              }
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange h-20 resize-none"
            />

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                Descuento del Combo (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Ej: 10"
                value={formData.ComboDiscount}
                onChange={(e) =>
                  setFormData({ ...formData, ComboDiscount: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange"
              />
            </div>
          </div>

          {/* AGREGAR PRODUCTO */}
          <div className="flex gap-2">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none"
            >
              <option value="">Selecciona producto...</option>
              {availableProducts.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.nombre} (Q{p.precio})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddProduct}
              className="bg-kinal-orange text-white px-6 rounded-xl font-bold hover:bg-orange-600 transition-colors"
            >
              Agregar
            </button>
          </div>

          <ComboListTable
            comboList={comboList}
            onQuantityChange={(id, qty) =>
              setComboList(
                comboList.map((i) =>
                  i.productId === id
                    ? { ...i, cantidad: parseInt(qty) || 1 }
                    : i
                )
              )
            }
            onRemove={(id) =>
              setComboList(comboList.filter((i) => i.productId !== id))
            }
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-[2] bg-kinal-red text-white py-3 rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-red-700"
            >
              {comboData ? "Guardar Cambios" : "Guardar Combo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};