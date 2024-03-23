import axios from "axios";

const baseURL = import.meta.env.VITE_OPEN_WEATHER_BASE_URL
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY

export const fetchWeather = async (city) => {
    const response = await axios.get(`${baseURL}/weather?q=${city}&appid=${apiKey}`);
    const data = await response.data;
    return data
}

