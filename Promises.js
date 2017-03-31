/*
 * Par ukazek pro objekt Promises
 * */

// Klasicky sleep, tj. kod "v then" se provede po prodleve
function sleep(prodleva) {
        return new Promise(function(resolve) {
                console.log(this); //this is corresponding to window
                window.setTimeout(function() {
                        resolve();
                }, prodleva);
        });
};
console.log("prvni vypis");
var milliseconds = 2000;
sleep(milliseconds).then(console.log("druhy vypis"));
console.log("treti vypis");

// Kod "v then" se provede po kompletnim nacteni stranky
function DOMready() {
    // Credit to Jake Archibald
    // https://github.com/jakearchibald/svgomg/blob/master/src/js/page/utils.js#L7
  return new Promise(function(resolve) {
    function checkState() {
        if (document.readyState !== 'loading') resolve();
    }
    document.addEventListener('readystatechange', checkState);
    checkState();
  });
};

console.log("prvni vypis");
DOMready().then(console.log("druhy vypis"));
console.log("treti vypis");

// Fce .map a .all
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

// .map: paralerni volani jedne casti kodu bez zachovani poradi
window.addEventListener('WebComponentsReady', function(){
    home= document.querySelector('KAM');
    getJSON("FROM_URL")
    .then(function(response){
        response.results.map(function(url){
            getJSON(url).then(createPlanetThumb);
        });
    })
});

// .all: paralerni volani jedne casti kodu se zachovanim poradi
window.addEventListener('WebComponentsReady', function(){
    home= document.querySelector('KAM');
    getJSON("FROM_URL")
    .then(function(response){
        return Promise.all(response.results.map(getJSON));
    })
    .then(function(arrayOfPlanetData){
        arrayOfPlanetData.forEach(function(planet){
            createPlanetThumb(planet);
        });
    })
    .catch(function(error){
        console.log(error);
    });
});


// optimize
/**
 * Helper function to create a planet thumbnail - Promisified version!
 * @param  {Object} data - The raw data describing the planet.
 */
function createPlanetThumb(data) {
  return new Promise(function(resolve) {
    var pT = document.createElement('planet-thumb');
    for (var d in data) {
      pT[d] = data[d];
    }
    home.appendChild(pT);
    console.log('rendered: ' + data.pl_name);
    resolve();
  });
}

/**
 * Performs an XHR for a JSON and returns a parsed JSON response - with a delay!
 * @param  {String} url - The JSON URL to fetch.
 * @return {Promise}    - A promise that passes the parsed JSON response.
 */
function getJSON(url) {
  console.log('sent: ' + url);
  return get(url).then(function(response) {
    // For testing purposes, I'm making sure that the urls don't return in order
    if (url === 'data/planets/Kepler-62f.json') {
      return new Promise(function(resolve) {
        setTimeout(function() {
          console.log('received: ' + url);
          resolve(response.json());
        }, 500);
      });
    } else {
      console.log('received: ' + url);
      return response.json();
    }
  });
}

window.addEventListener('WebComponentsReady', function() {
  home = document.querySelector('section[data-route="home"]');

  getJSON('../data/earth-like-results.json')
  .then(function(response) {
    addSearchHeader(response.query);
    return response;
  })
  .then(function(response) {
    var sequence = Promise.resolve();

    // .map executes all of the network requests immediately.
    var arrayOfExecutingPromises = response.results.map(function(result) {
      return getJSON(result);
    });

    arrayOfExecutingPromises.forEach(function(request) {
      // Loop through the pending requests that were returned by .map (and are in order) and
      // turn them into a sequence.
      // request is a getJSON() that's currently executing.
      sequence = sequence.then(function() {
        // Remember that createPlanetThumb is a Promise, so it must resolve before Promises
        // later in the sequence can execute.
        return request.then(createPlanetThumb);
      });
    });
  });
});
