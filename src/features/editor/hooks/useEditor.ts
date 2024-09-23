import { useCallback } from "react"

export const useEditor = () => {
    const init = useCallback(({
        initialCanvas,
        initialContainer,
    }:{
        initialCanvas: any;
        initialContainer:HTMLDivElement
    }) => {
        initialCanvas.setWidth(initialContainer.offsetWidth);
        initialCanvas.setHeight(initialContainer.offsetHeight);
    },[])

    return {init}
}