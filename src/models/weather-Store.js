import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const apiKey =  process.env.openweathermap_key;

export const weatherStore = {

  getPlacemarkWeather: async function(lat, long) {
    const data = {};
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&cnt=7&appid=${apiKey}`;
    const result = await axios.get(url);
    if (result.status === 200) {
      data.temps = [];
      data.icons = [];
      const dailyData = result.data.list;
      for (let i = 0; i < 7; i += 1) {
        data.temps.push(dailyData[i].main.temp);
        data.icons.push(dailyData[i].weather[0].icon);
      }
    }
    return data;
  },
};