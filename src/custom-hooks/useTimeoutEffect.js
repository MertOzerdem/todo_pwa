import { useRef, useEffect } from 'react';

const useTimeoutEffect = (callback, timeout = 1000) => {
    const isInitialMount = useRef(true);

    useEffect(() => {
        let saveChangesTimer;
    
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            saveChangesTimer = setTimeout(() => {
                // console.log('save changes alt')
                callback()
            }, timeout);
        }
    
        return () => {
            clearTimeout(saveChangesTimer)
        }
    }, [callback, timeout]);
}

export default useTimeoutEffect;