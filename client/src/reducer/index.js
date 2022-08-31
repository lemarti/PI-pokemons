const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: [action.payload],
      };
    case "GET_BY_NAME":
      return {
        ...state,
        pokemons: [action.payload],
      };
    case "POST_POKEMON":
      return {
        ...state,
      };
    case "FILTER_CREATED":
      const filterCreated =
        action.payload === "CreadoenDB"
          ? state.allPokemons.filter((el) => el.CreadoenDB)
          : state.allPokemons.filter((el) => !el.CreadoenDB);
      return {
        ...state,
        pokemons:
          action.payload === "todos" ? state.allPokemons : filterCreated,
      };
    case "ORDER_BY_NAME":
      let orderByName =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.Nombre > b.Nombre) {
                return 1;
              }
              if (b.Nombre > a.Nombre) {
                return -1;
              }

              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.Nombre > b.Nombre) {
                return -1;
              }
              if (b.Nombre > a.Nombre) {
                return 1;
              }

              return 0;
            });
      return { ...state, pokemons: orderByName };

    case "ORDER_BY_ATTACK":
      let orderByAttack =
        action.payload === "menosAtt" //menor a mayor
          ? state.pokemons.sort(function (a, b) {
              if (a.Ataque > b.Ataque) {
                return 1;
              }
              if (b.Ataque > a.Ataque) {
                return -1;
              }

              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.Ataque > b.Ataque) {
                return -1;
              }
              if (b.Ataque > a.Ataque) {
                return 1;
              }

              return 0;
            });
      return { ...state, pokemons: orderByAttack };

    case "ORDER_BY_TYPE":

      let orderByType = state.allPokemons.filter(({ Tipo }) => {
        return Tipo.includes(action.payload) 
      });

      return { ...state, pokemons: orderByType };
    default:
      return state;
  }
}

export default rootReducer;
