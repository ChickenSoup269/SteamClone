const { MongoClient, ObjectId } = require("mongodb")
const config = require("../config/mongodb")
//Method [GET] ALL from Mongo
const getAllGenres = async () => {
  let client
  try {
    client = new MongoClient(config.mongoUrl)
    await client.connect()
    console.log("Connected to MongoDB")
    const db = client.db(config.dbName)
    const collectionGenres = db.collection("genres")
    // [GET] list Genres
    const genres = await collectionGenres.find({}).toArray()
    console.log("Genres:", genres)
    return genres
  } catch (error) {
    console.error("Error fetching genres:", error)
    throw error
  } finally {
    if (client) {
      await client.close()
      console.log("Closed MongoDB connection")
    }
  }
}
// [GET] Detail
const getDetailgenres = async (genre_id) => {
  let client
  try {
    client = new MongoClient(config.mongoUrl)
    await client.connect()
    console.log("Connected to MongoDB")
    const db = client.db(config.dbName)
    const collection = db.collection("games")
    const games = await collection.find({ genre_ids: genre_id }).toArray()
    return games
  } catch (error) {
    console.error("Error getting games by genre:", error)
    throw error
  } finally {
    if (client) {
      await client.close()
      console.log("Closed MongoDB connection")
    }
  }
}
//[GET] Genresbygame
const getGenresbygame = async () => {
  let client
  try {
    client = new MongoClient(config.mongoUrl)
    await client.connect()
    console.log("Connected to MongoDB")
    const db = client.db(config.dbName)
    const collectionGenres = db.collection("genres")
    const collectionGames = db.collection("games")

    // [GET] list Genres with their respective games
    const genresWithGames = await collectionGenres
      .aggregate([
        {
          $lookup: {
            from: "games",
            localField: "genre_id",
            foreignField: "genre_ids",
            as: "games",
          },
        },
      ])
      .toArray()

    console.log("Genres with Games:", genresWithGames)
    return genresWithGames
  } catch (error) {
    console.error("Error fetching genres:", error)
    throw error
  } finally {
    if (client) {
      await client.close()
      console.log("Closed MongoDB connection")
    }
  }
}

//[POST]
const insertGenres = async (genre) => {
  let client
  try {
    client = new MongoClient(config.mongoUrl)
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(config.dbName)
    const collectionGenres = db.collection("genres")
    const result = await collectionGenres.insertOne({
      genre_id: genre.genre_id,
      description: genre.description,
    })
    console.log("result", result)

    console.log("Inserted genre with ID:", result.insertedId)
    if (!result.insertedId) {
      throw new Error("Failed to insert genre.")
    }

    return result
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Duplicate genre ID")
    } else {
      console.error("Error inserting genre:", error)
      throw error
    }
  } finally {
    if (client) {
      await client.close()
      console.log("Closed MongoDB connection")
    }
  }
}
//[PUT] Delete
const deleteGenres = async (genre_id) => {
  let client
  try {
    client = new MongoClient(config.mongoUrl)
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(config.dbName)
    const collectionGenres = db.collection("genres")
    const result = await collectionGenres.deleteOne({ genre_id: genre_id })

    if (result.deletedCount === 0) {
      throw new Error("Genre not found.")
    }

    console.log("Deleted genre with genre_id:", genre_id)
    return result
  } catch (error) {
    console.error("Error deleting genre:", error)
    throw error
  } finally {
    if (client) {
      await client.close()
      console.log("Closed MongoDB connection")
    }
  }
}
//[PUT] Update
const updateGenresById = async (genre_id, updateData) => {
  let client
  try {
    client = new MongoClient(config.mongoUrl)
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(config.dbName)
    const collectionGenres = db.collection("genres")

    const updateObject = { $set: updateData }
    console.log("Updating genre with genre_id:", genre_id)
    console.log("Update object:", updateObject)
    // Tìm và cập nhật thể loại dựa trên genre_id
    const result = await collectionGenres.findOneAndUpdate(
      { genre_id: genre_id }, // Điều kiện tìm kiếm dựa trên genre_id
      updateObject,
      { returnOriginal: false }
    )
    console.log(result)
    if (!result) {
      throw new Error(`Genre with genre_id ${genre_id} not found.`)
    }
    return result
  } catch (error) {
    console.error("Error updating genre:", error)
    throw error
  } finally {
    if (client) {
      await client.close()
      console.log("Closed MongoDB connection")
    }
  }
}

module.exports = {
  getAllGenres,
  getDetailgenres,
  insertGenres,
  deleteGenres,
  updateGenresById,
  getGenresbygame,
}
