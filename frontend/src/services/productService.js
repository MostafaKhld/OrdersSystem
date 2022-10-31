import http from "./httpService";

const apiEndpoint = "products/";

export function newProduct(data) {
  return http.post(apiEndpoint + `create/`, data);
}

export function eraseProduct(id) {
  return http.delete(apiEndpoint + "delete/" + id);
}

export function getProductDetails(id) {
  return http.get(apiEndpoint + id);
}

export function getProducts(keyword) {
  return http.get(apiEndpoint + keyword);
}

export function editProduct(data) {
  return http.put(apiEndpoint + `update/` + data._id, data);
}

export function updateImage(data) {
  return http.post(apiEndpoint + `upload/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
