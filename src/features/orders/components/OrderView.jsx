import { useState, useEffect } from "react";
import { OrderHeader } from "./OrderHeader";
import { OrderTabs } from "./OrderTabs";
import { OrderGrid } from "./OrderGrid";
import { OrderModal } from "./OrderModal";
import { OrderDetailModal } from "./OrderDetailModal";
import { PaymentWizardModal } from "../../billing/components/PaymentModal";
import { useOrderActions } from "../hooks/useOrderActions";

export const OrderPage = () => {
  const [activeTab, setActiveTab] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedOrderToPay, setSelectedOrderToPay] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [orderToEdit, setOrderToEdit] = useState(null);

  // 1. Extraemos las órdenes reales y la función para recargarlas
  const { orders, fetchOrders } = useOrderActions();

  // 2. Cargamos las órdenes al abrir la página
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const tabs = [
    "Todos",
    "Pendiente",
    "En Preparacion",
    "Listo",
    "Entregado",
    "Cancelado",
  ];
  // 3. Filtramos la data real
  const filteredOrders =
    activeTab === "Todos"
      ? orders
      : orders.filter((o) => o.estado === activeTab);

  return (
    <div className="space-y-8 animate-fadeIn p-6">
      <OrderHeader onNewOrder={() => setIsModalOpen(true)} />
      <OrderTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <OrderGrid
        orders={filteredOrders}
        onPay={(order) => {
          setSelectedOrderToPay(order);
          setIsPaymentOpen(true);
        }}
        onDetail={(order) => {
          setSelectedOrderDetails(order);
          setIsDetailOpen(true);
        }}
        onEdit={(order) => {
          setOrderToEdit(order);
          setIsModalOpen(true);
        }}
      />
      {/* Pasamos fetchOrders para que la lista se actualice al cerrar los modales */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setOrderToEdit(null);
          fetchOrders();
        }}
        orderToEdit={orderToEdit}
      />{" "}
      <PaymentWizardModal
        isOpen={isPaymentOpen}
        onClose={() => {
          setIsPaymentOpen(false);
          fetchOrders();
        }}
        orderData={selectedOrderToPay}
      />
      <OrderDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        orderData={selectedOrderDetails}
      />
    </div>
  );
};
