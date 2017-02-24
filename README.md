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
<ul>
<li><a href="/Promises.js" target="_blank">Par ukazek z Promises.js</a></li>
<li><a href="https://developers.google.com/web/fundamentals/getting-started/primers/promises" target="_blank">Google Developers</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank">Mozilla Developers</a></li>
<li><a href="http://exploringjs.com/es6/ch_promises.html" target="_blank">exploringjs</a></li>

<li>Issues with jQuery Promises:
<ul>
<li><strong>10 June 2016 update!</strong> <a href="https://blog.jquery.com/2016/06/09/jquery-3-0-final-released/" target="_blank">With the 3.0 release, jQuery promises now satisfy Promises/A+ compliance!</a></li>
<li><a href="https://blog.domenic.me/youre-missing-the-point-of-promises/">You're Missing the Point of Promises - Domenic Denicola (Pre-jQuery 3.0)</a></li>
<li><a href="https://thewayofcode.wordpress.com/tag/jquery-deferred-broken/">jQuery Deferred Broken - Valerio Gheri (Pre-jQuery 3.0)</a></li>
</ul></li>
<li>Q Style Promises
<ul>
<li>They're an implementation of the <a href="https://promisesaplus.com/">Promises/A+ spec</a>.</li>
<li><a href="https://goo.gl/J1K2iv">$q service Documentation</a>.</li>
</ul></li>
<li>Browser Implementation
<ul>
<li><a href="http://caniuse.com/#search=promises">Can I Use... - Promises</a></li>
<li><a href="https://github.com/jakearchibald/es6-promise">ES2015 Promises Polyfill</a></li>
<li><a href="https://github.com/kriskowal/q">Q Library</a></li>
<li><a href="https://github.com/petkaantonov/bluebird">Bluebird Promises</a></li>
</ul></li>
<li>APIs that Use Promises
<ul>
<li><a href="http://www.html5rocks.com/en/tutorials/service-worker/introduction/">Service Worker API</a></li>
<li><a href="https://davidwalsh.name/fetch">Fetch API</a> (pomáhá s přijímáním dat z webu)</li>
</ul></li>
</ul>

## Dle tříd<a name="b"></a>

### internetClass<a name="b1"></a>
[soubor internet.js](/internet.js)
- kontroluje připojení k internetu (pinguje url)
- ukázka "zesekvenčnění" asynchronních funkcí (fce ping + použití ve funkcích online() a if())

## Datase<a name="b2"></a>
[soubor db.js](/db.js)
- všechny fce lehce modifikované/zobecněné
- fce updateTables aktualizuje tabulky asynchronně, ale callback volé po dokončení aktualizací
