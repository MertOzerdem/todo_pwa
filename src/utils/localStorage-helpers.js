const setItemToLocal = (storageName, object) => {
    localStorage.setItem(storageName, JSON.stringify(object));
}

const getItemFromLocal = (storageName) => {
    return JSON.parse(localStorage.getItem(storageName));
}

export {
    setItemToLocal,
    getItemFromLocal
}