import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions/index";

export default function SearchBar() {
  const dispatch = useDispatch()
  const [Nombre, setNombre] = useState("")

  function handleInputChange(e) {
    e.preventDefault() 
    setNombre(e.target.value)
   
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(Nombre));
  }

  return (
    <div>
      <input type="text" placeholder="Buscar por nombre"
      onChange={(e)=>handleInputChange(e)} />   

      <button type="submit" 
      onClick={(e=>handleSubmit(e))}>Buscar</button>
    </div>
  )
}
