//el querySelector funciona usando #ID´s o Clases del css
//la sintaxis es: document.querySelector(selector)
//donde el selector es una cadena de texto que indica el elemento que queremos buscar
//Por ejemplo: document.querySelector('#id') busca el elemento con el id indicado
//Por ejemplo: document.querySelector('.class') busca el elemento con la clase indicada
const mainDiv = document.querySelector('#container-pokemons');
const seachElement = document.querySelector('#search');
const NOT_IMAGE_TEXT = 'la imagen del pokemon';
let region="https://pokeapi.co/api/v2/pokemon/?limit=3";
let globalPokemons = [];

//Esta funcion limpia el input de busqueda
const cleanView = () => {
    mainDiv.innerHTML = ''
    //globalPokemons = []; // cuando inserto esta funcion también elimina el render pokemon
    //entonces es necesario crear una nueva función que las elimine en ordenes distintos
}

//esta funcion limpia el array que contiene los pokemons a mostrar
const cleanRenderCardPokemon=  () => {
    globalPokemons = [];
}

//esta funcion es la que busca a los pokemons	y los muestra
const searchWithFilter = (searchingText) => {
    const filteredPokemon = globalPokemons.filter((pokemon) => {
        const { name } = pokemon;
        if (name.includes(searchingText)) {
            return pokemon;
        }
    });
    return filteredPokemon;
}

//usa el evento keyup para buscar los pokemons
//keyup es un evento que se activa cuando se suelta una tecla presionada
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
    const pokemon = { name: name, img: img};
    globalPokemons.push(pokemon);
};

const renderCardPokemon = (element, index) => {

    //esta porción de código crea los elementos de la tarjeta para despues poder insertarlos al html
    const cardPokemonDiv = document.createElement('button');
    const pokemonImgDiv= document.createElement('div');
    const pokemonImg = document.createElement('img');
    const brElement = document.createElement('br');
    const pokemonNameSpan = document.createElement('span');

    //este código brinda las clases a los elementos creados anteriormente
    cardPokemonDiv.className = 'centerCard';
    pokemonImgDiv.className = 'pokemonImgDiv';
    pokemonImg.className = 'icon-region';

    //brinda un atributo al elemento seleccionado, en este ccaso el pokemonImg
    //la sintaxis nos dice Element.setAttribute(name(del atributo), value);
    //los atributos validos son: name, src,
    pokemonImg.setAttribute('src', element.img);
    pokemonImg.setAttribute('alt', NOT_IMAGE_TEXT);

    //esta porción de código inserta los elementos creados anteriormente al html en cascada (Uno dentro del otro)
    mainDiv.appendChild(cardPokemonDiv);

    cardPokemonDiv.appendChild(pokemonImgDiv);
    
    pokemonImgDiv.appendChild(pokemonImg);
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

//esta funcion se encarga de cambiar el region de los pokemons de acuerdo al boton seleccionado
const boton=document.querySelectorAll('button');
boton.forEach(function (item){
    console.log(item);
    item.addEventListener('click', function(){
        if(item.id==='buttonKanto'){
            cleanRenderCardPokemon();
            region="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
    }
        else if(item.id==='buttonJohto'){
            cleanRenderCardPokemon();
            region="https://pokeapi.co/api/v2/pokemon/?offset=151&limit=20"
    }
        else if(item.id==='buttonHoenn'){
            cleanRenderCardPokemon();
            region="https://pokeapi.co/api/v2/pokemon/?offset=251&limit=20"
    }
    else if(item.id==='buttonSinnoh'){
        cleanRenderCardPokemon();
        region="https://pokeapi.co/api/v2/pokemon/?offset=386&limit=20"
    }
    else if(item.id==='buttonTeselia'){
        cleanRenderCardPokemon();
        region="https://pokeapi.co/api/v2/pokemon/?offset=494&limit=15"
    }

    else if(item.id==='buttonKalos'){
        cleanRenderCardPokemon();
        region="https://pokeapi.co/api/v2/pokemon/?offset=649&limit=15"
    }
    else if(item.id==='buttonAlola'){
        cleanRenderCardPokemon();
        region="https://pokeapi.co/api/v2/pokemon/?offset=721&limit=15"
    }
    else if(item.id==='buttonGalar'){
        cleanRenderCardPokemon();
        region="https://pokeapi.co/api/v2/pokemon/?offset=809&limit=15"
    }
    main();

})
}
)



main();

//Esta es una funcion de prueba para entender como está organizada la informacion de la api
function fetchPokemon(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => console.log(data))
}

fetchPokemon(4)