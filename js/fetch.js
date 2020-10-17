// ========== fetch ==========
// fetch location
export class LocationFetcher {
    constructor(location, accuWeatherKey, locationBase) {
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
    constructor(locationKey, accuWeatherKey, weatherBase) {
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
    constructor(data, timeZoneDbKey, timeBase) {
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
    constructor(data, openCageDataKey, geoBase) {
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