const city = document.getElementById("cityName");
const temp = document.getElementById("tempValue");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const input = document.getElementById("inputBox");
const icon = document.getElementById("weather-icon");
let cityName = "city";

const apiKey = "4f6cc65d1df17ef8f5ebd33071c744e9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";



async function checkWeather(cityName) {
    try {
        const response = await fetch(`${apiUrl}&appid=${apiKey}&q=${cityName}`);
        
        if (!response.ok) {
            throw new Error(`invalid cityName or API error: ${response.status}`);
        }
        
        const data = await response.json();

        if (!data.name || !data.main || !data.weather) {
            throw new Error("unwaited API response.");
        }

        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + "°C";
        humidity.innerHTML = data.main.humidity + "%";


        wind.innerHTML = data.wind.speed + "km/h";  

        if (data.weather[0].main == "Clouds") { icon.src = "images/clouds.png"; }
        else if (data.weather[0].main == "Clear") { icon.src = "images/clear.png"; }
        else if (data.weather[0].main == "Rain") { icon.src = "images/rainy.png"; }
        else if (data.weather[0].main == "Drizzle") { icon.src = "images/drizzle.png"; }
        else if (data.weather[0].main == "Mist") { icon.src = "images/mist.png"; }
        else { icon.src = "images/clear.png"; }

    } catch (error) {
        console.error("Error:", error);
        city.innerHTML = "invalid city";
        temp.innerHTML = "-";
        humidity.innerHTML = "-";
        wind.innerHTML = "-";
        icon.src = "images/clear.png";
    }
}

 
function searchCity(){
    cityName = input.value;
    checkWeather(cityName);
    input.value = "";

}
    
    