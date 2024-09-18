document.getElementById('searchBtn').addEventListener('click', function () {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeatherData(city);
    }
});


