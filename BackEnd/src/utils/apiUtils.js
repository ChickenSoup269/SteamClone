const axios = require('axios');
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
module.exports = {
  fetchAppList,
  fetchAppDetail
};