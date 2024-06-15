const { getGamesFromMongo } = require('../services/gameServices');
//render in [localhost]
const getGames = async (req, res) => {
    try {
        const games = await getGamesFromMongo();
        res.json(games);
    } catch (error) {
        console.error('Error while getting games from MongoDB ', error);
        res.status(500).send('Internal server error');
    }
};


module.exports = {
    getGames
};
