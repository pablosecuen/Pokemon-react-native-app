import axios from "axios";

const apiUrl = "https://pokeapi.co/api/v2/pokemon"; //save the api url in case we need to use it later for other purposes

const fetchPokemons = async () => {
  try {
    const response = await axios.get(apiUrl + `?limit=20`);
    const pokemons = await Promise.all(
      response.data.results.map((r) =>
        axios.get(r.url).then((response) => response.data)
      )
    ); //declare an "initial state (eventough there is no redux here, it's just an example app)" to save the pokemons
    console.log(pokemons);
    return pokemons;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchPokemons;
//export the fetching so we keep our app separated by modules
