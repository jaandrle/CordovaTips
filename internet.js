var internetClass = function() {
    var type= '';
    var TimeoutForCheck= 5000;
    var MinAniTime= 700; //2500;
    var textWaiting= texty.connecting;
    var textNoInternet= texty.nointernet;
    var textNoData1= texty.nodata1;
    var textNoData2= texty.nodata2;
    var textAgain= texty.internetagain;
    var _that= this;
    // var urlApi = 'http://www.cllevents.com';

    this.init= function(){
        document.addEventListener("offline", offline, false);
        document.addEventListener("online", online, false);
    };
    /* *
     * Wrapper okolo $.post()
     *   - Jako URL bere urlApi
     *   - action == parametry pro $.post()
     *   - ifonlinefce == fce se vykona pokud je zarizeni online + funkcni pripojeni
     *   - ifofflinefce* == fce, ktera se vykona pokud je zarizeni offline ci je nefunkcni pripojeni
     *   - animation* == logicka hodnota: if true => prida waiting animation (viz div.modal v html)
     *   Ad * == neni vyzadovano
     * */
    this.post= function(action, ifonlinefce, ifofflinefce, animation){
        animation= animation || false;
        ifofflinefce= ifofflinefce || function (){
                console.log(textNoInternet)};
        if(animation) _that.animationon();
        this.if(function(){
            $.post(urlApi, action, function(data){
                ifonlinefce(data);
            }).done(
                _that.animationoff(animation, true)
            )}, function(){ifofflinefce(); _that.animationoff(animation, false);}
        );
    };
    /* *
     * Switch podle (ne)funkcniho pripojeni
     *   ... vykona prislusnou fci (nejsou vyzadovany)
     * */
    this.if= function(ifonlinefce, ifofflinefce){
        ifonlinefce= ifonlinefce || function (){};
        ifofflinefce= ifofflinefce || function (){};
        type= checkConnection();
        if (type != "none") {
            online().then(function(){
                if (type != "none") ifonlinefce(); else ifofflinefce();
            });
        } else {
            ifofflinefce();
        }
    };
    /* *
     * Ping
     *   klasicky ping - dokonceni se zachycuje metodou .then(function(){...})
     * */
    this.ping= function(url) {
        return new Promise(function(resolve, reject){
            const request= new XMLHttpRequest();
            request.onload= function(){
                if (this.status === 200) resolve(true);
                else resolve(false);
            };
            request.onerror= function(){
                resolve(false);
                //reject(new Error('XMLHttpRequest Error: '+this.statusText));
            };
            request.open('GET', url);
            request.send();
        });
    };

    /* *
     * DataError
     *   - text* == pokud vyplneno => error data nenactena,
     *              jinak ozn. jako chyba pripojeni!
     *   Ad * == neni vyzadovano
     * */
    this.dataerror= function(text) {
        var textError= textNoInternet;
        if(text) textError= text;
        console.log(textError);
        $(" #modal > p strong").html(textError+"<br><br>"+texty["internetagain"]+"<br>");
        $("body").addClass("loadingError").removeClass("loading");
    };

    this.animationon= function(){
        $("body").addClass("loading");

    };
    this.animationoff= function(animation, noerror){
        setTimeout(function(){
            if(animation && noerror) {
                    $("body").removeClass("loading");
            } else if(animation && !noerror){
                $("body").removeClass("loading");
                _that.dataerror();
            } else {}
        }, MinAniTime);
    };
    function online(){
        return _that.ping(urlApi).then(function(success){
            if(success) type= checkConnection();
            else offline();
        });
    }
    function offline(){
        console.log("Offline!");
        type= 'none';
    }
    function checkConnection(){
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'none';

        return states[networkState];
    }

    this.init();
};