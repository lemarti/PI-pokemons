import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  orderByName,
  orderByAttack,
  filterCreated,
  orderByType,
  getTypes,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1); //estado página actual
  const [pokemonsPerPage, setpokemonsPerPage] = useState(12); //pokemons por página
  const [order, setOrder] = useState("");
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  const pagination = (pageNumber) => {
    //
    //fx que llama a hook -set estado de "página actual"
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getPokemons());
  }, []);
  useEffect(() => {
    dispatch(getTypes());
  }, []);
  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`); //usamos estado para q re renderice cuando se cambia orden
  }
  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  function handleOrderByAttack(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  const types = useSelector((state) => state.types);

  function handleOrderByType(e) {
    e.preventDefault();
    dispatch(orderByType(e.target.value))
    setOrder(`Ordenado${e.target.value}`)
  }
  return (
    <div>
      <Link to="/create">Crear personaje</Link>
      <SearchBar></SearchBar>
      <div>
        <span>
          <select onChange={(e) => handleOrderByName(e)}>
            <option value="asc"> Ascendente</option>
            <option value="desc"> Descendente</option>
          </select>
        </span>
        <span>
          <select onChange={(e) => handleOrderByAttack(e)}>
            <option value="masAtt">Mayor ataque</option>
            <option value="menosAtt"> Menor ataque</option>
          </select>
          </span>
        <span>
          <div>
            <label>Tipos:</label>
            <select onChange={(e)=>handleOrderByType(e)}>
              {types.map((type) => (
                <option value={type.Nombre}>{type.Nombre}</option>
              ))}
            </select>
          </div>
          </span>
        <span>
          <select onChange={(e) => handleFilterCreated(e)}>
            <option value="todos">todos</option>
            <option value="existentes">existentes</option>
            <option value="CreadoenDB">mis pokemones</option>
          </select>
          </span>
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          pagination={pagination}
        />
      </div>

      {currentPokemons?.map((poke) => {
        return (
          <div>
            <Link to={`/pokemon/${poke.ID}`}>
              <Card
                Nombre={poke.Nombre}
                Imagen={poke.Imagen}
                Tipo={poke.Tipo}
                key={poke.ID}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
