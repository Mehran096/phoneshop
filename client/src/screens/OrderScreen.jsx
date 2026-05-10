import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function OrderScreen() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setOrder(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!order) return <div className="text-center mt-10">Order not found</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Order {order._id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p><strong>Name:</strong> {order.user.name}</p>
          <p><strong>Email:</strong> {order.user.email}</p>
          <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
          <p className={order.isDelivered ? 'text-green-600' : 'text-red-600'}>
            {order.isDelivered ? `Delivered on ${order.deliveredAt}` : 'Not Delivered'}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Payment Method</h2>
          <p>{order.paymentMethod}</p>
          <p className={order.isPaid ? 'text-green-600' : 'text-red-600'}>
            {order.isPaid ? `Paid on ${order.paidAt}` : 'Not Paid'}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Order Items</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Product</th>
              <th className="border p-2 text-left">Qty</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.qty}</td>
                <td className="border p-2">${item.price}</td>
                <td className="border p-2">${item.qty * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-right">
        <p><strong>Items:</strong> ${order.itemsPrice}</p>
        <p><strong>Shipping:</strong> ${order.shippingPrice}</p>
        <p><strong>Tax:</strong> ${order.taxPrice}</p>
        <p><strong>Total:</strong> ${order.totalPrice}</p>
      </div>
    </div>
  );
}

export default OrderScreen;