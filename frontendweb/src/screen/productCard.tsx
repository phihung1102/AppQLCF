import { type Product } from "../api/productApi";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-fontawesome";
import { Icons } from "../utils/icons";
import { getProductImage } from "../utils/imageHelper";

interface ProductCardProps {
    product: Product;
    onAdd: (product: Product) => void;
}

export default function ProductCard({product, onAdd}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
        <img
        src={getProductImage(product.image)}
        alt={product.name}
        className="w-32 h-32 object-cover mb-2"
      />
      <h3 className="text-[#795548] text-lg font-semibold">{product.name}</h3>
      <p className="text-[#795548] text-xl">{product.price.toLocaleString()} VND</p>
      <button
        onClick={() => onAdd(product)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 mt-2"
      >
        <Fa icon={Icons.plus} className="text-xl" />
      </button>
    </div>
  );
}

