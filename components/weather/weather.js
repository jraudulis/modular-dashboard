export function initWeather (container) {
    container.innerHTML = `
    <h2>Weather</h2>
  <div class="weather-info">
    <span class="temp">--°C</span>
    <span class="location">Fetching...</span>
  </div>
    `;
}