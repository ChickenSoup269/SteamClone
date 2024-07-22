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
// Helper function to add retry logic
const fetchWithRetry = async (url, retries = 70, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios.get(url, { timeout: 20000 });
        return response;
      } catch (error) {
        if (i === retries - 1) {
          throw error;
        }
        console.warn(`Retrying (${i + 1}/${retries})...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };
//Fetch data from API Detail [GET]
const fetchAppDetail = async (appId) => {
    try {
        const response = await fetchWithRetry(`${config.gameDetailsApiUrl}${appId}`);
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
const hasMetacritic = (gameDetails) => {
    return gameDetails.metacritic && gameDetails.metacritic.score;
  };
  
const fetchDataAndSaveToMongo = async () => {
    let client;
    try {
        client = new MongoClient(config.mongoUrl);
        await client.connect();
        console.log('Đã kết nối tới MongoDB');
        const db = client.db(config.dbName);
        const collection = db.collection('games');
        const collectionGenres = db.collection('genres');
        // check mongodb if = 50 data break 
        const gamesCount = await collection.countDocuments();
        if (gamesCount >= 30) {
            console.log(`Đã có ${gamesCount} game trong cơ sở dữ liệu. Dừng việc thêm game.`);
            return;
        }
        const appList = await fetchAppList();
        console.log(`Fetched ${appList.length} games from API`);
        const fetchedGames = [];
        let count = 0;

        for (const game of appList) {
            if (game.name && game.name.trim() !== "") {
                const gameDetails = await fetchAppDetail(game.appid);
                if (gameDetails && gameDetails.genres && gameDetails.package_groups && gameDetails.package_groups.length > 0) {
                    if (gameDetails.dlc && Array.isArray(gameDetails.dlc) && gameDetails.dlc.length > 0 && hasMetacritic(gameDetails)) {
                        fetchedGames.push({ game, gameDetails });
                        count++;
                    } else {
                        console.log(`Skipping game with appid ${game.appid} due to missing or empty dlc.`);
                    }
                } else {
                    console.log(`Skipping game with appid ${game.appid} due to API error or no data.`);
                }
            } else {
                console.log(`Skipped game with appid ${game.appid} due to empty name`);
            }

            if (count >= 30) {
                break;
            }
        }

        console.log('Limited games:', fetchedGames.map(({ game }) => game));

        for (const { game, gameDetails } of fetchedGames) {
            const genres = gameDetails.genres || [];
            const genre_ids = genres.map(genre => genre.id);
            let releaseDate = '';
            let saleDuration = 0;
            let saleEndDate = null;
            let screenshots = [];
            let videos = [];
            let thumbnail = [];
            let isFree = false;
            let dlc = [];
            let subs = [];
            let percentSavings = [];

            if (gameDetails.release_date && gameDetails.release_date.date) {
                releaseDate = gameDetails.release_date.date;
            } else {
                console.log(`Invalid or missing release date for game ${game.appid}`);
            }

            if (typeof gameDetails.is_free === 'boolean') {
                isFree = gameDetails.is_free;
            } else {
                console.log(`Invalid or missing is_free for game ${game.appid}`);
            }

            if (Array.isArray(gameDetails.dlc)) {
                dlc = gameDetails.dlc;
            } else {
                console.log(`Invalid or missing dlc for game ${game.appid}`);
            }
            // filter optionText, percentSavings, priceDiscounted from package_group
            if (gameDetails.package_groups) {
                for (const group of gameDetails.package_groups) {
                    if (group.subs) {
                        subs = group.subs.map(sub => ({
                            optionText: sub.option_text,
                            percentSavings: (sub.percent_savings_text && sub.percent_savings_text.trim() !== "") ?
                                parseInt(sub.percent_savings_text.replace('%', '').trim(), 10) : null,
                            priceDiscounted: sub.price_in_cents_with_discount,
                            rentalPrice: sub.price_in_cents_with_discount * 0.5
                        }));
                        // Get value percent from sub assign percentSavings contains percentSavings from subs 
                        percentSavings = percentSavings.concat(subs);
                    }
                    percentSavings = percentSavings.filter(savings => savings.percentSavings !== null && savings.percentSavings !== undefined);
                }
            } else {
                console.log(`Invalid or missing package_groups for game ${game.appid}`);
            }
            if (percentSavings.length > 0) {
                saleDuration = 7;
                const saleStartDate = new Date();
                saleEndDate = new Date(saleStartDate.getTime() + (saleDuration * 24 * 60 * 60 * 1000));
                saleEndDate = saleEndDate.toISOString().split('T')[0];
            }
             // screenshots
             if (gameDetails.screenshots && gameDetails.screenshots.length > 0) {
                screenshots = gameDetails.screenshots.map(screenshot => {
                    return {
                        id: screenshot.id,
                        path_thumbnail: screenshot.path_thumbnail,
                        path_full: screenshot.path_full
                    };
                });
            } else {
                console.log(`Invalid or missing screenshots for game ${game.appid}`);

            }
            // Movie & thumbnail
            if (gameDetails.movies) {
                thumbnail = gameDetails.movies.reduce((acc, movie) => {
                    if (movie.thumbnail) {
                        acc.push(movie.thumbnail);
                    }
                    return acc;
                }, []);
                videos = gameDetails.movies.reduce((acc, movie) => {
                    if (movie.webm && movie.webm.max) {
                        acc.push(movie.webm.max);
                    }
                    return acc;
                }, []);
            }
            const transformedGame = {
                game_id: game.appid,
                game_name: game.name,
                description: gameDetails.short_description || '',
                header_image: gameDetails.header_image,
                genre_ids: genre_ids,
                option: subs,
                movies: videos,
                thumbnail : thumbnail,
                screenshots: screenshots,
                release_Date: releaseDate,
                sale_end_date: saleEndDate || '',
                is_free: isFree,
                poster_url: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/library_600x900_2x.jpg` ,
                dlc: dlc
            };

            if (gameDetails.developers && gameDetails.developers.length > 0) {
                transformedGame.developers = gameDetails.developers;
            } else {
                console.log(`Invalid or missing developers for game ${game.appid}`);
            }

            if (gameDetails.publishers && gameDetails.publishers.length > 0) {
                transformedGame.publishers = gameDetails.publishers;
            } else {
                console.log(`Invalid or missing publishers for game ${game.appid}`);
            }

            await collection.updateOne(
                { game_id: transformedGame.game_id },
                { $set: transformedGame },
                { upsert: true }
            );

            const currentDate = new Date();
            if (currentDate > saleEndDate) {
                console.log(`Giảm giá cho game ${game.name} đã hết hiệu lực.`);
                await collection.updateOne(
                    { game_id: transformedGame.game_id },
                    { $unset: { sale: "", sale_end_date: "" } }
                );
            } else {
                console.log(`Giảm giá cho game ${game.name} vẫn còn hiệu lực.`);
            }

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