// Variáveis e seleção de elementos
const apiKey = "4f7a6cd8d8815b32e32c3b991f2b6bdf";
const countryApi = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const containerSugestao = document.querySelector(".sugestao")
const buttons = document.querySelectorAll(".sugestao button")

// Funções

const getWeatherData = async(city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    const res = await fetch(apiWeatherUrl)
    const data = await res.json();

    return data

}

const hideInformation = () => {  
    containerSugestao.classList.remove("sugestao");
    containerSugestao.classList.add("hide")
  };

const showWeatherData = async (city) => {
    hideInformation()
    

    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", countryApi + data.sys.country);
        humidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed}Km/h`;

        weatherContainer.classList.remove("hide")

        cityInput.value = ""

}

// Eventos 

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);

});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter"){
        const city = e.target.value
        showWeatherData(city)
    }
})

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log(btn)
      const city = btn.getAttribute("id");
        hideInformation()
      
      showWeatherData(city);
    });
  });