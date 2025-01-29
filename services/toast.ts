import { Platform } from "react-native";
import Toast from "react-native-toast-message";

export class ToastService {
  static Success(msg: string) {
    if (Platform.OS === "web") {
      // toast.success(msg, { hideProgressBar: true });
    } else {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: msg,
      });
    }
  }

  static Error(msg: string, title?: string) {
    if (msg === "Unauthorized") {
      return;
    }

    if (Platform.OS === "web") {
      // toast.error(msg, { hideProgressBar: true });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: msg,
      });
    }
  }
}
