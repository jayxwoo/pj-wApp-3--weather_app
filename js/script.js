// ========== imports ==========
import './default.js';

// ========== script ==========
// reference
const accuWeatherKey = '9nmmB1MUGkNFqHusjj7qybPu90aAnj8T';
const timeZoneDbKey = 'V8A1I6L2JXZJ';
const locationBase = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const weatherBase = 'http://dataservice.accuweather.com/currentconditions/v1/';
const timeBase = 'http://api.timezonedb.com/v2.1/get-time-zone';
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

// get location
class LocationFetcher {
    constructor(location) {
        this.location = location;
        this.locationQuery = `?apikey=${accuWeatherKey}&q=${this.location}`;
        this.locationEndpoint = locationBase + this.locationQuery;
    }

    getData = async function () {
        // fetch
        const response = await fetch(this.locationEndpoint);

        // convert json data into js objects
        const data = await response.json();

        return data[0];
    }
}

// get weather
class WeatherFetcher {
    constructor(locationKey) {
        this.locationKey = locationKey;
        this.weatherQuery = `${this.locationKey}?apikey=${accuWeatherKey}`;
        this.weatherEndpoint = weatherBase + this.weatherQuery;
    }

    getData = async function () {
        // fetch
        const response = await fetch(this.weatherEndpoint);

        // convert json data into js objects
        const data = await response.json();

        return data[0];
    }
}

// get time
class TimeFetcher {
    constructor(data) {
        this.latitude = data.GeoPosition.Latitude;
        this.longitude = data.GeoPosition.Longitude;
        this.timeQuery = `?key=${timeZoneDbKey}&format=json&by=position&lat=${this.latitude}&lng=${this.longitude}`;
        this.timeEndpoint = timeBase + this.timeQuery;
    }

    getData = async function () {
        // fetch
        const response = await fetch(this.timeEndpoint);

        // convert json data into js objects
        const data = await response.json();

        return data;
    }
}

// display location data
class LocationDataDisplayer {
    constructor(data) {
        this.cityName = data.EnglishName;
        this.countryName = data.Country.EnglishName;
    }

    display = function () {
        locationCity.textContent = `${this.cityName}`;
        locationCountry.textContent = `${this.countryName}`;
    }
}

// display weather data
class WeatherDataDisplayer {
    constructor(data) {
        this.weatherInfo = data.WeatherText;
        this.weatherTemp = data.Temperature.Metric.Value;
    }

    display = function () {
        weatherInfoText.textContent = this.weatherInfo;
        weatherInfoFigure.textContent = this.weatherTemp;
    }
}

// display day and night image
class DayNightImageDisplayer {
    constructor(data) {
        this.isDayTime = data.IsDayTime;
    }

    display = function () {
        if (this.isDayTime) {
            dayNightImg.setAttribute('src', './img/day.svg');
        } else if (!this.isDayTime) {
            dayNightImg.setAttribute('src', './img/night.svg');
        };
    }
    changeDateTimeTextColour = function () {
        if (dayNightImg.getAttribute('src').includes('night')) {
            localDate.style.color = 'var(--white)';
            localTime.style.color = 'var(--white)';
        } else if (dayNightImg.getAttribute('src').includes('day')) {
            localDate.style.color = 'var(--black)';
            localTime.style.color = 'var(--black)';
        };
    }
}

// display weather icon
class WeatherIconDisplayer {
    constructor(data) {
        this.weatherIconNumber = data.WeatherIcon;
    }

    display = function () {
        weatherIconImg.setAttribute('src', `./img/icons/${this.weatherIconNumber}.svg`);
    }
}

// display date and time
class DateTimeDisplayer {
    constructor(data) {
        this.date  = data.formatted.slice(0, 10);
        this.time = data.formatted.slice(11);
    }

    display = function () {
        localDate.textContent = this.date;
        localTime.textContent = this.time;
    }
}

// main
const main = function () {
    // search weather
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // get location search input
        const location = searchForm.search.value.trim().toLowerCase();

        // fetching location data
        const locationFetcher = new LocationFetcher(location);
        locationFetcher.getData().then(data => {

            // display location data
            const locationDataDisplayer = new LocationDataDisplayer(data);
            locationDataDisplayer.display();

            // fetching weather data
            const locationKey = data.Key;
            const weatherFetcher = new WeatherFetcher(locationKey);
            weatherFetcher.getData().then(data => {

                // display weather data
                const weatherDataDisplayer = new WeatherDataDisplayer(data);
                weatherDataDisplayer.display();

                // display day or night image
                const dayNightImageDisplayer = new DayNightImageDisplayer(data);
                dayNightImageDisplayer.display();
                dayNightImageDisplayer.changeDateTimeTextColour();

                // display weather icon
                const weatherIconDiplayer = new WeatherIconDisplayer(data);
                weatherIconDiplayer.display();
            });

            // fetching time zone data
            const timeFetcher = new TimeFetcher(data);
            timeFetcher.getData().then(data => {
                const dateTimeDisplayer = new DateTimeDisplayer(data);
                dateTimeDisplayer.display();
            });
        }).catch(err => {
            console.log(err);
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
};

main();