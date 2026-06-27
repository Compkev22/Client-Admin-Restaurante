import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSaveEvent } from "../hooks/useSaveEvent.js";
import { useBranchStore, useUserStore } from "../../users/store/adminStore.js";
import { EventFormFields } from "./EventFormFields.jsx";

export const EventModal = ({ isOpen, onClose, eventToEdit = null, onRefresh }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { saveEvent } = useSaveEvent();
  const { branches, getBranches } = useBranchStore();
  const { users, getUsers } = useUserStore();

  const minDateStr = new Date(new Date().setMonth(new Date().getMonth() + 1))
    .toISOString()
    .split("T")[0];

useEffect(() => {
    if (!isOpen) return;
    getBranches();
    getUsers();
}, [isOpen, getBranches, getUsers]);

useEffect(() => {
    if (!isOpen) return;
    if (!branches.length || !users.length) return;

    if (eventToEdit) {
        const date = new Date(eventToEdit.eventDate)
            .toISOString().split('T')[0];
        reset({
            ...eventToEdit,
            eventDate: date,
            branchId: eventToEdit.branchId?._id || eventToEdit.branchId,
            clientId: eventToEdit.clientId?._id ||
                      eventToEdit.clientId?.uid  ||
                      eventToEdit.clientId,
        });
    } else {
        reset({ status: 'Pendiente' });
    }
}, [isOpen, eventToEdit, branches, users, reset]);

  const onSubmit = async (data) => {
    if (await saveEvent(data, eventToEdit?._id)) {
      onRefresh();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl flex flex-col max-h-[92vh]">

        {/* Encabezado fijo */}
        <header className="flex justify-between items-center px-6 md:px-8 pt-6 md:pt-8 pb-4 shrink-0 border-b border-gray-100">
          <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter">
            {eventToEdit ? "Editar" : "Nuevo"}{" "}
            <span className="text-kinal-red">Evento</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 font-bold text-xl transition-colors"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </header>

        <div className="overflow-y-auto px-6 md:px-8 py-6 md:py-8 flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <EventFormFields
              register={register}
              errors={errors}
              branches={branches}
              users={users}
              minDateStr={minDateStr}
            />
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-gray-900 text-white font-black py-3 rounded-xl shadow-xl hover:bg-kinal-red transition-colors uppercase text-xs tracking-widest"
              >
                {eventToEdit ? "Guardar Cambios" : "Agendar Evento"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};