// ========== imports ==========
import { locationCity, locationCountry, weatherInfoText, weatherInfoFigure, dayNightImg, weatherIconImg, localDate, localTime } from './app.js';

// ========== display ==========
// display location data
export class LocationDisplayer {
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
export class WeatherDisplayer {
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
export class DayNightImageDisplayer {
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
export class WeatherIconDisplayer {
    constructor(data) {
        this.weatherIconNumber = data.WeatherIcon;
    }

    display = function () {
        weatherIconImg.setAttribute('src', `./img/icons/${this.weatherIconNumber}.svg`);
    }
}

// display date and time
export class DateTimeDisplayer {
    constructor(data) {
        this.date = data.formatted.slice(0, 10);
        this.time = data.formatted.slice(11);
    }

    display = function () {
        localDate.textContent = this.date;
        localTime.textContent = this.time;
    }
}