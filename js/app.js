// ========== imports ==========
import './default.js';
import { LocationFetcher, WeatherFetcher, TimeFetcher, GeoFetcher } from './fetch.js';
import { LocationDisplayer, WeatherDisplayer, DayNightImageDisplayer, WeatherIconDisplayer, DateTimeDisplayer } from './display.js';

// ========== script ==========
// DOM references
const searchForm = document.querySelector('.search-form');
export const locationCity = document.querySelector('.location-city > span');
export const locationCountry = document.querySelector('.location-country');
export const weatherInfoText = document.querySelector('.weather-info-text');
export const weatherInfoFigure = document.querySelector('.weather-info-figure > span');
export const dayNightImg = document.querySelector('.day-night-img');
export const weatherIconImg = document.querySelector('.weather-icon-img');
const darkModeForm = document.querySelector('.dark-mode-form');
export const localDate = document.querySelector('.local-date');
export const localTime = document.querySelector('.local-time');
const userLocationBtn = document.querySelector('.user-location-btn');

// main
const main = function () {
    // search weather
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // get location search input
        const location = searchForm.search.value.trim().toLowerCase();

        // fetch location
        const locationFetcher = new LocationFetcher(location);
        locationFetcher.fetch().then(data => {

            // display location
            const locationDisplayer = new LocationDisplayer(data);
            locationDisplayer.display();

            // fetch weather
            const locationKey = data.Key;
            const weatherFetcher = new WeatherFetcher(locationKey);
            weatherFetcher.fetch().then(data => {

                // display weather
                const weatherDisplayer = new WeatherDisplayer(data);
                weatherDisplayer.display();

                // display day or night image
                const dayNightImageDisplayer = new DayNightImageDisplayer(data);
                dayNightImageDisplayer.display();
                dayNightImageDisplayer.changeDateTimeTextColour();

                // display weather icon
                const weatherIconDiplayer = new WeatherIconDisplayer(data);
                weatherIconDiplayer.display();
            });

            // fetch time
            const timeFetcher = new TimeFetcher(data);
            timeFetcher.fetch().then(data => {

                // display time
                const dateTimeDisplayer = new DateTimeDisplayer(data);
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
                const geoFetcher = new GeoFetcher(data);
                geoFetcher.fetch().then((data) => {
                    const location = data.results[0].components.city.trim().toLowerCase();

                    // fetch location
                    const locationFetcher = new LocationFetcher(location);
                    locationFetcher.fetch().then((data) => {

                        // display location
                        const locationDisplayer = new LocationDisplayer(data);
                        locationDisplayer.display();

                        // fetch weather
                        const locationKey = data.Key;
                        const weatherFetcher = new WeatherFetcher(locationKey);
                        weatherFetcher.fetch().then((data) => {

                            // display weather
                            const weatherDisplayer = new WeatherDisplayer(data);
                            weatherDisplayer.display();

                            // display day or night image
                            const dayNightImageDisplayer = new DayNightImageDisplayer(data);
                            dayNightImageDisplayer.display();
                            dayNightImageDisplayer.changeDateTimeTextColour();

                            // display weather icon
                            const weatherIconDiplayer = new WeatherIconDisplayer(data);
                            weatherIconDiplayer.display();
                        });

                        // fetch & display time
                        const timeFetcher = new TimeFetcher(data);

                        // fetch time
                        timeFetcher.fetch().then(data => {

                            // display time
                            const dateTimeDisplayer = new DateTimeDisplayer(data);
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