"use client"

import { useEffect, useRef } from "react"
import { useEditor } from "../hooks/useEditor"
import { fabric } from "fabric"

export const Editor = () => {
    const { init } = useEditor()

    const canvasRef = useRef(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        
        const canvas = new fabric.Canvas(
            canvasRef.current,
            {
                controlsAboveOverlay: true,
                preserveObjectStacking: true,
            }
        )

        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current!,
        })

        return () => {
            canvas.dispose()
        }
    }, [init])

    return (
        <div className="h-full flex flex-col">
            <div className="h-full flex-1 bg-muted" ref={containerRef}>
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}
