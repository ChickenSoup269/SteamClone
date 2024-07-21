const { getGamesFromMongo, getGamesOnSale,searchGames
    , insertGame, deleteGame,updateGame ,getGameDetails} = require('../services/gameServices');
//render in localhost
// [GET] All
const getGames = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
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
// [GET] Detail
const getGameDetailsController = async (req, res) => {
    const { game_id, game_slug } = req.params;
    try {
        const game = await getGameDetails(game_id);
        
        const decodedGameSlug = decodeURIComponent(game_slug).toLowerCase();
        const decodedGameName = decodeURIComponent(game.game_name).toLowerCase();
        
        console.log('game_slug:', game_slug);
        console.log('game.game_name:', game.game_name);
        console.log('decodedGameSlug:', decodedGameSlug);
        console.log('decodedGameName:', decodedGameName);
        
        if (!game || decodedGameSlug !== decodedGameName) {
            return res.status(404).json({ message: 'Game not found.' });
        }
        
        res.status(200).json(game);
    } catch (error) {
        console.error('Error in getGameDetailsController:', error);
        res.status(500).json({ error: 'Failed to get game details.' });
    }
};
// [GET] GameOnsale
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
// [GET] Search
const searchGamesController = async (req, res) => {
    try {
        const { query } = req.query; 
        console.log(query);
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required.' });
        }
        const games = await searchGames(query);
        res.status(200).json(games);
    } catch (error) {
        console.error('Error in searchGamesController:', error);
        res.status(500).json({ error: 'Failed to search games.' });
    }
};
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
// [Delete]
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
// [Update]
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
module.exports = {
    getGames,
    searchGamesController,
    getGameDetailsController,
    getGamesOnSaleController,
    insertGameController,
    deleteGamesController,
    updateGamesController
};
