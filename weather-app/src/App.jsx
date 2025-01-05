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

import { useState } from 'react';
// Creates a constant variable named API that contains the base URL for the Weather API  
// The API base and key can be called by API.base AND API.key
const API = {
  key: "104a0d206cde4dcc9c8b0b21b60cb51e",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  // Uses react states hook to manage the state of two (variables : query and weather)
  //  Creates variable named query initialized as empty string but is updated by setQuery
  const [query, setQuery] = useState('');
  // Creates variable named weather initialized as empty object, it stores the weather data fetched by the API,  
  const [weather, setWeather] = useState({});
  // Defines a constant variable named search which is assigned to function evt("Stands for event")
  const search = evt => {
    // An if condition on the event that the KEY pressed by the user in the search bar is the "Enter" key.
    if (evt.key === "Enter") {
      /* Sends a request to the weather API using the fetch function to retrieve data based on
        the API whose base and key matches the Weather API 
        query - Appends the search query to the URL(the city entered by the user) 
        &units=metric - ensures the temperature is returned in metric units
        APPID=${API.key} - appends the API key to authenticate the request */
      // fetches the weather JSON data for the weather
      fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
      // parses the response data as JSON
        .then(res => res.json())
        //  block takes the parsed weather data (now stored in the variable result) and executes the code inside the curly braces.
        .then(result => {
          // updates the weather state to the result(the fetched JSON data from the API for the given city)
          setWeather(result);
          // Clears the search query input(setting the query state back to an empty string) again after pressing enter
          setQuery('');
          // prints the fetched weather data to the screen(allows to see response from weather API)
          console.log(result);
        });
    }
  }
  // Gets the current date using the Weather API
  // Takes a date object d as input and returns a formatted string representation presenting the full date
  const dateBuilder = (d) => {
    // Creates arrays to hold the names of all months and days
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()]; // Returns the day of the week as a number, which is used to fetch the corresponding day from the days array
    let date = d.getDate(); // Returns the day of the month
    let month = months[d.getMonth()]; // Returns the month as a number, which is used to fetch the corresponding month from the month array
    let year = d.getFullYear(); // Returns the year as the four-digit year e.g. 2025

    return `${day} ${date} ${month} ${year}` // Returns the formatted date as a string
  }

  return (
    <div className={
      // Assigns a CSS class based on the current temperature =(weather.main.temp)
      // This allows the app to apply different background styles based on the temperature

      // this block is rendered iff the weather.main is defined(if weather data exist)
      (typeof weather.main != "undefined") ?
        ((weather.main.temp >= 30) ? 'app warm' :
          (weather.main.temp >= 15) ? 'app medium' :
            (weather.main.temp >= 0) ? 'app cold' : 'app veryCold') : 'app'}>
      <main>
        <div className="search-box"> 
          <input
            type="text" // the Type of input accepted by the search box
            className="search-bar"
            placeholder="Search for a city..."  // Placeholder Displayed in the search box 
            // Updates the query state with the current value from the search bar
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search} // listens for key events such as the user pressing enter and triggers the search function to collect weather data
          />
        </div>
        {(typeof weather.main != "undefined") ? (  //this block is rendered iff the weather.main is defined(if weather data exist)
          // DISPLAYS THE WEATHER DATA: Location(City and country), Date from the datebuilder function, 
          // temperature(rounded to nearest integer), weather condition, weather icon(image corresponding to weather condition)
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
//The user types a city name in the search bar.
//When they press "Enter," the search function fetches weather data.
//The app updates the weather state (setWeather) and displays the results.
// The background dynamically changes based on the temperature.
export default App; // Allows this component to be imported and used in other parts of the application.
