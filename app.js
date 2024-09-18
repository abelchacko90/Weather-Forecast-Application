const apiKey = 'b6907d289e10d714a6e88b30761fae22'; // Free API key from OpenWeatherMap

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeatherByCity(city);
    } else {
        alert('Please enter a city name');
    }
});

document.getElementById('currentLocationBtn').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        getWeatherByLocation(latitude, longitude);
    });
});

function getWeatherByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error:', error));
}

function getWeatherByLocation(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error:', error));
}

function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    weatherDataDiv.innerHTML = `
        <h2 class="text-xl font-bold">${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
    saveRecentCity(data.name);
}

function saveRecentCity(city) {
    let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    if (!recentCities.includes(city)) {
        recentCities.push(city);
        localStorage.setItem('recentCities', JSON.stringify(recentCities));
        updateRecentCitiesDropdown();
    }
}

function updateRecentCitiesDropdown() {
    const recentCitiesDiv = document.getElementById('recentCities');
    let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    recentCitiesDiv.innerHTML = recentCities.map(city => `<button class="bg-gray-200 p-2 m-1" onclick="getWeatherByCity('${city}')">${city}</button>`).join('');
}

// Initialize recent cities dropdown on page load
updateRecentCitiesDropdown();
