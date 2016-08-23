module.exports = function(test, options) {
        console.log("IfNext");
        var allComponents = [];

        for(var i = 0; i < test.length; i++) {
          var next = i + 1;

          /*if(typeof(test[next]) !== "undefined") {
            console.log("Current Row: " + test[i].component.row);
            console.log("Next Row: "  + test[next].component.row)
            console.log("---")
            var thisRow = test[i].component.row;
            var nextRow = test[next].component.row;

          }*/
          var thisComponent = test[i];
          var thisRow = thisComponent.component.row;
          var arrThisRow = thisComponent.component.row - 1;
          var arrThisColumn = thisComponent.component.col - 1;

          //console.log("Component: " + JSON.stringify(thisComponent))
          //console.log("This Row: " + thisRow);
          //console.log("arrThisRow: " + arrThisRow);
          //console.log(allComponents[arrThisRow]);

          if(typeof(allComponents[arrThisRow]) !== "undefined") {
            //console.log("This index is already defined, updating index...")
            allComponents[arrThisRow].splice(arrThisColumn, 0, thisComponent)
          } else {
            //console.log("This index is undefined, defining now...")
            allComponents.splice(arrThisRow, 0, [thisComponent]);
          }

          //console.log("---")


        }
        //console.log("--- ALL ---");

        console.log(JSON.stringify(allComponents));
        return options.fn(allComponents);

}
