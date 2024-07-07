<<<<<<< HEAD
const { getGamesFromMongo , getGamesOnSale} = require('../services/gameServices');
const GameService = require('../services/gameServices')
const { ObjectId } = require('mongodb');
=======
const { getGamesFromMongo, getGamesOnSale
    , insertGame, deleteGame,updateGame } = require('../services/gameServices');
>>>>>>> fb91cda30efabe8edf8b108bbaa56ed4f23db063
//render in [localhost]
const getGames = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    try {
        const games = await getGamesFromMongo(page,limit);
        if (!games) {
            return res.status(404).json({ error: 'Games not found' });
        }
        res.json({
            games
        });
    } catch (error) {
        console.error('Error while getting games from MongoDB ', error);
        res.status(500).send('Internal server error');
    }
};  

//  GET gameOnsale
const getGamesOnSaleController = async (req, res) => {
    try {
        const gamesOnSale = await getGamesOnSale();
        if (!gamesOnSale || gamesOnSale.length === 0) {
            return res.status(404).json({ error: 'No games on sale found' });
        }
        res.json(gamesOnSale);
    } catch (error) {
        console.error('Error while getting games on sale from MongoDB:', error);
        res.status(500).send('Internal server error ');
    }
};
<<<<<<< HEAD

const createGame = async (req, res) => {
    try {
        const {
            game_id,
            game_name,
            description = "",
            developers = [],
            dlc = [],
            final_price = "",
            genre_ids = [],
            header_image = "",
            initial_price = "",
            is_free = false,
            movies = [],
            option = [],
            price_cent_discount = [],
            publishers = [],
            release_Date = "",
            rentalPrice = 0,
            sale = [],
            sale_end_date = "",
            screenshots = []
        } = req.body;

        // Kiểm tra nếu game_id hoặc game_name rỗng
        if (!game_id || !game_name) {
            return res.status(400).json({ error: 'game_id và game_name không được để trống' });
        }

        const game = {
            game_id: parseInt(game_id),
            game_name,
            description,
            developers,
            dlc,
            final_price,
            genre_ids,
            header_image,
            initial_price,
            is_free,
            movies,
            option,
            price_cent_discount,
            publishers,
            release_Date,
            rentalPrice,
            sale,
            sale_end_date,
            screenshots
        };

        const newGame = await GameService.createGame(game);
        res.status(201).json(newGame);
    } catch (error) {
        if (error.message === 'Game ID already exists') {
            res.status(400).json({ error: error.message });
        } else {
            console.error('Error while creating game:', error);
            res.status(500).send('Internal server error');
        }
    }
};

const updateGame = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        if (!id) {
            return res.status(400).json({ error: 'The id is required' });
        }

        const objectId = new ObjectId(id);
        if (data.game_id) {
            data.game_id = parseInt(data.game_id);
        }
        const updatedGame = await GameService.updateGame(objectId, data);
        res.status(200).json(updatedGame);
    } catch (error) {
        if (error.message === 'Game does not exist' || error.message === 'Game ID already exists') {
            res.status(400).json({ error: error.message });
        } else {
            console.error('Error while updating game:', error);
            res.status(500).send('Internal server error');
        }
    }
};
=======
// [POST] games
const insertGameController = async (req, res) => {
    const { game_id, game_name } = req.body;

    if (!game_id && !game_name) {
        return res.status(400).json({ error: 'game_id or game_name is required' });
    }
    try {
        const game = { game_id, game_name }; 
        const insertedGame = await insertGame(game); 
        return res.status(201).json({ message: 'Genre inserted successfully.',insertedGame}); 
    } catch (error) {
        console.error('Error inserting game:', error);
        if (error.message === 'game_id already exists' || error.message === 'game_name already exists') {
            return res.status(409).json({ error: error.message }); 
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
};
// Method [Delete]
const deleteGamesController = async (req, res) => {
    try {
        const { game_id } = req.params;
        console.log(`Received game_id:  ${game_id}`); 
        if (!game_id) {
            return res.status(400).json({ error: 'game_id is required.' });
        }
        const result = await deleteGame(game_id);
        if (!result || result.deletedCount === 0) {
            return res.status(404).json({ error: 'Game not found.' });
        }
        res.status(200).json({ message: 'Game deleted successfully.' });
    } catch (error) {
        console.error('Error in deleteGamesController:', error);
        res.status(500).json({ error: 'Failed to delete game.' });
    }
};
// Method [Update]
const updateGamesController = async (req, res) => {
    const {game_id} = req.params;
    const updateData = req.body;
    try {
        const updateGames = await updateGame(game_id, updateData)
        res.status(200).json({ message: 'Games updated successfully.', games: updateGames });

    } catch (error) {
        if (error.message === 'Games not found') {
            res.status(404).json({
                 error: `Genre with ID ${game_id} not found.`
            })
        }else {
            console.error('Error in updateGenreController:', error);
            res.status(500).json({ error: 'Failed to update genre.' });
          }
    }
}

// Method [Search]
>>>>>>> fb91cda30efabe8edf8b108bbaa56ed4f23db063

module.exports = {
    getGames,
    getGamesOnSaleController,
<<<<<<< HEAD
    createGame,
    updateGame
=======
    insertGameController,
    deleteGamesController,
    updateGamesController
>>>>>>> fb91cda30efabe8edf8b108bbaa56ed4f23db063
};
