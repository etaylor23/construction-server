'use strict';
/**
 * The build task is the main task for triggering the construction of the template
 * based on the parsing of html files in source/html/*.html. The task will run
 * after copying files and includes Handlebars parsing and triggers a browserify
 * task if the app.js task file is present.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('../config.js');
var removeDirname = require('../util/removeDirname');
var path = require('path');
var fs = require('fs');
var parser = require('../parser.js');
var watch = require('gulp-watch');
var logStream = require('../util/logStream');
var handlebars = require('gulp-compile-handlebars');
var chalk = require('chalk');

/* Custom requires */

var htmlmin = require('gulp-htmlmin');
var extname = require('gulp-extname');
var assemble = require('assemble');
//var app = assemble();

//var helpers = require('handlebars-helpers')();


//console.log(helpers);


var sass = require('gulp-sass');



var src = path.join(config.source, 'html/*.html');
var allFiles = path.join(config.source, "/{html,data}/**/*")


/* Standard boilerplate var defs */
var browserifyStarted = false;
var appStat;

var src = path.join(config.source, 'html/*.html');

if (config.args.docs) {
    src = path.join(config.source, 'html/docs/*.html');
}

if (config.args.file) {
    src = path.join(config.source, 'html', config.args.file);
}
/* End standard boilerplate var defs */




gulp.task('sass', function () {
  console.log("Running SASS")
  return gulp.src(['source/styles/imports/mixins.scss', 'source/styles/global.scss', './source/bower_components/squiz-module-*/css/global.scss']) //./source/bower_components/squiz-module-*/css/global.scss
    .pipe(sass({
      includePaths: ['source/styles/imports/mixins.scss']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('load', function(cb) {
  console.log("Loading in partials layouts and pages")
  //console.log(app)
  //console.log(app)
  //app.helpers(['./sort.js' ])

  //app.helpers("./sort.js")

  assemble.option('layout', 'default');
  assemble.data(['source/data/*.json']);
  assemble.partials(['source/**/*.{hbs,html}']); //,'source/bower_components/**/*.html'
  //app.partials('source/bower_components/squiz-module-*/**/*.html');
  assemble.layouts(['source/html/layouts/*.hbs'], {site: {title: 'Code Project'}});
  //assemble.pages('source/html/pages/*.hbs');
  assemble.helpers('source/helpers/*.js');

  assemble.src('source/html/pages/**/*.{html,hbs,handlebars,json}', { layout: 'default' })
    .pipe(extname())
    .pipe(assemble.dest('dist/'));


  cb();
});


function doBuild(srcStream) {
    var hbs = handlebars(config, config.handlebars);

    hbs.on('error', function(err) {
        if (err) {
            process.stderr.write(chalk.red('Handlebars Error'));
            process.stderr.write(chalk.red(err.message));
        }
        if (config.verbose) {
            process.stderr.write(chalk.red(err.stack));
        }
        console.log('\n\n\tIt is likely that the file contains information that Handlebars cannot parse.\n');
        console.log('\tUse --verbose to view error stack and more context regarding file parse status.\n');
        hbs.end();
    });

    srcStream = srcStream
        .pipe(parser.parse())
        .pipe(hbs)
        .pipe(removeDirname())
        .pipe(gulp.dest(config.dest));

    if (global.isWatching && global.sync) {

        srcStream.on('data', global.sync.reload);

        // Report on file cache size
        if (config.verbose) {
            var cfs = require('cacheable-fs');
            srcStream.on('data', function() {
                gutil.log(chalk.yellow('Cached files:'), cfs.stats().size);
            });
        }
    }

    if (!appStat) {
        try {
            appStat = fs.statSync(path.resolve(__dirname, './app.js'));
        } catch(e) {
            // Do nothing
        }
    }

    if (appStat && appStat.isFile() && !browserifyStarted) {
        gulp.start('browserify');
        browserifyStarted = true;
    }

    return srcStream;
}

gulp.task('build', ['load', 'copy'], function() {
  console.log("Running new build")
  console.log(config.source + "/html/**/*");

  //gulp.watch('./source/styles/global.scss', ['sass']);
  gulp.watch(allFiles, ['load'])

  /* Standard boilerplate */
  if (global.isWatching) {
      // Watch the same source files and rebuild on change
      doBuild(watch(src).pipe(parser.expireCache()))
          .pipe(logStream('File reloaded:'));
  }
  // Do a build
  return doBuild(gulp.src(src));
  /* End standard build */

});
