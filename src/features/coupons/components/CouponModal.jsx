// features/coupons/components/CouponModal.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSaveCoupon } from "../hook/useSaveCoupon.js";
import { useCouponStore } from "../../users/store/adminStore.js";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { CouponFormFields } from "./CouponFormFields.jsx";

export const CouponModal = ({ isOpen, onClose, coupon }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();
  const { saveCoupon } = useSaveCoupon();
  const loading = useCouponStore((state) => state.loading);

  useEffect(() => {
    if (!isOpen) return;
    if (coupon) {
      const formattedDate = coupon.expirationDate
        ? new Date(coupon.expirationDate).toISOString().split("T")[0]
        : "";
      reset({
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
        expirationDate: formattedDate,
        usageLimit: coupon.usageLimit,
      });
    } else {
      reset({ code: "", discountPercentage: "", expirationDate: "", usageLimit: 10 });
    }
  }, [isOpen, coupon, reset]);

  const onSubmit = async (data) => {
    try {
      await saveCoupon(data, coupon?._id);
      showSuccess(coupon ? "Cupón actualizado" : "Cupón creado exitosamente");
      onClose();
    } catch {
      showError("Error al procesar el cupón");
    }
  };

  const handleClose = () => {
    if (isDirty) {
      showConfirmToast({
        title: "Cerrar Editor",
        message: "Tienes cambios sin guardar. ¿Deseas salir de todos modos?",
        onConfirm: () => {
          reset();
          onClose();
        },
      });
    } else {
      reset();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col max-h-[92vh]">

        {/* Cabecera fija con banda de color */}
        <div className="px-6 md:px-8 py-5 md:py-6 bg-kinal-red rounded-t-3xl flex justify-between items-center shrink-0">
          <h2 className="text-lg md:text-xl font-black uppercase italic text-white">
            {coupon ? "Editar Cupón" : "Nuevo Cupón"}
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xl transition-colors"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        {/* Cuerpo con scroll */}
        <div className="overflow-y-auto px-6 md:px-8 py-6 md:py-8 flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <CouponFormFields register={register} errors={errors} />

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-200 transition-all"
              >
                CANCELAR
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none px-8 py-3 bg-kinal-red text-white rounded-2xl font-black shadow-lg shadow-red-200 hover:scale-105 transition-all disabled:opacity-50 flex justify-center items-center"
              >
                {loading ? <Spinner small /> : coupon ? "ACTUALIZAR" : "CREAR CUPÓN"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};