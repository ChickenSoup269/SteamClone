const axios = require('axios');
const Game = require('../models/gameModel');
const Genre = require('../models/genresModel');

const fetchAppList = async () => {
  try {
    const response = await axios.get(process.env.GAME_LIST_API_URL);
    return response.data.applist.apps;
  } catch (error) {
    console.error('Error fetching app list:', error.message);
    throw error;
  }
};

const fetchWithRetry = async (url, retries = 50, delay = 5000) => {
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

const fetchAppDetail = async (appId) => {
  try {
    const response = await fetchWithRetry(`${process.env.GAME_DETAILS_API_URL}${appId}`);
    if (response.data && response.data[appId] && response.data[appId].success) {
      return response.data[appId].data;
    }
    console.log(`API returned success: false or invalid response for appid ${appId}. Skipping.`);
    return null;
  } catch (error) {
    console.error(`Error fetching details for appid ${appId}:`, error.message);
    return null;
  }
};

const hasMetacritic = (gameDetails) => {
  return gameDetails.metacritic && gameDetails.metacritic.score;
};

const isValidGame = (game, gameDetails) => {
  return (
    game.name && game.name.trim() !== '' &&
    gameDetails &&
    gameDetails.genres && gameDetails.genres.length > 0 &&
    gameDetails.package_groups && gameDetails.package_groups.length > 0 &&
    gameDetails.dlc && Array.isArray(gameDetails.dlc) && gameDetails.dlc.length > 0 &&
    hasMetacritic(gameDetails) &&
    gameDetails.release_date && gameDetails.release_date.date &&
    gameDetails.developers && gameDetails.developers.length > 0 &&
    gameDetails.publishers && gameDetails.publishers.length > 0 &&
    gameDetails.screenshots && gameDetails.screenshots.length > 0
  );
};

const fetchDataAndSaveToMongo = async () => {
  try {
    const gamesCount = await Game.countDocuments();
    if (gamesCount >= 30) {
      console.log(`Already have ${gamesCount} games in database. Stopping.`);
      return;
    }

    const appList = await fetchAppList();
    console.log(`Fetched ${appList.length} games from API`);

    const fetchedGames = [];
    let processedCount = 0;

    for (const game of appList) {
      if (processedCount >= 30) break;

      if (!game.name || game.name.trim() === '') {
        console.log(`Skipped appid ${game.appid} due to empty name`);
        continue;
      }

      const gameDetails = await fetchAppDetail(game.appid);
      if (!isValidGame(game, gameDetails)) {
        console.log(`Skipped appid ${game.appid} due to missing or invalid data`);
        continue;
      }

      fetchedGames.push({ game, gameDetails });
      processedCount++;
      console.log(`Processed ${processedCount}/50 games`);

      // Delay để tránh rate limit
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (fetchedGames.length < 30) {
      console.log(`Only fetched ${fetchedGames.length} valid games. Not saving to MongoDB.`);
      return;
    }

    console.log(`Collected 50 valid games. Saving to MongoDB...`);

    for (const { game, gameDetails } of fetchedGames) {
      // Lưu genres vào collection genres
      const genres = gameDetails.genres || [];
      for (const genre of genres) {
        await Genre.findOneAndUpdate(
          { genre_id: genre.id },
          { genre_id: genre.id, name: genre.description },
          { upsert: true, new: true }
        );
      }

      const genre_ids = genres.map(genre => genre.id);
      const releaseDate = gameDetails.release_date.date;
      let saleDuration = 0;
      let saleEndDate = null;
      let subs = [];
      let percentSavings = [];

      // Xử lý package_groups
      if (gameDetails.package_groups) {
        for (const group of gameDetails.package_groups) {
          if (group.subs) {
            subs = group.subs.map(sub => ({
              optionText: sub.option_text,
              percentSavings: sub.percent_savings_text && sub.percent_savings_text.trim() !== ''
                ? parseInt(sub.percent_savings_text.replace('%', '').trim(), 10)
                : null,
              priceDiscounted: sub.price_in_cents_with_discount,
              rentalPrice: sub.price_in_cents_with_discount * 0.5,
            }));
            percentSavings = percentSavings.concat(subs);
          }
        }
        percentSavings = percentSavings.filter(savings => savings.percentSavings !== null && savings.percentSavings !== undefined);
      }

      if (percentSavings.length > 0) {
        saleDuration = 7;
        const saleStartDate = new Date();
        saleEndDate = new Date(saleStartDate.getTime() + saleDuration * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      }

      const screenshots = gameDetails.screenshots.map(screenshot => ({
        id: screenshot.id,
        path_thumbnail: screenshot.path_thumbnail,
        path_full: screenshot.path_full,
      }));

      const movies = gameDetails.movies ? gameDetails.movies.map(movie => ({
        thumbnail: movie.thumbnail,
        webm_max: movie.webm?.max || null,
      })) : [];

      const transformedGame = {
        game_id: game.appid,
        game_name: game.name,
        description: gameDetails.short_description || '',
        header_image: gameDetails.header_image,
        genre_ids,
        option: subs,
        movies_thumnail: movies,
        screenshots,
        release_Date: releaseDate,
        sale_end_date: saleEndDate || '',
        is_free: gameDetails.is_free,
        poster_url: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/library_600x900_2x.jpg`,
        dlc: gameDetails.dlc,
        developers: gameDetails.developers,
        publishers: gameDetails.publishers,
      };

      await Game.findOneAndUpdate(
        { game_id: transformedGame.game_id },
        { $set: transformedGame },
        { upsert: true }
      );

      const currentDate = new Date();
      if (saleEndDate && currentDate > new Date(saleEndDate)) {
        console.log(`Sale for game ${game.name} has expired.`);
        await Game.updateOne(
          { game_id: transformedGame.game_id },
          { $unset: { sale: '', sale_end_date: '' } }
        );
      } else if (saleEndDate) {
        console.log(`Sale for game ${game.name} is still active.`);
      }
    }

    console.log('Successfully saved 50 games to MongoDB');
  } catch (error) {
    console.error('Error in fetchDataAndSaveToMongo:', error.message);
  }
};

const autoFetchData = async () => {
  try {
    await fetchDataAndSaveToMongo();
  } catch (err) {
    console.error('Error in autoFetchData:', err.message);
  }
};

module.exports = { fetchAppList, fetchAppDetail, fetchDataAndSaveToMongo, autoFetchData };