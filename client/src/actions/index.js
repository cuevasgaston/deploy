import axios from 'axios';

//Aca se conecta el back con el front;

export const getVideogames = () => {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/videogames`);
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}
export function getNameVideogames(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/videogames?name=` + name);
            return dispatch({
                type: 'GET_NAME_VIDEOGAMES',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getGenres() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/genres`);
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}

export function postVideogame(payload) {
    return async (dispatch) => {
        try {
        //    console.log(payload)
           const json = await axios.post('http://localhost:3001/videogames', payload)
        //    console.log(json.data)
           return dispatch({
              type: 'POST_VIDEOGAME',
              payload: json.data
           })
        } catch(err) {
           console.log(err)
        }
     }
}

export function filterByGenre(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}
export const orderByName = (payload) => {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}
export const filterByRating = (payload) => {
    return {
        type: 'FILTER_BY_RATING',
        payload
    }
}
export const videogameDetail = (id) => {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/videogame/` + id); 
        return dispatch({
            type: 'VIDEOGAME_DETAIL',
            payload: json.data
        })
    }
}
export const cleanDetail = () =>{
    return{
        type: 'CLEAN_DETAIL',
        payload: true
    }
}
