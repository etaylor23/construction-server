module.exports = function(arr,field, options) {
        //console.log(arr);
        //console.log(field);


        var sorted = arr.sort(function(a, b) {
          //console.log("Sort this shit")
          //console.log(a)
          //console.log(b)
          //console.log(field);
          return a.component[field]-b.component[field];
        })
        //console.log(sorted)
        return options.fn(sorted);
      //return Handlebars.helpers.each(sorted, opts);

}
