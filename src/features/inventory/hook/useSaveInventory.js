import { useInventoryStore } from "../../users/store/adminStore.js";

export const useSaveInventory = () => {
    const createInventory = useInventoryStore((state) => state.createInventory);
    const updateInventory = useInventoryStore((state) => state.updateInventory);

    const saveInventory = async (data, inventoryId = null) => {
        const inventoryPayload = {
            branchId: data.branchId,
            name: data.name.trim(),
            description: data.description.trim(),
            stock: Number(data.stock),
            unitCost: Number(data.unitCost),
        };

        try {
            if (inventoryId) {
                await updateInventory(inventoryId, inventoryPayload);
            } else {
                await createInventory(inventoryPayload);
            }
        } catch (err) {
            throw err;
        }
    };

    return { saveInventory };
};