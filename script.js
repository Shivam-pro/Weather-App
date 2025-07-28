const input = document.getElementById('input');
const search_btn = document.querySelector(".search_icon");
const temperature = document.querySelector(".temperature");
const city = document.querySelector(".city");
const humid_percent = document.querySelector(".humid-percent");
const wind_speed = document.querySelector(".wind-info");
const weather_image = document.getElementById('image-weather');
const weather = document.querySelector(".weather");
const Information = document.querySelector(".information");
const Weather_discription = document.querySelector(".desc");
const indicator = document.querySelector(".indicator");

async function fetchWeather(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c326eae41e35c851249c002062caa99b`;
    const weather = await fetch(api);
    if (weather.status == 404) {
        alert("You Have Enter Wrong City Name");
    }
    else {
        const res = await weather.json();
        return res;
    }
}
search_btn.addEventListener("click", async () => {
    const city_name = input.value;
    const data = await fetchWeather(city_name);
    if (data.value == "none") {
        weather.style.display = "none";
    }
    else {
        Information.style.display = "none";
        weather.style.display = "flex"
    }
    if (city_name == "") {
        alert("Please Enter the city name");
    }
    else {
        temperature.innerHTML = Math.floor(data.main.temp - 273.15) + "°C";
        city.innerHTML = data.name;
        humid_percent.firstElementChild.innerHTML = data.main.humidity + "%";
        wind_speed.firstElementChild.innerHTML = data.wind.speed + "Km/h";
        weather_image.src = `images/${data.weather[0].main}.png`
        Weather_discription.innerHTML = data.weather[0].main
        console.log(data);
    }

})

function fetchWeatherData() {
    if (navigator.onLine) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=c326eae41e35c851249c002062caa99b')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                indicator.innerHTML = "";
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        console.log('No internet connection. Please check your connection and try again.');
        indicator.innerHTML = "No internet connection. Please check your connection and try again."
    }
}

window.addEventListener('online', fetchWeatherData);
window.addEventListener('offline', () => {
    console.log('You are offline. Please check your internet connection.');
    indicator.innerHTML = "You are offline. Please check your internet connection."
});

// Initial call
fetchWeatherData();
