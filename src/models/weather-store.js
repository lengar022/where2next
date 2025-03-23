import dotenv from "dotenv";
import axios from "axios";
import dayjs from "dayjs";

dotenv.config();

const apiKey =  process.env.openweathermap_key;

export const weatherStore = {
  getPlacemarkWeather: async function(lat, long) {
    const data = [];
    const days = [];
    // eslint-disable-next-line new-cap
    const now = new dayjs();
    for (let i = 0; i < 7; i += 1)
      days.push(now.add(i, "day").format("ddd"))
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&cnt=7&appid=${apiKey}`;
    const result = await axios.get(url);
    if (result.status === 200) {
      const dailyData = result.data.list;
      for (let i = 0; i < 7; i += 1) {
        data.push({ "day": days[i], "icon": dailyData[i].weather[0].icon, "temp": dailyData[i].main.temp });
      }
    }
    return data;
  },
};