// ========== imports ==========
import './default.js';
import { LocationFetcher, WeatherFetcher, TimeFetcher, GeoFetcher } from './fetch.js';
import { LocationDisplayer, WeatherDisplayer, DayNightImageDisplayer, WeatherIconDisplayer, DateTimeDisplayer } from './display.js';

// ========== DOM references ==========
const searchForm = document.querySelector('.search-form');
const locationCity = document.querySelector('.location-city > span');
const locationCountry = document.querySelector('.location-country');
const weatherInfoText = document.querySelector('.weather-info-text');
const weatherInfoFigure = document.querySelector('.weather-info-figure > span');
const dayNightImg = document.querySelector('.day-night-img');
const weatherIconImg = document.querySelector('.weather-icon-img');
const darkModeForm = document.querySelector('.dark-mode-form');
const localDate = document.querySelector('.local-date');
const localTime = document.querySelector('.local-time');
const userLocationBtn = document.querySelector('.user-location-btn');

// ========== global variables ==========
const accuWeatherKey = '9nmmB1MUGkNFqHusjj7qybPu90aAnj8T';
const timeZoneDbKey = 'V8A1I6L2JXZJ';
const openCageDataKey = 'a071d763dfef420088c8e582f4eb48e9';
const locationBase = 'https://dataservice.accuweather.com/locations/v1/cities/search';
const weatherBase = 'https://dataservice.accuweather.com/currentconditions/v1/';
const timeBase = 'https://api.timezonedb.com/v2.1/get-time-zone';
const geoBase = 'https://api.opencagedata.com/geocode/v1/';

// ========== script ==========
// main
const main = function () {
    // search weather
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // get location search input
        const location = searchForm.search.value.trim().toLowerCase();

        // fetch location
        const locationFetcher = new LocationFetcher(location, accuWeatherKey, locationBase);
        locationFetcher.fetch().then(data => {

            // display location
            const locationDisplayer = new LocationDisplayer(data, locationCity, locationCountry);
            locationDisplayer.display();

            // fetch weather
            const locationKey = data.Key;
            const weatherFetcher = new WeatherFetcher(locationKey, accuWeatherKey, weatherBase);
            weatherFetcher.fetch().then(data => {

                // display weather
                const weatherDisplayer = new WeatherDisplayer(data, weatherInfoText, weatherInfoFigure);
                weatherDisplayer.display();

                // display day or night image
                const dayNightImageDisplayer = new DayNightImageDisplayer(data, dayNightImg, localDate, localTime);
                dayNightImageDisplayer.display();
                dayNightImageDisplayer.changeDateTimeTextColour();

                // display weather icon
                const weatherIconDiplayer = new WeatherIconDisplayer(data, weatherIconImg);
                weatherIconDiplayer.display();
            });

            // fetch time
            const timeFetcher = new TimeFetcher(data, timeZoneDbKey, timeBase);
            timeFetcher.fetch().then(data => {

                // display time
                const dateTimeDisplayer = new DateTimeDisplayer(data, localDate, localTime);
                dateTimeDisplayer.display();
            });

        }).catch(err => {
            window.alert('Please, type in a valid city name.');
        });

        searchForm.reset();
    });

    // dark mode toggle
    darkModeForm.addEventListener('change', () => {
        if (darkModeForm.dark.checked) {
            document.documentElement.style.setProperty('--main', 'rgba(0, 0, 0, 0.7)');
            document.documentElement.style.setProperty('--contrast', 'rgba(250, 250, 250, 0.7)');
            locationCountry.style.color = 'var(--lightgrey)';
        } else {
            document.documentElement.style.setProperty('--main', 'rgba(250, 250, 250, 0.7)');
            document.documentElement.style.setProperty('--contrast', 'rgba(0, 0, 0, 0.7)');
            locationCountry.style.color = 'var(--grey)';
        };
    });

    // user location button
    userLocationBtn.addEventListener('click', (e) => {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition((data) => {
                const geoFetcher = new GeoFetcher(data, openCageDataKey, geoBase);
                geoFetcher.fetch().then((data) => {
                    const location = data.results[0].components.city.trim().toLowerCase();

                    // fetch location
                    const locationFetcher = new LocationFetcher(location, accuWeatherKey, locationBase);
                    locationFetcher.fetch().then((data) => {

                        // display location
                        const locationDisplayer = new LocationDisplayer(data, locationCity, locationCountry);
                        locationDisplayer.display();

                        // fetch weather
                        const locationKey = data.Key;
                        const weatherFetcher = new WeatherFetcher(locationKey, accuWeatherKey, weatherBase);
                        weatherFetcher.fetch().then((data) => {

                            // display weather
                            const weatherDisplayer = new WeatherDisplayer(data, weatherInfoText, weatherInfoFigure);
                            weatherDisplayer.display();

                            // display day or night image
                            const dayNightImageDisplayer = new DayNightImageDisplayer(data, dayNightImg, localDate, localTime);
                            dayNightImageDisplayer.display();
                            dayNightImageDisplayer.changeDateTimeTextColour();

                            // display weather icon
                            const weatherIconDiplayer = new WeatherIconDisplayer(data, weatherIconImg);
                            weatherIconDiplayer.display();
                        });

                        // fetch & display time
                        const timeFetcher = new TimeFetcher(data, timeZoneDbKey, timeBase);

                        // fetch time
                        timeFetcher.fetch().then(data => {

                            // display time
                            const dateTimeDisplayer = new DateTimeDisplayer(data, localDate, localTime);
                            dateTimeDisplayer.display();
                        });

                    });
                }).catch((err) => {
                    window.alert('Unable to find your location. Please, use the input field.');
                });
            });
        } else {
            window.alert('Unable to find your location. Please, use the input field.');
        };
    });
};

main();