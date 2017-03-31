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
