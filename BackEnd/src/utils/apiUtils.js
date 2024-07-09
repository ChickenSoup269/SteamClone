const axios = require("axios")
const { MongoClient } = require("mongodb")
const config = require("../config/mongodb")
// Fetch data from API List [GET]
const fetchAppList = async () => {
  try {
    const response = await axios.get(config.gameListApiUrl)
    return response.data.applist.apps
  } catch (error) {
    console.error("Error fetching app list:", error)
    throw error
  }
}
// Helper function to add retry logic
const fetchWithRetry = async (url, retries = 10, delay = 6000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, { timeout: 100000 })
      return response
    } catch (error) {
      if (i === retries - 1) {
        throw error
      }
      console.warn(`Retrying (${i + 1}/${retries})...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}
//Fetch data from API Detail [GET]
const fetchAppDetail = async (appId) => {
  try {
    const response = await fetchWithRetry(`${config.gameDetailsApiUrl}${appId}`)
    if (response.data && response.data[appId]) {
      if (response.data[appId].success) {
        return response.data[appId].data
      } else {
        console.log(
          `API returned success: false for app with ID ${appId}. Skipping.`
        )
        return null // Return null or handle differently
      }
    } else {
      console.error(`Invalid response format for app with ID ${appId}`)
      return null // Return null or handle differently
    }
  } catch (error) {
    console.error(`Error fetching details for app with ID ${appId}:`, error)
    throw error
  }
}

// Fetch Data API save to Mongo
// const fetchDataAndSaveToMongo = async () => {
//     let client;
//     try {
//         client = new MongoClient(config.mongoUrl);
//         await client.connect();
//         console.log('Đã kết nối tới MongoDB');
//         const db = client.db(config.dbName);
//         // Create Collection
//         const collection = db.collection('games');
//         const collectionGenres = db.collection('genres')
//         // API LIST
//         const appList = await fetchAppList();
//         // Log total number of games fetched
//         console.log(`Fetched ${appList.length} games from API`);

//         // Only take the first 10 games
//         const limitedGames = appList.slice(0,200);

//         // Log limited games for debugging
//         console.log('Limited games:', limitedGames);

//         // Insert limited games into MongoDB
//         for (const game of limitedGames) {
//             if (game.name && game.name.trim() !== "") {
//                 const gameDetails = await fetchAppDetail(game.appid);
//                 if (gameDetails && gameDetails.genres && gameDetails.package_groups) {
//                     const genres = gameDetails.genres || [];
//                     const genre_ids = genres.map(genre => genre.id);
//                     let releaseDate = '';
//                     let initial_formatted = '';
//                     let final_formatted = '';
//                     let saleDuration = 0;
//                     let saleEndDate = null;
//                     let optionTexts = [];
//                     let percentSavings = [];
//                     let  screenshots = [];
//                     let videos = [];
//                     let isFree = [];
//                     let dlc = [];
//                     let prices_discounted = [];
//                     // Check data release date from API
//                     if (gameDetails.release_date && gameDetails.release_date.date) {
//                         releaseDate = gameDetails.release_date.date;
//                     }else {
//                         console.log(`Invalid or missing release date for game ${game.appid}`);
//                     }
//                      // Check and add is_free
//                     if (typeof gameDetails.is_free === 'boolean') {
//                         isFree = gameDetails.is_free;
//                     } else {
//                         console.log(`Invalid or missing is_free for game ${game.appid}`);
//                     }
//                     // Check and add dlc
//                     if (Array.isArray(gameDetails.dlc)) {
//                         dlc = gameDetails.dlc;
//                     } else {
//                         console.log(`Invalid or missing dlc for game ${game.appid}`);
//                     }
//                     // Filter price_overview get initial_formatted & final_formatted
//                     if (gameDetails.price_overview) {
//                         if (gameDetails.price_overview.initial_formatted) {
//                             initial_formatted = gameDetails.price_overview.initial_formatted;
//                         }
//                         else {
//                             console.log(`Invalid or missing initial_formatted for game ${game.appid}`);
//                         }
//                         if (gameDetails.price_overview.final_formatted) {
//                             final_formatted = gameDetails.price_overview.final_formatted;
//                         }
//                         else {
//                             console.log(`Invalid or missing final_formatted for game ${game.appid}`);
//                         }
//                     }else {
//                         console.log(`Invalid or missing price_overview for game ${game.appid}`);
//                     }
//                     // Filter package_groups get percent_savings_text & price_in_cents_with_discount
//                     if (gameDetails.package_groups) {
//                         for (const group of gameDetails.package_groups) {
//                             if (group.subs) {
//                                 optionTexts = group.subs.map(sub => sub.option_text);
//                                 percentSavings = group.subs.map(sub => {
//                                     // Check if percent_savings_text is a string and contains a valid number
//                                     if (sub.percent_savings_text && sub.percent_savings_text.trim() !== "") {
//                                         const savings = parseInt(sub.percent_savings_text.replace('%', '').trim(), 10);
//                                         if (!isNaN(savings)) {
//                                             return savings;
//                                         } else {
//                                             console.log(`Invalid percent_savings_text: ${sub.percent_savings_text}`);
//                                             return null; // Or handle invalid data accordingly
//                                         }
//                                     } else {
//                                         console.log(`Invalid percent_savings_text format: ${typeof sub.percent_savings_text}`);
//                                         return null; // Or handle invalid data accordingly
//                                     }
//                                 });
//                                 prices_discounted = group.subs.map(sub => {
//                                     if (sub.price_in_cents_with_discount) {
//                                         return sub.price_in_cents_with_discount;
//                                     } else {
//                                         console.log(`Invalid price_in_cents_with_discount format: ${typeof sub.price_in_cents_with_discount}`);
//                                         return null; // Or handle invalid data accordingly
//                                     }
//                                 });

//                             }

//                         }
//                     }else {
//                         console.log(`Invalid or missing package_groups for game ${game.appid}`);
//                     }
//                     // filter  screenshots get id path_thumbnail
//                     if (gameDetails.screenshots && gameDetails.screenshots.length > 0) {
//                         const firstScreenshot = gameDetails.screenshots[0];
//                         screenshots.push({
//                             path_full: firstScreenshot.path_full,
//                             id: firstScreenshot.id,
//                             path_thumbnail: firstScreenshot.path_thumbnail
//                         });
//                         screenshots = screenshots.concat(gameDetails.screenshots.slice(1).map(screenshot => ({
//                             id: screenshot.id,
//                             path_thumbnail: screenshot.path_thumbnail
//                         })));
//                     } else {
//                         console.log(`Invalid or missing screenshots for game ${game.appid}`);
//                     }
//                     // Filter movies get webm
//                     // if (gameDetails.movies) {
//                     //     for (const gr_movies of gameDetails.movies) {
//                     //         if (gr_movies.webm) {
//                     //             video = gr_movies.webm.map(vd => {
//                     //                 if (vd.max) {
//                     //                     return vd.max
//                     //                 } else {
//                     //                     console.log(`Invalid webm(max) format: ${typeof vd.max}`);
//                     //                     return null; // Or handle invalid data accordingly
//                     //                 }
//                     //             });
//                     //         }

//                     //     }
//                     // }
//                     if (gameDetails.movies) {
//                         videos = gameDetails.movies.reduce((acc, movie) => {
//                           if (movie.webm && movie.webm.max) {
//                             acc.push(movie.webm.max);
//                           }
//                           return acc;
//                         }, []);
//                       }
//                     // Filter out null or undefined values from percentSavings
//                     percentSavings = percentSavings.filter(savings => savings !== null && savings !== undefined);
//                      // Set default sale duration if there's a sale
//                     if (percentSavings.length > 0) {
//                         saleDuration = 7; // 7 days (1 week)
//                         // Calculate sale end date
//                         const saleStartDate = new Date();
//                         saleEndDate = new Date(saleStartDate.getTime() + (saleDuration * 24 * 60 * 60 * 1000));
//                         // Format YYYY-MM-DD
//                         saleEndDate = saleEndDate.toISOString().split('T')[0];
//                     }
//                     const transformedGame = {
//                         game_id: game.appid,
//                         game_name: game.name,
//                         description: gameDetails.short_description || '',
//                         header_image: gameDetails.header_image,
//                         genre_ids: genre_ids,
//                         sale: percentSavings, // giảm giá
//                         initial_price: initial_formatted,// giá ban đầu
//                         final_price: final_formatted,  // giá sale
//                         option : optionTexts, // lựa chọn giá
//                         price_cent_discount: prices_discounted, // các giá sale từ option
//                         movies: videos, // movies các games
//                         screenshots: screenshots ,// srceen
//                         release_Date : releaseDate, // ngày phát hành
//                         sale_end_date: saleEndDate || '',// ngày kết khúc
//                         is_free: isFree,
//                         dlc: dlc
//                     };
//                     // Check developers & publishers
//                     if (gameDetails.developers && gameDetails.developers.length > 0) {
//                         transformedGame.developers = gameDetails.developers;
//                     }else {
//                         console.log(`Invalid or missing developers for game ${game.appid}`);
//                     }
//                     if (gameDetails.publishers && gameDetails.publishers.length > 0) {
//                         transformedGame.publishers = gameDetails.publishers;
//                     } else {
//                         console.log(`Invalid or missing publishers for game ${game.appid}`);
//                     }
//                     await collection.updateOne(
//                         { game_id: transformedGame.game_id },
//                         { $set: transformedGame },
//                         { upsert: true }
//                     );
//                     const currentDate = new Date();
//                     if (currentDate > saleEndDate) {
//                         console.log(`Giảm giá cho game ${game.name} đã hết hiệu lực.`);
//                         await collection.updateOne(
//                             { game_id: transformedGame.game_id },
//                             { $unset: { sale: "0", sale_end_date: "0" } }
//                         );
//                     }else {
//                         console.log(`Giảm giá cho game ${game.name} vẫn còn hiệu lực.`);
//                     }
//                     // Genres
//                     if (genres.length > 0) {
//                         for (const genre of genres) {
//                             await collectionGenres.updateOne(
//                                 { genre_id: genre.id },
//                                 { $setOnInsert: { description: genre.description } },
//                                 { upsert: true }
//                             );
//                         }
//                     } else {
//                         console.log(`Game with appid ${game.appid} has no genres.`);
//                     }

//                 } else {
//                     console.log(`Skipping game with appid ${game.appid} due to API error or no data.`);
//                 }
//             } else {
//                 // Log games that are skipped due to empty names
//                 console.log(`Skipped game with appid ${game.appid} due to empty name`);
//             }
//         }
//         console.log('Hoàn tất lưu dữ liệu vào MongoDB');
//     } catch (error) {
//         console.error('Có lỗi xảy ra:', error);
//     } finally {
//         if (client) {
//             await client.close();
//             console.log('Đã đóng kết nối tới MongoDB');
//         }
//     }
// };
const fetchDataAndSaveToMongo = async () => {
  let client
  try {
    client = new MongoClient(config.mongoUrl)
    await client.connect()
    console.log("Đã kết nối tới MongoDB")
    const db = client.db(config.dbName)
    const collection = db.collection("games")
    const collectionGenres = db.collection("genres")
    // check mongodb if = 50 data break
    const gamesCount = await collection.countDocuments()
    if (gamesCount >= 50) {
      console.log(
        `Đã có ${gamesCount} game trong cơ sở dữ liệu. Dừng việc thêm game.`
      )
      return
    }
    const appList = await fetchAppList()
    console.log(`Fetched ${appList.length} games from API`)

    const fetchedGames = []
    let count = 0

    for (const game of appList) {
      if (game.name && game.name.trim() !== "") {
        const gameDetails = await fetchAppDetail(game.appid)
        if (
          gameDetails &&
          gameDetails.genres &&
          gameDetails.package_groups &&
          gameDetails.package_groups.length > 0
        ) {
          fetchedGames.push({ game, gameDetails })
          count++
        } else {
          console.log(
            `Skipping game with appid ${game.appid} due to API error or no data.`
          )
        }
      } else {
        console.log(`Skipped game with appid ${game.appid} due to empty name`)
      }

      if (count >= 50) {
        break
      }
    }

    console.log(
      "Limited games:",
      fetchedGames.map(({ game }) => game)
    )

    for (const { game, gameDetails } of fetchedGames) {
      const genres = gameDetails.genres || []
      const genre_ids = genres.map((genre) => genre.id)
      let releaseDate = ""
      let saleDuration = 0
      let saleEndDate = null
      let screenshots = []
      let videos = []
      let isFree = false
      let dlc = []
      let subs = []
      let percentSavings = []

      if (gameDetails.release_date && gameDetails.release_date.date) {
        releaseDate = gameDetails.release_date.date
      } else {
        console.log(`Invalid or missing release date for game ${game.appid}`)
      }

      if (typeof gameDetails.is_free === "boolean") {
        isFree = gameDetails.is_free
      } else {
        console.log(`Invalid or missing is_free for game ${game.appid}`)
      }

      if (Array.isArray(gameDetails.dlc)) {
        dlc = gameDetails.dlc
      } else {
        console.log(`Invalid or missing dlc for game ${game.appid}`)
      }
      // filter optionText, percentSavings, priceDiscounted from package_group
      if (gameDetails.package_groups) {
        for (const group of gameDetails.package_groups) {
          if (group.subs) {
            subs = group.subs.map((sub) => ({
              optionText: sub.option_text,
              percentSavings:
                sub.percent_savings_text &&
                sub.percent_savings_text.trim() !== ""
                  ? parseInt(
                      sub.percent_savings_text.replace("%", "").trim(),
                      10
                    )
                  : null,
              priceDiscounted: sub.price_in_cents_with_discount,
              rentalPrice: sub.price_in_cents_with_discount * 0.5,
            }))
            // Get value percent from sub assign percentSavings contains percentSavings from subs
            percentSavings = percentSavings.concat(subs)
          }
          percentSavings = percentSavings.filter(
            (savings) =>
              savings.percentSavings !== null &&
              savings.percentSavings !== undefined
          )
        }
      } else {
        console.log(`Invalid or missing package_groups for game ${game.appid}`)
      }
      if (percentSavings.length > 0) {
        saleDuration = 7
        const saleStartDate = new Date()
        saleEndDate = new Date(
          saleStartDate.getTime() + saleDuration * 24 * 60 * 60 * 1000
        )
        saleEndDate = saleEndDate.toISOString().split("T")[0]
      }
      // screenshots
      if (gameDetails.screenshots && gameDetails.screenshots.length > 0) {
        screenshots = gameDetails.screenshots.map((screenshot) => {
          return {
            id: screenshot.id,
            path_thumbnail: screenshot.path_thumbnail,
            path_full: screenshot.path_full,
          }
        })
      } else {
        console.log(`Invalid or missing screenshots for game ${game.appid}`)
      }
      if (gameDetails.movies) {
        videos = gameDetails.movies.reduce((acc, movie) => {
          if (movie.webm && movie.webm.max) {
            acc.push(movie.webm.max)
          }
          return acc
        }, [])
      }
      const transformedGame = {
        game_id: game.appid,
        game_name: game.name,
        description: gameDetails.short_description || "",
        header_image: gameDetails.header_image,
        genre_ids: genre_ids,
        option: subs,
        movies: videos,
        screenshots: screenshots,
        release_Date: releaseDate,
        sale_end_date: saleEndDate || "",
        is_free: isFree,
        dlc: dlc,
      }

      if (gameDetails.developers && gameDetails.developers.length > 0) {
        transformedGame.developers = gameDetails.developers
      } else {
        console.log(`Invalid or missing developers for game ${game.appid}`)
      }

      if (gameDetails.publishers && gameDetails.publishers.length > 0) {
        transformedGame.publishers = gameDetails.publishers
      } else {
        console.log(`Invalid or missing publishers for game ${game.appid}`)
      }

      await collection.updateOne(
        { game_id: transformedGame.game_id },
        { $set: transformedGame },
        { upsert: true }
      )

      const currentDate = new Date()
      if (currentDate > saleEndDate) {
        console.log(`Giảm giá cho game ${game.name} đã hết hiệu lực.`)
        await collection.updateOne(
          { game_id: transformedGame.game_id },
          { $unset: { sale: "", sale_end_date: "" } }
        )
      } else {
        console.log(`Giảm giá cho game ${game.name} vẫn còn hiệu lực.`)
      }

      if (genres.length > 0) {
        for (const genre of genres) {
          await collectionGenres.updateOne(
            { genre_id: genre.id },
            { $setOnInsert: { description: genre.description } },
            { upsert: true }
          )
        }
      } else {
        console.log(`Game with appid ${game.appid} has no genres.`)
      }
    }

    console.log("Hoàn tất lưu dữ liệu vào MongoDB")
  } catch (error) {
    console.error("Có lỗi xảy ra:", error)
  } finally {
    if (client) {
      await client.close()
      console.log("Đã đóng kết nối tới MongoDB")
    }
  }
}

module.exports = {
  fetchDataAndSaveToMongo,
}
