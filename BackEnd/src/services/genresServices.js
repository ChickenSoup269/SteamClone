const { MongoClient } = require('mongodb');
const config = require('../config/mongodb');
//Method [GET] ALL from Mongo
const getGenres = async () => {
  let client;
  try {
    client = new MongoClient(config.mongoUrl);
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(config.dbName);
    const collectionGenres = db.collection('genres');

    // [GET] list Genres 
    const genres = await collectionGenres.find({}).toArray();
    
    console.log('Genres:', genres);
    
    return genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log('Closed MongoDB connection');
    }
  }
};

// [GET] List Genres with Games
const getGamesByGenres = async () => {
  let client;
  try {
    client = new MongoClient(config.mongoUrl);
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(config.dbName);
    const collectionGames = db.collection('games');
    const collectionGenres = db.collection('genres');

    // Lấy danh sách thể loại từ collection 'genres'
    const genres = await collectionGenres.find({}).toArray();

    // Duyệt qua từng thể loại và lấy danh sách game tương ứng
    const genresWithGames = await Promise.all(genres.map(async (genre) => {
      const games = await collectionGames.find({ genre_ids: genre.genre_id }).toArray();
      return {
          genre_name: genre.description, // Chỉ giữ lại tên thể loại
          games: games.map(game => ({
              game_name: game.game_name, // Chỉ giữ lại tên game
              header_image: game.header_image // Chỉ giữ lại hình ảnh game
          }))
      };
  }));
    console.log('Genres with games:', genresWithGames);
    return genresWithGames;
  } catch (error) {
    console.error('Error fetching genres with games:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log('Closed MongoDB connection');
    }
  }
};

module.exports = {
  getGenres,
  getGamesByGenres
};