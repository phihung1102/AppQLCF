import { View, Text, TextInput, TextInputProps, TouchableOpacity} from "react-native";
import { useState } from "react";
import { globalStyles } from "../styles/globalCss";
import Icon from "react-native-vector-icons/Ionicons";


type Props = TextInputProps & {
    error?: string;
    isPassword?: boolean;
};

export default function CustomInput({ error, isPassword, style, ...props}: Props) {
    const [secure, setSecure] = useState(isPassword);
    return (
        <View style={{ width: "100%", marginBottom: 8}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                    {...props}
                    secureTextEntry={secure}
                    style={[
                        globalStyles.input,
                        error ? globalStyles.inputError : null,
                        style,
                        isPassword ? { paddingRight: 40 } : null,
                    ]}
                    placeholderTextColor="#999"
                />
                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setSecure(!secure)}
                        style={{ position: "absolute", right: 10 }}
                    >
                        <Icon
                            name={secure ? "eye-off" : "eye"}
                            size={20}
                            color="#333"
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
        </View>
    );
}

