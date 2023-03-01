const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
require('dotenv').config();
const {
    API_KEY
} = process.env;

const router = Router();

const axios = require('axios');// o fetch

const { Videogame, Genre } = require('../db');

const getDataFromApi = async () => {
    let apiVideogames = [];
    for (let i = 1; i <= 5; i++) {
        let apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        apiVideogames = apiVideogames.concat(apiUrl.data.results)
    }
    let allVideogames = apiVideogames.map(game => {
        return {
            id: game.id,
            name: game.name,
            description: game.description,
            released: game.released,
            rating: game.rating,
            img: game.background_image,
            platforms: game.platforms.map(p => p.platform.name),
            genres: game.genres.map(p => p.name)
        }
    })
    return allVideogames;
}


const getDataFromDb = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            throught: {
                attributes: []
            },
        }
    })
}

const getAllVideogames = async () => {
    const apiInfo = await getDataFromApi()
    const dbInfo = await getDataFromDb()
    const allinfo = dbInfo.concat(apiInfo)
    return allinfo;
}


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// [ ] GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal

//y
// [ ] GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado
router.get('/videogames', async (req, res) => { //los dos en la misma ruta porque el query no define una nueva ruta. van a la misma
    const { name } = req.query
    let gamesTotal = await getAllVideogames();
    if (name) {
        const gameByName = await gamesTotal.filter(game =>
            game.name.toLowerCase().includes(name.toLocaleLowerCase()))
        gameByName.length ?
            res.status(200).send(gameByName) : res.status(404).send('Videogame not found')
    } else {
        res.status(200).send(gamesTotal);
    }
}
)

// [ ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados

router.get('/videogame/:id', async (req, res) => {
    const { id } = req.params;
    const allVideogames = await getAllVideogames()
    if (id) {
        let videoGameId = await allVideogames.filter(e => e.id == id)
        videoGameId.length ?
            res.status(200).json(videoGameId) :
            res.status(404).send('Videogame not found')
    }
})

// [ ] POST /videogames:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos, relacionado a sus géneros.

router.post('/videogames', async (req, res) => {
    console.log(req.body);
    try {
        let {
            name,
            description,
            released,
            rating,
            platforms,
            img,
            createdIndDb,
            genres
        } = req.body;
        if (!name || !description || !platforms) throw Error('Missing data')
        let videogameDone = await Videogame.create({ //los metodos de los modelos siempre dan promesa
            name,
            description,
            released,
            rating,
            platforms,
            img,
            createdIndDb
        })
        //el genero se busca en el modelo ya creado, busca los generos que coincidan con lo que le paso por body 
        genres.forEach(async (G) => {
            let genresGame = await Genre.findOne({ where: { name: G } })
            await videogameDone.addGenre(genresGame)
        })
          res.send('Videogame created successfully!')
      
        // res.send('Videogame Successfully Created')
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})


// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get('/genres', async (req, res) => {
    try {
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        genresApi.data.results.map(async g => {
            const genre = await Genre.findOrCreate({
                where: {
                    name: g.name,
                }
            });
            return genre
        });
        let result = await Genre.findAll()

        res.status(200).json(result)
    } catch (error) {
        res.status(404).send(error)
    }
})


module.exports = router;
