import React, { useEffect, useState } from "react";
import "./App.scss";
import searchIcon from "./icons/search-icon.svg";

const randomBgImageBaseUrl = 'https://source.unsplash.com/1920x1080/?';
const weatherApiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const weatherIconBaseUrl = 'https://openweathermap.org/img/wn/';
 
const App = () => {
  const [cityWeatherForecast, setCityWeatherForecast] = useState(null);
  const [searchedValue, setSearchedValue] = useState([]);

  const searchCityWeatherForecast = async (city) => {
    const response = await fetch(`${weatherApiBaseUrl}${city}&unit=matrix&appid=007dc817717ddc58cf7f72a756e3af85`);
    const data = await response.json();

    if (data.cod === '404') {
      setCityWeatherForecast(null);
      document.body.style.backgroundImage = `url(${randomBgImageBaseUrl}weather)`;
      return;
    }

    setCityWeatherForecast(data);
    document.body.style.backgroundImage = `url(${randomBgImageBaseUrl}${city})`;
  }

  useEffect(() => {
    document.body.style.backgroundImage = `url(${randomBgImageBaseUrl}weather)`;
  }, []);

  return (
    <div className="weather-card-wrapper">
      <div className="weather-card">
        <div className="search-input">
          <input
            value={searchedValue}
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchedValue(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' ? searchCityWeatherForecast(searchedValue) : ''}
          />
          <button onClick={() => searchCityWeatherForecast(searchedValue)} className="search-btn">
            <img src={searchIcon} alt="" />
          </button>
        </div>
        
        {
          cityWeatherForecast ?
            (
              <div className="search-result">
                <div className="search-result-title">Weather in {cityWeatherForecast.name}</div>
                <div className="search-result-degree">{(+cityWeatherForecast.main?.temp - 273.15).toFixed(2)} &deg;C</div>
                <div className="search-result-weather">
                  <img src={`${weatherIconBaseUrl}${cityWeatherForecast.weather && cityWeatherForecast.weather[0].icon}.png`} alt="" />
                  {cityWeatherForecast.weather && cityWeatherForecast.weather[0].main}
                </div>
                <div className="search-result-humidity">Humidity: {cityWeatherForecast.main?.humidity}%</div>
                <div className="search-result-wind-speed">Wind Speed: {cityWeatherForecast.wind?.speed} km/hr</div>
              </div>
            ) : ''
        }
      </div>
    </div>
  )
}

export default App;
