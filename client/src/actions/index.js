import axios from "axios";
export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({ type: "GET_POKEMONS", payload: json.data });
  };
}
export function getDetail(id){
  return async function (dispatch){
    try{
      var json=await axios.get(`http://localhost:3001/pokemons/${id}`)
   return dispatch({
    type:"GET_DETAIL",
    payload:json.data
   })
    }catch(error){console.log(error)}
  }

}
export function getTypes(){
  return async function(dispatch){
    const response=await axios.get("http://localhost:3001/types")
    return dispatch({
      type:"GET_TYPES",payload:response.data
    })
  }
}
export function postPokemon(payload){
  return async function(dispatch){
    const response=await axios.post("http://localhost:3001/pokemons",payload)
   console.log(response)
    return response;
  
  }
}
export function getByName(Nombre) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/pokemons?Nombre=${Nombre}`
      );
      return dispatch({
        type: "GET_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}
export function orderByAttack(payload) {
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  };
}
export function orderByType(payload) {
  return {
    type: "ORDER_BY_TYPE",
    payload,
  };
}