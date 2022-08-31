import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const myPokemon = useSelector((state) => state.detail);

  return (
    <div>
      {myPokemon.length > 0 ? (
        <div>
          <h1>{myPokemon[0].Nombre}</h1>
          <img
            src={myPokemon[0].Imagen}
            alt="altern"
            width="500px"
            height="700px"
          />
          <h2>Peso: {myPokemon[0].Peso}</h2>
          <h2>Altura:{myPokemon[0].Altura}</h2>
          <h2>ID:{myPokemon[0].ID}</h2>
          <h2>Vida:{myPokemon[0].Vida.hp}</h2>
          <h2>Ataque:{myPokemon[0].Ataque.attack}</h2>
          <h2>Defensa:{myPokemon[0].Defensa.defense}</h2>
          <h2>Velocidad:{myPokemon[0].Velocidad.speed}</h2>
          <h2>
            <ul>
              {myPokemon[0].Tipo.map((e) => {
                return <li>{e}</li>;
              })}
            </ul>
          </h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/pokemons">
        <button>Volver</button>
      </Link>
    </div>
  );
}
