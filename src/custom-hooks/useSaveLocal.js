import { useRef, useEffect } from 'react';
const useSaveLocal = (callback, params, timeout = 1000) => {
    const isInitialMount = useRef(true);
    useEffect(() => {
        let saveChangesTimer;
    
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            saveChangesTimer = setTimeout(() => {
                console.log('save changes')
                callback(...params)
            }, timeout);
        }
    
        return () => {
            clearTimeout(saveChangesTimer)
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callback, ...params, timeout]);
}

export default useSaveLocal;