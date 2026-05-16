// features/orders/components/OrderGrid.jsx
import { OrderCard } from "./OrderCard.jsx";

export const OrderGrid = ({ orders, onPay, onDetail, onEdit }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
    {orders.map((order) => (
      <OrderCard
        key={order._id}
        order={order}
        onPay={onPay}
        onDetail={onDetail}
        onEdit={onEdit}
      />
    ))}
  </div>
);