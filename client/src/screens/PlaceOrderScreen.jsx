import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCartItems } from '../slices/cartSlice';
import { toast } from 'react-toastify'; // npm i react-toastify

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  // Redirect if shipping or payment missing
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  // Calculate prices
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
  const taxPrice = 0.15 * itemsPrice; // 15% tax
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        }),
        
      });
      
      const data = await res.json();
      
      if (res.ok) {
        dispatch(clearCartItems()); // Add this reducer to cartSlice
        navigate(`/order/${data._id}`); // We'll build OrderScreen next
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error placing order');
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Order Summary</h1>
          
          <div className="space-y-6">
            <div className="border rounded p-4">
              <h2 className="text-xl font-semibold mb-2">Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </div>

            <div className="border rounded p-4">
              <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
              <p><strong>Method: </strong>{cart.paymentMethod}</p>
            </div>

            <div className="border rounded p-4">
              <h2 className="text-xl font-semibold mb-2">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <p>Cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <Link to={`/product/${item._id}`} className="flex-1">
                        {item.name}
                      </Link>
                      <div>
                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="border rounded p-4">
            <h2 className="text-xl font-semibold mb-4">Order Total</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Items</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0}
              className="w-full bg-gray-800 text-white py-2 rounded mt-4 hover:bg-gray-700 disabled:bg-gray-400"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;