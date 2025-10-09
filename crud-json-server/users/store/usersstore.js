import { loadUsersByPage } from "../usecases/loadusersbypage";
import { nexId } from "../usecases/totalusers";

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async () => {
    const users = await loadUsersByPage(state.currentPage + 1);
    if (users.length === 0) return; 

    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async () => {
    if(state.currentPage === 1) return;
    const users = await loadUsersByPage(state.currentPage - 1);

    state.currentPage -= 1;
    state.users = users;
}

const onUserChanged = async (updatedUser) => {

    let wasFound = false;
    state.users = state.users.map(u => {
        if (u.id === updatedUser.id) {
            wasFound = true;
            return updatedUser;
        }
        return u;
    });

    if (state.users.length < 10 && !wasFound) {
        state.users.push(updatedUser);
    }

}

const reloadPage = async () => {
    const users = await loadUsersByPage(state.currentPage);
    if (users.length === 0) {
        await loadPreviousPage();
        return;
    }
    state.users = users;
}

const nextId = async () => {
    const responde = await nexId();
    return responde;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,
    nextId,
    getUsers: () => [...state.users],
    getCurrentPage: () => state.currentPage
}