// ComboModal.jsx
import { useState, useEffect } from "react";
import { useComboStore } from "../../users/store/adminStore.js";
import { getProducts } from "../../../shared/api/admin.js";
import { ComboListTable } from "./ComboListTable.jsx";
import { ComboImageUpload } from "./ComboImageUpload.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

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
          i.productId === selectedProduct ? { ...i, cantidad: i.cantidad + 1 } : i
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

    const name = formData.ComboName.trim();
    const desc = formData.ComboDescription.trim();

    if (!name || name.length < 3) {
      return showError("El nombre debe tener al menos 3 caracteres");
    }
    if (!desc || desc.length < 5) {
      return showError("La descripción debe tener al menos 5 caracteres");
    }
    if (comboList.length === 0) {
      return showError("El combo debe tener al menos un producto");
    }

    const discount = Number(formData.ComboDiscount) || 0;
    if (discount < 0 || discount > 100) {
      return showError("El descuento debe estar entre 0 y 100");
    }

    const payload = new FormData();
    payload.append("ComboName", name);
    payload.append("ComboDescription", desc);
    payload.append("ComboDiscount", discount);
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

    try {
      const result = comboData
        ? await updateCombo(comboData._id, payload)
        : await saveCombo(payload);

      if (result) {
        showSuccess(comboData ? "Combo actualizado con éxito" : "Combo creado con éxito");
        onClose();
      } else {
        showError("Error al guardar el combo");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Error al guardar el combo";
      showError(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">

        {/* Encabezado fijo */}
        <div className="flex justify-between items-center px-6 md:px-8 pt-6 md:pt-8 pb-4 shrink-0">
          <h2 className="text-xl md:text-2xl font-black italic text-gray-800 uppercase">
            {comboData ? "Editar" : "Armar"}{" "}
            <span className="text-kinal-red">Combo</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 font-bold text-xl transition-colors"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-6 md:px-8 pb-6 md:pb-8 flex-1">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Imagen */}
            <ComboImageUpload preview={preview} onFileChange={handleFileChange} />

            {/* Datos básicos */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <input
                type="text"
                placeholder="Nombre del Combo"
                value={formData.ComboName}
                onChange={(e) => setFormData({ ...formData, ComboName: e.target.value })}
                required
                minLength={3}
                maxLength={100}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange text-sm"
              />
              <textarea
                placeholder="Descripción del combo (ej: 2 piezas de pollo...)"
                value={formData.ComboDescription}
                onChange={(e) => setFormData({ ...formData, ComboDescription: e.target.value })}
                required
                minLength={5}
                maxLength={300}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange h-20 resize-none text-sm"
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
                  onInput={(e) => {
                    if (e.target.value < 0) e.target.value = 0;
                    if (e.target.value > 100) e.target.value = 100;
                  }}
                  onChange={(e) => setFormData({ ...formData, ComboDiscount: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-kinal-orange text-sm"
                />
              </div>
            </div>

            {/* Agregar producto */}
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm bg-white"
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
                className="w-full sm:w-auto bg-kinal-orange text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition-colors text-sm"
              >
                Agregar
              </button>
            </div>

            <ComboListTable
              comboList={comboList}
              onQuantityChange={(id, qty) =>
                setComboList(
                  comboList.map((i) =>
                    i.productId === id ? { ...i, cantidad: parseInt(qty) || 1 } : i
                  )
                )
              }
              onRemove={(id) => setComboList(comboList.filter((i) => i.productId !== id))}
            />

            {/* Botones */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-kinal-red text-white py-3 rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-red-700 transition-colors"
              >
                {comboData ? "Guardar Cambios" : "Guardar Combo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};