"use client"

import { useEffect } from "react"
import { useEditor } from "../hooks/useEditor"

export const Editor = () => {
    const {init} = useEditor()

    useEffect(() =>{
        init()
    },[])

    return (
        <div>
            Editor components
        </div>
    )
}  