import { useCallback } from "react"
import { fabric } from "fabric"

export const useEditor = () => {
    const init = useCallback(({
        initialCanvas,
        initialContainer,
    }:{
        initialCanvas: fabric.Canvas;
        initialContainer:HTMLDivElement
    }) => {
        console.log("Initializing editor")
    },[])

    return {init}
}