//unico que puede cambiar el estado global de redux, para que usen los demas componentes.-

const initialState = {
    videogames: [],
    videogamesCopy: [],
    genres: [],
    detail: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                videogamesCopy: action.payload,
            }
        case 'GET_NAME_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
            };

        case 'FILTER_BY_GENRE':
            const allVideogames = state.videogamesCopy;  //filtra sobre la copia que tiene todos los juegos, asi no hace filtro sobre filtro
            console.log(action.payload);
            const filtered =
                action.payload === "All"
                    ? allVideogames
                    : allVideogames.filter((e) => e.genres.includes(action.payload));
            return {
                ...state,
                videogames: filtered,
            }
        case 'POST_VIDEOGAME':
            return {
                ...state,

            };

        case 'VIDEOGAME_DETAIL':
            return{
                ...state,
                detail: action.payload
            }

        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload,
            };

        case 'FILTER_CREATED':
            const allVideogames2 = state.videogamesCopy;
            const createdFilter = action.payload === 'created' ? allVideogames2.filter(e =>
                e.createdIndDb) : allVideogames2.filter(e => !e.createdIndDb)
            return {
                ...state,
                videogames: action.payload === "All" ? state.videogamesCopy : createdFilter
            };

        case 'ORDER_BY_NAME':
            const allVideogames3 = state.videogamesCopy;
            const sortedVideogames = action.payload === "ascendent" ? allVideogames3.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            })
                : allVideogames3.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });

            return {
                ...state,
                videogames: sortedVideogames
            }
        case 'FILTER_BY_RATING':
            const allVideogames4 = state.videogamesCopy;
            const gamesByRating = action.payload === "best" ? allVideogames4.sort((a, b) =>
                b.rating - a.rating) : allVideogames4.sort((a, b) => a.rating - b.rating);
            return {
                ...state,
                videogames: [...gamesByRating]
            }
        case 'CLEAN_DETAIL':
            return{
                ...state,
                detail: []
            }

        default: return state;
    }
}

export default rootReducer;