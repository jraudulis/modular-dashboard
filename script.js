import { initWeather } from "./components/weather/weather.js";
import { initTodo } from "./components/todo/todo.js";
import { initPomodoro } from "./components/pomodoro/pomodoro.js";
import { initNews } from "./components/news/news.js";

document.addEventListener('DOMContentLoaded', () =>{
    initWeather (document.getElementById('weather-container'));
    initTodo (document.getElementById('todo-container'));
    initPomodoro (document.getElementById('pomodoro-container'));
    initNews (document.getElementById('news-container'));
});