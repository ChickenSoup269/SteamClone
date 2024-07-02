const { getGamesFromMongo , getGamesOnSale} = require('../services/gameServices');
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
        // Gọi service để lấy danh sách game đang sale từ MongoDB
        const gamesOnSale = await getGamesOnSale();

        if (!gamesOnSale || gamesOnSale.length === 0) {
            return res.status(404).json({ error: 'No games on sale found' });
        }

        // Trả về danh sách game đang sale dưới dạng JSON
        res.json(gamesOnSale);
    } catch (error) {
        console.error('Error while getting games on sale from MongoDB:', error);
        res.status(500).send('Internal server error ');
    }
};
// [POST] games
// const getGame= async (req , res) =>{}


module.exports = {
    getGames,
    getGamesOnSaleController
};
