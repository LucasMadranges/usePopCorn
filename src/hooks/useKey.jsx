import {useEffect} from "react";

export function useKey(key, action) {
    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key.toLowerCase() === key.toLowerCase()) {
                action();
            }
        })

        return function () {
            document.removeEventListener("keydown", action);
        }
    }, [action])
}