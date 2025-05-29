import { initWeather } from "./components/weather/weather.js";
import { initTodo } from "./components/todo/todo.js";

document.addEventListener('DOMContentLoaded', () =>{
    initWeather (document.getElementById('weather-container'));
    initTodo (document.getElementById('todo-container'));
});