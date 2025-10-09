import { localHostUserToModel } from "../mappers/localhost-user-mapper";
import { User } from "../models/user";


export const getUserById = async(id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data) return new User({});

    const user = localHostUserToModel(data);
    return user;
}
