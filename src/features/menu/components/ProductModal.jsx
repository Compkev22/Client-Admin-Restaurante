import { useEffect, useState } from "react";
import iconDelete from "../../../assets/icons/Delete.svg";
import {
  useBranchStore,
  useInventoryStore
} from "../../users/store/adminStore";
import { useSaveProduct } from "../hooks/useSaveProduct";

export const ProductModal = ({
  isOpen,
  onClose,
  productData = null
}) => {

  const { branches, getBranches } = useBranchStore();

  const {
    inventory: inventories,
    getInventory
  } = useInventoryStore();

  console.log("INVENTORIES:", inventories);

  const { saveProduct } = useSaveProduct();

  const [selectedIngredient, setSelectedIngredient] = useState("");

  const [ingredientList, setIngredientList] = useState([]);

  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    estado: "Disponible",
    ProductStatus: "ACTIVE",
    imagen: null,
    Branches: []
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {

    if (isOpen) {
      getBranches();
      getInventory();
    }

    if (productData && isOpen) {

      setFormData({
        nombre: productData.nombre || "",
        categoria: productData.categoria || "",
        precio: productData.precio || "",
        estado: productData.estado || "Disponible",
        ProductStatus: productData.ProductStatus || "ACTIVE",
        imagen: null,

        Branches:
          productData.Branches?.map(
            (b) => b.BranchId?._id || b.BranchId
          ) || []
      });

      setIngredientList(
        productData.ingredientes?.map((item) => ({
          inventoryId:
            item.inventoryId?._id || item.inventoryId,

          nombre:
            item.inventoryId?.name || "Ingrediente",

          cantidadUsada:
            item.cantidadUsada || 1
        })) || []
      );

    } else if (isOpen) {

      setFormData({
        nombre: "",
        categoria: "",
        precio: "",
        estado: "Disponible",
        ProductStatus: "ACTIVE",
        imagen: null,
        Branches: []
      });

      setIngredientList([]);
    }

  }, [
    productData,
    isOpen,
    getBranches,
    getInventory
  ]);

  useEffect(() => {
    if (!isOpen) return;

    if (productData?.imagen_url) {
      setPreview(productData.imagen_url);
    } else {
      setPreview(null);
    }
  }, [isOpen, productData]);

  useEffect(() => {
    if (!isOpen) return;

    if (formData.imagen) {
      const file = formData.imagen;
      const url = URL.createObjectURL(file);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [formData.imagen, isOpen]);

  if (!isOpen) return null;

  const handleAddIngredient = () => {

    if (!selectedIngredient) return;

    const existingIngredient = ingredientList.find(
      (item) => item.inventoryId === selectedIngredient
    );

    if (existingIngredient) {

      setIngredientList(
        ingredientList.map((item) =>
          item.inventoryId === selectedIngredient
            ? {
              ...item,
              cantidadUsada: item.cantidadUsada + 1
            }
            : item
        )
      );

    } else {

      const ingredientData = inventories.find(
        (inv) => inv._id === selectedIngredient
      );

      if (!ingredientData) return;

      setIngredientList([
        ...ingredientList,
        {
          inventoryId: ingredientData._id,
          nombre: ingredientData.name,
          cantidadUsada: 1
        }
      ]);
    }

    setSelectedIngredient("");
  };

  const handleQuantityChange = (id, value) => {

    setIngredientList(
      ingredientList.map((item) =>
        item.inventoryId === id
          ? {
            ...item,
            cantidadUsada: parseInt(value) || 1
          }
          : item
      )
    );
  };

  const handleRemoveIngredient = (id) => {

    setIngredientList(
      ingredientList.filter(
        (item) => item.inventoryId !== id
      )
    );
  };

  const handleBranchChange = (branchId) => {

    const exists = formData.Branches.includes(branchId);

    if (exists) {

      setFormData({
        ...formData,
        Branches: formData.Branches.filter(
          (id) => id !== branchId
        )
      });

    } else {

      setFormData({
        ...formData,
        Branches: [
          ...formData.Branches,
          branchId
        ]
      });
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const { ProductStatus, deletedAt, ...restOfData } = formData;

    await saveProduct(
      {
        ...restOfData,

        ingredientes: ingredientList.map((item) => ({
          inventoryId: item.inventoryId,
          cantidadUsada: item.cantidadUsada
        })),

        Branches: formData.Branches.map((id) => ({
          BranchId: id
        }))
      },
      productData?._id
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-black italic text-gray-800 uppercase">
            {productData ? "Editar" : "Nuevo"}{" "}
            <span className="text-kinal-red">
              Producto
            </span>
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* DATOS */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">

            {/* PREVIEW */}
            <div className="col-span-2 flex justify-center">
              <div className="w-28 h-28 rounded-2xl bg-gray-100 border flex items-center justify-center overflow-hidden shadow-inner">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">
                    Sin imagen
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-2 flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">
                Nombre
              </label>

              <input
                type="text"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nombre: e.target.value
                  })
                }
                placeholder="Ej: Hamburguesa Clásica"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">
                Precio
              </label>

              <input
                type="number"
                step="0.01"
                value={formData.precio}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    precio: e.target.value
                  })
                }
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">
                Categoría
              </label>

              <input
                type="text"
                value={formData.categoria}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoria: e.target.value
                  })
                }
                placeholder="Ej: Hamburguesas"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">
                Estado
              </label>

              <select
                value={formData.estado}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estado: e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none"
              >
                <option value="Disponible">
                  Disponible
                </option>

                <option value="Agotado">
                  Agotado
                </option>

                <option value="Descontinuado">
                  Descontinuado
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">
                Estatus
              </label>

              <select
                value={formData.ProductStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ProductStatus: e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none"
              >
                <option value="ACTIVE">
                  Activo
                </option>

                <option value="INACTIVE">
                  Inactivo
                </option>
              </select>
            </div>

            {/* IMAGEN */}
            <div className="col-span-2 flex flex-col gap-1">

              <label className="text-sm font-bold text-gray-700">
                Imagen
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    imagen: e.target.files[0]
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* SUCURSALES */}
          <div>

            <label className="text-sm font-black text-kinal-orange uppercase tracking-wider mb-3 block">
              Sucursales disponibles
            </label>

            <div className="grid grid-cols-2 gap-3">

              {branches?.map((branch) => (

                <label
                  key={branch._id}
                  className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 cursor-pointer"
                >

                  <input
                    type="checkbox"
                    checked={formData.Branches.includes(branch._id)}
                    onChange={() =>
                      handleBranchChange(branch._id)
                    }
                    className="w-4 h-4 accent-kinal-red"
                  />

                  <span className="font-bold text-gray-700 text-sm">
                    {branch.name}
                  </span>
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

            {/* SELECT */}
            <div className="flex gap-2 mb-4">

              <select
                value={selectedIngredient}
                onChange={(e) =>
                  setSelectedIngredient(e.target.value)
                }
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none"
              >

                <option value="">
                  -- Selecciona un ingrediente --
                </option>

                {inventories?.map((inv) => (

                  <option
                    key={inv._id}
                    value={inv._id}
                  >
                    {inv.name} (Stock: {inv.stock})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleAddIngredient}
                className="bg-kinal-orange text-white font-black px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors"
              >
                Agregar
              </button>
            </div>

            {/* TABLA */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden min-h-[120px]">

              {ingredientList.length > 0 ? (

                <table className="w-full text-left">

                  <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-black">

                    <tr>
                      <th className="p-3">
                        Ingrediente
                      </th>

                      <th className="p-3 w-28 text-center">
                        Cantidad
                      </th>

                      <th className="p-3 w-16 text-center">
                        X
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-50">

                    {ingredientList.map((item) => (

                      <tr
                        key={item.inventoryId}
                        className="hover:bg-gray-50/50"
                      >

                        <td className="p-3 font-bold text-gray-700">
                          {item.nombre}
                        </td>

                        <td className="p-3">

                          <input
                            type="number"
                            min="1"
                            value={item.cantidadUsada}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.inventoryId,
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 text-center font-bold rounded-lg border border-gray-200 outline-none"
                          />
                        </td>

                        <td className="p-3 text-center">

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveIngredient(
                                item.inventoryId
                              )
                            }
                            className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                          >

                            <img
                              src={iconDelete}
                              alt="Delete"
                              className="w-5 h-5 opacity-70 hover:opacity-100"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              ) : (

                <div className="text-center py-8">

                  <p className="text-gray-400 font-bold text-sm">
                    Este producto aún no tiene ingredientes.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* BOTONES */}
          <div className="pt-4 flex gap-3 border-t border-gray-100">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={ingredientList.length === 0}
              className="flex-1 bg-kinal-red text-white font-black py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};