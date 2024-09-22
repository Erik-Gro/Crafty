"use client"

import { useEffect, useRef } from "react"
import { useEditor } from "../hooks/useEditor"
import { fabric } from "fabric"

export const Editor = () => {
    const {init} = useEditor()

    const canvasRef = useRef(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() =>{
        const canvas = new fabric.Canvas(
            canvasRef.current,
            {
                controlsAboveOverlay:true,
                preserveObjectStacking: true,
            }
        )

        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current!,
        })
    },[init])

    return (
        <div ref={containerRef}>
            <canvas ref={canvasRef}/>
        </div>
    )
}  