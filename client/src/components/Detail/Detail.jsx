import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../Detail/Detail.css";
import { videogameDetail, cleanDetail } from "../../actions";
import Loading from "../Loading/Loading";

export default function VideogameDetail(props) {

    const dispatch = useDispatch()
    const { id } = useParams();
    const videoGame = useSelector((state) => state.detail)
    console.log(videoGame)


    useEffect(() => {
        dispatch(videogameDetail(id));
        return () => {
            dispatch(cleanDetail());
        }
    }, [dispatch])

    return (
        <div>

            {videoGame.length > 0 ?

                < div className="container">
                    <Link to='/home'>
                        <button className="return">Back Home</button>
                    </Link>
                    <div className="content">
                        <div className="title">
                            <h1>{videoGame[0].name}</h1>
                        </div>
                        <div className="image">
                            <img src={videoGame[0].img} style={{ maxWidth: "600px" }} />
                        </div>
                        <div className="description">
                            <p>{videoGame[0].description}</p>
                        </div>
                        <div className="data">
                            <p>Released date: {videoGame[0].released}</p>
                            <p>Rating: {videoGame[0].rating}</p>
                            <p>Platforms: {videoGame[0].platforms.join(", ")}</p>
                            {Boolean(Number(id)) ?
                                <p>Genres: {videoGame[0].genres.join(", ")}</p>
                                : <p>Genres: {videoGame[0].genres.map(e => e.name).join(", ")}</p>
                            }
                        </div>
                    </div>
                </div>:  <div className="loading"><Loading /> </div>
            }
            <Link to='/home'>
                <button className="return">Back Home</button>
            </Link>
        </div>
    )
}



//  Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
//  Descripción
//  Fecha de lanzamiento
//  Rating
//  Plataformas