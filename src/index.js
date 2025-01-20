import VanillaTilt from "vanilla-tilt";
import Muuri from "muuri";

const url = "https://pokeapi.co/api/v2/pokemon/";
const table = document.getElementById("table");

const promises = [];

// nombre id foto altura peso
const promise1 = new Promise((resolve, reject) =>
{
  setTimeout(resolve,
    3000,
    getAllPokemons()
      .then(data =>
      {
        const maxList = 400;
        for (let index = 1; index <= maxList; index++)
        {
          const promiseNew = new Promise((resolve, reject) =>
          {
            // console.log(index % 2);
            if (index % 2)
            {
              // console.log("if");
              setTimeout(resolve,
                100,
                getPokemon(index)
              );
            } else
            {
              // console.log("else");
              setTimeout(resolve,
                10000,
                getPokemon(index)
              );
            }
          });
          // console.log("asd");
          promises.push(
            promiseNew
          );
          // console.log("--");
        }
      })
  );
});
promises.push(
  promise1
);
// console.log(promises);
Promise.all(promises).then(response =>
{
  // console.log(response);
  response.forEach(() =>
  {
    vanillaStart();
    muuriStart();
  });
});
// getPokemon(2);
// getPokemon(3);

function getAllPokemons()
{
  const url = "https://pokeapi.co/api/v2/pokemon/";
  return fetch(url)
    .then(response => response.json())
    .then(data => data);
}

function getPokemon(value)
{
  const url = `https://pokeapi.co/api/v2/pokemon/${ value }`;
  // console.log(url);
  return fetch(url)
    .then(response => response.json())
    .then(data =>
    {
      // console.log(data);

      // for (const { id, weight, height, is_default, name, order } of data)
      // {

      // }
      let wrapData = '';
      for (const prop in data)
      {
        if (Object.prototype.hasOwnProperty.call(data, prop))
        {
          if (typeof data[prop] === "string" || typeof data[prop] === "number" || typeof data[prop] === "boolean")
          {
            // console.log(prop);
            // console.log(data[prop]);
            // console.log("___________");
            wrapData += ` data-${ prop }='${ data[prop] }' `;
          }
        }
      }



      table.innerHTML += `
            <div class="wrap-poke-card" ${ wrapData }>
              <div class="poke-card" data-tilt data-tilt-glare data-tilt-max-glare="0.2">
                <div class="poke-body">
                    <h1>${ data.name }</h1>
                    <p>Altura:${ data.height }</p>
                    <p>Peso:${ data.weight }</p>
                    <p><small>Nº:${ data.id }</small></p>
                    <p><small>order api:${ data.order }</small></p>
                    
                    <img src="${ data.sprites.front_shiny ? data.sprites.front_shiny : data.sprites.front_default }" alt="">
                </div>
              </div>
            </div>
              `;
      // console.log(data.sprites.front_shiny);
      // console.table(promises[9]);
    });
}

/** INICIAR VANILLA TILT**/
function vanillaStart()
{
  setTimeout(() =>
  {
    const element = document.querySelectorAll(".poke-card");
    VanillaTilt.init(element);
  }, 2000);
  // console.log(1);
}
/** INICIAR GRID MUURI**/
function muuriStart()
{
  setTimeout(() =>
  {

    window.gridMuuri = new Muuri('.poke-table',
      {
        // Initial item elements
        items: '.wrap-poke-card',
        sortData: {
          order: function (item, element)
          {
            return parseFloat(element.getAttribute('data-order'));
          },
          name: function (item, element)
          {
            return element.getAttribute('data-name').toUpperCase();
          },
          weight: function (item, element)
          {
            return element.getAttribute('data-weight').toUpperCase();
          },
          height: function (item, element)
          {
            return element.getAttribute('data-height').toUpperCase();
          },
          is_default: function (item, element)
          {
            // console.log(item);
            // console.log(element.getAttribute('data-is_default'));
            return element.getAttribute('data-is_default').toUpperCase();
          },
          id: function (item, element)
          {
            return element.getAttribute('data-id').toUpperCase();
          },
        },
      }
    );
    window.gridMuuri.sort('name');
  }, 2000);
  // setTimeout(resolve,
  //   3000,
}
// grid.filter(function (item)
// {
//   return item.getElement().hasAttribute('data-foo');
// });

function filterHeight(item)
{
  const minHeight = null;
  const maxHeight = null;
  const itemHeight = item.getElement().getAttribute('data-height');
  const itemHasAttribute = item.getElement().hasAttribute('data-height');
  if (itemHeight > minHeight && maxHeight > itemHeight)
  {
    return true;
  }
  // return itemHasAttribute;
}
document.getElementById("showDetailBtn").onclick = () =>
{
  console.log('click');
  document.querySelectorAll('.poke-card').forEach((item) =>
  {
    console.log(item.classList.contains('show-detail'));
    if (item.classList.contains('show-detail'))
    {
      item.classList.remove('show-detail');
    } else
    {
      item.classList.add('show-detail');
    }
    // console.log(item);
  });

};