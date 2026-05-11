// src/features/users/components/UserModal.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSaveUser } from "../hooks/useSaveUser";
import { useBranchStore } from "../../users/store/adminStore";
import { UserFormFields } from "./UserFormFields";

export const UserModal = ({ isOpen, onClose, userData = null }) => {
  const [selectedRole, setSelectedRole] = useState(userData?.role || "CLIENT");
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { saveUser } = useSaveUser();
  const branches = useBranchStore((state) => state.branches);

  useEffect(() => {
    if (userData) {
      reset({
        ...userData,
        branchId: userData.branchId?._id || userData.branchId
      });
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
      onClose();
    } catch (error) { console.error(error); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <header className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-black italic text-gray-800 uppercase">
            {userData ? 'Editar' : 'Nuevo'} <span className="text-kinal-red">Usuario</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 font-bold text-2xl transition-colors">×</button>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <UserFormFields 
            register={register} userData={userData} selectedRole={selectedRole} 
            setSelectedRole={setSelectedRole} setValue={setValue} branches={branches} 
          />
          <footer className="pt-4 flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500">Cancelar</button>
            <button type="submit" className="flex-2 bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest">
              {userData ? 'Actualizar' : 'Crear'} Usuario
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};