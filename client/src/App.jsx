import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Products from './pages/ProductPages/ProductListPage';
import ProductDetails from './pages/ProductPages/ProductDetailPage';
import Cart from './pages/UserPages/CartPage';
import Checkout from './pages/UserPages/CheckoutPage';
import Login from './pages/Login';
import Register from './pages/Register';
// import Login from './pages/AuthPages/LoginPage';
// import Signup from './pages/AuthPages/SignupPage';
// import NotFound from './pages/NotFoundPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetails />} /> 
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
