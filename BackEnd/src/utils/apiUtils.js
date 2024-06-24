const axios = require('axios');
const { MongoClient } = require('mongodb');
const config = require('../config/mongodb');
// Fetch data from API List [GET]
const fetchAppList = async () => {
  try {
      const response = await axios.get(config.gameListApiUrl);
      return response.data.applist.apps;
  } catch (error) {
      console.error('Error fetching app list:', error);
      throw error;
  }
};
//Fetch data from API Detail [GET]
const fetchAppDetail = async (appId) => {
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

// Fetch Data API save to Mongo
const fetchDataAndSaveToMongo = async () => {
    let client;
    try {
        client = new MongoClient(config.mongoUrl);
        await client.connect();
        console.log('Đã kết nối tới MongoDB');
        const db = client.db(config.dbName);
        // Create Collection
        const collection = db.collection('games');
        const collectionGenres = db.collection('genres')
        // API LIST
        const appList = await fetchAppList();
        // Log total number of games fetched
        console.log(`Fetched ${appList.length} games from API`);

        // Only take the first 10 games
        const limitedGames = appList.slice(0,40);

        // Log limited games for debugging
        console.log('Limited games:', limitedGames);

        // Insert limited games into MongoDB
        for (const game of limitedGames) {
            if (game.name && game.name.trim() !== "") {
                const gameDetails = await fetchAppDetail(game.appid);
                if (gameDetails && gameDetails.genres && gameDetails.package_groups) {
                    const genres = gameDetails.genres || [];
                    const genre_ids = genres.map(genre => genre.id); 
                    let title = '';
                    let selectionText = '';
                    let optionTexts = [];
                    let percentSavings = [];
                    let releaseDate = '';
                    if (gameDetails.release_date && gameDetails.release_date.date) {
                        releaseDate = gameDetails.release_date.date;
                    }
                    if (gameDetails.package_groups) {
                        for (const group of gameDetails.package_groups) {
                            if (group.title) {
                                title = group.title;
                            }
                            if (group.selection_text) {
                                selectionText = group.selection_text;
                            }
                            if (group.subs) {
                                optionTexts = group.subs.map(sub => sub.option_text);
                            }
                            if (group.subs) {
                                percentSavings = group.subs.map(sub => sub.percent_savings_text);
                            }
                        }
                    }
                    const transformedGame = {
                        game_id: game.appid,
                        game_name: game.name,
                        header_image: gameDetails.header_image,
                        genre_ids: genre_ids,
                        title: title,
                        selection_text: selectionText,
                        subs: optionTexts,
                        release_date: releaseDate,
                        sale : percentSavings
                    };
                    await collection.updateOne(
                        { game_id: transformedGame.game_id },
                        { $set: transformedGame },
                        { upsert: true }
                    );
                    // Genres
                    if (genres.length > 0) {
                        for (const genre of genres) {
                            await collectionGenres.updateOne(
                                { genre_id: genre.id },
                                { $setOnInsert: { description: genre.description } },
                                { upsert: true }
                            );
                        }
                    } else {
                        console.log(`Game with appid ${game.appid} has no genres.`);
                    }
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

module.exports = {
    fetchDataAndSaveToMongo
};