const { MongoClient } = require('mongodb');
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
const insertGame = async  (game) => {
    let client;
    try {
        client = new MongoClient(config.mongoUrl);
        await client.connect();
        const db = client.db(config.dbName);
        const collection = db.collection('games');
        // Add data collection
        const result = await collection.insertOne(game);
        return result.ops[0]; 
    } catch (error) {
        console.error('Lỗi trong insertGameToMongo:', error);
        throw error; 
    } finally {
        if (client) {
            await client.close();
        }
    }
};

// Method [Delete]

// Method [Update]

// Method [Search]

module.exports = {
    getGamesFromMongo,
    insertGame,
    getGamesOnSale
};
