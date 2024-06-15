const { MongoClient } = require('mongodb');
const axios = require('axios');
const config = require('../config/mongodb');

// Fetch data from API List [GET]
const getAppList = async () => {
    try {
        const response = await axios.get(config.gameListApiUrl);
        return response.data.applist.apps;
    } catch (error) {
        console.error('Error fetching app list:', error);
        throw error;
    }
};
const getAppDetail = async (appId) => {
    try {
        const response = await axios.get(`${config.gameDetailsApiUrl}${appId}`);
        if (response.data && response.data[appId]) {
            if (response.data[appId].success) {
                return response.data[appId].data;
            } else {
                console.log(`API returned success: false for app with ID ${appId}. Skipping.`);
                return null; // Return null or handle differently
            }
        } else {
            console.error(`Invalid response format for app with ID ${appId}`);
            return null; // Return null or handle differently
        }
    } catch (error) {
        console.error(`Error fetching details for app with ID ${appId}:`, error);
        throw error;
    }
};

const fetchDataAndSaveToMongo = async () => {
    let client;
    try {
        client = new MongoClient(config.mongoUrl);
        await client.connect();
        console.log('Đã kết nối tới MongoDB');

        const db = client.db(config.dbName);
        const collection = db.collection('games');
        // API LIST
        const appList = await getAppList();
        // Log total number of games fetched
        console.log(`Fetched ${appList.length} games from API`);

        // Only take the first 10 games
        const limitedGames = appList.slice(0,50);

        // Log limited games for debugging
        console.log('Limited games:', limitedGames);

        // Clear the existing collection to ensure only 10 items are stored
        await collection.deleteMany({});

        // Insert limited games into MongoDB
        for (const game of limitedGames) {
            if (game.name && game.name.trim() !== "") {
                const gameDetails = await getAppDetail(game.appid);
                if (gameDetails) {
                    const transformedGame = {
                        game_id: game.appid,
                        game_name: game.name,
                        header_image: gameDetails.header_image,
                        minimum : gameDetails.minimum
                    };
                    await collection.updateOne(
                        { game_id: transformedGame.game_id },
                        { $set: transformedGame },
                        { upsert: true }
                    );
                } else {
                    console.log(`Skipping game with appid ${game.appid} due to API error or no data.`);
                }
            } else {
                // Log games that are skipped due to empty names
                console.log(`Skipped game with appid ${game.appid} due to empty name`);
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

//Method [GET] from Mongo
const getGamesFromMongo = async () => {
    let client;
    try {
        client = new MongoClient(config.mongoUrl);
        await client.connect();
        const db = client.db(config.dbName);
        const collection = db.collection('games');
        const games = await collection.find({ game_name: { $ne: "" } }, { projection: { _id: 0, game_name: 1 } }).limit(50).toArray();
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
