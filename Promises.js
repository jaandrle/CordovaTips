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
