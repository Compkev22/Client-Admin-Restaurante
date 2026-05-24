import { useCouponStore } from "../../users/store/adminStore.js";

export const useSaveCoupon = () => {
    const createCoupon = useCouponStore((state) => state.createCoupon);
    const updateCoupon = useCouponStore((state) => state.updateCoupon);

    const saveCoupon = async (data, couponId = null) => {
        const couponPayload = {
            code: data.code.trim().toUpperCase(),
            discountPercentage: Number(data.discountPercentage),
            expirationDate: data.expirationDate,
            usageLimit: Number(data.usageLimit),
        };

        try {
            if (couponId) {
                await updateCoupon(couponId, couponPayload);
            } else {
                await createCoupon(couponPayload);
            }
        } catch (err) {
            // Re-lanzar el error para que el Modal pueda mostrar el mensaje real
            throw err;
        }
    };

    return { saveCoupon };
};