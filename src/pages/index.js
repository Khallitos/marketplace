import React from "react";
import { useAppContext } from "../context/AppContext";

export default function Home() {
   const {displayEmptyErr, showAlert, loginUser} = useAppContext();
  displayEmptyErr()
  return <>
  {/* <p>{console.log(context)}</p> */}
  </>

  }