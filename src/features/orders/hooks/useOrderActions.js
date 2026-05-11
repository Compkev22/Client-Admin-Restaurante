import { useCallback } from "react";
import { useOrderStore } from "../../users/store/adminStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const useOrderActions = () => {
    const { 
        orders, 
        currentOrderDetails, 
        loading, 
        getOrders, 
        getOrderDetails, 
        createFullOrder, 
        changeOrderStatus 
    } = useOrderStore();

    const fetchOrders = useCallback(async (branchId) => {
            await getOrders(branchId ? { branchId } : {});
        
    }, [getOrders]);

    const fetchOrderDetails = useCallback(async (orderId) => {
        if (orderId) {
            return await getOrderDetails(orderId);
        }
    }, [getOrderDetails]);

    const saveOrder = async (orderData, cartItems) => {
        if (cartItems.length === 0) {
            showError("No puedes enviar una orden vacía");
            return false;
        }

        try {
            await createFullOrder(orderData, cartItems);
            showSuccess("Orden enviada a cocina exitosamente");
            return true;
        } catch (error) {
            showError("Hubo un problema al crear la orden");
            return false;
        }
    };

    const updateStatus = async (id, newStatus) => {
        const success = await changeOrderStatus(id, newStatus);
        if (success) {
            showSuccess(`La orden ahora está: ${newStatus}`);
        } else {
            showError("No se pudo actualizar el estado");
        }
        return success;
    };

    const addItemsToOrder = async (orderId, newItems) => {
    if (newItems.length === 0) {
        showError("No hay productos nuevos para agregar");
        return false;
    }
    try {
        for (const item of newItems) {
            await api.createOrderDetail({
                order: orderId,
                productoId: item.type === 'Individual' ? item.productId : null,
                comboId: item.type === 'Combo' ? item.productId : null,
                cantidad: item.quantity
            });
        }
        await api.syncBillingWithOrder(orderId);
        await getOrders({});
        showSuccess("Productos agregados a la orden");
        return true;
    } catch (error) {
        showError("Error al agregar productos a la orden");
        return false;
    }
};

    return {
        orders,
        currentOrderDetails,
        loading,
        fetchOrders,
        fetchOrderDetails,
        saveOrder,
        updateStatus
    };
};