import { TouchableOpacity, Text } from "react-native";
import { globalStyles } from "../styles/globalCss";

type Props = {
    title: string;
    onPress: () => void;
};

export default function CustomButton({ title, onPress }: Props) {
    return (
        <TouchableOpacity
            style={globalStyles.button}
            onPress={onPress}
        >
            <Text style={globalStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}