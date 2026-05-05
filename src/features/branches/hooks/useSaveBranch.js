import { useBranchStore } from "../../users/store/adminStore";

export const useSaveBranch = () => {
  const createBranch = useBranchStore((state) => state.createBranch);
  const updateBranch = useBranchStore((state) => state.updateBranch);

  const saveBranch = async (data, branchId = null) => {
    const formData = new FormData();
    
    // Agregamos todos los campos de texto
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("zone", data.zone);
    formData.append("phone", data.phone);
    formData.append("Email", data.Email);
    formData.append("Category", data.Category);
    formData.append("OpenedAt", data.OpenedAt);
    formData.append("ClosedAt", data.ClosedAt);

    // Si tu modal en el futuro tiene un input file de imagen, se agrega así:
    // Ojo: tu backend espera que el archivo se llame 'Photos'
    if (data.image && data.image.length > 0) {
      formData.append("Photos", data.imgae[0]);
    }

    if (branchId) {
      await updateBranch(branchId, formData);
    } else {
      await createBranch(formData);
    }
  };

  return { saveBranch };
};