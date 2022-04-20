export const getStoredUser = () => {
    return JSON.parse(localStorage.getItem("storedUser"));
};
