const { MongoClient } = require("mongodb")
const config = require("../config/mongodb")
//Method
// [GET] All
const getGamesFromMongo = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    let client;
    try {
      client = new MongoClient(config.mongoUrl);
      await client.connect();
      const db = client.db(config.dbName);
      const collection = db.collection("games");
      const skip = (page - 1) * limit;
      const games = await collection.find({})
        .skip(skip)
        .limit(limit)
        .toArray();
      
      resolve({
        status: 'OK',
        message: 'Success',
        data: games,
      });
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      reject({
        status: 'ERROR',
        message: 'Có lỗi xảy ra',
        error: error.message,
      });
    } finally {
      if (client) {
        await client.close();
      }
    }
  });
};

// [GET] Search
const searchGames = async (query) => {
  let client
  try {
    client = new MongoClient(config.mongoUrl)
    await client.connect()
    console.log("Connected to MongoDB")
    const db = client.db(config.dbName)
    const collection = db.collection("games")
    const filter = { game_name: { $regex: `^${query}`, $options: "i" } }
    const games = await collection.find(filter).toArray()
    return games
  } catch (error) {
    console.error("Error searching games:", error)
    throw error
  } finally {
    if (client) {
      await client.close()
      console.log("Closed MongoDB connection")
    }
  }
}

// [GET] Detail
const getGameDetails = (game_id) => {
  return new Promise(async (resolve, reject) => {
    let client;
    try {
      client = new MongoClient(config.mongoUrl);
      await client.connect();
      console.log("Connected to MongoDB");
      const db = client.db(config.dbName);
      const collection = db.collection("games");
      const game = await collection.findOne({ game_id: parseInt(game_id) });

      resolve({
        status: 'OK',
        message: 'Success',
        data: game,
      });
    } catch (error) {
      console.error("Error getting game details:", error);
      reject({
        status: 'ERROR',
        message: 'Error getting game details',
        error: error.message,
      });
    } finally {
      if (client) {
        await client.close();
        console.log("Closed MongoDB connection");
      }
    }
  });
};

// [GET]
const getGamesOnSale = async () => {
  let client
  try {
    client = new MongoClient(config.mongoUrl)
    await client.connect()
    const db = client.db(config.dbName)
    const collection = db.collection("games")
    const gamesOnSale = await collection
      .find(
        { sale: { $exists: true, $ne: [] } },
        { projection: { _id: 0, game_name: 1, header_image: 1, sale: 1 } }
      )
      .toArray()
    return gamesOnSale
  } catch (error) {
    console.error("Có lỗi xảy ra:", error)
    throw error
  } finally {
    if (client) {
      await client.close()
    }
  }
}
// [POST]
const insertGame = async (game) => {
  let client
  try {
    client = new MongoClient(config.mongoUrl)
    await client.connect()
    const db = client.db(config.dbName)
    const collection = db.collection("games")
    const existingGameById = await collection.findOne({ game_id: game.game_id })
    if (existingGameById) {
      throw new Error("game_id already exists")
    }
    const existingGameByName = await collection.findOne({
      game_name: game.game_name,
    })
    if (existingGameByName) {
      throw new Error("game_name already exists")
    }
    const result = await collection.insertOne(game)
    return result.ops ? result.ops[0] : { insertedId: result.insertedId }
  } catch (error) {
    console.error("Lỗi trong insertGameToMongo:", error)
    throw error
  } finally {
    if (client) {
      await client.close()
    }
  }
}

// [Delete]
const deleteGame = async (game_id) => {
  let client
  try {
    client = new MongoClient(config.mongoUrl)
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(config.dbName)
    const collection = db.collection("games")
    //convert int
    const numericGameId = parseInt(game_id, 10)
    const result = await collection.deleteOne({ game_id: numericGameId })
    if (result.deletedCount === 0) {
      console.log("Game not found with game_id:", numericGameId)
      return null
    }
    console.log("Deleted game with game_id:", numericGameId)
    return result
  } catch (error) {
    console.error("Error deleting game:", error)
    throw error
  } finally {
    if (client) {
      await client.close()
      console.log("Closed MongoDB connection")
    }
  }
}

// [Update]
const updateGame = async (game_id, updateData) => {
  let client
  try {
    client = new MongoClient(config.mongoUrl)
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(config.dbName)
    const collectionGenres = db.collection("games")
    const numericGameId = parseInt(game_id, 10)
    const updateObject = { $set: updateData }
    console.log("Updating Game with game_id:", numericGameId)
    console.log("Update object:", updateObject)
    const result = await collectionGenres.findOneAndUpdate(
      { game_id: numericGameId },
      updateObject,
      { returnOriginal: false }
    )
    console.log(result)
    if (!result) {
      throw new Error(`Games with game_id ${numericGameId} not found.`)
    }
    return result
  } catch (error) {
    console.error("Error updating Games:", error)
    throw error
  } finally {
    if (client) {
      await client.close()
      console.log("Closed MongoDB connection")
    }
  }
}
// [Search]

module.exports = {
  getGamesFromMongo,
  getGameDetails,
  searchGames,
  getGamesOnSale,
  insertGame,
  deleteGame,
  updateGame,
}
