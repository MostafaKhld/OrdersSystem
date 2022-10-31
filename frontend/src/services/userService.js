import http from "./httpService";

const apiEndpoint = "users/";

export function newOrder(data) {
  return http.post(apiEndpoint + `add/`, data);
}

export function editUser(user) {
  return http.put(apiEndpoint + "update/" + user._id + "/", user);
}

export function editUserProfie(data) {
  return http.put(apiEndpoint + "profile/update/", data);
}

export function getUser(id) {
  return http.get(apiEndpoint + id + "/");
}

export function getUsers() {
  return http.get(apiEndpoint);
}

export function eraseUser(id) {
  return http.delete(apiEndpoint + "delete/" + id + "/");
}
