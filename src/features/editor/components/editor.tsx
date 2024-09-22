"use client"

import { useEffect, useRef } from "react"
import { useEditor } from "../hooks/useEditor"

export const Editor = () => {
    const {init} = useEditor()

    const canvasRef = useRef(null)
    const workspaceRef = useRef(null)

    useEffect(() =>{
        init()
    },[])

    return (
        <div ref={workspaceRef}>
            <canvas ref={canvasRef}/>
        </div>
    )
}  