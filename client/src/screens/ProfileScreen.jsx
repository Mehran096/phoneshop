import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

function ProfileScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Don't render anything if userInfo is null
  if (!userInfo) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="space-y-4">
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <button
          onClick={logoutHandler}
          className="bg-red-500 text-white p-2 rounded mr-2"
        >
          Logout
        </button>
        <Link to="/myorders" className="inline-block bg-blue-500 text-white p-2 rounded">
          My Orders
        </Link>
      </div>
    </div>
  );
}

export default ProfileScreen;