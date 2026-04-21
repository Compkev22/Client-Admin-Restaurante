export const CouponModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black italic text-gray-800 uppercase">
                        Nuevo <span className="text-kinal-red">Cupón</span>
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold">X</button>
                </div>

                <form className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-700">Código (code)</label>
                        <input type="text" name="code" maxLength="15" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none uppercase" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-700">Descuento % (discountPercentage)</label>
                        <input type="number" min="1" max="100" name="discountPercentage" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-gray-700">Expira (expirationDate)</label>
                            <input type="date" name="expirationDate" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-gray-700">Límite de Uso</label>
                            <input type="number" name="usageLimit" defaultValue="10" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-kinal-orange outline-none" />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 bg-kinal-orange text-white font-black py-3 rounded-xl shadow-lg hover:bg-orange-600 transition-all uppercase tracking-widest">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};