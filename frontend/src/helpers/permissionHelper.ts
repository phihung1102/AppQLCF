import { Platform } from "react-native";
import { PERMISSIONS, request, RESULTS } from "react-native-permissions";

export const requestGalleryPermission = async (): Promise<boolean> => {
  if (Platform.OS !== "android") return true;

  const permission =
    Platform.Version >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

  const result = await request(permission);
  return result === RESULTS.GRANTED;
};
