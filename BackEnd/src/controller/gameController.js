const { getGamesFromMongo } = require('../services/gameServices');
//render in [localhost]
const getGames = async (req, res) => {
    try {
        const games = await getGamesFromMongo();
        if (!games) {
            return res.status(404).json({ error: 'Games not found' });
        }
        res.json(games);
    } catch (error) {
        console.error('Error while getting games from MongoDB ', error);
        res.status(500).send('Internal server error');
    }
};
//


module.exports = {
    getGames
};
