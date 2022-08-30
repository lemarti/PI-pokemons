import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function PokemonCreate() {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);
  const [input, setInput] = useState({
    Nombre: "",
    Tipos: [],
    Altura: "",
    Peso: "",
    Vida: "",
    Ataque: "",
    Defensa: "",
    Velocidad: "",
    Img: "",
    CreadoenDB: "",
  });
  useEffect(() => {
    dispatch(getTypes());
  });

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.value]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.type, e.target.value],
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input));
    alert("Personaje creado");
    setInput({
      Nombre: "",
      Tipos: [],
      Altura: "",
      Peso: "",
      Vida: "",
      Ataque: "",
      Defensa: "",
      Velocidad: "",
      Img: "",
      CreadoenDB: "",
    });
  }
  return (
    <div>
      <Link to="/pokemons">
        <button>volver a inicio</button>
      </Link>

      <h1>Crea tu personaje!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="Nombre"
            onChange={(e) => handleOnChange(e)}
          ></input>
        </div>
        <div>
          <label>Tipos:</label>
          <input
            type="text"
            value={input.Tipos}
            name="Tipos"
            onChange={(e) => handleOnChange(e)}
          ></input>
        </div>
        <div>
          <label>Altura:</label>
          <input
            type="text"
            value={input.Altura}
            name="Altura"
            onChange={(e) => handleOnChange(e)}
          ></input>
        </div>
        <div>
          <label> Peso:</label>
          <input
            type="text"
            value={input.Peso}
            name=" Peso"
            onChange={(e) => handleOnChange(e)}
          ></input>
        </div>
        <div>
          <label>Vida:</label>
          <input
            type="text"
            value={input.Vida}
            name="Vida"
            onChange={(e) => handleOnChange(e)}
          ></input>
        </div>
        <div>
          <label>Ataque:</label>
          <input
            type="text"
            value={input.Ataque}
            name="Ataque"
            onChange={(e) => handleOnChange(e)}
          ></input>
        </div>
        <div>
          <label>Defensa:</label>
          <input
            type="text"
            value={input.Defensa}
            name="Defensa"
            onChange={(e) => handleOnChange(e)}
          ></input>
        </div>
        <div>
          <label>Velocidad:</label>
          <input
            type="text"
            value={input.Velocidad}
            name="Velocidad"
            onChange={(e) => handleOnChange(e)}
          ></input>
        </div>
        <div>
          <label>Img:</label>
          <input
            type="text"
            value={input.Img}
            name="Img"
            onChange={(e) => handleOnChange(e)}
          ></input>
        </div>
       
        <select onChange={(e) => handleSelect(e)}>
          {types.map((type) => (
            <option value={type.Nombre}>{type.Nombre}</option>
          ))}
        </select>
        
        <button type="submit">Crear personaje</button>
      </form>
    </div>
  );
}
