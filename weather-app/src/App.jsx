import { useState } from 'react';
// Uses a Weather API to run the app program
const API = {
  key: "104a0d206cde4dcc9c8b0b21b60cb51e",
  base: "https://api.openweathermap.org/data/2.5/"
}

// const images = import.meta.glob('./assets/images/*');

// const getImagePath = async (imageName) => {
//   const imageKey = `./assets/images/${imageName}`
//   if (images[imageKey]) {
//     const image = await images[imageKey]();
//     return image.default; // Resolved path for the image

//   } else {
//     console.log(`Image not found: ${imageName}`);
//     return null;
//   }

// }

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ?
        ((weather.main.temp >= 30) ? 'app warm' :
          (weather.main.temp >= 15) ? 'app medium' :
            (weather.main.temp >= 0) ? 'app cold' : 'app veryCold') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for a city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <img className='weather-icon' src={'/images/' + weather.weather[0].icon + '.png'} alt="weather-icon" />
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;