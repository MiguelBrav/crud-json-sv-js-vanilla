export const nexId = async () => {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=1`;
    const res = await fetch(url);
    const data = await res.json();
    const users = data.items;
    return (users + 1).toString();
}