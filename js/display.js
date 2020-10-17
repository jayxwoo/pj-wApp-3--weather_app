// ========== display ==========
// display location data
export class LocationDisplayer {
    constructor(data, locationCity, locationCountry) {
        this.cityName = data.EnglishName;
        this.countryName = data.Country.EnglishName;
        this.locationCity = locationCity;
        this.locationCountry = locationCountry;
    }

    display = function () {
        this.locationCity.textContent = `${this.cityName}`;
        this.locationCountry.textContent = `${this.countryName}`;
    }
}

// display weather data
export class WeatherDisplayer {
    constructor(data, weatherInfoText, weatherInfoFigure) {
        this.weatherInfo = data.WeatherText;
        this.weatherTemp = data.Temperature.Metric.Value;
        this.weatherInfoText = weatherInfoText;
        this.weatherInfoFigure = weatherInfoFigure;
    }

    display = function () {
        this.weatherInfoText.textContent = this.weatherInfo;
        this.weatherInfoFigure.textContent = this.weatherTemp;
    }
}

// display day and night image
export class DayNightImageDisplayer {
    constructor(data, dayNightImg, localDate, localTime) {
        this.isDayTime = data.IsDayTime;
        this.dayNightImg = dayNightImg;
        this.localDate = localDate;
        this.localTime = localTime;
    }

    display = function () {
        if (this.isDayTime) {
            this.dayNightImg.setAttribute('src', './img/day.svg');
        } else if (!this.isDayTime) {
            this.dayNightImg.setAttribute('src', './img/night.svg');
        };
    }
    changeDateTimeTextColour = function () {
        if (this.dayNightImg.getAttribute('src').includes('night')) {
            this.localDate.style.color = 'var(--white)';
            this.localTime.style.color = 'var(--white)';
        } else if (this.dayNightImg.getAttribute('src').includes('day')) {
            this.localDate.style.color = 'var(--black)';
            this.localTime.style.color = 'var(--black)';
        };
    }
}

// display weather icon
export class WeatherIconDisplayer {
    constructor(data, weatherIconImg) {
        this.weatherIconNumber = data.WeatherIcon;
        this.weatherIconImg = weatherIconImg;
    }

    display = function () {
        this.weatherIconImg.setAttribute('src', `./img/icons/${this.weatherIconNumber}.svg`);
    }
}

// display date and time
export class DateTimeDisplayer {
    constructor(data, localDate, localTime) {
        this.date = data.formatted.slice(0, 10);
        this.time = data.formatted.slice(11);
        this.localDate = localDate;
        this.localTime = localTime;
    }

    display = function () {
        this.localDate.textContent = this.date;
        this.localTime.textContent = this.time;
    }
}