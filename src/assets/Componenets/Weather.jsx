import React, { useRef, useState } from 'react';
import './Weather.css';
// package to get data
import axios from 'axios';

const Weather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState([]);

  const getCountryName = async () => {
    const countryName = inputRef.current.value.trim();
    const apiKey = "16bdb1197ecdecd4d3288e75e7101fc5";

    if (!countryName) {
      console.error("Country name is required!");
      return;
    }

    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}&units=metric`
      );
      console.log("Weather Data:", result.data);

      setWeatherData((prevData) => [result.data, ...prevData]);
    } catch (e) {
      console.error("Error fetching weather data:", e.response?.data || e.message);
    }
  };

  return (
    <>
      <h1 className="heading">"The Weather Channel"</h1>
 <b> <h3> The weather application will provide users with real-time weather information, forecasts, and other <br />
    weather-related data,which can help them make better decisions about their day-to-day activities!</h3> </b> 
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your country"
          className="input"
          ref={inputRef}
        />
        {/* <br /> */}
        <button className="button" onClick={getCountryName}>
          Search
        </button>
      </div>
      
      <div class="center" >
       
        {weatherData.length > 0 ? (
          weatherData.map((data, index) => (
            <div className="center" key={index}>
              <h3 className="white">Weather in {data.name}</h3>
              <p className="white">Country: {data.sys.country}</p>
              <p className="white">Temperature: {data.main.temp}°C</p>
              <p className="white">Feels Like: {data.main.feels_like}°C</p>
              <p className="white">Humidity: {data.main.humidity}%</p>
            </div>
          
          ))
        ) : (
          ""
        )}
        
      </div>
    </>

  );
};

export default Weather;
