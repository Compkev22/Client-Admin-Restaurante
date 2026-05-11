// features/tables/components/TableModal.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTableStore, useBranchStore } from "../../users/store/adminStore.js";
import { showSuccess, showError } from "../../../shared/utils/toast.js";
import { TableFormFields } from "./TableFormFields.jsx";

export const TableModal = ({ isOpen, onClose, tableData = null }) => {
  const { createTable, updateTable } = useTableStore();
  const { branches, getBranches } = useBranchStore();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (isOpen) getBranches();
  }, [isOpen, getBranches]);

  useEffect(() => {
    if (tableData) {
      setValue("branch", tableData.branch?._id || "");
      setValue("numberTable", tableData.numberTable);
      setValue("capacity", tableData.capacity);
      setValue("availability", tableData.availability);
      setValue("TableStatus", tableData.TableStatus);
      setValue("coordsX", tableData.coords?.[0] || 0);
      setValue("coordsY", tableData.coords?.[1] || 0);
    } else {
      reset();
    }
  }, [tableData, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      const formattedData = { ...data, coords: [Number(data.coordsX), Number(data.coordsY)] };
      if (tableData) {
        await updateTable(tableData._id, formattedData);
        showSuccess("Mesa actualizada");
      } else {
        await createTable(formattedData);
        showSuccess("Mesa creada");
      }
      onClose();
    } catch {
      showError("No se pudo guardar la mesa");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic text-gray-800 uppercase">
              {tableData ? "Editar" : "Nueva"} <span className="text-kinal-red">Mesa</span>
            </h2>
            <p className="text-sm font-bold text-gray-400">Configuración de espacios y capacidad.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-2xl transition-colors">×</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <TableFormFields register={register} errors={errors} branches={branches} />
          <div className="pt-4 flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500">Cancelar</button>
            <button type="submit" className="flex-2 bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg uppercase tracking-widest">Guardar Mesa</button>
          </div>
        </form>
      </div>
    </div>
  );
};