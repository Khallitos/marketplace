import React from "react"
import { useAppContext } from "../context/AppContext"

const Alert = () => {
    const {alertType,alertText} = useAppContext();
  return (
    <div className = {`alert ${alertType}`}> {alertText}</div>
  )
}

export default Alert