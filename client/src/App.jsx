import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <>
      <Header />
      <main className="py-4">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
        </Routes>
      </main>
    </>
  );
}

export default App;