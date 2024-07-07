const { MongoClient, Int32 } = require('mongodb');
const config = require('../config/mongodb');
//Method [GET] All from Mongo
const getGamesFromMongo = async (page,limit) => {
    let client;
    try {
        client = new MongoClient(config.mongoUrl);
        await client.connect();
        const db = client.db(config.dbName);
        const collection = db.collection('games');
        const skip = (page - 1) * limit;
        const games = await collection.find({ game_name: { $ne: "" } }, {
            projection:
                { _id: 0, game_name: 1, header_image: 1 }
        }).skip(skip).limit(limit).toArray();
        return games;
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
};
//Method [GET] gamebysale
const getGamesOnSale = async () => {
    let client;
    try {
        client = new MongoClient(config.mongoUrl);
        await client.connect();
        const db = client.db(config.dbName);
        const collection = db.collection('games');
        const gamesOnSale = await collection.find({ sale: { $exists: true, $ne: [] } },
            { projection: { _id: 0, game_name: 1, header_image: 1, sale: 1 } }).toArray();
        return gamesOnSale;
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
}
// Method [POST] Insert
const createGame = async (game) => {
    let client;
    try {
        client = new MongoClient(config.mongoUrl);
        await client.connect();
        const db = client.db(config.dbName);
        const collection = db.collection('games');
<<<<<<< HEAD

        // Kiểm tra xem game_id đã tồn tại chưa
        const checkGame = await collection.findOne({ game_id: game.game_id });
        if (checkGame) {
            throw new Error('Game ID already exists');
        }

        // Chuyển đổi game_id thành Int32
        game.game_id = new Int32(game.game_id);

        const result = await collection.insertOne(game);

        // Kiểm tra cấu trúc của kết quả trả về từ MongoDB
        if (result.insertedId) {
            return { ...game, _id: result.insertedId };
        } else {
            throw new Error('Failed to insert game');
        }
=======
        const existingGameById = await collection.findOne({ game_id: game.game_id });
        if (existingGameById) {
           throw new Error('game_id already exists');
        }
        const existingGameByName = await collection.findOne({ game_name: game.game_name });
        if (existingGameByName) {
            throw new Error('game_name already exists');
        }
       const result = await collection.insertOne(game);
       return result.ops ? result.ops[0] : { insertedId: result.insertedId };
>>>>>>> fb91cda30efabe8edf8b108bbaa56ed4f23db063
    } catch (error) {
        console.error('Lỗi khi createGame:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
};

<<<<<<< HEAD
// Method [Update]
const updateGame = async (id, data) => {
    let client;
    try {
        client = new MongoClient(config.mongoUrl);
        await client.connect();
        const db = client.db(config.dbName);
        const collection = db.collection('games');

        // Kiểm tra nếu _id không tồn tại
        const existingGame = await collection.findOne({ _id: id });
        if (!existingGame) {
            throw new Error('Game does not exist');
        }

        // Kiểm tra nếu game_id đã tồn tại trong tài liệu khác
        if (data.game_id) {
            data.game_id = new Int32(data.game_id);
            const checkGame = await collection.findOne({ game_id: data.game_id, _id: { $ne: id } });
            if (checkGame) {
                throw new Error('Game ID already exists');
            }
        }

        // Cập nhật game
        const result = await collection.updateOne(
            { _id: id },
            { $set: data }
        );

        // Kiểm tra kết quả cập nhật
        if (result.matchedCount === 1) {
            return { ...existingGame, ...data };
        } else {
            throw new Error('Failed to update game');
        }
    } catch (error) {
        console.error('Lỗi khi updateGame:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
};


// Method [Delete]
=======
// Method [Delete]
const deleteGame = async (game_id) => {
    let client;
    try {
        client = new MongoClient(config.mongoUrl);
        await client.connect();
        console.log('Connected to MongoDB');
        
        const db = client.db(config.dbName);
        const collection = db.collection('games'); 
        //convert int
        const numericGameId = parseInt(game_id, 10);
        const result = await collection.deleteOne({ game_id: numericGameId });
        if (result.deletedCount === 0) {
            console.log('Game not found with game_id:', numericGameId);
            return null;
        }
        console.log('Deleted game with game_id:', numericGameId);
        return result;
    } catch (error) {
        console.error('Error deleting game:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
            console.log('Closed MongoDB connection');
        }
    }
};

// Method [Update]
const updateGame = async (game_id, updateData) => {
    let client;
  try {
    client = new MongoClient(config.mongoUrl);
    await client.connect();
    console.log('Connected to MongoDB');
>>>>>>> fb91cda30efabe8edf8b108bbaa56ed4f23db063

    const db = client.db(config.dbName);
    const collectionGenres = db.collection('games');
    const numericGameId = parseInt(game_id, 10);
    const updateObject = { $set: updateData };
    console.log('Updating Game with game_id:', numericGameId);
    console.log('Update object:', updateObject);    
    const result = await collectionGenres.findOneAndUpdate(
      { game_id: numericGameId }, 
      updateObject,
      { returnOriginal: false }
    );
    console.log(result);
    if (!result) {
      throw new Error(`Games with game_id ${numericGameId} not found.`);
    }
    return result;
  } catch (error) {
    console.error('Error updating Games:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log('Closed MongoDB connection');
    }
  }
}
// Method [Search]

module.exports = {
    getGamesFromMongo,
    getGamesOnSale,
<<<<<<< HEAD
    createGame,
=======
    insertGame,
    deleteGame,
>>>>>>> fb91cda30efabe8edf8b108bbaa56ed4f23db063
    updateGame
};
