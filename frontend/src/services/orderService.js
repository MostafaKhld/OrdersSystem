import http from "./httpService";

const apiEndpoint = "orders/";

export function newOrder(data) {
  return http.post(apiEndpoint + `add/`, data);
}

export function orderDetails(id) {
  return http.get(apiEndpoint + id);
}

export function getOrders() {
  return http.get(apiEndpoint);
}

export function getUserOrders() {
  return http.get(apiEndpoint + "myorders/");
}
