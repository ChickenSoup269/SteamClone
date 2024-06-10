const { getGamesFromMongo } = require('../services/gameServices');

const getGames = async (req, res) => {
    try {
        const games = await getGamesFromMongo();
        res.json(games);
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        res.status(500).send('Có lỗi xảy ra trong quá trình lấy dữ liệu từ MongoDB');
    }
};

module.exports = {
    getGames
};
