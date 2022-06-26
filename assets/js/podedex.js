const mainDiv = document.querySelector('#container-pokemons');
const seachElement = document.querySelector('#search');
const NOT_IMAGE_TEXT = 'la imagen del pokemon';

let globalPokemons = [];

const cleanView = () => {
    if (mainDiv.innerHTML = ''){
        region="https://pokeapi.co/api/v2/pokemon/?limit=3"
    }
    
    //globalPokemons = []; // cuando inserto esta funcion también elimina el render pokemon
    //entonces es necesario crear una nueva función que las elimine en ordenes distintos
}

 const cleanRenderCardPokemon=  () => {
     globalPokemons = [];
 }




const searchWithFilter = (searchingText) => { //esta funcion es la que busca a los pokemons	y los muestra
    const filteredPokemon = globalPokemons.filter((pokemon) => {
        const { name } = pokemon;
        if (name.includes(searchingText)) {
            return pokemon;
        }
    });
    return filteredPokemon;
}



seachElement.addEventListener('keyup', (event) => {
    const inputText = event?.target?.value || '';
    let pokemosGlobal2 =  [ ...globalPokemons ]; // globalPokemons.slice(0, globalPokemons.length)
    pokemosGlobal2 = searchWithFilter(inputText);
    cleanView();
    renderPokemons(pokemosGlobal2);
});

const getPokemons = async () => { /*obtiene los datos */
    const response= await fetch(region);
    const responseJson =  await response.json();
    const pokemons = responseJson.results;
    for(const element of pokemons){
        const response = await fetch(element.url);
        const imgResponseJson = await response.json();
        normalizePokemonData(element.name, imgResponseJson)
    };
};

const normalizePokemonData =  (name, imgResponseJson) => {
    const img = imgResponseJson?.sprites?.other['official-artwork']?.front_default || '';
    const pokemon = { name: name, img: img };
    globalPokemons.push(pokemon);
};

const renderCardPokemon = (element, index) => {

    const cardPokemonDiv = document.createElement('button');
    const pokemonImg = document.createElement('img');
    const brElement = document.createElement('br');
    const pokemonNameSpan = document.createElement('span');

    cardPokemonDiv.className = 'center';
    pokemonImg.className = 'icon-region';
    pokemonImg.setAttribute('src', element.img);
    pokemonImg.setAttribute('alt', NOT_IMAGE_TEXT);

    mainDiv.appendChild(cardPokemonDiv);
    cardPokemonDiv.appendChild(pokemonImg);
    cardPokemonDiv.appendChild(brElement);
    cardPokemonDiv.appendChild(pokemonNameSpan);
    pokemonNameSpan.innerHTML = element.name;

}

const renderPokemons = (pokemons) => {
    pokemons.forEach(renderCardPokemon);
}

async function main() {
    cleanView();
    console.log(region);
    await getPokemons();
    renderPokemons(globalPokemons);
}




let region="https://pokeapi.co/api/v2/pokemon/?limit=3";
const boton=document.querySelectorAll('button');

boton.forEach(function (item){
    console.log(item);
    item.addEventListener('click', function(){
        if(item.id==='buttonKanto'){
            cleanRenderCardPokemon();
            region="https://pokeapi.co/api/v2/pokemon/?offset=6&limit=9"
    }
        else if(item.id==='buttonJohto'){
            cleanRenderCardPokemon();
            region="https://pokeapi.co/api/v2/pokemon/?offset=10&limit=13"
    }
        else if(item.id==='buttonHoenn'){
            cleanRenderCardPokemon();
            region="https://pokeapi.co/api/v2/pokemon/?offset=14&limit=16"
    }
    else if(item.id==='buttonSinnoh'){
        cleanRenderCardPokemon();
        region="https://pokeapi.co/api/v2/pokemon/?offset=17&limit=20"
    }
    else if(item.id==='buttonTeselia'){
        region="https://pokeapi.co/api/v2/pokemon/?offset=45&limit=15"
    }
    else if(item.id==='buttonKalos'){
        region="https://pokeapi.co/api/v2/pokemon/?offset=60&limit=15"
    }
    else if(item.id==='buttonAlola'){
        region="https://pokeapi.co/api/v2/pokemon/?offset=75&limit=15"
    }
    else if(item.id==='buttonGalar'){
        region="https://pokeapi.co/api/v2/pokemon/?offset=90&limit=15"
    }
    main();

})
}
)


main();