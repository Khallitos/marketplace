import React from "react"
import {AppProvider} from "../context/AppContext"
import Navbar from "../components/Navbar"
import '../styles/global.css'
function MyApp({ Component, pageProps }) {
  
  return(
    <>
    <AppProvider>
      <Navbar/>    
      <Component {...pageProps} />
    </AppProvider>
    </>
  )
}

export default MyApp