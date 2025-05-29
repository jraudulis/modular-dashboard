const OPENWEATHER_API_KEY = '08ff5bfd6bbd0c08f59cd1c0c38d242b';
const UNSPLASH_API_KEY = 'so2V6iCiqSgz7kgwSsRCx9r_Xb7S0z04bUZvTV8wIMs';

function getLocationCoordinates(container) {
    navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    fetchTemperatureData(latitude, longitude,container);
 });
}

async function fetchTemperatureData(latitude, longitude, container) {
    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`);
        
        if (!weatherResponse.ok) {
            throw new Error(`Weather API error: ${weatherResponse.status}`);
        }

        const weatherData = await weatherResponse.json();

        if (!weatherData.main) {
            alert('Server error');
            return;
        }

        const weather = {
        weatherDescription: weatherData.weather[0].description.toLowerCase(),
        currentTempCelsius: Math.round(weatherData.main.temp),
        feelsLikeCelsius: Math.round(weatherData.main.feels_like),
        location: `${weatherData.name}, ${weatherData.sys.country}`,
        icon: weatherData.weather[0].icon
        
        // weatherIcon.src = `https://openweathermap.org/img/wn/${apiIcon}@2x.png`;
        // locationName.textContent = `${location}, ${country}`;
        // description.textContent = weatherDescription;
        // temperature.textContent = `${currentTempCelsius}ºC`;
        // feelLikeTemperature.textContent = `Feels like ${feelsLikeCelsius}ºC`;

        }
        updateUI(container, weather);

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function updateUI (container, weather) {
    container.querySelector('.icon').src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    container.querySelector('.temp').textContent = `${weather.currentTempCelsius}°C`;
    container.querySelector('.location').textContent = `${weather.location}`;
    hideLoader(container);

}

function displayLoader(container) {
    container.querySelector('.weather-info').style.display = 'none';
    container.querySelector('.loader').style.display = 'block';
}

function hideLoader(container) {
    container.querySelector('.loader').style.display = 'none';
    container.querySelector('.weather-info').style.display = 'flex';
}

export function initWeather (container) {
    container.innerHTML = `
    <h2>Weather</h2>
    <div class="loader"></div>
  <div class="weather-info">
    <img class="icon" />
    <span class="temp">--°C</span>
    <span class="location">Fetching...</span>
  </div>
    `;
    
    displayLoader(container);
    getLocationCoordinates(container);
}