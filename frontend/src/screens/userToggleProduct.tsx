import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, Switch, Alert, Image, Platform, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ProductApi } from "../api/productApi";
import { CategoryApi } from "../api/categoryApi";
import { globalStyles } from "../styles/globalCss";
import socket from "../services/socket.js";
import { Product, Category } from "../types/inđex";

// BASE_URL backend để nối với path ảnh
const BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://192.168.1.5:3000";

const UserToggleProduct = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Lấy dữ liệu ban đầu
  useEffect(() => {
    const initData = async () => {
      try {
        await fetchCategories();
        await fetchProducts();
      } catch (err) {
        console.log(err);
      }
    };
    initData();

    // Lắng nghe socket khi có thay đổi sản phẩm
    socket.on("product_updated", fetchProducts);

    return () => { socket.off("product_updated", fetchProducts); };
  }, []);

  // Khi focus lại màn hình, fetch lại sản phẩm
  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        await fetchProducts();
      };
      load();
    }, [])
  );

  // Lấy categories
  const fetchCategories = async () => {
    try {
      const res = await CategoryApi.getAll();
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Lấy products
  const fetchProducts = async () => {
    try {
      const res = await ProductApi.getAll();
      setProducts(
        res.data.map((p: any) => ({
          ...p,
          image_url: p.image?.url ? `${BASE_URL}${p.image.url}` : null,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // Bật/tắt trạng thái món
  const handleToggleStatus = async (item: Product) => {
    const newStatus = item.status === "available" ? "unavailable" : "available";
    setProducts(prev =>
      prev.map(p => p.id === item.id ? { ...p, status: newStatus } : p)
    );
    try {
      await ProductApi.updateStatus(item.id, newStatus);
    } catch (err) {
      console.log(err);
      Alert.alert("Lỗi", "Không thể cập nhật trạng thái món");
    }
  };

 return (
  <ScrollView style={globalStyles.container2}>
    <Text style={globalStyles.title2}>Danh sách sản phẩm</Text>
    {categories.map(category => {
      const categoryProducts = products.filter(p => p.category_id === category.id);
      if (categoryProducts.length === 0) return null;

      return (
        <View key={category.id} style={{ marginBottom: 16 }}>
          <Text style={globalStyles.labelUser}>{category.name}</Text>
          {categoryProducts.map(item => (
            <View key={item.id} style={globalStyles.componentFlatlist}>
              {item.image_url && (
                <Image source={{ uri: item.image_url }} style={{ width: 60, height: 60, marginRight: 8, borderRadius: 8 }} />
              )}
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={globalStyles.textName}>{item.name}</Text>
                <Text style={globalStyles.text}>{item.price} ₫</Text>
              </View>
              <Switch
                value={item.status === "available"}
                onValueChange={() => handleToggleStatus(item)}
                thumbColor={item.status === "available" ? "#4CAF50" : "#ccc"}
              />
            </View>
          ))}
        </View>
      );
    })}
  </ScrollView>
);
};

export default UserToggleProduct;
