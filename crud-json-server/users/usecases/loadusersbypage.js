import { localHostUserToModel } from "../mappers/localhost-user-mapper";
import { User } from "../models/user";

/**
 * Loads users by page from the specified API endpoint.
 *
 * @param {number} [page=1] - The page number to load users from.
 * @returns {Promise<User>} A promise that resolves when the users are loaded and logged to the console.
 */
export const loadUsersByPage = async(page = 1) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
  
    // const users = data.map(localHostUserToModel);
    if (page > data.pages) {
        return []; 
    }

    const users = data.data.map(localHostUserToModel);

    return users;
}
