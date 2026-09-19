import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home/Home';
import Login from '../pages/login/Login';
import Layout from '../components/Layout/Layout';
import ProductDetails from '../pages/productDetails/ProductDetails';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/checkout/Checkout';


function myRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout> <HomePage /> </Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element=
          {<Layout> <ProductDetails /> </Layout>} />
        <Route path="/cart" element=
          {<Layout> <Cart /> </Layout>} />
        <Route path="/checkout" element=
          {<Layout> <Checkout /> </Layout>} />
      </Routes>
    </Router>
  );
}

export default myRoutes;