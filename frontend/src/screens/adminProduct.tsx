import { View, Text, FlatList, ScrollView, TouchableOpacity, Image, Platform, Switch, Alert } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { theme } from "../styles/theme";
import { globalStyles } from "../styles/globalCss";
import { ProductApi } from "../api/productApi";
import { CategoryApi } from "../api/categoryApi";
import { ImageApi } from "../api/imageApi";
import CustomButton from "../components/button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../navigation/adminIndex";
import socket from "../services/socket.js";
import { Category, Product } from "../types/inđex.js";

type AdminProductNavProp = NativeStackNavigationProp<AdminStackParamList, "AdminTabs">;

// BASE_URL backend để nối với path ảnh
const BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://192.168.1.5:3000";

const AdminProductByCategory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigation = useNavigation<AdminProductNavProp>();

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

    socket.on("product_updated", fetchProducts);
    return () => { socket.off("product_updated", fetchProducts); };
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const fetchCategories = async () => {
    try { 
      const res = await CategoryApi.getAll(); 
      setCategories(res.data); 
    } catch (error) { 
      console.log(error); 
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await ProductApi.getAll();
      setProducts(
        res.data.map((p: any) => ({
          ...p,
          image_url: p.image?.url ? `${BASE_URL}${p.image.url}` : null,
          imageId: p.image?.id || null,
        }))
      );
    } catch (error) { 
      console.log(error); 
    }
  };

  const handleToggleStatus = async (item: Product) => {
    const newStatus = item.status === "available" ? "unavailable" : "available";
    setProducts(prev => prev.map(p => p.id === item.id ? { ...p, status: newStatus } : p));
    try { await ProductApi.updateStatus(item.id, newStatus); } 
    catch (error) { console.log(error); }
  };

  const handleDelete = (item: Product) => {
    Alert.alert(
      "Xác nhận xoá",
      `Bạn có chắc muốn xoá sản phẩm ${item.name}?`,
      [
        { text: "Huỷ", style: "cancel" },
        { 
          text: "Xoá", 
          style: "destructive", 
          onPress: async () => {
            try {
              if(item.imageId) await ImageApi.remove(item.imageId);
              await ProductApi.remove(item.id);
              fetchProducts();
            } catch (err) { console.log(err); }
          }
        }
      ]
    );
  };

  const renderProductItem = ({ item, index }: { item: Product; index: number }) => (
    <View style={globalStyles.componentFlatlist}>
      <View style={{ flexDirection: "row" }}>
        <Text style={globalStyles.textStt}>{index + 1}.</Text>
        {item.image_url && <Image source={{ uri: item.image_url }} style={globalStyles.imageAd} />}
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={globalStyles.textName}>{item.name}</Text>
        <Text style={globalStyles.text}>{item.category_name}</Text>
        <Text style={globalStyles.text}>{item.price} ₫</Text>
      </View>
      <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddProduct", { mode: "edit", product: item })}
            style={{ marginHorizontal: 8 }}
          >
            <FontAwesome5 name="edit" size={18} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item)} style={{ marginHorizontal: 8 }}>
            <FontAwesome5 name="trash" size={18} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <Switch
          value={item.status === "available"}
          onValueChange={() => handleToggleStatus(item)}
          thumbColor={item.status === "available" ? "#4CAF50" : "#ccc"}
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={globalStyles.container2}>
      <View style={{ flexDirection:"row", justifyContent:"flex-end", marginBottom:16 }}>
        <TouchableOpacity onPress={() => navigation.navigate("AddProduct", { mode:"add" })}>
          <FontAwesome5 name="plus" solid color="#795548" style={{ marginRight:20, fontSize:18 }}/>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => console.log("Search pressed!")}>
          <FontAwesome5 name="search" solid color={"#795548"} style={{ marginRight: 16, fontSize: 18 }} />
        </TouchableOpacity> */}
      </View>

      <Text style={globalStyles.title2}>Sản phẩm</Text>

      {categories.map(category => {
        const categoryProducts = products.filter(p => p.category_id === category.id);
        if (categoryProducts.length === 0) return null;

        return (
          <View key={category.id} style={{ marginBottom: 16 }}>
            <Text style={globalStyles.labelUser}>{category.name}</Text>
            {categoryProducts.map((item, index) => (
              <View key={item.id}>
                {renderProductItem({ item, index })}
              </View>
            ))}
          </View>
        );
      })}

      {products.length === 0 && (
        <View style={globalStyles.content}>
          <FontAwesome5 name="shopping-bag" size={100} color={theme.colors.primary} style={{ marginBottom:20 }}/>
          <Text style={globalStyles.emptyTitle}>Không có sản phẩm nào ở đây.</Text>
          <Text style={globalStyles.emptySubtitle}>Vui lòng thêm sản phẩm!</Text>
          <CustomButton title="Thêm sản phẩm" onPress={() => navigation.navigate("AddProduct", { mode: "add" })} />
        </View>
      )}
    </ScrollView>
  );
};

export default AdminProductByCategory;
