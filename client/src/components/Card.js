import React from "react"
export default function Card({Imagen,Nombre,Tipo}){
    return(
        <div>
            <h3>{Nombre}</h3>
            <h5>{Tipo}</h5>
            <img src={Imagen}  width="200px" height="250px"/>
        </div>
    )
}