import { launchImageLibrary } from "react-native-image-picker";

// Chọn 1 ảnh từ thư viện
export const pickImageFromDevice = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.7 },
      (response) => {
        if (response.didCancel || !response.assets || response.assets.length === 0) {
          resolve(null);
        } else {
          resolve(response.assets[0].uri ?? null);
        }
      }
    );
  });
};
