import createHttp from "./Base.services";
const authHttp = createHttp(true);

export const getAllRestaurants = () => authHttp.get("/restaurant/list");

export const getOneRestaurant = (id) => authHttp.get(`/restaurant/${id}`);