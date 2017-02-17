# CordovaTips
javascript, html5, css3

## Obsah
- [Dle funkcionalit](#a)
  - [Internet](#a1)
  - [Asynchronní fce](#a2)
  - [JavaScript OOP - objekt Promise](#a3)
- [Dle tříd](#b)
  - [internetClass](#b1)
  - [Datase](#b2)

## Dle funkcionalit<a name="a"></a>

### Internet<a name="a1"></a>
- kontrola připojení k internetu (pinguje url) + wrapper okolo $.post: [internet.js](/internet.js)

### Asynchronní fce<a name="a2"></a>
- ukázka jednoduchého "zesekvenčnění" asynchronních funkcí (fce ping() + použití ve funkcích online() a if()): [internet.js](/internet.js)
  - Podrobněji na [Google Developers](https://developers.google.com/web/fundamentals/getting-started/primers/promises#creating_a_sequence)
- ukázka asyncrnně zpracovávaných fcí, ale s callbackem až po dokončení všech těchto fcí: [updateTables() v db.js](/db.js)

### JavaScript OOP - objekt Promise<a name="a3"></a>
- [Google Developers](https://developers.google.com/web/fundamentals/getting-started/primers/promises)
- [Mozilla Developers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [exploringjs](http://exploringjs.com/es6/ch_promises.html)

## Dle tříd<a name="b"></a>

### internetClass<a name="b1"></a>
[soubor internet.js](/internet.js)
- kontroluje připojení k internetu (pinguje url)
- ukázka "zesekvenčnění" asynchronních funkcí (fce ping + použití ve funkcích online() a if())

## Datase<a name="b2"></a>
[soubor db.js](/db.js)
- všechny fce lehce modifikované/zobecněné
- fce updateTables aktualizuje tabulky asynchronně, ale callback volé po dokončení aktualizací
