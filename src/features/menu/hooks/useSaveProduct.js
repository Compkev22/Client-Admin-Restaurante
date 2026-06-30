import { useProductStore } from "../../users/store/adminStore";

export const useSaveProduct = () => {

  const {
    createProduct,
    updateProduct
  } = useProductStore();

  const saveProduct = async (data, id = null) => {
    try {
      const payload = {
        nombre: data.nombre,
        categoria: data.categoria,
        precio: Number(data.precio),
        estado: data.estado,
        ProductStatus: data.ProductStatus,
        imagen: data.imagen,
        ingredientes: data.ingredientes,
        Branches: data.Branches
      };
      if (id) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      return true;
    } catch (error) {
      // Relanzar para que ProductModal pueda capturarlo y mostrar el mensaje real
      throw error;
    }
  };
  return { saveProduct };
};