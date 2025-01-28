'use strict'

<<<<<<< HEAD
// import { apiKey } from "./api_key.js";


// Make your api key from TMDB api and paste it here in the place of (const api_key = "here");
// const api_key = apiKey;
// const imageBaseURL = 'https://image.tmdb.org/t/p/' ;
=======
import { apiKey } from "./api_key.js";


// Make your api key from TMDB api and paste it here in the place of (const api_key = "here");
const api_key = apiKey;
const imageBaseURL = 'https://image.tmdb.org/t/p/' ;
>>>>>>> 522d0c453f9939d35d7b06a3b417fb70cf7c0591


// fetch data from a server using the and passes
// the result in JSON data to a 'callback' function,
// along with an optional parameter tf has 'optionalParam'

const fetchDataFromServer = function(url, callback, optionalParam) {
      fetch(url)
            .then(response => response.json())
            .then(data => callback(data, optionalParam))
            .catch(err => console.error(err));
}

<<<<<<< HEAD
// export { imageBaseURL, api_key, fetchDataFromServer };
=======
export { imageBaseURL, api_key, fetchDataFromServer };
>>>>>>> 522d0c453f9939d35d7b06a3b417fb70cf7c0591
