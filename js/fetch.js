// ========== variables ==========
// API keys
const timeZoneDbKey = 'V8A1I6L2JXZJ';
const openCageDataKey = 'a071d763dfef420088c8e582f4eb48e9';

// API endpoint bases
const locationBase = 'https://dataservice.accuweather.com/locations/v1/cities/search';
const weatherBase = 'https://dataservice.accuweather.com/currentconditions/v1/';
const timeBase = 'https://api.timezonedb.com/v2.1/get-time-zone';
const geoBase = 'https://api.opencagedata.com/geocode/v1/';

// ========== fetch ==========
// fetch location
export class LocationFetcher {
    constructor(location, accuWeatherKey) {
        this.locationQuery = `?apikey=${accuWeatherKey}&q=${location}`;
        this.locationEndpoint = locationBase + this.locationQuery;
    }

    fetch = async function () {
        // fetch
        const response = await fetch(this.locationEndpoint);

        // json -> js objects
        const data = await response.json();

        return data[0];
    }
}

// fetch weather
export class WeatherFetcher {
    constructor(locationKey, accuWeatherKey) {
        this.weatherQuery = `${locationKey}?apikey=${accuWeatherKey}`;
        this.weatherEndpoint = weatherBase + this.weatherQuery;
    }

    fetch = async function () {
        // fetch
        const response = await fetch(this.weatherEndpoint);

        // json -> js objects
        const data = await response.json();

        return data[0];
    }
}

// get time
export class TimeFetcher {
    constructor(data) {
        this.latitude = data.GeoPosition.Latitude;
        this.longitude = data.GeoPosition.Longitude;
        this.timeQuery = `?key=${timeZoneDbKey}&format=json&by=position&lat=${this.latitude}&lng=${this.longitude}`;
        this.timeEndpoint = timeBase + this.timeQuery;
    }

    fetch = async function () {
        // fetch
        const response = await fetch(this.timeEndpoint);

        // json -> js objects
        const data = await response.json();

        return data;
    }
}

// fetch city
export class GeoFetcher {
    constructor(data) {
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
        this.geoQuery = `json?q=${this.latitude}+${this.longitude}&key=${openCageDataKey}`;
        this.geoEndpoint = geoBase + this.geoQuery;
    }

    fetch = async function () {
        // fetch
        const response = await fetch(this.geoEndpoint);

        // json -> js objects
        const data = await response.json();

        return data;
    };
}