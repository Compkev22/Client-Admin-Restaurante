import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSaveEvent } from '../hooks/useSaveEvent';
import { useBranchStore, useUserStore } from '../../users/store/adminStore';
import { EventFormFields } from './EventFormFields';

export const EventModal = ({ isOpen, onClose, eventToEdit = null, onRefresh }) => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { saveEvent } = useSaveEvent();
    const { branches, getBranches } = useBranchStore();
    const { users, getUsers } = useUserStore();

    const minDateStr = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0];

useEffect(() => {
    if (isOpen) {
        getBranches();
        getUsers();
    }

    if (eventToEdit && isOpen) {
        const date = new Date(eventToEdit.eventDate).toISOString().split('T')[0];
        reset({ 
            ...eventToEdit, 
            eventDate: date, 
            branchId: eventToEdit.branchId?._id || eventToEdit.branchId,
            clientId: eventToEdit.clientId?._id || eventToEdit.clientId?.uid || eventToEdit.clientId
        });
    } else { 
        reset({ status: 'Pendiente' }); 
    }
}, [eventToEdit, isOpen, reset, getBranches, getUsers]);

    const onSubmit = async (data) => {
        if (await saveEvent(data, eventToEdit?._id)) { onRefresh(); onClose(); }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-10 mx-4 overflow-y-auto max-h-[90vh]">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter">{eventToEdit ? 'Editar' : 'Nuevo'} <span className="text-kinal-red">Evento</span></h2>
                    <button onClick={onClose} className="text-gray-300 hover:text-gray-600 text-3xl">×</button>
                </header>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <EventFormFields register={register} branches={branches} users={users} minDateStr={minDateStr} />
                    <button type="submit" className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-kinal-red mt-6 uppercase text-[10px] tracking-widest">
                        {eventToEdit ? 'Guardar Cambios' : 'Agendar Evento'}
                    </button>
                </form>
            </div>
        </div>
    );
};