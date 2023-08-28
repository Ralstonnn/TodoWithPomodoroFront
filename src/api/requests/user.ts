import { $http } from "../http";
import { UserRegisterPayload } from "../../types/user";

const BASE_URL = "/user";

export async function register(payload: UserRegisterPayload) {
  const endpoint = `${BASE_URL}/register`;
  return await $http.post(endpoint, payload);
}

export async function login(payload: { username: string; password: string }) {
  const endpoint = `${BASE_URL}/login`;
  return await $http.post(endpoint, payload);
}

export async function getProfile() {
  const endpoint = `${BASE_URL}/profile`;
  return await $http.get(endpoint);
}
