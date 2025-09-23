import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomInput from "../components/input";
import CustomButton from "../components/button";
import { globalStyles } from "../styles/globalCss";
import { theme } from "../styles/theme";
import { ProductApi } from "../api/productApi";
import { CategoryApi } from "../api/categoryApi";
import { ImageApi } from "../api/imageApi";
import { pickImageFromDevice } from "../helpers/imageHelper";
import { requestGalleryPermission } from "../helpers/permissionHelper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Product } from "./adminProduct";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../navigation/adminIndex";
import socket from "../services/socket.js";

type AddProductNavProp = NativeStackNavigationProp<AdminStackParamList, "AddProduct">;

const AddProduct = () => {
    const navigation = useNavigation<AddProductNavProp>();
    const route = useRoute();
    const { mode, product } = route.params as { mode: "add" | "edit"; product?: Product };

    const [categories, setCategories] = useState<any[]>([]);
    const [name, setName] = useState(product?.name || "");
    const [price, setPrice] = useState(product?.price?.toString() || "");
    const [categoryId, setCategoryId] = useState<number | null>(product?.category_id || null);
    const [imageUri, setImageUri] = useState<string | null>(product?.image || null);
    const [imageId, setImageId] = useState<number | null>(product?.imageId || null);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => { fetchCategories(); }, []);

    const fetchCategories = async () => {
        try {
        const res = await CategoryApi.getAll();
        setCategories(res.data);
        } catch (err) { console.log(err); }
    }

    const handlePickImage = async () => {
        const granted = await requestGalleryPermission();
        if (!granted) {
            Alert.alert("Cần cấp quyền truy cập thư viện ảnh để chọn hình");
            return;
        }
        const uri = await pickImageFromDevice();
        if (uri) setImageUri(uri);
    }

    const handleSave = async () => {
        if (!name.trim() || !price || !categoryId) {
            Alert.alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            if (mode === "add") {
                if (!imageUri) {
                    Alert.alert("Vui lòng chọn ảnh cho sản phẩm!");
                    return;
                }
                const res = await ProductApi.create(name.trim(), Number(price), "available", Number(categoryId));
                await ImageApi.create(res.data.id, imageUri);
            } else {
                await ProductApi.update(product!.id, name.trim(), Number(price), "available", Number(categoryId));

                // Nếu người dùng chọn ảnh mới, xóa ảnh cũ và upload mới
                if (imageUri && imageUri !== product?.image) {
                    if (imageId) await ImageApi.remove(imageId);
                    await ImageApi.create(product!.id, imageUri);
                }
            }
            socket.emit("product_updated");
            navigation.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ScrollView style={globalStyles.container2}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, marginTop: 30}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                <FontAwesome5 name="arrow-left" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{mode === "add" ? "Thêm sản phẩm" : "Sửa sản phẩm"}</Text>
            </View>

            {/* Ảnh sản phẩm */}
            <Text>Ảnh sản phẩm</Text>
            <TouchableOpacity onPress={handlePickImage} style={{ padding: 10, backgroundColor: "#eee", marginVertical: 5, alignItems: "center" }}>
                <Text>{imageUri ? "Thay đổi ảnh" : "Tải ảnh lên"}</Text>
            </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginVertical: 10, alignSelf: "center" }} />}

            {/* Tên & Giá */}
            <CustomInput placeholder="Tên sản phẩm" value={name} onChangeText={setName} />
            <CustomInput placeholder="Giá" value={price} onChangeText={setPrice} keyboardType="numeric" />

            {/* Dropdown danh mục */}
            <Text>Danh mục</Text>
            <TouchableOpacity
                onPress={() => setDropdownVisible(!dropdownVisible)}
                style={{ padding: 10, backgroundColor: "#eee", marginVertical: 5 }}
            >
                <Text>{categoryId ? categories.find(c => c.id === categoryId)?.name : "Chọn danh mục"}</Text>
            </TouchableOpacity>

            {dropdownVisible && (
                <View style={{ maxHeight: 200, borderWidth: 1, borderColor: "#ccc", marginBottom: 10 }}>
                    {categories.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => { setCategoryId(Number(item.id)); setDropdownVisible(false); }}
                        style={{ padding: 10 }}
                    >
                        <Text style={{ color: categoryId === item.id ? theme.colors.primary : "#000" }}>{item.name}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
            )}

            <CustomButton title={mode === "add" ? "Thêm sản phẩm" : "Cập nhật sản phẩm"} onPress={handleSave} />
        </ScrollView>
    );
}

export default AddProduct;
