import { useState } from "react";
import { axiosAdmin } from "../../../shared/api/api";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const useSaveBilling = () => {
    const [loading, setLoading] = useState(false);

    const saveBilling = async (data) => {
        setLoading(true);

        try {
            let finalClientId = data.client;

            // ================= CREAR CLIENTE =================
            if (data.isCreatingClient) {

                const userPayload = {
                    UserName: data.newClient.UserName,
                    UserSurname: data.newClient.UserSurname,
                    UserEmail: data.newClient.UserEmail,
                    password: "KinalTemporary123!",
                    role: "CLIENT"
                };

                const userResponse = await axiosAdmin.post("/users", userPayload);

                const createdUser =
                    userResponse.data.data ||
                    userResponse.data.user ||
                    userResponse.data;

                finalClientId =
                    createdUser._id ||
                    createdUser.uid;

                if (!finalClientId) {
                    throw new Error("No se pudo obtener el ID del cliente");
                }
            }

            // ================= FACTURA =================
            const billingPayload = {
                branchId: data.branchId,
                client: finalClientId,
                Order: data.Order,
                BillSerie:
                    data.BillSerie ||
                    `KFC-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,

                BillSubtotal: Number(data.BillSubtotal),
                BillIVA: Number(data.BillIVA),
                BillTotal: Number(data.BillTotal),
                BillPaymentMethod: data.BillPaymentMethod,
                BillStatus: data.BillStatus || "PAYED"
            };

            console.log("BILLING PAYLOAD:", billingPayload);

            const billingResponse = await axiosAdmin.post(
                "/billings",
                billingPayload
            );

            showSuccess("Factura creada correctamente");

            return billingResponse.data;

        } catch (error) {
            console.error(error);
            showError(
                error.response?.data?.message ||
                error.message ||
                "Error al crear factura"
            );
            return null;
        } finally {

            setLoading(false);
        }
    };
    return {
        loading,
        saveBilling
    };
};