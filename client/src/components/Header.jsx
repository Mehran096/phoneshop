import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <header className="bg-white shadow-md py-4">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    PhoneShop
                </Link>
                <Link to="/cart" className="relative flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cartItems.length}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
}

export default Header;