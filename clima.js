const apiKey = 'e9415ff789e44d22b20175812251208'; 
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');

const cityName = document.getElementById('city-name');
const localTime = document.getElementById('local-time');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const uv = document.getElementById('uv-index');


searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();

  if (!city) return;

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`)
    .then(response => {
      if (!response.ok) throw new Error('Erro na requisição');
      return response.json();
    })
    .then(data => {
      errorMessage.classList.add('hidden');
      weatherResult.classList.remove('hidden');

      cityName.innerText = `${data.location.name}, ${data.location.country}`;
      localTime.innerText = `Horário Local: ${data.location.localtime}`;
      weatherIcon.src = data.current.condition.icon;
      temperature.innerText = `${data.current.temp_c}°C`;
      condition.innerText = data.current.condition.text;
      feelsLike.innerText = `${data.current.feelslike_c}°`;
      humidity.innerText = `${data.current.humidity}%`;
      wind.innerText = `${data.current.wind_kph} km/h`;
      pressure.innerText = `${data.current.pressure_mb} mb`;
      visibility.innerText = `${data.current.vis_km} km`;
      uv.innerText = data.current.uv;
    })
    .catch(error => {
      console.error(error);
      weatherResult.classList.add('hidden');
      errorMessage.innerText = 'Cidade não encontrada ou erro ao buscar dados.';
      errorMessage.classList.remove('hidden');
    });
});
