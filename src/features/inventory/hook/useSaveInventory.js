import { useInventoryStore } from "../../users/store/adminStore.js";

export const useSaveInventory = () => {
    const createInventory = useInventoryStore((state) => state.createInventory);
    const updateInventory = useInventoryStore((state) => state.updateInventory);

    const saveInventory = async (data, inventoryId = null) => {
        // Estructuramos el payload basándonos en tu modelo de Inventory
        const inventoryPayload = {
            branchId: data.branchId,
            name: data.name,
            description: data.description,
            stock: Number(data.stock),
            unitCost: Number(data.unitCost)
        };

        if (inventoryId) {
            await updateInventory(inventoryId, inventoryPayload);
        } else {
            await createInventory(inventoryPayload);
        }
    };

    return { saveInventory };
};