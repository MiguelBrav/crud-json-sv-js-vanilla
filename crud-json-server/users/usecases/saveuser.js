import { localHostUserToModel } from "../mappers/localhost-user-mapper";
import { userModelToLocalHost } from "../mappers/user-to-localhost-mapper";
import { User } from "../models/user";
import usersstore from "../store/usersstore";

export const saveUser = async (userLike) => {
    // TODO: Implement user saving logic


    const user = new User(userLike);

    if (!user.firstName || !user.lastName) {
        throw new Error('First name and last name are required');
    }

    const userToSave = userModelToLocalHost(user);
    let userUpdated;

    if (user.id){
        userUpdated = await updateUser(userToSave);
    } else {
        userToSave.id = await usersstore.nextId();

        userUpdated = await createdUser(userToSave);
    }    

    return localHostUserToModel(userUpdated);
}

const createdUser = async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();
    return newUser;
}

const updateUser = async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updatedUser = await res.json();
    return updatedUser;
}