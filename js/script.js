// ========== imports ==========
import './default.js';

// ========== script ==========
// reference
const key = '9nmmB1MUGkNFqHusjj7qybPu90aAnj8T';
const searchForm = document.querySelector('.search-form');

// get city

// get weatther

// main
const main = function () {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submitted');
    });
};

main();