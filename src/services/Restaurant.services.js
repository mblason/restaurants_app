import createHttp from "./Base.services";
const authHttp = createHttp(true);

export const getAllRestaurants = () => authHttp.get("/restaurant/list");

export const getOneRestaurant = (id) => authHttp.get(`/restaurant/${id}`);

export const getUserRestaurants = (user) => authHttp.get(`/restaurant/list/${user}`);

export const createRestaurant = (body) => authHttp.post("/restaurant/create", body);

export const editRestaurant = (body) => authHttp.post("/restaurant/edit", body);

export const deleteRestaurant = (id) => authHttp.delete(`/restaurant/delete/${id}`);