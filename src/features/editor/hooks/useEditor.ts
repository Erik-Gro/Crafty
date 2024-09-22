import { useCallback } from "react"

export const useEditor = () => {
    const init = useCallback(() => {
        console.log("Initializing editor")
    },[])

    return {init}
}