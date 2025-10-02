import { Routes, Route } from "react-router-dom";
import Menu from './screen/menu';
import Cart from "./screen/cart";
import Order from "./screen/order";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order/>} />
    </Routes>
  )
}

export default App
