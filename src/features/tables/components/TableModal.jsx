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
      setValue("branchId", tableData.branchId?._id || tableData.branch?._id || "");
      setValue("numberTable", tableData.numberTable);
      setValue("capacity", tableData.capacity);
      setValue("availability", tableData.availability);
      setValue("TableStatus", tableData.TableStatus);
      setValue("coordsX", tableData.Coordinates?.[0] ?? tableData.coords?.[0] ?? 0);
      setValue("coordsY", tableData.Coordinates?.[1] ?? tableData.coords?.[1] ?? 0);
    } else {
      reset();
    }
  }, [tableData, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        numberTable: Number(data.numberTable),
        capacity: Number(data.capacity),
        coords: [Number(data.coordsX), Number(data.coordsY)],
      };
      if (tableData) {
        await updateTable(tableData._id, formattedData);
        showSuccess("Mesa actualizada correctamente");
      } else {
        await createTable(formattedData);
        showSuccess("Mesa creada correctamente");
      }
      onClose();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "No se pudo guardar la mesa";
      showError(msg);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">

        {/* Cabecera fija */}
        <div className="bg-gray-50 px-6 md:px-8 py-5 md:py-6 border-b border-gray-100 flex justify-between items-center shrink-0 rounded-t-3xl">
          <div>
            <h2 className="text-xl md:text-2xl font-black italic text-gray-800 uppercase">
              {tableData ? "Editar" : "Nueva"}{" "}
              <span className="text-kinal-red">Mesa</span>
            </h2>
            <p className="text-xs md:text-sm font-bold text-gray-400">
              Configuración de espacios y capacidad.
            </p>
          </div>
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
          <form onSubmit={handleSubmit(onSubmit)} id="table-form">
            <TableFormFields register={register} errors={errors} branches={branches} />
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
            form="table-form"
            className="flex-[2] bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest"
          >
            {tableData ? "Actualizar Mesa" : "Guardar Mesa"}
          </button>
        </div>
      </div>
    </div>
  );
};