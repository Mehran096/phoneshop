import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [userInfo, navigate]);

  const createProductHandler = async () => {
    setLoadingCreate(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        navigate(`/admin/product/${data._id}/edit`);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error creating product');
    } finally {
      setLoadingCreate(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      setLoadingDelete(true);
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (res.ok) {
          fetchProducts(); // Refresh list
        } else {
          const data = await res.json();
          alert(data.message);
        }
      } catch (err) {
        alert('Error deleting product');
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={createProductHandler}
          disabled={loadingCreate}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loadingCreate? 'Creating...' : 'Create Product'}
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">NAME</th>
            <th className="border p-2 text-left">PRICE</th>
            <th className="border p-2 text-left">CATEGORY</th>
            <th className="border p-2 text-left">BRAND</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="border p-2">{product._id.substring(0, 8)}...</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">{product.brand}</td>
              <td className="border p-2">
                <Link
                  to={`/admin/product/${product._id}/edit`}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteHandler(product._id)}
                  disabled={loadingDelete}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm disabled:bg-gray-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductListScreen;