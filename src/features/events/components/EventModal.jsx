export const EventModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black italic text-gray-800 uppercase">
                        Programar <span className="text-kinal-red">Evento</span>
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2 flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-700">Nombre del Evento</label>
                        <input type="text" name="name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
                    </div>

                    <div className="col-span-2 flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-700">Fecha del Evento (eventDate)</label>
                        <input type="date" name="eventDate" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-700">Hora Inicio</label>
                        <input type="time" name="startTime" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-700">Hora Fin</label>
                        <input type="time" name="endTime" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
                    </div>

                    <div className="col-span-2 flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-700">Cantidad de Personas</label>
                        <input type="number" min="1" name="numberOfPersons" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
                    </div>

                    <div className="col-span-2 flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-700">Notas Adicionales</label>
                        <textarea name="notes" rows="2" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none resize-none" />
                    </div>

                    <div className="col-span-2 pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 bg-kinal-red text-white font-black py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest">
                            Publicar Evento
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};