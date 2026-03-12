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
  if (!game || !gameDetails) return false;

  // Kiểm tra các trường bắt buộc
  const hasValidName = game.name && game.name.trim() !== '';
  const hasValidGenres = gameDetails.genres && gameDetails.genres.length > 0 && 
    gameDetails.genres.every(genre => genre.id && genre.description && genre.description.trim() !== '');
  const hasValidPackageGroups = gameDetails.package_groups && gameDetails.package_groups.length > 0;
  const hasValidDlc = gameDetails.dlc && Array.isArray(gameDetails.dlc) && gameDetails.dlc.length > 0;
  const hasValidMetacritic = hasMetacritic(gameDetails);
  const hasValidReleaseDate = gameDetails.release_date && gameDetails.release_date.date && gameDetails.release_date.date.trim() !== '';
  const hasValidDevelopers = gameDetails.developers && gameDetails.developers.length > 0 && 
    gameDetails.developers.every(dev => dev && dev.trim() !== '');
  const hasValidPublishers = gameDetails.publishers && gameDetails.publishers.length > 0 && 
    gameDetails.publishers.every(pub => pub && pub.trim() !== '');
  const hasValidScreenshots = gameDetails.screenshots && gameDetails.screenshots.length > 0 && 
    gameDetails.screenshots.every(s => s.id && s.path_thumbnail && s.path_full);
  const hasValidHeaderImage = gameDetails.header_image && gameDetails.header_image.trim() !== '';
  const hasValidIsFree = typeof gameDetails.is_free === 'boolean';
  // Kiểm tra movies_thumnail
  const hasValidMovies = gameDetails.movies && Array.isArray(gameDetails.movies) && gameDetails.movies.length > 0 &&
    gameDetails.movies.every(movie => movie.thumbnail && movie.webm?.max);

  // Kiểm tra option nếu không miễn phí
  let hasValidOption = true;
  if (!gameDetails.is_free) {
    const subs = gameDetails.package_groups.flatMap(group => group.subs || []);
    hasValidOption = subs.length > 0 && subs.every(sub => 
      sub.option_text && sub.price_in_cents_with_discount !== undefined
    );
  }

  return (
    hasValidName &&
    hasValidGenres &&
    hasValidPackageGroups &&
    hasValidDlc &&
    hasValidMetacritic &&
    hasValidReleaseDate &&
    hasValidDevelopers &&
    hasValidPublishers &&
    hasValidScreenshots &&
    hasValidHeaderImage &&
    hasValidIsFree &&
    hasValidOption &&
    hasValidMovies
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
      console.log(`Processed ${processedCount}/30 games`);

      // Delay để tránh rate limit
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (fetchedGames.length < 30) {
      console.log(`Only fetched ${fetchedGames.length} valid games. Not saving to MongoDB.`);
      return;
    }

    console.log(`Collected 30 valid games. Saving to MongoDB...`);

    for (const { game, gameDetails } of fetchedGames) {
      // Lưu genres vào collection genres
      const genres = gameDetails.genres || [];
      for (const genre of genres) {
        if (genre.id && genre.description && genre.description.trim() !== '') {
          await Genre.findOneAndUpdate(
            { genre_id: genre.id },
            { genre_id: genre.id, name: genre.description },
            { upsert: true, new: true }
          );
        }
      }

      const genre_ids = genres.map(genre => genre.id);
      const releaseDate = gameDetails.release_date.date;
      let saleDuration = 0;
      let saleEndDate = null;
      let subs = [];

      // Xử lý package_groups
      if (gameDetails.package_groups) {
        for (const group of gameDetails.package_groups) {
          if (group.subs) {
            subs = subs.concat(group.subs.map(sub => ({
              optionText: sub.option_text,
              percentSavings: sub.percent_savings_text && sub.percent_savings_text.trim() !== ''
                ? parseInt(sub.percent_savings_text.replace('%', '').trim(), 10)
                : null,
              priceDiscounted: sub.price_in_cents_with_discount,
              rentalPrice: sub.price_in_cents_with_discount * 0.5,
            })));
          }
        }
      }

      if (subs.some(sub => sub.percentSavings !== null && sub.percentSavings !== undefined)) {
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

    console.log('Successfully saved 30 games to MongoDB');
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