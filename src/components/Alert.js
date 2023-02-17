import React from "react"
import { useAppContext } from "../context/AppContext"

export default function Alert() {
    const {alertType,alertText} = useAppContext();
  return (
    <div className = {`alert ${alertType}`}> {alertText}</div>
  )
}

