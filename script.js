let textBox = document.querySelector("#input-city");
let serachBtn = document.querySelector(".search-btn");
let cityName = document.querySelector(".city-name");
let currTemp = document.querySelector(".temp");
let feelsLikeTemp = document.querySelector(".feels-like");
let imgIcon = document.querySelector(".weather-icon");
let errorMsg = document.querySelector(".error p");

serachBtn.addEventListener("click", () => {
  let city = textBox.value.trim();
  if (city) {
    getWeatherByCity(city);
  } else {
    alert("Please enter a city name.");
  }
});

textBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    serachBtn.click();
  }
});

// Async Function to Fetch Weather
async function getWeatherByCity(city) {
  const apiKey = "621de79550ac47dfb0e184221251106";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
    city
  )}&aqi=yes`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    // Validate city match (optional)
    const returnedCity = data.location.name.toLowerCase();
    const inputCity = city.toLowerCase();
    if (
      !returnedCity.includes(inputCity) &&
      !inputCity.includes(returnedCity)
    ) {
      throw new Error("City name does not match");
    }

    document.querySelector(".error").style.display = "none";
    errorMsg.textContent = "";
    document.querySelector(".weather").style.display = "block";

    cityName.innerHTML = data.location.name;
    currTemp.innerHTML = data.current.temp_c + "°C";
    feelsLikeTemp.innerHTML =
      "feels_like: " + Math.round(data.current.feelslike_c) + "°C";

    const condition = data.current.condition.text;
    if (condition === "Mist") {
      imgIcon.src = "//cdn.weatherapi.com/weather/64x64/day/143.png";
    } else if (condition === "Sunny") {
      imgIcon.src = "//cdn.weatherapi.com/weather/64x64/day/113.png";
    } else if (condition === "Clear") {
      imgIcon.src = "//cdn.weatherapi.com/weather/64x64/night/113.png";
    } else if (condition === "Partly cloudy") {
      imgIcon.src = "//cdn.weatherapi.com/weather/64x64/day/116.png";
    } else if (condition === "Moderate rain") {
      imgIcon.src = "//cdn.weatherapi.com/weather/64x64/day/302.png";
    } else if (condition === "Patchy rain nearby") {
      imgIcon.src = "//cdn.weatherapi.com/weather/64x64/day/176.png";
    } else {
      imgIcon.src = "//cdn.weatherapi.com/weather/64x64/day/113.png"; //
    }

    textBox.value = "";
  } catch (error) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
    errorMsg.textContent = error.message;
    console.error("Failed to fetch weather:", error);
  }
}
