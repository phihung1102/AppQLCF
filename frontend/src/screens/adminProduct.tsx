import { View, Text, FlatList, TouchableOpacity, Image, Platform, Switch } from "react-native";
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
import { Alert } from "react-native";
import socket from "../services/socket.js";

type AdminProductNavProp = NativeStackNavigationProp<AdminStackParamList, "AdminTabs">;

interface Category { id: number; name: string; }
export interface Product { 
  id: number;
  name: string;
  price: number;
  status: string;
  category_id: number;
  category_name?: string;
  image?: string;
  imageId?: number;
}

// BASE_URL backend để nối với path ảnh
const BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://192.168.1.5:3000" ;

const AdminProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigation = useNavigation<AdminProductNavProp>();

  useEffect(() => {
    // 1. Lấy categories và products ban đầu
    const initData = async () => {
      try {
        await fetchCategories();
        await fetchProducts();
      } catch (err) {
        console.log(err);
      }
    };
    initData();

    // 2. Lắng nghe sự kiện socket
    socket.on("product_updated", fetchProducts);

    // 3. Dọn dẹp khi unmount
    return () => { socket.off("product_updated", fetchProducts); };
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  // Lấy toàn bộ categories
  const fetchCategories = async () => {
    try { const res = await CategoryApi.getAll(); setCategories(res.data); } 
    catch (error) { console.log(error); }
  };

  // Lấy toàn bộ products
  const fetchProducts = async () => {
    try {
      const res = await ProductApi.getAll();
      console.log(res.data.map((p: { id: any; }) => p.id));
      setProducts(
        res.data.map((p: any) => ({
          ...p,
          image: p.image?.url ? `${BASE_URL}${p.image.url}` : null,
          imageId: p.image?.id || null,
        }))
      );
    } catch (error) { console.log(error); }
  };

  // Bật tắt món
  const handleToggleStatus = async (item: Product) => {
    const newStatus = item.status === "available" ? "unavailable" : "available";
    setProducts(prev => 
      prev.map(p => p.id === item.id ? {...p, status: newStatus } : p)
    );
    try {
      await ProductApi.updateStatus(item.id, newStatus);
    } catch (error) {
      console.log(error);
    }
  }

  // xoá
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
  }

  return (
    <View style={globalStyles.container2}>
      <View style={{ flexDirection:"row", justifyContent:"flex-end", marginBottom:16 }}>
        <TouchableOpacity onPress={() => navigation.navigate("AddProduct", { mode:"add" })}>
          <FontAwesome5 name="plus" solid color="#a4a4a4" style={{ marginRight:20, fontSize:18 }}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Search pressed!")}>
          <FontAwesome5 name="search" solid color={"#a4a4a4"} style={{ marginRight: 16, fontSize: 18 }} />
        </TouchableOpacity>
      </View>

      <Text style={globalStyles.title2}>Sản phẩm</Text>

      {products.length === 0 ? (
        <View style={globalStyles.content}>
          <FontAwesome5 name="shopping-bag" size={100} color={theme.colors.primary} style={{ marginBottom:20 }}/>
          <Text style={globalStyles.emptyTitle}>Không có sản phẩm nào ở đây.</Text>
          <Text style={globalStyles.emptySubtitle}>Vui lòng thêm sản phẩm!</Text>
          <CustomButton title="Thêm sản phẩm" onPress={() => navigation.navigate("AddProduct", { mode: "add" })} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({item,index})=>(
            <View style={globalStyles.componentFlatlist}>
              <View style={{ flexDirection: "row"}}>
                <Text style={globalStyles.textStt}>{index+1}.</Text>
                {item.image && <Image source={{ uri: item.image }} style={globalStyles.imageAd} />}
              </View>
              <View style={{ flexDirection: "column"}}>
                <Text style={globalStyles.textName}>{item.name}</Text>
                <Text style={globalStyles.text}>{item.category_name}</Text>
                <Text style={globalStyles.text}>{item.price} ₫</Text>
              </View>
              <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                  <TouchableOpacity onPress={()=>navigation.navigate("AddProduct",{ mode:"edit", product:item })} style={{marginHorizontal:8}}>
                    <FontAwesome5 name="edit" size={18} color={theme.colors.primary}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item)} style={{ marginHorizontal: 8 }}>
                    <FontAwesome5 name="trash" size={18} color={theme.colors.primary}/>
                  </TouchableOpacity>
                </View>
                <Switch
                  value={item.status === "available"}
                  onValueChange={() => handleToggleStatus(item)}
                  thumbColor={item.status === 'available' ? theme.colors.primary : "#ccc"}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AdminProduct;
