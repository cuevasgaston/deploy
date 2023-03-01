import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./Home.css";
//actions
import { getGenres, getVideogames, filterByGenre, filterCreated, filterByRating, orderByName } from "../../actions";
//componentes
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import Loading from "../Loading/Loading";

//Use State: Nos permite guardar estados en los componentes de funciones. devuelve un arreglo con dos valores. 
//El primero es una variable con el valor del estado y el segundo es una función que se usa para modificar el estado.

//UseEffect: Esta función viene a reemplazar las funciones del ciclo de vida de los componentes de clase
//La función useEffect puede recibir uno o dos parámetros. El primero que va a recibir es siempre una función 
//en la que definimos qué comportamiento queremos que tenga. El segundo parámetro (si es que le pasamos) es el 
// que define qué método del life-cycle estamos recreando. Por defecto, cuando no le pasamos un segundo parámetro 
//a useEffect, la función se va a ejecutar tanto cuando el componente se monta en el DOM como cuando se actualiza.
// Otra alternativa es pasarle como segundo parámetro un arreglo vacío. Esto equivale a la función componentDidMount(). 
//Es decir que si como segundo parámetro de useEffect pasamos [ ], la función se ejecutara sólo la primera vez que el componente se renderice en el DOM.-

//UseReducer: recibe dos parametros, por un lado, acceder a los valores del estado, y por el otro lado, despachar acciones al store

//UseSelector: la usaremos sólo cuando queramos mostrar información del estado pero no querer despachar acciones

//UseDispatch, esta función la usaremos sólo cuando queramos despachar acciones y no necesitemos mostrar información del estado
export default function Home() {

    const gen = useSelector((state) => state.genres);
    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)
    const genres = useSelector((state) => state.genres);
    const [order, setOrder] = useState('');
    const [currentPage, serCurrentPage] = useState(1) //se arranca en la primer pagina
    const [videogameperPage, setVideogamePage] = useState(15) //15 juegos por pagina
    const indexLastVideogame = currentPage * videogameperPage;
    const indexFirstVideogame = indexLastVideogame - 15;
    const currentVideogames = allVideogames.slice(indexFirstVideogame, indexLastVideogame)


    const paginado = (pageNumber) => {
        serCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getVideogames()); //componentDidMount
        dispatch(getGenres());
    }, [dispatch]) //segundo parametro vacio para no crear un loop infinito.-

    function handleClick(e) { //funcion para resetear los juegos.-
        e.preventDefault();
        dispatch(getVideogames());
    }

    function handleFilterGenre(e) {
        e.preventDefault();
        dispatch(filterByGenre(e.target.value));// target value es la opcion que clickea el cliente en el front
        serCurrentPage(1);
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        serCurrentPage(1);
    }

    function handleSort(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        serCurrentPage(1);
        setOrder(`Order ${e.target.value}`) //un estado para el setcurrentpage en 1
    }
    const handleSortByRating = async (e) => {
        e.preventDefault();
        dispatch(filterByRating(e.target.value));
        serCurrentPage(1);
    };

    return (
        <div>
            <h1 >Gaming</h1>
            <div className="nav">
                <Link to='/videogame' class="btn">Create videogame</Link>

                <button class="btn" onClick={handleClick}>
                    Reload videogames
                </button>
                <div className="selector">
                    <select onChange={(e) => handleFilterCreated(e)}>
                        <option value="All">All</option>
                        <option value="created">Created</option>
                        <option value="existent">Existent</option>
                    </select>
                    <select onChange={(e) => handleSort(e)}>
                        <option value="ascendent">A-Z</option>
                        <option value="descendent">Z-A</option>
                    </select>
                    <select onChange={(e) => handleSortByRating(e)}>
                        <option value="best">Best </option>
                        <option value="worst">Worst</option>
                    </select>
                    <select onChange={(e) => handleFilterGenre(e)}>
                        <option value="All">Genres</option>
                        {genres.map((g) => (
                            <option key={g.id} value={g.name}>
                                {g.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="searchbar">
                <SearchBar />
            </div>
            <Paginado className="paginado"
                videogameperPage={videogameperPage}
                allVideogames={allVideogames.length}
                paginado={paginado}
            />
            {
                currentVideogames && currentVideogames.map(e => {
                    return (
                        <Card className="card"
                            key={e.id}
                            id={e.id}
                            name={e.name}
                            img={e.img}
                            genres={e.genres} />
                    )
                })
            }
            <Paginado className="paginado"
                videogameperPage={videogameperPage}
                allVideogames={allVideogames.length}
                paginado={paginado}
            />

        </div>
    )
}
//  Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros
//  Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
//  Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 15 en la primer pagina.