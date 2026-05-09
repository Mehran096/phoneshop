import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../slices/cartSlice';
import { Link } from 'react-router-dom';

function CartScreen() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty <Link to="/" className="text-blue-600 hover:underline">Go Back</Link>
        </p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center border p-4 rounded">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                  <div>
                    <Link to={`/product/${item._id}`} className="font-semibold hover:underline">
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-600">${item.price} x {item.qty}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCartHandler(item._id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl mb-2">
              Subtotal ({cartItemsCount}) items: ${cartSubtotal.toFixed(2)}
            </h2>
            <button 
              disabled={cartItems.length === 0}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartScreen;