import { User } from '../models/user.js';

export const localHostUserToModel = ( localHostUser) =>{

    const {
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name
    } = localHostUser;

    const user = new User({
        id,
        isActive,
        balance,
        avatar,
        firstName: first_name,
        lastName: last_name,
        gender
    });

    return user;
}