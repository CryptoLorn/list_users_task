import {axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const userService = {
    getAll: () => axiosService.get(urls.users).then(value => value.data),
    create: (user) => axiosService.post(urls.users, user).then(value => value.data),
    updateById: (id, user) => axiosService.put(`${urls.users}/${id}`, user).then(value => value.data),
    deleteById: (id) => axiosService.delete(`${urls.users}/${id}`)
}