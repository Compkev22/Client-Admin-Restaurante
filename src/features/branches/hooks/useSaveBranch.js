import { useBranchStore } from "../../users/store/adminStore";

export const useSaveBranch = () => {
  const createBranch = useBranchStore((state) => state.createBranch);
  const updateBranch = useBranchStore((state) => state.updateBranch);

  const saveBranch = async (data, branchId = null) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("zone", data.zone);
    formData.append("phone", data.phone);
    formData.append("Email", data.Email);
    formData.append("Category", data.Category);
    formData.append("OpenedAt", data.OpenedAt);
    formData.append("ClosedAt", data.ClosedAt);

    if (data.photo && data.photo.length > 0) {
      formData.append("Photos", data.photo[0]);
    }

    if (branchId) {
      await updateBranch(branchId, formData);
    } else {
      await createBranch(formData);
    }
  };

  return { saveBranch };
};