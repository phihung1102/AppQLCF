import { useEffect, useState } from "react";
import { ProductApi, type Product } from "../api/productApi";
import { CartApi, type Cart, type CartItem } from "../api/cartApi";
import ProductCard from "./productCard";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-fontawesome";
import { Icons } from "../utils/icons";
import { getProductImage } from "../utils/imageHelper";
import { useNavigation } from "../navigation";

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);
  const { gotoCart, gotoOrder } = useNavigation();
  const table_number = 1;

  useEffect(() => {
    ProductApi.getAvailable().then((res) => setProducts(res.data));
    CartApi.getByTable(table_number)
      .then((res) => setCart(res.data || null))
      .catch(err => console.error(err));
  }, []);

  // Thêm sản phẩm
  const handleAddToCart = async (product: Product) => {
    if (!cart) return;

    const existing = cart.items.find((i) => i.product.id === product.id);
    if (existing) {
      const newQty = existing.quantity + 1;
      await CartApi.updateItem(Number(existing.id), newQty);
      setCart((prev) => prev && {
        ...prev,
        items: prev.items.map((i) =>
          i.id === existing.id ? { ...i, quantity: newQty } : i
        )
      });
    } else {
      const res = await CartApi.addItem(Number(cart.id), Number(product.id), 1);
      const newItem: CartItem = {
        id: res.data.id,
        quantity: 1,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image?.url ?? null,
          category: undefined,
        },
      };
      setCart((prev) => prev && { ...prev, items: [...prev.items, newItem] });
    }
  };

  const handleDecrease = async (item: CartItem) => {
    if (!cart) return;
    const newQty = item.quantity - 1;
    if (newQty <= 0) {
      await CartApi.removeItem(item.id);
      setCart((prev) => prev && { ...prev, items: prev.items.filter((i) => i.id !== item.id) });
    } else {
      await CartApi.updateItem(item.id, newQty);
      setCart((prev) => prev && {
        ...prev,
        items: prev.items.map((i) => i.id === item.id ? { ...i, quantity: newQty } : i)
      });
    }
  };

  const handleIncrease = async (item: CartItem) => {
    if (!cart) return;
    const newQty = item.quantity + 1;
    await CartApi.updateItem(item.id, newQty);
    setCart((prev) => prev && {
      ...prev,
      items: prev.items.map((i) => i.id === item.id ? { ...i, quantity: newQty } : i)
    });
  };

  const groupByCategory = (items: Product[]) => {
    return items.reduce<Record<string, Product[]>>((acc, product) => {
      const categoryName = product.category_name || "Khác";
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(product);
      return acc;
    }, {});
  };

  return (
    <div className="bg-[#F1E0C6] p-4 relative min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[#795548] text-2xl font-bold">Menu</h1>
        <button onClick={() => gotoOrder({ table_number })}>
          <Fa icon={Icons.clipboardList} className="text-2xl text-[#795548]" />
        </button>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-8">
          <Fa icon={Icons.coffee} className="text-6xl mb-4 animate-bounce" />
          <p className="text-xl">Hiện tại chưa có sản phẩm</p>
        </div>
      ) : (
        Object.entries(groupByCategory(products)).map(([category, items]: [string, Product[]]) => (
          <div key={category} className="mb-6">
            <h2 className="text-xl font-bold text-[#795548] mb-2">{category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((p: Product) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  cartItem={cart?.items.find((i) => i.product.id === p.id)}
                  onAdd={handleAddToCart}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
              ))}
            </div>
          </div>
        ))
      )}

      {/* Floating cart */}
      {cart && cart.items.length > 0 && (
        <div className="fixed bottom-4 right-4 sm:right-4 md:right-8 bg-white p-3 rounded-xl shadow-2xl flex items-center space-x-2 z-50">
          <div className="flex -space-x-2 overflow-x-auto">
            {cart.items.map(item => (
              <img
                key={item.id}
                src={getProductImage(item.product.image_url)}
                alt={item.product.name}
                className="w-10 h-10 object-cover rounded-full border-2 border-white"
              />
            ))}
          </div>
          <button 
            className="bg-[#795548] hover:bg-[#F1E0C6] text-white hover:text-[#795548] rounded-md px-4 py-2 ml-2 whitespace-nowrap transition"
            onClick={() => gotoCart({ table_number })}
          >
            Xem & Xác nhận
          </button>
        </div>
      )}


      <footer className="w-full text-[32px] mt-10 text-center text-[#F1E0C6] font-semibold bg-[#795548] py-3">
        Thank you
      </footer>
    </div>
  );
}
