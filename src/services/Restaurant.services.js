import createHttp from "./Base.services";

const authHttp = createHttp(true);
//const noAuthHttp = createHttp();

export const getAllRestaurants = () => authHttp.get("/restaurant/list");