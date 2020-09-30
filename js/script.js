// ========== imports ==========
import './default.js';

// ========== script ==========
// reference
const appKey = '9nmmB1MUGkNFqHusjj7qybPu90aAnj8T';
const searchForm = document.querySelector('.search-form');

// get location

// get weatther

// main
const main = function () {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(searchForm.search.value.trim().toLowerCase());
        searchForm.reset();
    });
};

main();