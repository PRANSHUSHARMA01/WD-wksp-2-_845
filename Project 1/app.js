const apiKey = "YOUR_API_KEY";

const form = document.getElementById("wForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        updateUI(data);

    } catch (error) {
        alert(error.message);
    }
});

function updateUI(data) {
    document.getElementById("cityName").textContent =
        `${data.location.name}, ${data.location.country}`;

    document.getElementById("temp").textContent =
        `${data.current.temp_c}°C`;

    document.getElementById("condition").textContent =
        data.current.condition.text;

    document.getElementById("humidity").textContent =
        data.current.humidity;

    document.getElementById("wind").textContent =
        data.current.wind_kph;

    document.getElementById("weatherIcon").src =
        `https:${data.current.condition.icon}`;

    document.getElementById("weatherIcon").alt =
        data.current.condition.text;

    document.getElementById("weatherInfo").style.display = "block";
}