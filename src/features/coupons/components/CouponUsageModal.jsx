import { useEffect, useState, useCallback } from "react";
import * as api from "../../../shared/api/admin.js";
import { Spinner } from "../../auth/components/Spinner.jsx";

const WEEK_DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const formatDate = (iso) => {
  const d = new Date(iso);
  return `${WEEK_DAYS[d.getDay()]} ${d.toLocaleDateString("es-GT", {
    day: "2-digit", month: "short", year: "numeric", timeZone: "America/Guatemala",
  })} — ${d.toLocaleTimeString("es-GT", { hour: "2-digit", minute: "2-digit", timeZone: "America/Guatemala" })}`;
};

const getWeekRange = () => {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const start = new Date(now);
  start.setDate(now.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

const isThisWeek = (isoDate) => {
  const { start, end } = getWeekRange();
  const d = new Date(isoDate);
  return d >= start && d <= end;
};

export const CouponUsageModal = ({ isOpen, onClose, coupon }) => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [page, setPage]       = useState(1);

  const fetchUsage = useCallback(async (p = 1) => {
    if (!coupon?._id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.getCouponUsage(coupon._id, p);
      setData(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar el historial");
    } finally {
      setLoading(false);
    }
  }, [coupon?._id]);

  useEffect(() => {
    if (isOpen) { setPage(1); fetchUsage(1); }
    else         { setData(null); setError(null); }
  }, [isOpen, fetchUsage]);

  const handlePage = (newPage) => { setPage(newPage); fetchUsage(newPage); };

  if (!isOpen) return null;

  const usages     = data?.usages ?? [];
  const pagination = data?.pagination ?? {};
  const totalPages = pagination.pages ?? 1;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-6 md:px-8 py-5 bg-kinal-red rounded-t-3xl flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-lg md:text-xl font-black uppercase italic text-white leading-tight">
              Historial de Uso
            </h2>
            <p className="text-red-200 text-xs font-medium mt-0.5">
              Cupón <span className="text-white font-black tracking-widest">{coupon?.code}</span>
              {" · "}{coupon?.discountPercentage}% descuento
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xl transition-colors"
            aria-label="Cerrar"
          >×</button>
        </div>

        {/* Stats bar */}
        {data && (
          <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100 shrink-0">
            <div className="px-4 py-3 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase">Total usos</p>
              <p className="text-xl font-black text-kinal-orange">{coupon?.usedCount ?? 0}</p>
            </div>
            <div className="px-4 py-3 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase">Límite</p>
              <p className="text-xl font-black text-gray-700">{coupon?.usageLimit}</p>
            </div>
            <div className="px-4 py-3 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase">Disponibles</p>
              <p className={`text-xl font-black ${(coupon?.usageLimit - coupon?.usedCount) <= 0 ? "text-red-500" : "text-green-500"}`}>
                {Math.max(0, (coupon?.usageLimit ?? 0) - (coupon?.usedCount ?? 0))}
              </p>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 md:px-8 py-5">
          {loading && (
            <div className="flex justify-center py-16"><Spinner /></div>
          )}

          {error && !loading && (
            <div className="text-center py-12 text-red-500 font-bold">{error}</div>
          )}

          {!loading && !error && usages.length === 0 && (
            <div className="text-center py-16 space-y-2">
              <p className="text-4xl">🎟️</p>
              <p className="text-gray-400 font-bold">Este cupón aún no ha sido usado por nadie.</p>
            </div>
          )}

          {!loading && !error && usages.length > 0 && (
            <div className="space-y-3">
              {usages.map((u, i) => {
                const thisWeek = isThisWeek(u.usedAt);
                const customer = u.customer;
                const name     = customer
                  ? `${customer.UserName ?? ""} ${customer.UserSurname ?? ""}`.trim() || "—"
                  : "Usuario eliminado";
                const email    = customer?.UserEmail ?? "—";
                const initials = name !== "—"
                  ? name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
                  : "?";

                return (
                  <div
                    key={u._id ?? i}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:bg-orange-50/40 transition-colors"
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-kinal-red/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-black text-kinal-red">{initials}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-sm truncate">{name}</p>
                      <p className="text-xs text-gray-400 truncate">{email}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(u.usedAt)}</p>
                    </div>

                    {/* Badge semana actual */}
                    {thisWeek && (
                      <span className="shrink-0 px-2.5 py-1 bg-orange-100 text-orange-600 text-[10px] font-black rounded-full uppercase whitespace-nowrap">
                        Esta semana
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-6 md:px-8 py-4 border-t border-gray-100 flex items-center justify-between shrink-0">
            <button
              onClick={() => handlePage(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 rounded-xl bg-gray-100 text-sm font-bold text-gray-500 hover:bg-gray-200 disabled:opacity-30 transition-colors"
            >← Anterior</button>
            <span className="text-xs font-bold text-gray-400">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => handlePage(page + 1)}
              disabled={page >= totalPages}
              className="px-4 py-2 rounded-xl bg-gray-100 text-sm font-bold text-gray-500 hover:bg-gray-200 disabled:opacity-30 transition-colors"
            >Siguiente →</button>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 md:px-8 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-200 transition-all"
          >CERRAR</button>
        </div>
      </div>
    </div>
  );
};
