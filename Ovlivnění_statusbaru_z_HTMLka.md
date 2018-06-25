## Ovlivnění statusbaru z HTMLka
```html
  // Android
  <meta name="theme-color" content="ping">
  <script>
    document.getElementsByName("theme-color")[0].setAttribute("content", "red");
  </script>

  // iOS - nefunguje min. v iOS 11
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
