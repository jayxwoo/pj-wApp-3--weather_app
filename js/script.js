// ========== imports ==========
import './default.js';

// ========== script ==========
// reference
const appKey = '9nmmB1MUGkNFqHusjj7qybPu90aAnj8T';
const locationBase = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const searchForm = document.querySelector('.search-form');

// get location
class LocationFetcher {
    constructor(appKey, locationEndpoint, location) {
        this.appKey = appKey;
        this.locationEndpoint = locationEndpoint;
        this.location = location;
    }

    async getData() {
        // fetch
        const response = await fetch(this.locationEndpoint);

        // convert json into objects
        const data = await response.json();

        return data[0];
    }
}

// get weatther

// main
const main = function () {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = searchForm.search.value.trim().toLowerCase();
        const locationQuery = `?apikey=${appKey}&q=${location}`;
        const locationEndpoint = locationBase + locationQuery;

        // get location data
        const locationFetcher = new LocationFetcher(appKey, locationEndpoint, location);
        locationFetcher.getData().then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })

        searchForm.reset();
    });
};

main();