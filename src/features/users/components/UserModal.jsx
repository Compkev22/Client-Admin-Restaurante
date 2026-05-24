// src/features/users/components/UserModal.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSaveUser } from "../hooks/useSaveUser.js";
import { useBranchStore } from "../../users/store/adminStore.js";
import { UserFormFields } from "./UserFormFields.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const UserModal = ({ isOpen, onClose, userData = null }) => {
  const [selectedRole, setSelectedRole] = useState(userData?.role || "CLIENT");
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { saveUser } = useSaveUser();
  const branches = useBranchStore((state) => state.branches);

  useEffect(() => {
    if (userData) {
      reset({ ...userData, branchId: userData.branchId?._id || userData.branchId });
      setSelectedRole(userData.role);
    } else {
      reset({ role: "CLIENT", UserStatus: "ACTIVE" });
      setSelectedRole("CLIENT");
    }
  }, [userData, reset, isOpen]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      await saveUser(data, userData?.uid || userData?._id);
      showSuccess(userData ? "Usuario actualizado correctamente" : "Usuario creado correctamente");
      onClose();
    } catch (error) {
      showError(
        error?.response?.data?.message ||
          "Error al guardar el usuario. Revisa los datos e intenta de nuevo."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">

        {/* Cabecera fija */}
        <div className="bg-gray-50 px-6 md:px-8 py-5 md:py-6 border-b border-gray-100 flex justify-between items-center shrink-0 rounded-t-3xl">
          <h2 className="text-xl md:text-2xl font-black italic text-gray-800 uppercase">
            {userData ? "Editar" : "Nuevo"}{" "}
            <span className="text-kinal-red">Usuario</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 font-bold text-xl transition-colors"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        {/* Cuerpo con scroll */}
        <div className="overflow-y-auto flex-1 px-6 md:px-8 py-6">
          <form onSubmit={handleSubmit(onSubmit)} id="user-form">
            <UserFormFields
              register={register}
              errors={errors}
              userData={userData}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              setValue={setValue}
              branches={branches}
            />
          </form>
        </div>

        {/* Footer fijo */}
        <div className="shrink-0 px-6 md:px-8 pb-6 md:pb-8 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="user-form"
            className="flex-[2] bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest"
          >
            {userData ? "Actualizar" : "Crear"} Usuario
          </button>
        </div>
      </div>
    </div>
  );
};