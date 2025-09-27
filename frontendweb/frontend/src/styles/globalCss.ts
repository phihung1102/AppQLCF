import { StyleSheet } from "react-native";
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
    },
    textName: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 12,
        color: theme.colors.primary,
    },
    text: {
        fontSize: 12,
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

})