import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Product } from "../types/inđex";
import { globalStyles } from "../styles/globalCss";

type Props = {
  item: Product;
  cartItem?: any; // chứa {id, quantity, product}
  onAdd?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
};

const ProductCard: React.FC<Props> = ({ item, cartItem, onAdd, onIncrease, onDecrease }) => {
  return (
    <View style={[globalStyles.productCardMenu, item.status === "unavailable" && { opacity: 0.5 }]}>
      {item.image_url && (
        <Image source={{ uri: item.image_url }} style={globalStyles.productImageMenu} />
      )}

      <View style={globalStyles.productInfoMenu}>
        <Text style={globalStyles.productNameMenu}>{item.name}</Text>
        <Text style={globalStyles.productPriceMenu}>{item.price} ₫</Text>
      </View>

      {item.status === "available" ? (
        <View style={globalStyles.productActionsMenu}>
          {!cartItem ? (
            <TouchableOpacity style={globalStyles.addBtnMenu} onPress={onAdd}>
              <Text style={globalStyles.addBtnTextMenu}>Thêm</Text>
            </TouchableOpacity>
          ) : (
            <View style={globalStyles.qtyContainerMenu}>
              <TouchableOpacity style={globalStyles.qtyBtnMenu} onPress={onDecrease}>
                <Text style={{ fontWeight: "bold", color: "#fff"}}>-</Text>
              </TouchableOpacity>
              <Text style={globalStyles.qtyTextMenu}>{cartItem.quantity}</Text>
              <TouchableOpacity style={globalStyles.qtyBtnMenu} onPress={onIncrease}>
                <Text style={{ fontWeight: "bold", color: "#fff"}}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <Text style={{ color: "red", fontWeight: "bold", marginTop: 8, textAlign: "center" }}>
          Món đã hết
        </Text>
      )}
    </View>
  );
};

export default ProductCard;
