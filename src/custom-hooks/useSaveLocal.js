import { useState, useEffect } from 'react'

const useSaveLocal = (callback, params) => {
    useEffect(() => {
        let saveChangesTimer = setTimeout(() => {
            callback(...params)
        }, 1000);

        return () => {
            clearTimeout(saveChangesTimer)
        }
    }, [callback, ...params])
}

export default useSaveLocal;