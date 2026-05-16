// features/orders/components/OrderView.jsx
import { useState, useEffect } from "react";
import { OrderHeader } from "./OrderHeader.jsx";
import { OrderTabs } from "./OrderTabs.jsx";
import { OrderGrid } from "./OrderGrid.jsx";
import { OrderModal } from "./OrderModal.jsx";
import { OrderDetailModal } from "./OrderDetailModal.jsx";
import { PaymentWizardModal } from "../../billing/components/PaymentModal.jsx";
import { useOrderActions } from "../hooks/useOrderActions.js";

export const OrderPage = () => {
  const [activeTab, setActiveTab] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedOrderToPay, setSelectedOrderToPay] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [orderToEdit, setOrderToEdit] = useState(null);

  const { orders, fetchOrders } = useOrderActions();

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

  const filteredOrders =
    activeTab === "Todos"
      ? orders
      : orders.filter((o) => o.estado === activeTab);

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn p-2 md:p-4">
      <OrderHeader onNewOrder={() => setIsModalOpen(true)} />
      <OrderTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
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
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setOrderToEdit(null);
          fetchOrders();
        }}
        orderToEdit={orderToEdit}
      />
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