//el querySelector funciona usando #ID´s o Clases del css
//la sintaxis es: document.querySelector(selector)
//donde el selector es una cadena de texto que indica el elemento que queremos buscar
//Por ejemplo: document.querySelector('#id') busca el elemento con el id indicado
//Por ejemplo: document.querySelector('.class') busca el elemento con la clase indicada
const mainDiv = document.querySelector('#container-pokemons');
const cardPokemon1=document.querySelector('#cardInfo')
const seachElement = document.querySelector('#search');
const NOT_IMAGE_TEXT = 'la imagen del pokemon';
let globalPokemons = [];
let offset=0;
const limit=6;
let region="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=6";

const obtentRegion = () => {
    cleanRenderCardPokemon();
    region="https://pokeapi.co/api/v2/pokemon/?offset="+offset+"&limit="+limit;
}

//Esta funcion limpia el input de busqueda
const cleanView = () => {
    mainDiv.innerHTML = ''
}

//esta funcion limpia el array que contiene los pokemons a mostrar
const cleanRenderCardPokemon=  () => {
    globalPokemons = [];
}

//esta funcion es la que busca a los pokemons	y los muestra
const searchWithFilterName = (searchingText) => {
    const filteredPokemon = globalPokemons.filter((pokemon) => {
        const { name } = pokemon;
        if (name.includes(searchingText)) {
            return pokemon;
        }
    });
    return filteredPokemon;
}

