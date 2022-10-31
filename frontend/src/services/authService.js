import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/users/";

const userInfo = "userInfo";
const paymentMethod = "paymentMethod";
const cartItems = "cartItems";

http.setJwt(getJwt());

export async function signin(username, password) {
  const { data } = await http.post(apiEndpoint + "login/", {
    username,
    password,
  });
  console.log(data);

  localStorage.setItem(userInfo, data.access);
  return jwtDecode(data.access);
}

export async function registerUser(name, email, password) {
  const { data } = await http.post(apiEndpoint + "register/", {
    name,
    email,
    password,
  });

  localStorage.setItem(userInfo, data.access);
  return jwtDecode(data.access);
}

export function loginWithJwt(token) {
  localStorage.setItem(userInfo, token.access);
}

export function signout() {
  localStorage.removeItem(userInfo);
  localStorage.removeItem(paymentMethod);
  localStorage.removeItem(cartItems);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(userInfo);

    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(userInfo);
}

export default {
  signin,
  loginWithJwt,
  signout,
  getCurrentUser,
  getJwt,
};
