import React, { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const apiKey = "27c082470e39b36a2864ed67cafc88d9";


  const getWeatherData = async (city) => {
    setLoading(true);

    try {
      const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
      const res = await fetch(apiWeatherURL);
      const data = await res.json();

      if (data.cod === "404") {
        setErrorMessage('Cidade não encontrada');
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Erro ao obter dados do clima:', error);
      setErrorMessage('Ocorreu um erro ao obter os dados meteorológicos');
      setWeatherData(null);
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData(city);
  };

  const suggestionCities = ["Guarapuava", "Curitiba", "Cascavel", "Londrina"]; // Sugestões de cidades

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Previsão do Tempo</h3>
        <div className="form-input-container">
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Digite o nome da cidade" />
          <button type="submit">Buscar</button>
        </div>
      </form>

      {loading && <div id="loader" className="loader"><i className="fas fa-spinner"></i></div>}
      {errorMessage && <div id="error-message" className="error-message">{errorMessage}</div>}
      
      {weatherData && (
        <div id="weather-data" className="weather-data">
          <h2>{weatherData.name}</h2>
          <span id="temperature">{parseInt(weatherData.main.temp)}°C</span>
          <div id="description-container" className="description-container">
            <img id="weather-icon" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
            <span id="description">{weatherData.weather[0].description}</span>
          </div>
          <div id="details-container" className="details-container">
            <div id="umidity">Umidade: {weatherData.main.humidity}%</div>
            <div id="wind">Vel. do vento: {weatherData.wind.speed}km/h</div>
          </div>
        </div>
      )}

      <div id="suggestions" className="suggestions">
        {suggestionCities.map((city) => (
          <button key={city} onClick={() => getWeatherData(city)}>{city}</button>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
