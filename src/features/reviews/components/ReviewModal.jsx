import { useState, useEffect } from "react";
import { useUserStore, useBranchStore } from "../../users/store/adminStore";

export const ReviewModal = ({ isOpen, onClose, reviewData, onSave }) => {
    const { users, getUsers } = useUserStore();
    const { branches, getBranches } = useBranchStore();
    const [formData, setFormData] = useState({ 
        rating: 5, 
        comment: "", 
        branch: "", 
        customer: "",
        isDeleted: false 
    });

    useEffect(() => {
        if (isOpen) { getUsers(); getBranches(); }
        if (reviewData && isOpen) {
            setFormData({
                ...reviewData,
                branch: reviewData.branch?._id || reviewData.branch,
                customer: reviewData.customer?._id || reviewData.customer?.uid || reviewData.customer,
                isDeleted: reviewData.isDeleted || false
            });
        } else if (isOpen) {
            setFormData({ rating: 5, comment: "", branch: "", customer: "", isDeleted: false });
        }
    }, [reviewData, isOpen, getUsers, getBranches]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Encontramos el objeto de la sucursal para que la tarjeta muestre el nombre
        const selectedBranchObj = branches.find(b => b._id === formData.branch);
        onSave({ 
            ...formData, 
            branch: selectedBranchObj || formData.branch 
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden">
                <div className="bg-[#e63946] p-8 text-white flex justify-between items-center">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                        {reviewData ? 'Moderar' : 'Nueva'} <span className="text-white">Reseña</span>
                    </h2>
                    <button onClick={onClose} className="text-3xl font-light hover:rotate-90 transition-all">×</button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="bg-gray-50 rounded-3xl p-5 text-center">
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button type="button" key={star} onClick={() => setFormData({...formData, rating: star})}
                                    className={`text-4xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Sucursal</label>
                            <select className="w-full px-5 py-4 rounded-2xl bg-gray-50 font-bold text-gray-600 outline-none border-none"
                                value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} required>
                                <option value="">Elegir...</option>
                                {branches?.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Cliente</label>
                            <select className="w-full px-5 py-4 rounded-2xl bg-gray-50 font-bold text-gray-600 outline-none border-none"
                                value={formData.customer} onChange={e => setFormData({...formData, customer: e.target.value})} required>
                                <option value="">Seleccionar...</option>
                                {users?.filter(u => u.role === 'CLIENT').map(u => <option key={u._id} value={u._id}>{u.UserName}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Comentario</label>
                        <textarea className="w-full px-6 py-4 rounded-[2rem] bg-gray-50 border-none h-28 outline-none resize-none font-medium text-gray-600"
                            placeholder="Comentario del cliente..." value={formData.comment}
                            onChange={e => setFormData({...formData, comment: e.target.value})} required />
                    </div>

                    {/* NUEVO CAMPO: ESTADO (OCULTAR) */}
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                        <input 
                            type="checkbox" 
                            id="isDeleted"
                            checked={formData.isDeleted}
                            onChange={(e) => setFormData({...formData, isDeleted: e.target.checked})}
                            className="w-5 h-5 accent-[#e63946]"
                        />
                        <label htmlFor="isDeleted" className="text-xs font-black text-gray-500 uppercase italic cursor-pointer">
                            Marcar como reseña oculta
                        </label>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-4 font-black text-gray-400 uppercase text-[10px]">Cerrar</button>
                        <button type="submit" className="flex-[2] bg-gray-900 text-white font-black py-5 rounded-2xl hover:bg-[#e63946] transition-all uppercase text-[10px] tracking-widest">
                            {reviewData ? 'Confirmar Cambios' : 'Publicar Reseña'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};