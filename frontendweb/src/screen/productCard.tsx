import { type Product } from "../api/productApi";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-fontawesome";
import { Icons } from "../utils/icons";
import { getProductImage } from "../utils/imageHelper";
import { type CartItem } from "../api/cartApi";

interface ProductCardProps {
    product: Product;
    cartItem?: CartItem;
    onAdd: (product: Product) => void;
    onIncrease: (item: CartItem) => void;
    onDecrease: (item: CartItem) => void;
}

export default function ProductCard({ product, cartItem, onAdd, onIncrease, onDecrease }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative">
      {/* Nội dung sản phẩm */}
      <img
        src={getProductImage(product.image)}
        alt={product.name}
        className="w-32 h-32 sm:w-40 sm:h-40 object-cover mb-2"
      />
      <h3 className="text-[#795548] text-lg font-semibold text-center">{product.name}</h3>
      <p className="text-[#795548] text-xl">{product.price.toLocaleString()} VND</p>

      {/* Nút / cụm nút ở góc phải dưới */}
      <div className="w-full flex justify-end mt-3">
        {cartItem ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onDecrease(cartItem)}
              className="bg-[#795548] hover:bg-[#F1E0C6] text-white hover:text-[#795548] rounded-md w-8 h-8 flex items-center justify-center transition"
            >
              -
            </button>
            <span className="text-[#795548] font-semibold">{cartItem.quantity}</span>
            <button
              onClick={() => onIncrease(cartItem)}
              className="bg-[#795548] hover:bg-[#F1E0C6] text-white hover:text-[#795548] rounded-md w-8 h-8 flex items-center justify-center transition"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAdd(product)}
            className="bg-[#795548] hover:bg-[#F1E0C6] text-white hover:text-[#795548] rounded-md w-10 h-10 flex items-center justify-center transition"
          >
            <Fa icon={Icons.plus} className="text-lg" />
          </button>
        )}
      </div>
    </div>
  );
}

