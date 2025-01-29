import axios from "axios";
import { AppStorageKeys, AppStorageService } from "./storage";

export const BACKEND_BASE_URL = process.env.EXPO_PUBLIC_API_URL

const getToken = async () => {
    const user = await AppStorageService.getItemAsync(AppStorageKeys.User)
    return user?.token ?? ""
}

export const ApiService = axios.create({
    baseURL: `${BACKEND_BASE_URL}`,
})
