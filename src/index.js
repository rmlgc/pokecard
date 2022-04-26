import VanillaTilt from "vanilla-tilt";

const url = "https://pokeapi.co/api/v2/pokemon/";
const table = document.getElementById("table");

const promises = [];

// nombre id foto altura peso
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve,
    3000,
    getAllPokemons()
      .then(data => {
        const maxList = 9;
        for (let index = 1; index <= maxList; index++) {
          const promiseNew = new Promise((resolve, reject) => {
            setTimeout(resolve,
              3000,
              getPokemon(index)
            );
          });
          promises.push(
            promiseNew
          );
        }
      })
  );
});
promises.push(
  promise1
);
// console.log(promises);
Promise.all(promises).then(response => {
  console.log(response);
  response.forEach(() => vanillaStart());
});
// getPokemon(2);
// getPokemon(3);

function getAllPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  return fetch(url)
    .then(response => response.json())
    .then(data => data);
}

function getPokemon(value) {
  const url = `https://pokeapi.co/api/v2/pokemon/${value}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      table.innerHTML += `
            <div class="poke-card" data-tilt data-tilt-glare data-tilt-max-glare="0.2">
                <div class="poke-body">
                    <h1>${data.name}</h1>
                    <p>Altura:${data.height}</p>
                    <p>Peso:${data.weight}</p>
                    <p>id:${data.id}</p>
                    <img src="${data.sprites.front_shiny ? data.sprites.front_shiny : data.sprites.front_default}" alt="">
                </div>
            </div>
              `;
    // console.log(data.sprites.front_shiny);
    });
}

/** INICIAR VANILLA TILT**/
function vanillaStart() {
  const element = document.querySelectorAll(".poke-card");
  VanillaTilt.init(element);
}
