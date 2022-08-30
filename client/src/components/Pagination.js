import React from "react";

export default function Pagination({
  pokemonsPerPage,
  allPokemons,
  pagination,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers &&
          pageNumbers.map(number => (
            <li className="number" key={number}>
              <a onClick={() => pagination(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  )
}
