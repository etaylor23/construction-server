var express = require('express');
var app = express();
var http = require('http');
var request = require("request");
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var cons = require("consolidate");
var handlebars = require('handlebars');
var async = require('async');
var path = require('path');
var bodyParser = require('body-parser')

var jsonfile = require('jsonfile')

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});


var options = {
  root: __dirname + '/public/',
  dotfiles: 'deny',
  headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
  }
};



var constructionServer = {
    startConstruction:  function() {
      app.use(express.static('public'));
      app.use(express.static('dist'));

      app.listen(5000);
      console.log("Created custom server");

      this.buildInitialPage();
      this.updatePageModules();

      /* REACT ENDPOINTS */
      this.buildBowerComponents();
      this.buildExistingComponents();
      this.buildFragments();
      this.buildModuleComponents();

    },

    buildInitialPage : function(req, res) {
        app.get('/home', function(req, res){

          var newItems = [];

            function getDirectories(srcpath, dirOnly) {
              return fs.readdirSync(srcpath).filter(function(file) {
                if(dirOnly) {
                  return fs.statSync(path.join(srcpath, file)).isDirectory()
                } else {
                  return fs.statSync(path.join(srcpath, file)).isFile();
                }
              });
            }

            function getJSONData(file) {
              return fs.readFileSync("./source/data/" + file, 'utf8');
            }

            function filterElement(elements) {
              var filterElements = elements.map(function(file) {
                var newFile = new Object();
                newFile.name = file,
                newFile.repository = "git@gitlab.squiz.net:boilerplate/" + file
                newFile.dataName = file.replace("hbs","json")
                if(file.indexOf("hbs") != -1) {
                  newFile.dataNameJSON = function() {
                    return JSON.parse(getJSONData(file.replace("hbs","json")));
                  }
                  newFile.dataStringJSON = function() {
                    return getJSONData(file.replace("hbs","json"));
                  }
                }
                return newFile;
              })
              return filterElements;
            }

            /* Get Bower Modules and HTML Pages  */
            var moduleDirs = getDirectories("./source/bower_components/", true);
            var htmlPages = getDirectories("./source/html/pages/");

            /* Map out some extra data for Bower Modules and HTML Pages */
            var filteredModules = filterElement(moduleDirs);
            var filteredHtmlPages = filterElement(htmlPages);

            /* Create a bunch of Items to be pulled together */
            var items = [];
            items.push(new Item("/usr/local/lib/node_modules/generator-squiz-boilerplate/moduleRegistry.json", "all"));
            items.push(new Item(filteredModules, "local"));
            items.push(new Item(filteredHtmlPages, "pages"));

            function itemCreationFinished(contentBunch){
                console.info(contentBunch);
                cons.handlebars(options.root + 'views/test.hbs', contentBunch, function(err, html) {
                  //console.log(html);
                  res.setHeader('Content-Type', 'text/html')
                  res.end(html);
                });
            }

            function Item(endPoint, objName){
                this.endPoint = endPoint;
                this.objName = objName;
            }

            Item.prototype.pushItem = function(callback){
                  console.log("Item is adding.");
                  //console.log(this.endPoint[0].dataName)
                  //var endPoint = this.endPoint;
                  //var objName = this.objName;
                  var props = new Object();
                  props.pEndPoint =  this.endPoint;
                  props.pObjName = this.objName;
                  (function(props) {
                    if(typeof(props.pEndPoint) !== "object" ) {
                      fs.readFile(props.pEndPoint,'utf8', function(err, json) {
                        var final = new Object();
                        final.name = props.pObjName
                        final.content = JSON.parse(json);


                        newItems.push(final);
                        if(typeof callback === "function") callback();

                      })
                    } else {
                      var final = new Object();
                      final.name = props.pObjName;
                      final.content = props.pEndPoint;


                      newItems.push(final);
                      if(typeof callback === "function") callback();
                    }
                  })(props)
            };

            // 1st parameter in async.each() is the array of items
            async.each(items,
              // 2nd parameter is the function that each item is passed into
              function(item, callback){
                // Call an asynchronous function (often a save() to MongoDB)
                item.pushItem(function (){
                  // Async call is done, alert via callback
                  callback();
                });
              },
              // 3rd parameter is the function call when everything is done
              function(err){
                // All tasks are done now
                console.log(err);
                itemCreationFinished(newItems);
              }
            )
        })
    },

    transforms: {
        dimensionToClass : function(dimensionSet) {


          console.log("hello ellis")

          console.log(dimensionSet);
          for(var i = 0; i < dimensionSet.components.length; i++) {
            console.log(dimensionSet.components[i].component.width);
            dimensionSet.components[i].component.width = "large-" + dimensionSet.components[i].component.width;
          }
        }
    },

    updatePageModules : function(req, res) {


      app.post("/updateModules/:jsonToUpdate", function(req, res) {
        var jsonFile = "./source/data/" + req.params.jsonToUpdate;
        //console.log(req.body);
        var jsonUpdate = req.body;
        //constructionServer.transforms.dimensionToClass(jsonUpdate);
        jsonfile.writeFile(jsonFile, jsonUpdate, {spaces: 6}, function (err) {
          if (err) throw err;
          res.end("All done here :)")
        });


        //var jsonPayload = //payload - req.body.payload;
        //var jsonToUpdate = //json to update
        //fs.writeToFile, jsonToUpdate
      })
    },

    buildBowerComponents : function() {
      app.get("/bower-components", function(req, res) {

        function getDirectories(srcpath, dirOnly) {
          return fs.readdirSync(srcpath).filter(function(file) {
            if(dirOnly) {
              return fs.statSync(path.join(srcpath, file)).isDirectory()
            } else {
              return fs.statSync(path.join(srcpath, file)).isFile();
            }
          });
        }

        var bowerComponents = getDirectories("./source/bower_components/", true);


        console.log(bowerComponents);
        bowerComponents = bowerComponents.map(function(item) {
          return { "component" : item }
        })

        console.log(bowerComponents)


        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(bowerComponents));
      })
    },




    buildFragments : function() {
      app.get("/fragments", function(req, res) {

        function getDirectories(srcpath, dirOnly) {
          return fs.readdirSync(srcpath).filter(function(file) {
            if(dirOnly) {
              return fs.statSync(path.join(srcpath, file)).isDirectory()
            } else {
              return fs.statSync(path.join(srcpath, file)).isFile();
            }
          });
        }

        var fragments = getDirectories("./source/html/fragments", false);


        console.log(fragments);
        fragments = fragments.map(function(item) {
          item = item.split(".hbs")[0];
          return { "component" : item }
        })

        console.log(fragments)


        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(fragments));
      })
    },

    buildModuleComponents : function() {
      app.get("/module-components", function(req, res) {

        function getDirectories(srcpath, dirOnly) {
          return fs.readdirSync(srcpath).filter(function(file) {
            if(dirOnly) {
              return fs.statSync(path.join(srcpath, file)).isDirectory()
            } else {
              return fs.statSync(path.join(srcpath, file)).isFile();
            }
          });
        }

        var modules = getDirectories("./source/modules", true);


        console.log(modules);
        modules = modules.map(function(item) {
          item = item.split(".hbs")[0];
          return { "component" : item }
        })

        console.log(modules)


        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(modules));
      })
    },


    buildExistingComponents : function() {
      app.get("/existing-components", function(req, res) {
        fs.readFile("./source/data/testingPage.json", 'utf8', function(err, data) {
          if (err) throw err;
          res.setHeader('Content-Type', 'application/json')
          res.end(data)
        });
      })
    }
}



module.exports = constructionServer;
