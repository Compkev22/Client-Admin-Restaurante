import { OrderCard } from "./OrderCard";

export const OrderGrid = ({ orders, onPay, onDetail }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {orders.map((order) => (
      <OrderCard key={order._id} order={order} onPay={onPay} onDetail={onDetail} onEdit={(o) => setOrderToEdit(o)} />
    ))}
  </div>
);