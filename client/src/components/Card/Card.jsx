import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ id, img, name, genres }) {
    return (
        <Link to={`/detail/${id}`}>
            <div class="card">
                <div class="card-info">
                    <h2 className="gameName">{name}</h2>
                    <img className="gameImg" src={img} alt="img" style={{ width: "300px" }} />
                    {Boolean(Number(id)) ?
                        <h4 className="gameGenre">Genres: {genres.join(", ")}</h4>
                        : <h4 className="gameGenre">Genres: {genres.map(e => e.name).join(", ")}</h4>
                    }
                </div>
            </div>
        </Link>
    );
}

