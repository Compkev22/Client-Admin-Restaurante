// features/menu/components/ProductModal.jsx
import { useEffect, useState } from "react";
import iconDelete from "../../../assets/icons/Delete.svg";
import { useBranchStore, useInventoryStore } from "../../users/store/adminStore.js";
import { useSaveProduct } from "../hooks/useSaveProduct.js";
import { ProductFormFields } from "./ProductFormFields.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const ProductModal = ({ isOpen, onClose, productData = null }) => {
  const { branches, getBranches } = useBranchStore();
  const { inventory: inventories, getInventory } = useInventoryStore();
  const { saveProduct } = useSaveProduct();

  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    estado: "Disponible",
    ProductStatus: "ACTIVE",
    imagen: null,
    Branches: [],
  });

  useEffect(() => {
    if (isOpen) {
      getBranches();
      getInventory();
    }
    if (productData && isOpen) {
      setFormData({
        nombre:        productData.nombre        || "",
        categoria:     productData.categoria     || "",
        precio:        productData.precio        || "",
        estado:        productData.estado        || "Disponible",
        ProductStatus: productData.ProductStatus || "ACTIVE",
        imagen:        null,
        Branches:      productData.Branches?.map((b) => b.BranchId?._id || b.BranchId) || [],
      });
      setIngredientList(
        productData.ingredientes?.map((item) => ({
          inventoryId:   item.inventoryId?._id || item.inventoryId,
          nombre:        item.inventoryId?.name || "Ingrediente",
          cantidadUsada: item.cantidadUsada || 1,
        })) || []
      );
    } else if (isOpen) {
      setFormData({
        nombre: "", categoria: "", precio: "",
        estado: "Disponible", ProductStatus: "ACTIVE",
        imagen: null, Branches: [],
      });
      setIngredientList([]);
    }
  }, [productData, isOpen, getBranches, getInventory]);

  useEffect(() => {
    if (!isOpen) return;
    setPreview(productData?.imagen_url || null);
  }, [isOpen, productData]);

  useEffect(() => {
    if (!isOpen || !formData.imagen) return;
    const url = URL.createObjectURL(formData.imagen);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [formData.imagen, isOpen]);

  if (!isOpen) return null;

  const handleAddIngredient = () => {
    if (!selectedIngredient) return;
    const exists = ingredientList.find((i) => i.inventoryId === selectedIngredient);
    if (exists) {
      setIngredientList(
        ingredientList.map((i) =>
          i.inventoryId === selectedIngredient
            ? { ...i, cantidadUsada: i.cantidadUsada + 1 }
            : i
        )
      );
    } else {
      const data = inventories.find((inv) => inv._id === selectedIngredient);
      if (!data) return;
      setIngredientList([
        ...ingredientList,
        { inventoryId: data._id, nombre: data.name, cantidadUsada: 1 },
      ]);
    }
    setSelectedIngredient("");
  };

  const handleBranchChange = (branchId) => {
    const exists = formData.Branches.includes(branchId);
    setFormData({
      ...formData,
      Branches: exists
        ? formData.Branches.filter((id) => id !== branchId)
        : [...formData.Branches, branchId],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones frontend antes de enviar
    if (!formData.nombre?.trim() || formData.nombre.trim().length < 2) {
      return showError("El nombre del producto debe tener al menos 2 caracteres.");
    }
    if (!formData.categoria?.trim() || formData.categoria.trim().length < 2) {
      return showError("La categoría debe tener al menos 2 caracteres.");
    }
    if (!formData.precio || Number(formData.precio) <= 0) {
      return showError("El precio debe ser mayor a Q0.00.");
    }
    if (formData.Branches.length === 0) {
      return showError("Debes seleccionar al menos una sucursal.");
    }

    try {
      const { ProductStatus, deletedAt, ...restOfData } = formData;
      await saveProduct(
        {
          ...restOfData,
          nombre:    formData.nombre.trim(),
          categoria: formData.categoria.trim(),
          ingredientes: ingredientList.map((i) => ({
            inventoryId:   i.inventoryId,
            cantidadUsada: i.cantidadUsada,
          })),
          Branches: formData.Branches.map((id) => ({ BranchId: id })),
        },
        productData?._id
      );
      showSuccess(productData ? "Producto actualizado correctamente" : "Producto creado correctamente");
      onClose();
    } catch (error) {
      showError(
        error?.response?.data?.message || "Error al guardar el producto. Revisa los datos."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">

        {/* Encabezado fijo */}
        <div className="flex justify-between items-center px-6 md:px-8 pt-6 md:pt-8 pb-4 shrink-0 border-b border-gray-100">
          <h2 className="text-xl md:text-2xl font-black italic text-gray-800 uppercase">
            {productData ? "Editar" : "Nuevo"}{" "}
            <span className="text-kinal-red">Producto</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 font-bold text-xl transition-colors"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        {/* Cuerpo con scroll */}
        <div className="overflow-y-auto px-6 md:px-8 py-6 md:py-8 flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">

            <ProductFormFields formData={formData} setFormData={setFormData} preview={preview} />

            {/* SUCURSALES */}
            <div>
              <label className="text-sm font-black text-kinal-orange uppercase tracking-wider mb-3 block">
                Sucursales disponibles
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {branches?.map((branch) => (
                  <label
                    key={branch._id}
                    className="flex items-center gap-3 bg-gray-50 p-3 md:p-4 rounded-xl border border-gray-100 cursor-pointer hover:bg-orange-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.Branches.includes(branch._id)}
                      onChange={() => handleBranchChange(branch._id)}
                      className="w-4 h-4 accent-kinal-red shrink-0"
                    />
                    <span className="font-bold text-gray-700 text-sm">{branch.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* INGREDIENTES */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-black text-kinal-orange uppercase tracking-wider">
                  Ingredientes
                </label>
                <span className="text-xs font-bold text-gray-400">
                  {ingredientList.length} agregados
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <select
                  value={selectedIngredient}
                  onChange={(e) => setSelectedIngredient(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none text-sm"
                >
                  <option value="">-- Selecciona un ingrediente --</option>
                  {inventories?.map((inv) => (
                    <option key={inv._id} value={inv._id}>
                      {inv.name} (Stock: {inv.stock})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="w-full sm:w-auto bg-kinal-orange text-white font-black px-6 py-2.5 rounded-xl hover:bg-orange-600 transition-colors text-sm"
                >
                  Agregar
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden min-h-[100px]">
                {ingredientList.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[340px]">
                      <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-black">
                        <tr>
                          <th className="p-3">Ingrediente</th>
                          <th className="p-3 w-24 text-center">Cantidad</th>
                          <th className="p-3 w-14 text-center">X</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {ingredientList.map((item) => (
                          <tr key={item.inventoryId} className="hover:bg-gray-50/50">
                            <td className="p-3 font-bold text-gray-700 text-sm">{item.nombre}</td>
                            <td className="p-3">
                              <input
                                type="number"
                                min="1"
                                max="9999"
                                value={item.cantidadUsada}
                                onChange={(e) =>
                                  setIngredientList(
                                    ingredientList.map((i) =>
                                      i.inventoryId === item.inventoryId
                                        ? { ...i, cantidadUsada: Math.max(1, parseInt(e.target.value) || 1) }
                                        : i
                                    )
                                  )
                                }
                                className="w-full px-2 py-1 text-center font-bold rounded-lg border border-gray-200 outline-none text-sm"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <button
                                type="button"
                                onClick={() =>
                                  setIngredientList(
                                    ingredientList.filter((i) => i.inventoryId !== item.inventoryId)
                                  )
                                }
                                className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                                aria-label="Eliminar ingrediente"
                              >
                                <img src={iconDelete} alt="Delete" className="w-5 h-5 opacity-70 hover:opacity-100" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 font-bold text-sm">
                      Este producto aún no tiene ingredientes.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Botones finales */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-kinal-red text-white font-black py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest"
              >
                Guardar Producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};