const searchWithFilterType = (searchingText) => {
    const filteredPokemon = globalPokemons.filter((pokemon) => {
        const { types } = pokemon;
        if (types.includes(searchingText)) {
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
    pokemosGlobal2 = searchWithFilterName(inputText.toLowerCase());
    cleanView();
    renderPokemons(pokemosGlobal2);
});

const getPokemons = async () => { /*obtiene los datos */
    const response= await fetch(region);
    const responseJson =  await response.json();
    const pokemons = responseJson.results;
    for(const element of pokemons){
        const response = await fetch(element.url); //0btenemos la url del pokemon
        const imgResponseJson = await response.json();//obtenemos el json de la url
        normalizePokemonData(element.name, imgResponseJson)
    };
};

const normalizePokemonData =  (name, imgResponseJson) => {
    const img = imgResponseJson?.sprites?.other['official-artwork']?.front_default || '';
    const id= imgResponseJson?.id || '';
    const typePokemon= imgResponseJson?.types?.map((type) => type.type.name) || '';
    const weight= imgResponseJson?.weight || '';
    const height= imgResponseJson?.height || '';
    const pokemon = { name: name, img: img, id: id, type: typePokemon , weight: weight, height: height };
    globalPokemons.push(pokemon);
};

const renderCardPokemon = (element, index) => {

    //esta porción de código crea los elementos de la tarjeta para despues poder insertarlos al html
    const cardPokemonDiv = document.createElement('button');
    const pokemonImgDiv= document.createElement('div');
    const pokemonImg = document.createElement('img');
    const brElement = document.createElement('br');
    const dataPokemon = document.createElement('div');
    const pokemonNameSpan = document.createElement('span');
    const pokemonIdSpan = document.createElement('span');
    const pokemonTypeSpan = document.createElement('span');
    //este código brinda las clases a los elementos creados anteriormente
    cardPokemonDiv.className = 'centerCard';
    pokemonImgDiv.className = 'pokemonImgDiv';
    pokemonImg.className = 'icon-region';
    dataPokemon.className = 'dataPokemon';

    //brinda un atributo al elemento seleccionado, en este ccaso el pokemonImg
    //la sintaxis nos dice Element.setAttribute(name(del atributo), value);
    //los atributos validos son: name, src,
    cardPokemonDiv.setAttribute('id',"pokemon"+element.id);
    cardPokemonDiv.setAttribute('type', "radio");
    pokemonImg.setAttribute('src', element.img);
    pokemonImg.setAttribute('alt', NOT_IMAGE_TEXT);

    //esta porción de código inserta los elementos creados anteriormente al html en cascada (Uno dentro del otro)
    mainDiv.appendChild(cardPokemonDiv);
    cardPokemonDiv.appendChild(pokemonImgDiv);
    pokemonImgDiv.appendChild(pokemonImg);
    cardPokemonDiv.appendChild(brElement);
    cardPokemonDiv.appendChild(dataPokemon);
    dataPokemon.appendChild(pokemonIdSpan);
    dataPokemon.appendChild(pokemonNameSpan);
    dataPokemon.appendChild(pokemonTypeSpan);

    //añade cosas del Json al html
    pokemonNameSpan.innerHTML = element.name;
    pokemonIdSpan.innerHTML = "#"+ element.id.toString().padStart(3, '0');
    pokemonTypeSpan.innerHTML = element.type;
    // pokemonWeightSpan.innerHTML = "Peso: "+ element.weight + " kg";
    // pokemonHeightSpan.innerHTML = "Altura: "+ element.height + " m";

    cardPokemonDiv.addEventListener('click', function(){
        borrar();
        const name=document.createElement('h2');
        const cardDivImage= document.createElement('div');
        const cardImg = document.createElement('img');
        const cardP= document.createElement('p');
        const pokemonIdSpan = document.createElement('span');
        const cardTipoSpan= document.createElement('span');
        const cardPesoSpan= document.createElement('span');
        const cardAlturaSpan= document.createElement('span');

        cardImg.setAttribute('src', element.img);
        cardImg.setAttribute('alt', NOT_IMAGE_TEXT);
        cardImg.setAttribute('width', '200px');

        cardInfo.appendChild(name);
        cardInfo.appendChild(cardDivImage);
        cardDivImage.appendChild(cardImg);
        cardInfo.appendChild(cardP);
        cardP.appendChild(pokemonIdSpan);
        cardP.appendChild(cardTipoSpan);
        cardP.appendChild(cardPesoSpan);
        cardP.appendChild(cardAlturaSpan);
        name.innerHTML = element.name;
        pokemonIdSpan.innerHTML = "#"+ element.id.toString().padStart(3, '0');
        cardTipoSpan.innerHTML = "Tipo: "+ element.type;
        cardPesoSpan.innerHTML = "Peso: "+ element.weight + " kg";
        cardAlturaSpan.innerHTML = "Altura: "+ element.height + " m";
        }
    );
}

const renderPokemons = (pokemons) => {
    pokemons.forEach(renderCardPokemon);
}

async function main() {
    cleanView();
    cleanRenderCardPokemon();
    await getPokemons();
    renderPokemons(globalPokemons);
}

//esta funcion se encarga de cambiar el region de los pokemons de acuerdo al boton seleccionado
const boton=document.querySelectorAll('button');

boton.forEach(function (item){
    item.addEventListener('click', function(){
        switch(item.id){
            case'buttonKanto':
                offset=0;
                obtentRegion();
            break;
            case'buttonJohto':
                offset=151;
                obtentRegion();
            break;
            case'buttonHoenn':
                offset=251;
                obtentRegion();
            break;
            case'buttonSinnoh':
                offset=386;
                obtentRegion();
            break;
            case 'buttonTeselia':
                offset=494;
                obtentRegion();
            break;
            case 'buttonKalos':
                offset=649;
                obtentRegion();
            break;
            case 'buttonAlola':
                offset=721;
                obtentRegion();
            break;
            case 'buttonGalar':
                offset=809;
                obtentRegion();
            break;
            case 'btnNext':
                offset+=limit;
                obtentRegion();
            break;
            case 'btnPrev':
                offset-=limit;
                if(offset>=0){
                    obtentRegion();
                }else{
                    swal("Tranquilo, entrenador!", "No hay pokemons antes de Bulbasaur", "warning");
                    offset=0;
                    obtentRegion();
                }
            break;
            default:
                region="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=6";
            break;
        }
    main();
})
}
)

main();

function borrar(){
    cardInfo.innerHTML="";
}




