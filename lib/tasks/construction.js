'use strict';
/**
 * Serve out the dist directory with a local webserver (Browser Sync uses Express JS)
 * Optionally supress opening a browser window with --open=false
 */
var gulp = require('gulp');
var config = require('../config.js');
var bs2 = require("browser-sync").create();
var constructionServer = require("../../server.js");





gulp.task('construction', function() {

  constructionServer.startConstruction();


  bs2.init({
    open: false,
    //server: {
        //baseDir: "construction",
        //index: "index.html",
    //},
    proxy: "localhost:5000",
    port: 3012,
    ui: {
        port: 3013
    },

    // Inject the snippet at the bottom body tag. If it's left at default it will find the first
    // regex body tag which is generally an IE conditional and the resulting injected JS will not
    // load properly unless that IE conditional matches
    snippetOptions: {
        rule: {
            match: /<\/body>/i,

            fn: function (snippet, match) {
                return snippet + match;
            }
        }
    }

  });
});
