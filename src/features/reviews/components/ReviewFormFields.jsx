// src/features/reviews/components/ReviewFormFields.jsx
export const ReviewFormFields = ({ formData, setFormData, branches, users }) => (
  <div className="space-y-5">
    <div className="bg-gray-50 rounded-3xl p-5 text-center">
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setFormData({ ...formData, rating: star })}
            className={`text-3xl md:text-4xl transition-colors ${star <= formData.rating ? "text-yellow-400" : "text-gray-200"}`}
          >
            ★
          </button>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Sucursal</label>
        <select
          className="w-full px-5 py-4 rounded-2xl bg-gray-50 font-bold text-gray-600 outline-none border-none"
          value={formData.branch}
          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
          required
        >
          <option value="">Elegir...</option>
          {branches?.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Cliente</label>
        <select
          className="w-full px-5 py-4 rounded-2xl bg-gray-50 font-bold text-gray-600 outline-none border-none"
          value={formData.customer}
          onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
          required
        >
          <option value="">Seleccionar...</option>
          {users?.filter((u) => u.role === "CLIENT").map((u) => (
            <option key={u._id} value={u._id}>{u.UserName}</option>
          ))}
        </select>
      </div>
    </div>

    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-2 italic">Comentario</label>
      <textarea
        className="w-full px-5 md:px-6 py-4 rounded-[2rem] bg-gray-50 border-none h-28 outline-none resize-none font-medium text-gray-600"
        placeholder="Comentario del cliente..."
        value={formData.comment}
        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        required
      />
    </div>

    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
      <input
        type="checkbox"
        id="isDeleted"
        checked={formData.isDeleted}
        onChange={(e) => setFormData({ ...formData, isDeleted: e.target.checked })}
        className="w-5 h-5 accent-[#e63946] shrink-0"
      />
      <label htmlFor="isDeleted" className="text-xs font-black text-gray-500 uppercase italic cursor-pointer">
        Marcar como reseña oculta
      </label>
    </div>
  </div>
);