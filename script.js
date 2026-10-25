const apiKey = "426f1a0a6677108c688502d9cf99749e";

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const message = document.getElementById("message");
    const weather = document.getElementById("weather");

    if (city === "") {
        message.textContent = "Please enter a city name.";
        return;
    }

    if (apiKey === "YOUR_API_KEY") {
        message.textContent = "Please add your OpenWeatherMap API key.";
        return;
    }

    message.textContent = "Loading weather...";
    weather.style.display = "none";

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to get weather.");
        }

        document.getElementById("cityName").textContent =
            data.name + ", " + data.sys.country;

        document.getElementById("temperature").textContent =
            Math.round(data.main.temp) + "°C";

        document.getElementById("condition").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            data.main.humidity + "%";

        document.getElementById("feelsLike").textContent =
            Math.round(data.main.feels_like) + "°C";

        const icons = {
            Clear: "☀️",
            Clouds: "☁️",
            Rain: "🌧️",
            Drizzle: "🌦️",
            Thunderstorm: "⛈️",
            Snow: "❄️",
            Mist: "🌫️",
            Fog: "🌫️",
            Haze: "🌫️",
            Smoke: "🌫️",
          };

        const condition = data.weather[0].main;
        document.getElementById("icon").textContent =
            icons[condition] || "🌤️";

        message.textContent = "";
        weather.style.display = "block";

    } catch (error) {
        message.textContent =
            error.message === "Failed to fetch"
                ? "Network error. Check your internet connection."
                : error.message === "city not found"
                    ? "City not found. Please try another city."
                    : error.message;
    }
}

document.getElementById("city").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});