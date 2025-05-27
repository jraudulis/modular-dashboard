import { initWeather } from "./components/weather/weather.js";

document.addEventListener('DOMContentLoaded', () =>{
    initWeather (document.getElementById('weather-container'));
});