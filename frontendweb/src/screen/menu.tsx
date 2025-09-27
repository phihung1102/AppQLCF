import { useEffect, useState } from "react";
import { ProductApi, type Product } from "../api/productApi";
import ProductCard from "./productCard";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-fontawesome";
import { Icons } from "../utils/icons";

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    ProductApi.getAvailable().then((res) => setProducts(res.data));
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="bg-[#F1E0C6] p-4">
      <h1 className="text-[#795548] text-2xl font-bold mb-4">Menu</h1>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-8">
          <Fa icon={Icons.coffee} className="text-6xl mb-4 animate-bounce" />
          <p className="text-xl">Hiện tại chưa có sản phẩm</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
        </div>
      )}
    </div>
  );
}
