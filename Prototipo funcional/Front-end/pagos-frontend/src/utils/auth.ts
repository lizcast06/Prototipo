// src/utils/auth.ts
const TOKEN_KEY = "jwt_token";

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
export function isAuthenticated(): boolean {
  return !!getToken();
}
export function logout() {
  removeToken();
}
