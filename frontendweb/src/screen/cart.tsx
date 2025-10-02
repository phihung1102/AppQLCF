import { useEffect, useState } from "react";
import { CartApi, type Cart, type CartItem } from "../api/cartApi";
import { OrderApi } from "../api/orderApi"; // import API order
import { useSearchParams } from "react-router-dom";
import { getProductImage } from "../utils/imageHelper";
import { useNavigation } from "../navigation";

export default function Cart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [searchParams] = useSearchParams();
  const table_number = Number(searchParams.get("table_number") || 1);
  const { gotoMenu, gotoOrder } = useNavigation();

  useEffect(() => {
    CartApi.getByTable(table_number)
      .then((res) => setCart(res.data || null))
      .catch(err => console.error(err));
  }, [table_number]);

  const handleIncrease = async (item: CartItem) => {
    if (!cart) return;
    const newQty = item.quantity + 1;
    await CartApi.updateItem(item.id, newQty);
    setCart(prev => prev && ({
      ...prev,
      items: prev.items.map(i => i.id === item.id ? { ...i, quantity: newQty } : i)
    }));
  };

  const handleDecrease = async (item: CartItem) => {
    if (!cart) return;
    const newQty = item.quantity - 1;
    if (newQty <= 0) {
      await CartApi.removeItem(item.id);
      setCart(prev => prev && ({ ...prev, items: prev.items.filter(i => i.id !== item.id) }));
    } else {
      await CartApi.updateItem(item.id, newQty);
      setCart(prev => prev && ({
        ...prev,
        items: prev.items.map(i => i.id === item.id ? { ...i, quantity: newQty } : i)
      }));
    }
  };

  const handlePlaceOrder = async () => {
    if (!cart || cart.items.length === 0) return;

    try {
      const items = cart.items.map(i => ({
        product_id: i.product.id,
        quantity: i.quantity,
        unit_price: i.product.price
      }));

      await OrderApi.create(table_number, undefined, undefined, "pending", items);

      for (const item of cart.items) {
        await CartApi.removeItem(item.id);
      }

      setCart(null);
      alert("Đặt món thành công. Nhân viên sẽ sớm lên món cho quý khách!");
      gotoOrder({ table_number });
    } catch (err) {
      console.error(err);
      alert("Đặt món thất bại!");
    }
  };

  const totalPrice = cart?.items.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0) ?? 0;

  return (
    <div className="bg-[#F1E0C6] p-4 min-h-screen">
      <h1 className="text-[#795548] text-2xl font-bold mb-4">Giỏ Hàng</h1>

      {!cart || cart.items.length === 0 ? (
        <p className="text-gray-500 text-xl">Chưa có sản phẩm nào trong giỏ</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map(item => (
            <div key={item.id} className="flex items-center bg-white rounded-xl shadow p-4">
              <img
                src={getProductImage(item.product.image_url)}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h3 className="text-[#795548] font-semibold text-lg">{item.product.name}</h3>
                <p className="text-[#795548] text-base">{(item.product.price ?? 0).toLocaleString()} VND</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDecrease(item)}
                  className="bg-[#795548] hover:bg-[#F1E0C6] text-white hover:text-[#795548] rounded-md w-8 h-8 flex items-center justify-center transition"
                >-</button>
                <span className="text-[#795548] font-semibold">{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item)}
                  className="bg-[#795548] hover:bg-[#F1E0C6] text-white hover:text-[#795548] rounded-md w-8 h-8 flex items-center justify-center transition"
                >+</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer luôn hiện nút trở lại menu */}
      <div className="fixed bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4 z-50">
        {/* Nút Trở lại menu */}
        <button
          className="bg-white border border-[#F1E0C6] text-[#795548] font-semibold rounded-md px-4 py-2 w-full sm:w-auto hover:bg-[#F1E0C6]"
          onClick={gotoMenu}
        >
          Trở lại menu
        </button>

        {/* Chỉ hiện khi có món */}
        {cart && cart.items.length > 0 && (
          <>
            <div className="bg-white border border-[#F1E0C6] text-[#795548] font-semibold rounded-md px-4 py-2 w-full sm:w-auto text-center">
              Tổng: {totalPrice.toLocaleString()} VND
            </div>

            <button
              className="bg-[#795548] hover:bg-[#F1E0C6] text-white hover:text-[#795548] rounded-md px-6 py-3 w-full sm:w-auto shadow-lg transition"
              onClick={handlePlaceOrder}
            >
              Đặt món
            </button>
          </>
        )}
      </div>
    </div>
  );
}
