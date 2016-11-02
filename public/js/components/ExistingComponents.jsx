import React from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import FragmentsList from "./FragmentsList.jsx"
import BowerComponentsList from "./BowerComponentsList.jsx"
import ModuleComponentsList from "./ModuleComponentsList.jsx"



var WidthProvider = require('react-grid-layout').WidthProvider;
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;
ResponsiveReactGridLayout = WidthProvider(ResponsiveReactGridLayout);

export default class ExistingComponents extends React.Component {


  constructor(props) {
    //return {
      super(props);
      this.state = {

        /*items: [0, 1, 2, 3, 4].map(function(i, key, list) {
          return {i: i.toString(), x: i * 2, y: 0, w: 2, h: 2, add: i === (list.length - 1).toString()};
        }),*/
        items: {},
        fragmentComponents: {},
        moduleComponents:{},
        bowerComponents: {},
        newCounter: 0,
        addNewComponent: false,
        firstRun: false
      }
    //}
  }

  componentWillMount(props) {
    //return {
      //super(props);
      //this.setState({

        /*items: [0, 1, 2, 3, 4].map(function(i, key, list) {
          return {i: i.toString(), x: i * 2, y: 0, w: 2, h: 2, add: i === (list.length - 1).toString()};
        }),*/
        this.getExistingComponents()
      //})
    //}
  }

  getExistingComponents() {
    //return {
      $.get("/existing-components", function(data) {

        return this.setState({
          items: data
        })
      }.bind(this))
    //}
  }

  getFragmentComponents() {
    $.get("/fragments", function(data) {
      return this.setState({
        fragmentComponents: data
      })
    }.bind(this))
  }


  getBowerComponents() {
    $.get("/bower-components", function(data) {
      return this.setState({
        bowerComponents: data
      })
    }.bind(this))
  }

  getModuleComponents() {
    $.get("/module-components", function(data) {
      return this.setState({
        moduleComponents: data
      })
    }.bind(this))
  }

  createElement(el) {

    var removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer'
    };

    //var i = el.add ? '+' : el.i;
    var i = el.component.key;
    var name = el.component.name;

    var grid = {
      add: false,
      h: el.component.height,
      i: el.component.name,
      w: el.component.width,
      x: el.component.col,
      y: el.component.row
    }
    debugger;
    //grid = JSON.stringify(grid);

