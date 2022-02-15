import { useState, useEffect } from 'react'


const useLocalStorage = (object, storageParams) => {
    const [stateObject, setStateObject] = useState(object)


}

// const useSaveLocal = (params, callback) => {
//     useEffect(() => {
//         let saveChangesTimer = setTimeout(() => {
//             callback(...params)
//         }, 2000);

//         return () => {
//             clearTimeout(saveChangesTimer)
//         }
//     }, [callback, ...params])
// }



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