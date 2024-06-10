const { MongoClient } = require('mongodb');
const axios = require('axios');
const config = require('../config/mongodb');

const fetchDataAndSaveToMongo = async () => {
    let client;
    try {
        client = new MongoClient(config.mongoUrl);
        await client.connect();
        console.log('Đã kết nối tới MongoDB');

        const db = client.db(config.dbName);
        const collection = db.collection('games');

        const response = await axios.get(config.gameListApiUrl);
        const games = response.data.applist.apps;

        for (const game of games) {
            if (game.name.trim() !== "") {
                const transformedGame = {
                    game_id: game.appid,
                    game_name: game.name
                };
                await collection.updateOne(
                    { game_id: transformedGame.game_id },
                    { $set: transformedGame },
                    { upsert: true }
                );
            }
        }

        console.log('Hoàn tất lưu dữ liệu vào MongoDB');
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    } finally {
        if (client) {
            await client.close();
            console.log('Đã đóng kết nối tới MongoDB');
        }
    }
};
//Method [GET]
const getGamesFromMongo = async () => {
    let client;
    try {
        // Loại bỏ các tùy chọn đã lỗi thời
        client = new MongoClient(config.mongoUrl);
        await client.connect();
        const db = client.db(config.dbName);
        const collection = db.collection('games');

        const games = await collection.find({ game_name: { $ne: "" } }, { projection: { _id: 0, game_name: 1 } }).toArray();
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

module.exports = {
    fetchDataAndSaveToMongo,
    getGamesFromMongo
};
