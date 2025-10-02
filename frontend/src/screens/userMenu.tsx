import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, Platform, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ProductApi } from "../api/productApi";
import { CartApi } from "../api/cartApi";
import { Product } from "../types/inđex";
import { globalStyles } from "../styles/globalCss";
import socket from "../services/socket.js";
import ProductCard from "../components/productCart.tsx";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/index.tsx";

const BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://192.168.1.5:3000";
type NavProp = NativeStackNavigationProp<RootStackParamList, "UserTabs">;

const UserMenu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<any>(null);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<NavProp>();

  // --- Fetch products ---
  const fetchProducts = async () => {
    try {
      const res = await ProductApi.getAll();
      setProducts(
        res.data.map((p: Product) => ({
          ...p,
          image_url: p.image?.url
            ? `${BASE_URL}${p.image?.url}`
            : null,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // --- Fetch cart ---
  const fetchCart = async () => {
    try {
      if (!user?.id) return;
      const res = await CartApi.getOrCreateByUser(user.id);
      const cartData = {
        ...res.data,
        items: res.data.items.map((it: any) => ({
          ...it,
          product: {
            ...it.product,
            image_url: it.product.image_url
              ? `${BASE_URL}${it.product.image_url}`
              : null,
          },
        })),
      };
      setCart(cartData);
    } catch (err) {
      console.error(err);
    }
  };

  // --- Add product ---
  const handleAdd = async (product: Product) => {
    try {
      const res = await CartApi.createItem(cart.id, product.id, 1);
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // --- Increase ---
  const handleIncrease = async (itemId: number, currentQty: number) => {
    try {
      await CartApi.addItem(itemId, currentQty + 1);
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // --- Decrease ---
  const handleDecrease = async (itemId: number, currentQty: number) => {
    try {
      if (currentQty === 1) {
        await CartApi.removeItem(itemId);
      } else {
        await CartApi.addItem(itemId, currentQty - 1);
      }
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // Lần đầu + socket
  useEffect(() => {
    fetchProducts();
    fetchCart();

    socket.on("product_updated", fetchProducts);
    return () => { socket.off("product_updated", fetchProducts); };
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
      fetchCart();
    }, [])
  );

  // Nhóm theo category
  const groupByCategory = (items: Product[]) =>
    items.reduce<Record<string, Product[]>>((acc, product) => {
      const categoryName = product.category_name || "Khác";
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(product);
      return acc;
    }, {});

  // Tìm item trong cart
  const findCartItem = (productId: number) =>
    cart?.items.find((i: any) => i.product.id === productId);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={globalStyles.containerMenu} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={globalStyles.menu}>Menu Mộc Quán</Text>

        {products.length === 0 ? (
          <View style={globalStyles.emptyMenu}>
            <Text>Hiện tại chưa có sản phẩm</Text>
          </View>
        ) : (
          Object.entries(groupByCategory(products)).map(([category, items]) => (
            <View key={category} style={globalStyles.categoryMenu}>
              <Text style={globalStyles.categoryTitleMenu}>{category}</Text>
              <View style={globalStyles.productsRowMenu}>
                {items.map((product) => {
                  const cartItem = findCartItem(product.id);
                  return (
                    <ProductCard
                      key={product.id}
                      item={product}
                      cartItem={cartItem}
                      onAdd={() => handleAdd(product)}
                      onIncrease={() =>
                        cartItem && handleIncrease(cartItem.id, cartItem.quantity)
                      }
                      onDecrease={() =>
                        cartItem && handleDecrease(cartItem.id, cartItem.quantity)
                      }
                    />
                  );
                })}
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Cart */}
      {cart?.items.length > 0 && (
        <View style={globalStyles.containerFloatingCart} >
          {/* Nhóm ảnh sản phẩm (xếp từ phải sang trái) */}
          <View style={{ flexDirection: "row-reverse", marginRight: 12 }}>
            {cart.items.slice(0, 3).map((it: any, index: number) => (
              <Image
                key={it.id}
                source={{ uri: it.product.image_url }}
                style={[globalStyles.imageFloatingCart, { marginRight: index === 0 ? 0 : -10 } ]}
              />
            ))}

            {cart.items.length > 3 && (
              <View style={globalStyles.itemFloatingCart} >
                <Text style={{ fontWeight: "bold" }}>
                  +{cart.items.length - 3}
                </Text>
              </View>
            )}
          </View>

          {/* Nút Xem & Xác nhận */}
          <TouchableOpacity
            style={globalStyles.btnFloatingCart}
            onPress={() => navigation.navigate("CartDetail", { userId: user.id })}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Xem & Xác nhận
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default UserMenu;
