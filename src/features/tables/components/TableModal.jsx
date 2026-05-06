import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTableStore, useBranchStore } from "../../users/store/adminStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const TableModal = ({ isOpen, onClose, tableData = null }) => {
    const { createTable, updateTable } = useTableStore();
    const { branches, getBranches } = useBranchStore(); // Para cargar sucursales reales
    
    const { register, handleSubmit, reset, setValue } = useForm();

    // Cargar sucursales al abrir el modal
    useEffect(() => {
        if (isOpen) getBranches();
    }, [isOpen, getBranches]);

    // Llenar formulario si es edición
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
            // Formateamos las coordenadas antes de enviar
            const formattedData = {
                ...data,
                coords: [Number(data.coordsX), Number(data.coordsY)]
            };

            if (tableData) {
                await updateTable(tableData._id, formattedData);
                showSuccess("Mesa actualizada");
            } else {
                await createTable(formattedData);
                showSuccess("Mesa creada");
            }
            onClose();
        } catch (error) {
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
                            {tableData ? 'Editar' : 'Nueva'} <span className="text-kinal-red">Mesa</span>
                        </h2>
                        <p className="text-sm font-bold text-gray-400">Configuración de espacios y capacidad.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-2xl transition-colors">×</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1 col-span-2">
                            <label className="text-sm font-bold text-gray-700">Sucursal</label>
                            <select {...register("branch", { required: true })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium">
                                <option value="">Selecciona la sucursal...</option>
                                {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-gray-700">Número de Mesa</label>
                            <input {...register("numberTable", { required: true })} type="number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-black text-gray-700" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-gray-700">Capacidad (Personas)</label>
                            <input {...register("capacity", { required: true })} type="number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none font-bold text-gray-700" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-orange-50 p-5 rounded-2xl border border-orange-100">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-gray-700">Disponibilidad Actual</label>
                            <select {...register("availability")} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium">
                                <option value="Disponible">🟢 Disponible</option>
                                <option value="Ocupada">🔴 Ocupada</option>
                                <option value="Mantenimiento">🟡 Mantenimiento</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-gray-700">Estado del Registro</label>
                            <select {...register("TableStatus")} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none bg-white font-medium">
                                <option value="ACTIVE">Activo</option>
                                <option value="INACTIVE">Inactivo (Soft Delete)</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1 col-span-2 mt-2">
                            <label className="text-sm font-bold text-gray-700 flex justify-between">
                                <span>Coordenadas en el Mapa (X, Y)</span>
                            </label>
                            <div className="flex gap-2">
                                <input {...register("coordsX")} type="number" placeholder="X" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-mono text-gray-500" />
                                <input {...register("coordsY")} type="number" placeholder="Y" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none font-mono text-gray-500" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3 mt-6">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500">Cancelar</button>
                        <button type="submit" className="flex-2 bg-kinal-red text-white font-black py-3 px-8 rounded-xl shadow-lg uppercase tracking-widest">Guardar Mesa</button>
                    </div>
                </form>
            </div>
        </div>
    );
};