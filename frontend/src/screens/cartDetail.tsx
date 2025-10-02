import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Platform } from "react-native";
import { CartApi } from "../api/cartApi";
import { AuthContext } from "../context/AuthContext";
import { globalStyles } from "../styles/globalCss";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { theme } from "../styles/theme";
import { OrderApi } from "../api/orderApi";

const BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://192.168.1.5:3000";
type CartDetailRouteProp = RouteProp<RootStackParamList, "CartDetail">;

const CartDetail = () => {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState<any>(null);
    const route = useRoute<CartDetailRouteProp>();
    const navigation = useNavigation<any>();
    const { userId } = route.params;

    const fetchCart = async () => {
        try {
            if (!user?.id) return;
            const res = await CartApi.getOrCreateByUser(userId);
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

    useEffect(() => {
        fetchCart();
    }, []);

    const handleIncrease = async (itemId: number, currentQty: number) => {
        await CartApi.addItem(itemId, currentQty + 1);
        fetchCart();
    };

    const handleDecrease = async (itemId: number, currentQty: number) => {
        if (currentQty === 1) {
            await CartApi.removeItem(itemId);
        } else {
            await CartApi.addItem(itemId, currentQty - 1);
        }
        fetchCart();
    };

    const handleConfirm = async () => {
        try {
            if (!cart) return;

            const items = cart.items.map((it: any) => ({
                product_id: it.product.id,
                quantity: it.quantity,
                unit_price: it.product.price
            }));

            const res = await OrderApi.create(
                cart.table_number || null,
                cart.user_id,
                cart.note || null, 
                "processing", 
                items
            );

            // sau khi tạo order thành công
            await CartApi.remove(cart.id);
            navigation.replace("UserOrderDetail", {
                orderId: res.data.id, 
                userId: cart.user_id, 
                table_number: cart.table_number
            });
        } catch (err) {
            console.error(err);
        }
    };


    const total = cart?.items.reduce(
        (sum: number, it: any) => sum + it.quantity * it.product.price,
        0
    );

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background2 }}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center", padding: 16, marginBottom: 8,}}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 8 }}>
                        <FontAwesome5 name="arrow-left" size={20} color={theme.colors.primary} />
                    </TouchableOpacity>
                    <Text style={[globalStyles.cartTitle, { marginLeft: 4 }]}>
                        Giỏ hàng
                    </Text>
                </View>

                {cart?.items.length === 0 ? (
                    <Text>Chưa có sản phẩm nào.</Text>
                ) : (
                    cart?.items.map((it: any) => (
                        <View key={it.id} style={globalStyles.cartItem}>
                        {it.product.image_url && (
                            <Image source={{ uri: it.product.image_url }} style={globalStyles.cartItemImage} />
                        )}
                        <View style={globalStyles.cartItemInfo}>
                            <Text style={globalStyles.cartItemName}>{it.product.name}</Text>
                            <Text style={globalStyles.cartItemPrice}>{it.product.price} ₫</Text>
                        </View>
                        <View style={globalStyles.cartItemActions}>
                            <TouchableOpacity
                                style={globalStyles.qtyBtnCart}
                                onPress={() => handleDecrease(it.id, it.quantity)}
                            >
                                <Text style={{ fontWeight: "bold", color: "#fff"}}>-</Text>
                            </TouchableOpacity>
                            <Text style={globalStyles.cartItemQty}>{it.quantity}</Text>
                            <TouchableOpacity
                                style={globalStyles.qtyBtnCart}
                                onPress={() => handleIncrease(it.id, it.quantity)}
                            >
                            <Text style={{ fontWeight: "bold", color: "#fff"}}>+</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    ))
                )}
            </ScrollView>

        {/* Tổng tiền + Xác nhận */}
        {cart?.items.length > 0 && (
            <View style={globalStyles.cartFooter}>
            <Text style={globalStyles.cartTotal}>Tổng: {total} ₫</Text>
            <TouchableOpacity
                style={globalStyles.cartConfirmBtn}
                onPress={handleConfirm}
            >
                <Text style={globalStyles.cartConfirmText}>Xác nhận</Text>
            </TouchableOpacity>
            </View>
        )}
        </View>
    );
};

export default CartDetail;
