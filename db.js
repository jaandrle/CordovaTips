var Database = function (db) {
    var self = this;
    this.db = db;
    this.tables= ["book_pages","stickers","courses","photos"];
    this.Columns= [];
    this.Columns["book_pages"]= ["poradi", "yellow", "white", "photo", "kde", "del"];
    this.Columns["stickers"]= ["id", "description", "photo", "duration", "name", "target", "label", "courseID","special","poradi","del"];
    this.Columns["courses"]= ["id", "name", "duration", "description", "target", "label", "roleID", "functionID", "sectionID","bookmark","accessibility","language","poradi", "del", "curriculum","talent_world"];
    this.Columns["photos"] = ["id","photo", "done"];
    this.Columns["texts"] = ["text", "page", "chapter", "date"];
    this.Columns["textareas"] = ["text", "div_id", "page"];
    this.photosColumns = ["files", "page"];

    /*
     * inicializace DB, pokud jeste neexistuji tabulky, vytvori se
     * */
    this.initDB = function () {
        this.db.transaction(function (tx) {
            var textsCreateQuery= [];
            var imax=0;
            textsCreateQuery[imax] = 'CREATE TABLE IF NOT EXISTS ' +
                self.tables[imax] + ' (poradi integer primary key, ' +
                self.Columns[self.tables[imax]][1] + ' text, ' +
                self.Columns[self.tables[imax]][2] + ' text, '+
                self.Columns[self.tables[imax]][3] + ' text, '+
                self.Columns[self.tables[imax]][4] + ' text, '+
                self.Columns[self.tables[imax++]][5] + ' boolean)';
            textsCreateQuery[imax] = 'CREATE TABLE IF NOT EXISTS ' +
                self.tables[imax] + ' (id integer primary key, ' +
                self.Columns[self.tables[imax]][1] + ' text, ' +
                self.Columns[self.tables[imax]][2] + ' text, ' +
                self.Columns[self.tables[imax]][3] + ' text, ' +
                self.Columns[self.tables[imax]][4] + ' text, '+
                self.Columns[self.tables[imax]][5] + ' text, '+
                self.Columns[self.tables[imax]][6] + ' text, '+
                self.Columns[self.tables[imax]][7] + ' integer, '+
                self.Columns[self.tables[imax]][8] + ' integer, '+
                self.Columns[self.tables[imax]][9] + ' integer, '+
                self.Columns[self.tables[imax++]][10] + ' boolean)';
            textsCreateQuery[imax] = 'CREATE TABLE IF NOT EXISTS ' +
                self.tables[imax] + ' (id integer primary key, ' +
                self.Columns[self.tables[imax]][1] + ' text, ' +
                self.Columns[self.tables[imax]][2] + ' text, ' +
                self.Columns[self.tables[imax]][3] + ' text, ' +
                self.Columns[self.tables[imax]][4] + ' text, '+
                self.Columns[self.tables[imax]][5] + ' text, '+
                self.Columns[self.tables[imax]][6] + ' text, '+
                self.Columns[self.tables[imax]][7] + ' text, '+
                self.Columns[self.tables[imax]][8] + ' text, '+
                self.Columns[self.tables[imax]][9] + ' boolean, '+
                self.Columns[self.tables[imax]][10] + ' text, '+
                self.Columns[self.tables[imax]][11] + ' text, '+
                self.Columns[self.tables[imax]][12] + ' text, '+
                self.Columns[self.tables[imax]][13] + ' boolean, '+
                self.Columns[self.tables[imax]][14] + ' text, '+
                self.Columns[self.tables[imax++]][15] + ' text)';
            textsCreateQuery[imax] = 'CREATE TABLE IF NOT EXISTS ' +
                self.tables[imax] + ' (id integer primary key AUTOINCREMENT, ' +
                self.Columns[self.tables[imax]][1] + ' text, '+
                self.Columns[self.tables[imax++]][2] + ' boolean)';

            var Database_load= localStorage.getItem("Database_load") || 0;
            internet.animationon();
            for (var i = 0; i < imax; i++) {
                if(i == Database_load){
                    Database_load= i + 1;
                    localStorage.setItem("Database_load",Database_load);
                    tx.executeSql('DROP TABLE IF EXISTS ' + self.tables[i]);
                    tx.executeSql(textsCreateQuery[i]);
                    if(debug.log_i)debug.logs+= "I| "+self.tables[i]+": nacitani z local.\n";
                    nactidata(i);
                } else if (i == (imax - 1)) {
                    if(debug.log_w)debug.logs+= "W| "+self.tables[i]+": nenacitani z local.\n";
                    SyncDB("#Homepage");
                }
            }
        }, function (e) {
            if(debug.log_e)debug.logs+= "E| db-init/78: " + e.message+"\n";
        });
    };

    /*
     * Funkce pro zjisteni, zda v dané tabulce je již hodnota v daném sloupci true/false
     * */
    this.isExists = function (table, id, column, callback) {
        this.db.transaction(function (tx) {
            tx.executeSql("select count(*) as cnt from " + table + " where " + column + "='" + id + "'", [], function (tx, res) {
                //console.log("Počet záznamů:"+res.rows.item(0).cnt);
                if (res.rows.item(0).cnt > 0) callback(true);
                else callback(false);
            }, function (e) {
                if(debug.log_e)debug.logs+= "E| db-isExists/92: " + e.message+"\n";
            });
        });
    };

    /*
     * Vrátí řádky [název tabulky, *id, *column, callback, *order]
     * - pokud není žádný záznam = false
     * - prikazy (list, např.: {prikaz: hodnota, ...}):
     *             * order: seradi vystup, zadavat ve tvaru: column_name ASC|DESC, column_name ASC|DESC
     *             * where: hledani, ve tvaru SQL, klicove where se doplni samo
     *             * group: seskupeni, ve tvaru column_name
     *             * one: jen jeden radek, ve tvaru true/false
     * */
    this.selectRows = function (table, prikazy, callback) {
        if(prikazy.order) prikazy.order= " order by "+prikazy.order; else prikazy.order= "";
        if(prikazy.where) prikazy.where= " where "+prikazy.where; else prikazy.where= "";
        if(prikazy.group) prikazy.group= " group by "+prikazy.group; else prikazy.group= "";
        this.db.transaction(function (tx) {
            tx.executeSql("select * from '"+table+"'"+prikazy.where+prikazy.group+prikazy.order, [],
            function (tx, res) {
                var res_rows= [];
                if(prikazy.one && res.rows.length > 0){
                    return callback(res.rows.item(0));
                } else if (res.rows.length > 0) {
                    for (i = 0; i < res.rows.length; i++){
                        res_rows.push(res.rows.item(i));
                    }
                    return callback(res_rows);
                } else {
                    return callback(false);
                }
            }, function (e) {
                if(debug.log_e)debug.logs+= "E| db-selectRows/125: " + e.message+"\n";
            });
        });
    };

    /*
     * Update řádku [nazev tabulky, id, sloupec pro id, pole hodnot pro zmenu ({'draw': hodnota})]
     * */

    this.updateRow = function (table, id, sloupec_id, data, callback) {
        $.each(data, function(i,v){
                if (typeof v === 'string' || v instanceof String) data[i] = v.replace(/'/g, "’");
                else data[i]= v;
        });
        var w = [];
        for (var key in data) {
            w.push(key + "='" + data[key] + "'");
        }
        w = w.join(',');
        this.db.transaction(function (tx) {
            tx.executeSql("update " + table + " set " + w + " where " + sloupec_id + "='" + id + "'", [], function (tx, res) {
                return callback(id);
            }, function (e) {
                if(debug.log_e)debug.logs+= "E| db-updateRow/148: " + JSON.stringify(e)+"\n";
            });
        });
    };
    
    this.updateTables= function(dataObject, callback){
        var progress_var= 0;
        var pocettabulek= Object.keys(dataObject).length - 1;   
        function progress(add){
            progress_var+= add;
            var global_progress= Math.floor(1.*progress_var/5);
            $("p#update_progress").text("synchronization: "+global_progress+"%");
        };
        $.each(self.tables, function(i,v){
            if(dataObject[v]) {
                var delka_pole= dataObject[v].length, pocetdat= dataObject[v].length,
                    maxpercent= 100.0/delka_pole;
                var idName= self.Columns[v][0];
                if(v=="photos") idName= "photo";
                var protext= {
                    updated: 0,
                    inserted: 0,
                    notinserted: 0
                };

                function outfunction(id){
                    progress(maxpercent);
                    if(!--pocetdat){
                        pocettabulek--;
                        if(debug.log_i)debug.logs+= "I| Table "+v+": "+delka_pole+" synchronized (updated: "+protext.updated+", inserted: "+protext.inserted+", notinserted: "+protext.notinserted+").\n";
                    }
                    if(!pocetdat && !pocettabulek){
                        if(debug.log_i)debug.logs+= "I| "+"vola se callback po id: "+id+"\n";
                        local_db_version= dataObject.db_version;
                        localStorage.setItem("local_db_version", local_db_version);
                        callback();
                    }
                };
                $.each(dataObject[v], function(ii,vv){
                    self.selectRows(v, {where: idName+"='"+vv[idName]+"'", one: true}, function(row){
                        if(v == "courses") vv.bookmark= "0";
                        var ifnot_deleted;
                        if(v=="photos") ifnot_deleted= vv.done == "0";
                        else ifnot_deleted= vv.del == "0";
                        if(row){
                            protext.updated++;
                            if(row.bookmark) vv.bookmark= "1";
                            if(v=="photos") vv.id= row.id;
                            self.updateRow(v, vv[idName], idName, vv, outfunction)
                        } else if (ifnot_deleted){
                            protext.inserted++;
                            if(v=="photos"){
                                vv.id= downloaded_photos++;
                                localStorage.setItem("downloaded_photos",downloaded_photos);
                            }
                            self.insertRow(v, vv, outfunction);
                        } else {
                            protext.notinserted++;
                            outfunction(vv.idName);
                        }
                    });
                });
            }
        });
    };

    /*
     * Insert řádku [nazev tabulky, pole hodnot ve spravnem poradi]
     * */

    this.insertRow = function (table, dataIN, callback) {
        if (self.Columns[table]) var columns = self.Columns[table];
        var data= [];

        this.db.transaction(function (tx) {
            var i= 0;
            $.each(dataIN, function(ii,v){
                if (typeof v === 'string' || v instanceof String) data[i++] = v.replace(/'/g, "’");
                else data[i++]= v;
            });

            var data_join = "'" + data.join("','") + "'";
            var w = data_join;
            var cols = columns.join(',');

            tx.executeSql("insert into " + table + "(" + cols + ") values (" + w + ")", [], function (tx, res) {
                //console.log("Insertováno: "+res.insertId);
                return callback(res.insertId);
            }, function (e) {
                if(debug.log_e)debug.logs+= "E| db-insertRow/238: " + e.message+"\n";
            });
        });
    }

};
