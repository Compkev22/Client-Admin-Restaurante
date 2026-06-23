import { useEffect, useState } from "react";
import { useCouponStore } from "../../users/store/adminStore.js";
import { CouponModal } from "./CouponModal.jsx";
import { CouponUsageModal } from "./CouponUsageModal.jsx";
import { CouponHeader } from "./CouponHeader.jsx";
import { CouponTable } from "./CouponTable.jsx";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { showError } from "../../../shared/utils/toast.js";

export const CouponPage = () => {
  const { coupons, loading, error, getCoupons, deleteCoupon } = useCouponStore();
  const [isModalOpen, setIsModalOpen]           = useState(false);
  const [isUsageModalOpen, setIsUsageModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon]     = useState(null);

  useEffect(() => { getCoupons(); }, [getCoupons]);
  useEffect(() => { if (error) showError(error); }, [error]);

  const handleEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedCoupon(null);
    setIsModalOpen(true);
  };

  const handleHistory = (coupon) => {
    setSelectedCoupon(coupon);
    setIsUsageModalOpen(true);
  };

  const handleToggleStatus = (coupon) => {
    const action = coupon.status === "ACTIVE" ? "desactivar/eliminar" : "activar";
    showConfirmToast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Cupón`,
      message: `¿Estás seguro de que deseas ${action} el código ${coupon.code}?`,
      onConfirm: () => deleteCoupon(coupon._id),
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn p-4">
      <CouponHeader onCreateClick={handleCreate} />
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <CouponTable
          coupons={coupons}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onToggleStatus={handleToggleStatus}
          onHistory={handleHistory}
        />
      </div>
      <CouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        coupon={selectedCoupon}
      />
      <CouponUsageModal
        isOpen={isUsageModalOpen}
        onClose={() => setIsUsageModalOpen(false)}
        coupon={selectedCoupon}
      />
    </div>
  );
};