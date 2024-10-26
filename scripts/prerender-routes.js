const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 5;

(async () => {
  const fs = require('fs');
  const pokemonIds = Array.from({length: TOTAL_POKEMONS}, (_, i)=> i + 1);

  let fileContent = pokemonIds.map(
    id => `/pokemons/${id}`
  ).join('\n')

  const pages = Array.from({length: TOTAL_PAGES}, (_, i)=> i + 1);
  fileContent = fileContent + '\n' + pages.map(
    page => `/pokemons/pages/${page}`
  ).join('\n')

  const {results: pokemonNameList} = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`).then(res => res.json());
  fileContent = fileContent + '\n' + pokemonNameList.map(
    pokemon => `/pokemons/${pokemon.name}`
  ).join('\n')

  fs.writeFileSync('routes.txt', fileContent);
  console.log('Routes.txt Generado')

})()
