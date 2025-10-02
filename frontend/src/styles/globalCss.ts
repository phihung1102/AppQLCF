import { Button, StyleSheet } from "react-native";
import { theme } from "./theme";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing(2),
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: theme.colors.primary,
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 24,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        paddingHorizontal: theme.spacing(2),
        marginVertical: theme.spacing(1),
        fontSize: 16,
        color: theme.colors.text,
        width: "100%",
        paddingRight: 16,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing(4),
        paddingVertical: theme.spacing(2),
        borderRadius: 8,
        alignItems: "center",
        marginVertical: theme.spacing(1),
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    // css thông báo
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    messageBox: {
        backgroundColor: theme.colors.background,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(1),
        borderRadius: 8,
        elevation: 8,
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        marginHorizontal: "5%",
    },
    messageTitle: {
        padding: 4,
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 8,
    },
    messageText: {
        color: theme.colors.primary,
        fontSize: 16,
        marginBottom: 16,
    },
    okButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    okButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    // Css thông báo validate
    inputError: {
        borderColor: "#ff0000"
    },
    errorText: {
        color: "#ff0000",
        fontSize: 12,
        marginTop: 4,
    },
    
    //Admin css
    container2: {
        flex: 1,
        backgroundColor: theme.colors.background2,
        padding: theme.spacing(2),
    },
    container3: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing(2),
    },
    componentFlatlist: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: theme.colors.color1,
    },
    textStt: {
        fontSize: 16,
        fontWeight: "bold",
        color: theme.colors.primary,
        marginRight: 8,
    },
    imageAd: {
        width: 60,
        height: 60,
        marginHorizontal: 5,
    },
    textName: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    text: {
        fontSize: 14,
        color: theme.colors.primary,
    },
    title2: {
        color: theme.colors.primary,
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 6,
    },
    emptySubtitle: {
        fontSize: 14,
        color: "gray",
        marginBottom: 20,
    },
    // css user
    containerUser: { 
        flex: 1,
        padding: 20,
        backgroundColor: theme.colors.background,
    },
    titleUser: {
        marginRight: 8,
        paddingVertical: 20,
        textAlign: "center",
        fontWeight: '600',
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: "#717171",
        color: "#717171",
    },
    fullnameUser: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",marginBottom: 8
    },
    labelUser: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 14,
        color: '#555'
    },
    valueUser: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#676767ff",
        padding: 8,
        fontSize: 16,
        marginTop: 2,
        color: '#000'
    },
    // css Menu
    containerMenu: {
        flex: 1,
        padding: 12,
        backgroundColor: theme.colors.background2,
    },
    emptyMenu: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    },
    menu: {
        textAlign: "center",
        marginVertical: 20,
        color: theme.colors.primary,
        fontSize: 32,
        fontWeight: "bold",
    },
    categoryMenu: {
        marginBottom: 16
    },
    categoryTitleMenu: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#795548",
        marginBottom: 8
    },
    productsRowMenu: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    productCardMenu: { 
        width: "48%", 
        flexDirection: "column", 
        backgroundColor: "#fff", 
        borderRadius: 8, 
        padding: 8, 
        marginBottom: 12 
    },
    productImageMenu: {
        width: "100%",
        height: 150,
        borderRadius: 8,
        marginBottom: 8
    },
    productInfoMenu: {
        justifyContent: "center",
        marginBottom: 8
    },
    productNameMenu: {
        fontSize: 16,
        fontWeight: "bold",
        color: theme.colors.primary
    },
    productPriceMenu: {
        fontSize: 14,
        color: "#555",
        marginTop: 4
    },
    productActionsMenu: {
        justifyContent: "center",
        alignItems: "center"
    },
    addBtnMenu: {
        backgroundColor: "#795548",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: 4
    },
    addBtnTextMenu: {
        color: "#fff",
        fontWeight: "bold"
    },
    qtyContainerMenu: {
        flexDirection: "row",
        alignItems: "center"
    },
    qtyBtnMenu: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: "#27aceaff",
        borderRadius: 4,
        marginHorizontal: 2
    },
    qtyTextMenu: {
        fontSize: 16,
        marginHorizontal: 4
    },
    // Floating cart
    containerFloatingCart: {
        position: "absolute",
        bottom: 20,
        right: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    imageFloatingCart: {
        width: 44,
        height: 44,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#fff",
    },
    itemFloatingCart: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
        marginRight: -10,
    },
    btnFloatingCart: {
        backgroundColor: "#ff5722",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        marginLeft: 8, 
    },
    // Cart detail styles
    cartTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cartItemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    cartItemInfo: {
        flex: 1,
    },
    cartItemName: {
        fontSize: 16,
        fontWeight: "600",
    },
    cartItemPrice: {
        color: "#888",
        marginTop: 4,
    },
    cartItemActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    qtyBtnCart: {
        width: 32,
        height: 32,
        borderRadius: 4,
        backgroundColor: "#28aeecff",
        justifyContent: "center",
        alignItems: "center",
    },
    cartItemQty: {
        marginHorizontal: 8,
        fontSize: 16,
    },
    cartFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderTopWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    cartTotal: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cartConfirmBtn: {
        backgroundColor: "#ff5722",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
    },
    cartConfirmText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    // Danh sách order
    titleOrder: {
        fontSize: 24,
        fontWeight: "bold",
        color: theme.colors.primary,
        marginVertical: 20,
    },
    orderCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    orderId: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 4,
    },
    statusText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#ffffff",
    },
    infoText: {
        marginTop: 6,
        fontSize: 14,
        color: "#000000",
    },
    // Order detail styles
    orderDetailTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    orderDetailItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#828282",
        padding: 8
    },
    orderDetailItemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    orderDetailItemInfo: {
        flex: 1,
    },
    orderDetailItemName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    orderDetailItemPrice: {
        color: "#666",
        marginTop: 4,
        fontSize: 14,
    },
    orderDetailItemQty: {
        fontSize: 15,
        fontWeight: "500",
        marginLeft: 10,
    },
    orderDetailFooter: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    orderDetailTotal: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    orderDetailConfirmBtn: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    orderDetailConfirmText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },


})