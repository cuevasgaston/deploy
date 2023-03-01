import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../../actions";
import './SearchBar.css';
import Paginado from "../Paginado/Paginado";


export default function SearchBar() {
    const [names, setNames] = useState("");
    
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault();
        if (names !== ""){
            onSearch(names);
            setNames("")
            Paginado(1)
        }
    }
    const onSearch = (names)=>{
        dispatch(getNameVideogames(names))
    }
    return(
        <div className="all">
            <input 
            className="rar" 
            type="text" 
            placeholder="Search for a videogame" 
            value={names} 
            onChange={e => setNames(e.target.value)}/>
            <input 
            className="btn" 
            type="submit"    
            value="Search"
            onClick={(e)=>{handleSubmit(e)}}/>
        </div>
    )
}