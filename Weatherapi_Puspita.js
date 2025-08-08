const apiKey = '68a222c3183096dc0b0ab99c65313e1c'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const errorElement = document.getElementById('error');
    const weatherInfo = document.getElementById('weatherInfo');

    if (!city) {
        errorElement.textContent = 'Please enter a city name';
        weatherInfo.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        
        // Update UI
        document.getElementById('cityName').textContent = data.name;
        document.getElementById('temperature').textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
        document.getElementById('condition').textContent = `Condition: ${data.weather[0].description}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
        
        // Update weather icon
        const iconCode = data.weather[0].icon;
        document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        // Update background based on weather
        const weatherMain = data.weather[0].main.toLowerCase();
        document.body.className = '';
        if (weatherMain.includes('clear')) {
            document.body.classList.add('sunny');
        } else if (weatherMain.includes('cloud')) {
            document.body.classList.add('cloudy');
        } else if (weatherMain.includes('rain')) {
            document.body.classList.add('rainy');
        }

        errorElement.textContent = '';
        weatherInfo.style.display = 'block';
    } catch (error) {
        errorElement.textContent = error.message;
        weatherInfo.style.display = 'none';
    }
}

// Add event listener for Enter key
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});