    return (
      <div key={i} data-grid={grid}>
        {el.add ?
          <span className="add text" onClick={this.onAddComponent} title="You can add an item by clicking here, too.">Add +</span>
        : <span className="text">{name}</span>}
        <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, i)}>x</span>
      </div>
    );
  }

  onAddComponent() {
    /*eslint no-console: 0*/
    debugger;
    console.log('adding', 'n' + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: {
        components: this.state.items.components.concat({
          "component" : {
            key: 'n' + this.state.newCounter,
            name: 'n' + this.state.newCounter,
            //x: this.state.items.components.length * 2 % (this.state.cols.components || 12),
            col: this.state.items.components.length * 2 % 12,
            row: Infinity, // puts it at the bottom
            width: 2,
            height: 2
          }
        })
      },
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    debugger;
    //this.props.onLayoutChange(layout);
    //this.setState({layout: layout});

    if(typeof(this.state.items.components) != "undefined") {
      if(this.state.firstRun) {

        var nextState = this.state.items.components

        for(var i = 0; i < nextState.length; i++) {
          if(this.state.items.components[i].component.key == layout[i].i) {
            this.state.items.components[i].component.width = layout[i].w;
            this.state.items.components[i].component.height = layout[i].h;
            this.state.items.components[i].component.row = layout[i].y;
            this.state.items.components[i].component.col = layout[i].x;
          }
        }
        var components = this.state.items.components
        debugger;
        return this.setState({
          items: {
            components
          }
        })
      } else {
        return this.setState({
          firstRun:true
        })
      }

    }

    /*
    var componentsContainer = {};
    componentsContainer.components = [];
    for(var i = 0; i < layout.length; i++) {
      var component = { "component" : layout[i] }
      componentsContainer.components.push(component)
    }
    console.log(componentsContainer);


    this.setState({
      existingComponents: componentsContainer
    })*/
  }

  onRemoveItem(item) {
    debugger;
    for(var i = 0; i < this.state.items.components.length; i++) {
      var itemIns = this.state.items.components[i].component;
      if(itemIns.key == item) {
        console.log(i)
        console.log(this.state.items.components[i]);
        var allItems = this.state.items.components;
        var removalIndex = allItems.indexOf(i);
        console.log(allItems)
        console.log(removalIndex)
        allItems.splice(i, 1)
      }
    }

    this.setState({
      items: this.state.items
    });
  }

  showComponentConfiguration() {
    debugger;
    this.setState({
      addNewComponent: true
    })
  }

  addNewComponent(info) {
    debugger;
    console.log('adding', info + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: {
        components: this.state.items.components.concat({
          "component" : {
            key: info + this.state.newCounter + new Date().getTime(),
            name: info,
            //x: this.state.items.components.length * 2 % (this.state.cols.components || 12),
            col: this.state.items.components.length * 2 % 12,
            row: Infinity, // puts it at the bottom
            width: 2,
            height: 2
          }
        })
      },
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }


  saveToRemoteStorage() {
    debugger;
    /*debugger;
    var _this = this.this;
    var localStorageLayout = _this.state.existingComponents;
    for(var i = 0; i < localStorageLayout.length; i++) {
      _this.manipulateKeys(localStorageLayout[i], "i", "name", true);
      _this.manipulateKeys(localStorageLayout[i], "y", "row", true);
      _this.manipulateKeys(localStorageLayout[i], "x", "col", true);
      _this.manipulateKeys(localStorageLayout[i], "w", "width", true);
      _this.manipulateKeys(localStorageLayout[i], "h", "height", true);
      _this.manipulateKeys(localStorageLayout[i], "static", false);
    }

    var componentsContainer = {};
    componentsContainer.components = [];
    for(var i = 0; i < localStorageLayout.length; i++) {
      var component = { "component" : localStorageLayout[i] }
      componentsContainer.components.push(component)
    }
    console.log(componentsContainer);*/

    var localStorageLayout = JSON.stringify(this.state.items);
    $.ajax({
      url: "/updateModules/" + "testingPage.json",
      method: "POST",
      data: localStorageLayout,
      contentType: "application/json"
    }).done(function(data) {
      console.log( "Data Loaded: " + data );
    })


  }

  closeNewComponentPicker() {
    debugger;
    this.setState({
      addNewComponent: false
    })
  } 

  render() {
    debugger;
    if(typeof(this.state.items) != "undefined") {

      debugger;
      return (
        <div>
          <ResponsiveReactGridLayout layout={false} verticalCompact={false} test="TESTOMG" onLayoutChange={this.onLayoutChange.bind(this)} onBreakpointChange={this.onBreakpointChange}
              {...this.props}>
            {_.map(this.state.items.components, this.createElement.bind(this))}
          </ResponsiveReactGridLayout>
          <div className="addItemContainer">
            <button onClick={this.showComponentConfiguration.bind(this)}>Add New Component +</button>
            <button onClick={this.saveToRemoteStorage.bind(this)}>Save Current Set</button>
          </div>
          
          {this.state.addNewComponent ? 
            <div className="new-component-container">
              <div onClick={this.closeNewComponentPicker.bind(this)} className="close">X</div>
              <div className="new-component">
                <FragmentsList getFragmentComponents={this.getFragmentComponents.bind(this)} fragmentComponents={this.state.fragmentComponents} addNewComponent={this.addNewComponent.bind(this)} /> 
                <ModuleComponentsList getModuleComponents={this.getModuleComponents.bind(this)} moduleComponents={this.state.moduleComponents} addNewComponent={this.addNewComponent.bind(this)} />
                <BowerComponentsList getBowerComponents={this.getBowerComponents.bind(this)} bowerComponents={this.state.bowerComponents} addNewComponent={this.addNewComponent.bind(this)} />
              </div>
            </div>
            : console.log("No frags")}
          
        </div>
      );
    } else {
      return null;
    }
  }
}

ExistingComponents.defaultProps = {
    className: "layout",
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    rowHeight: 100
}
