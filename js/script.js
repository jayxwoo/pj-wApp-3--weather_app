// ========== imports ==========
import './default.js';

// ========== script ==========
// reference
const appKey = '9nmmB1MUGkNFqHusjj7qybPu90aAnj8T';
const locationBase = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const weatherBase = 'http://dataservice.accuweather.com/currentconditions/v1/';
const searchForm = document.querySelector('.search-form');

// get location
class LocationFetcher {
    constructor(location) {
        this.location = location;
        this.locationQuery = `?apikey=${appKey}&q=${this.location}`;
        this.locationEndpoint = locationBase + this.locationQuery;
    }

    getData = async function () {
        // fetch
        const response = await fetch(this.locationEndpoint);

        // convert json data into objects
        const data = await response.json();

        return data[0];
    }
}

// get weatther
class WeatherFetcher {
    constructor(locationKey) {
        this.locationKey = locationKey;
        this.weatherQuery = `${this.locationKey}?apikey=${appKey}`;
        this.weatherEndpoint = weatherBase + this.weatherQuery;
    }

    getData = async function () {
        // fetch
        const response = await fetch(this.weatherEndpoint);

        // convert json data into objects
        const data = await response.json();

        return data[0];
    }
}

// main
const main = function () {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // get location search input
        const location = searchForm.search.value.trim().toLowerCase();

        // fetching location data
        const locationFetcher = new LocationFetcher(location);
        locationFetcher.getData().then(data => {
            console.log(data);
            console.log(data.EnglishName);
            console.log(data.Country.EnglishName);
            const locationKey = data.Key;

            // fetching weather data
            const weatherFetcher = new WeatherFetcher(locationKey);
            weatherFetcher.getData().then(data => {
                console.log(data);
                console.log(data.WeatherText);
                console.log(data.Temperature.Metric.Value);
            });
        }).catch(err => {
            console.log(err);
        });


        searchForm.reset();
    });
};

main();