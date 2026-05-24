import { useUserStore } from "../store/adminStore.js";

export const useSaveUser = () => {
  const createUser = useUserStore((state) => state.createUser);
  const updateUser = useUserStore((state) => state.updateUser);

  const saveUser = async (data, userId = null) => {
    const formData = new FormData();

    formData.append("UserName",    data.UserName?.trim());
    formData.append("UserSurname", data.UserSurname?.trim());
    formData.append("UserEmail",   data.UserEmail?.trim().toLowerCase());
    formData.append("role",        data.role);
    formData.append("UserStatus",  data.UserStatus);

    if (!userId) {
      formData.append("password", data.password);
    }

    if (['BRANCH_ADMIN', 'EMPLOYEE'].includes(data.role) && data.branchId) {
      formData.append("branchId", data.branchId);
    }

    if (userId) {
      await updateUser(userId, formData);
    } else {
      await createUser(formData);
    }
  };

  return { saveUser };
};