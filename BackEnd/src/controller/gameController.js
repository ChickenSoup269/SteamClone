const { getGamesFromMongo , getGamesOnSale} = require('../services/gameServices');
const GameService = require('../services/gameServices')
const { ObjectId } = require('mongodb');
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

module.exports = {
    getGames,
    getGamesOnSaleController,
    createGame,
    updateGame
};
