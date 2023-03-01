import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, postVideogame } from "../../actions";
import './CreateVideogame.css'

function validate(input) {
    let error = {};

    if (!input.name) {
        error.name = "Name required";
    }
    if (!input.platforms.length) {
        error.platforms = "Platform  required";
    }
    if (!input.description) {
        error.description = "Description required";
    }
    if (input.description.length > 45) {
        error.description = "Description can`t have more than 45 characters";
    }
    if (!input.genres.length) {
        error.genres = "Genres  required";
    }
    if (!input.released) {
        error.released = "Date realeased required";
    }
    if (!input.rating) {
        error.rating = "Rating required";
    }
    if (input.rating > 5) {
        error.rating = "Max Rating is 5";
    }
    if (input.rating < 0) {
        error.rating = "Min Rating is 0";
    }
    return error;
};

export default function CreateVideogame() {
    const dispatch = useDispatch();
    const history = useHistory(); //Metodo del roouter para redirigirme a donde le digo.-
    const gen = useSelector((state) => state.genres);
    const [errors, setErrors] = useState({});

    const platforms = [
        "PC",
        "Linux",
        "Xbox",
        "Xbox One",
        "Xbox 360",
        "Xbox Series S/X",
        "PlayStation 5",
        "PlayStation 4",
        "PlayStation 3",
        "Wii U",
        "Nintendo Switch",
        "Nintendo",
        "macOS",
        "iOS",
        "Nintendo 3DS",
        "Android",
        "Steam Deck",
    ];

    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: 0,
        platforms: [],
        img: '',
        genres: []
    })

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value //cuando clickeo se agrega el valor al estado input.-
        })
    }

    function handlePlatform(e) {
        e.target.checked ? setInput({
            ...input,
            [e.target.name]: [...input.platforms, e.target.value],
        }) : setInput({
            ...input,
            [e.target.name]: input.platforms.filter((a) => a !== e.target.value),
        });
        console.log(e.target.name)
    }


    function handleGenre(e) {
        e.target.checked ? setInput({
            ...input,
            [e.target.name]: [...input.genres, e.target.value],
        }) : setInput({
            ...input,
            [e.target.name]: input.genres.filter((a) => a !== e.target.value),
        });
        console.log(e.target.name)
    }

    // function handleGenre(e) {
    //     setInput({
    //         ...input,
    //         [e.target.name]: [...input.genres, e.target.value],
    //     })
    //     console.log(e.target.name)
    // }

    async function handleSubmit(e) {
        e.preventDefault() //para el submit, no para todos los handlers
        const errors = validate(input);
        setErrors(errors);
        if (!Object.keys(errors).length) {
            await dispatch(postVideogame(input))
            console.log(input)
            setInput({
                name: '',
                description: '',
                released: '',
                rating: '',
                platforms: [],
                img: '',
                genres: []
            })
            alert('Videogame Created')
            history.push('/home');  //Me redirige al home despues de creado el juego.-
        } else {
            alert("Check Info");
        }
    };

    // function handleDelete(e) {
    //     setInput({
    //         ...input,
    //         genres: input.genres.filter(genre => genre !== e)
    //     })
    // }

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    return (
        <div className="todo">

        <Link to='/home'><button className="home">Back Home</button></Link>
        <h1>Create your videogame!</h1>


        <form onSubmit={(e) => handleSubmit(e)}>
            <div  class="form">                    
                    <label class="label">Name:
                        <input
                            class="input"
                            name='name'
                            type='text'
                            value={input.name}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {errors.name && (
                            <p className="danger">{errors.name}</p>
                        )}
                    </label>
                    <label class="label">Description:
                        <input
                            class="input"
                            name='description'
                            type='text'
                            value={input.description}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {errors.description && (
                            <p className="danger">{errors.description}</p>
                        )}
                    </label>
                    <label class="label">Released:
                        <input
                            class="input"
                            name='released'
                            type='date'
                            value={input.released}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {errors.released && (
                            <p className="danger">{errors.released}</p>
                        )}
                    </label>
                    <label class="label">Rating:
                        <input
                            class="input"
                            name='rating'
                            type='number'
                            value={input.rating}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {errors.rating && (
                            <p className="danger">{errors.rating}</p>
                        )}
                    </label>
                    <label class="label">Image:
                        <input
                            class="input"
                            name='img'
                            type='text'
                            value={input.img}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>
                </div>

                    <div className="checks">
                        <label className="container">
                            <p>Select Platforms:</p>
                            {platforms.map((platform) => (
                                <div key={platform.id}>
                                    <input                                        
                                        type="checkbox"
                                        value={platform}
                                        name="platforms"
                                        onChange={(e) => handlePlatform(e)}
                                    />
                                    <label>{platform}</label>
                                    <div class="checkmark"></div>
                                </div>
                            ))}
                        </label>
                        <label className="container">
                            <p>Select Genres:</p>
                            {gen.map((g) => (
                                <div key={g.id}>
                                    <input                                        
                                        type="checkbox"
                                        value={g.name}
                                        name="genres"
                                        onChange={(e) => handleGenre(e)}
                                    />
                                    <label>{g.name}</label>
                                    <div class="checkmark"></div>
                                </div>
                            ))}
                        </label>
                    </div>                
                {/* <select onChange={handleGenre}>
                        {gen.map((genre) => (
                            <option
                                name="genres"
                                value={genre.name}>{genre.name}</option>
                        ))}
                    </select>
                    {input.genres.map(e =>
                        <div>
                            <p>{e}</p>
                            <button onClick={() => handleDelete(e)}>x</button>
                        </div>
                    )}
                    <br /> */}
                <button className="create" type='submit'>Create Videogame</button>

            </form>
        </div>
    )
}