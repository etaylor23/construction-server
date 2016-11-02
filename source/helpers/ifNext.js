module.exports = function(test, options) {
        console.log("IfNext");
        var allComponents = [];
        var offsetCollector = [];

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
          var arrThisRow = thisComponent.component.row;
          var arrThisColumn = thisComponent.component.col;

          //console.log("Component: " + JSON.stringify(thisComponent))
          //console.log("This Row: " + thisRow);
          //console.log("arrThisRow: " + arrThisRow);
          //console.log(allComponents[arrThisRow]);

          //Get the next available key in the array
          var nextAvailableKeyInArray = allComponents.length;

          //If the current row's value is greater than the current length of the array then we have to move rows
          if(arrThisRow > allComponents.length) {
            console.log("-----")
            console.log("Moving rows")
            console.log(thisComponent)
            console.log("This row");
            console.log(arrThisRow)

            //If there are no elements in the offsetCollector then push this regardless. (Imitates a do/while)
            if(offsetCollector == 0) {
              allComponents.splice(nextAvailableKeyInArray, 0, [thisComponent]);
              offsetCollector.push({"row": arrThisRow, "newIndex" : nextAvailableKeyInArray})
            } else {
              var indexToUse;
              //Defines a more global indexToUse
              for(var t = 0; t < offsetCollector.length; t++) {
                if(offsetCollector[t].row == arrThisRow) {
                  indexToUse = offsetCollector[t].newIndex;
                  //console.log("Found offsetCollector index to use")
                  break;
                } else {
                  //console.log("No offsetCollector index, reverting back to nextAvailableKeyInArray")
                  indexToUse = nextAvailableKeyInArray;
                }
                //check to see if row exists in offsetCollector against value of currentrow
                  //if it does then set that object's newIndex as the object to use going forward
                //otherwise
                  //set the nextAvailableKeyInArray as the object to use going forward
              }

              console.log("indexToUse: " + indexToUse)
              //in allComponents[indexToUse] do the logic below
              if(typeof(allComponents[indexToUse]) !== "undefined") {
                allComponents[indexToUse].splice(arrThisColumn, 0, thisComponent)
              } else {
                allComponents.splice(indexToUse, 0, [thisComponent]);
                offsetCollector.push({"row": arrThisRow, "newIndex" : nextAvailableKeyInArray})
              }
            }

            //If the offset collector values contain a row value that matches this row then we should use the offset collector's new value instead

            console.log("-----")
          } else {
            console.log("Not moving rows")
            if(typeof(allComponents[arrThisRow]) !== "undefined") {
              allComponents[arrThisRow].splice(arrThisColumn, 0, thisComponent)
            } else {
              allComponents.splice(arrThisRow, 0, [thisComponent]);
            }


          }



          //if(typeof(allComponents[arrThisRow]) !== "undefined") {
          //  allComponents[arrThisRow].splice(arrThisColumn, 0, thisComponent)
          //} else {
          //  allComponents.splice(arrThisRow, 0, [thisComponent])
          //}

          //console.log("---")


        }
        //console.log("--- ALL ---");
        console.log("Offset Collector:")
        console.log(offsetCollector);
        console.log(JSON.stringify(allComponents));
        return options.fn(allComponents);

}
//old
