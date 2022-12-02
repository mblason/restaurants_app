import createHttp from "./Base.services";
const authHttp = createHttp(true);

export const getAllFavs = (user) => authHttp.get(`/favourite/${user}`);

export const getOneFav = (restaurant, user) => authHttp.get(`/favourite/${restaurant}/${user}`);

export const createFav = (body) => authHttp.post("/favourite/create", body);

export const deleteFav = (restaurant, user) => authHttp.delete(`/favourite/delete/${restaurant}/${user}`);


//export const getAllFavs = (id) => authHttp.get(`/restaurant/${id}`);
