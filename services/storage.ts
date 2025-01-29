import AsyncStorage from "@react-native-async-storage/async-storage";

export enum AppStorageKeys {
  User = "@user",
}

export class AppStorageService {
  public static async getItemAsync(key: AppStorageKeys) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // save error
    }
  }

  public static async setItemAsync(key: AppStorageKeys, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // save error
    }
  }

  public static async removeItemAsync(key: AppStorageKeys) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // save error
    }
  }

  public static async clearAsync() {
    await AsyncStorage.clear();
  }
}
