import { initWeather } from "./components/weather/weather.js";
import { initTodo } from "./components/todo/todo.js";
import { initPomodoro } from "./components/pomodoro/pomodoro.js";

document.addEventListener('DOMContentLoaded', () =>{
    initWeather (document.getElementById('weather-container'));
    initTodo (document.getElementById('todo-container'));
    initPomodoro (document.getElementById('pomodoro-container'));
});