import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <Link to="/">PhoneStore</Link>
        <div className="flex gap-4">
          <Link to="/cart">Cart</Link>
          {userInfo ? (
            <>
              <Link to="/profile">{userInfo.name}</Link>
              <button onClick={logoutHandler}>Logout</button>
            </>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;






// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// function Header() {
//   const { cartItems } = useSelector((state) => state.cart);
  
//   // Sum all quantities instead of just counting items
//   const cartItemsCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

//   return (
//     <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
//       <Link to="/" className="text-xl font-bold">PhoneShop</Link>
      
//       <Link to="/cart" className="relative flex items-center">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//         </svg>
//         {cartItemsCount > 0 && (
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//             {cartItemsCount}
//           </span>
//         )}
//       </Link>
//     </header>
//   );
// }

// export default Header;