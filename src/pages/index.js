import React from "react";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { displayEmptyErr, showAlert, loginUser } = useAppContext();

  return (
    <>
      <h2>hELLO</h2>
    </>
  );
}
