import { useForm } from 'react-hook-form';
import { useSaveEvent } from '../hooks/useSaveEvent';
import { useEffect } from 'react';
import { useBranchStore, useUserStore } from '../../users/store/adminStore';

export const EventModal = ({ isOpen, onClose, eventToEdit = null, onRefresh }) => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { saveEvent } = useSaveEvent();
    
    const { branches, getBranches } = useBranchStore();
    const { users, getUsers } = useUserStore();

    // Regla: 1 mes de anticipación mínima
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() + 1);
    const minDateStr = minDate.toISOString().split('T')[0];

    useEffect(() => {
        if (isOpen) {
            getBranches();
            getUsers();
        }
    }, [isOpen, getBranches, getUsers]);

    useEffect(() => {
        if (eventToEdit && isOpen) {
            const date = new Date(eventToEdit.eventDate).toISOString().split('T')[0];
            setValue('name', eventToEdit.name);
            setValue('eventDate', date);
            setValue('startTime', eventToEdit.startTime);
            setValue('endTime', eventToEdit.endTime);
            setValue('numberOfPersons', eventToEdit.numberOfPersons);
            setValue('status', eventToEdit.status || 'Pendiente');
            setValue('branchId', eventToEdit.branchId?._id || eventToEdit.branchId);
            setValue('clientId', eventToEdit.clientId?._id || eventToEdit.clientId || eventToEdit.clientId?.uid);
        } else {
            reset();
            setValue('status', 'Pendiente');
        }
    }, [eventToEdit, isOpen, setValue, reset]);

    const onSubmit = async (data) => {
        const success = await saveEvent(data, eventToEdit?._id);
        if (success) {
            onRefresh(); 
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 mx-4 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-black italic text-gray-800 uppercase tracking-tighter">
                        {eventToEdit ? 'Editar' : 'Nuevo'} <span className="text-kinal-red">Evento</span>
                    </h2>
                    <button onClick={onClose} className="text-gray-300 hover:text-gray-600 text-3xl font-light">×</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Nombre del Evento</label>
                        <input {...register('name', { required: true })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-700 outline-none" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Seleccionar Cliente</label>
                        <select 
                            {...register('clientId', { required: 'Cliente es requerido' })} 
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none" 
                            required
                        >
                            <option value="">Elegir cliente...</option>
                            {users && users.length > 0 && users.filter(u => u.role === 'CLIENT').map(user => (
                                <option key={user._id || user.uid} value={user._id || user.uid}>
                                    {user.UserName} {user.UserSurname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Sucursal</label>
                        <select 
                            {...register('branchId', { required: 'Sucursal es requerida' })} 
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none" 
                            required
                        >
                            <option value="">Elegir sucursal...</option>
                            {branches && branches.length > 0 && branches.map(branch => (
                                <option key={branch._id} value={branch._id}>
                                    {branch.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Fecha (Min. 1 mes)</label>
                        <input {...register('eventDate', { required: true })} type="date" min={minDateStr} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Personas</label>
                        <input {...register('numberOfPersons', { required: true })} type="number" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Inicio (07:00 - 22:00)</label>
                        <input {...register('startTime', { required: true })} type="time" min="07:00" max="22:00" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Fin (07:00 - 22:00)</label>
                        <input {...register('endTime', { required: true })} type="time" min="07:00" max="22:00" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600" />
                    </div>

                    <div className="col-span-2 space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Estado del Evento</label>
                        <select 
                            {...register('status')} 
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-600 outline-none"
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Confirmado">Confirmado</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>

                    <div className="col-span-2 pt-6 flex gap-4">
                        <button type="button" onClick={onClose} className="flex-1 py-4 font-black text-gray-400 uppercase text-[10px] tracking-widest hover:text-gray-600">Cancelar</button>
                        <button type="submit" className="flex-[2] bg-gray-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-kinal-red transition-all uppercase text-[10px] tracking-widest">
                            {eventToEdit ? 'Guardar Cambios' : 'Agendar Evento'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};