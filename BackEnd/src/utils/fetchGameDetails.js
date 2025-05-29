const axios = require('axios');
const Game = require('../models/gameModel');
const Genre = require('../models/genresModel');

const fetchGameList = async () => {
  try {
    console.log('Fetching game list from Steam...');
    const response = await axios.get(process.env.GAME_LIST_API_URL);
    const games = response.data.applist.apps;

    const limitedGames = games.slice(0, 50); // Giới hạn 50 game
    for (const game of limitedGames) {
      await Game.findOneAndUpdate(
        { game_id: game.appid },
        { game_id: game.appid, game_name: game.name, last_updated: new Date() },
        { upsert: true, new: true }
      );
    }
    console.log(`Saved ${limitedGames.length} games to MongoDB`);
  } catch (err) {
    console.error('Error fetching game list:', err.message);
  }
};

const fetchGameDetails = async (appid) => {
  try {
    console.log(`Fetching details for appid: ${appid}`);
    const response = await axios.get(`${process.env.GAME_DETAILS_API_URL}${appid}`);
    const gameData = response.data[appid];

    if (!gameData.success) {
      console.log(`Game ${appid} not found`);
      return null;
    }

    const gameDetails = gameData.data;

    // Lưu genres vào collection genres
    if (gameDetails.genres) {
      for (const genre of gameDetails.genres) {
        await Genre.findOneAndUpdate(
          { genre_id: genre.id },
          { genre_id: genre.id, name: genre.description },
          { upsert: true, new: true }
        );
      }
    }

    const game = await Game.findOneAndUpdate(
      { game_id: gameDetails.steam_appid },
      {
        game_id: gameDetails.steam_appid,
        game_name: gameDetails.name,
        description: gameDetails.short_description,
        developers: gameDetails.developers,
        dlc: gameDetails.dlc || [],
        genre_ids: gameDetails.genres ? gameDetails.genres.map(g => g.id) : [],
        header_image: gameDetails.header_image,
        is_free: gameDetails.is_free,
        movies_thumnail: gameDetails.movies
          ? gameDetails.movies.map(m => ({
              thumbnail: m.thumbnail,
              webm_max: m.webm?.max,
            }))
          : [],
        option: gameDetails.price_overview
          ? [
              {
                optionText: `${gameDetails.name} - ${gameDetails.price_overview.final_formatted}`,
                percentSavings: gameDetails.price_overview.discount_percent,
                priceDiscounted: gameDetails.price_overview.final,
                rentalPrice: Math.floor(gameDetails.price_overview.final / 2), // Giả định giá thuê
              },
            ]
          : [],
        poster_url: `https://steamcdn-a.akamaihd.net/steam/apps/${appid}/library_600x900_2x.jpg`,
        publishers: gameDetails.publishers,
        release_Date: gameDetails.release_date?.date,
        screenshots: gameDetails.screenshots
          ? gameDetails.screenshots.map(s => ({
              id: s.id,
              path_thumbnail: s.path_thumbnail,
              path_full: s.path_full,
            }))
          : [],
        last_updated: new Date(),
      },
      { upsert: true, new: true }
    );

    console.log(`Saved details for ${gameDetails.name}`);
    return game;
  } catch (err) {
    console.error(`Error fetching details for appid ${appid}:`, err.message);
    return null;
  }
};

const autoFetchData = async () => {
  try {
    await fetchGameList();
    const games = await Game.find().limit(10);
    for (const game of games) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 1 giây để tránh rate limit
      await fetchGameDetails(game.game_id);
    }
  } catch (err) {
    console.error('Error in autoFetchData:', err.message);
  }
};

module.exports = { fetchGameList, fetchGameDetails, autoFetchData };