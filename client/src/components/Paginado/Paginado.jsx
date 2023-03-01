import React from "react";

export default function Paginado({videogameperPage, allVideogames, paginado }) {
    const pageNumbers = []

    for (let i = 0; i <= Math.ceil(allVideogames / videogameperPage)-1; i++) {
        pageNumbers.push(i+1)

    }

    return ( //componente que renderiza los numeros
        <nav>
            <ul className ='paginado'>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li className="number" key={number}>
                        <a className="btn" onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}