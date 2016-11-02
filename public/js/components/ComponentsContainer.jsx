import React from 'react';
import { render } from 'react-dom';
import BowerComponentsList from "./BowerComponentsList.jsx"
import ExistingComponents from "./ExistingComponents.jsx"
//import FragmentsList from "./FragmentsList.jsx"
import ModuleComponentsList from "./ModuleComponentsList.jsx"

var ReactGridLayout = require('react-grid-layout');

export default class ComponentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        bowerComponents: {},
        existingComponents: {},
        //fragmentComponents: {},
        moduleComponents: {}
    };
  }

  manipulateKeys(obj, oldKey, newKey, swap) {
    if(typeof(obj[oldKey]) != "undefined") {
      if(typeof(swap) !== "undefined") {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
        return obj;
      } else {
        obj[oldKey] = newKey;
        return obj;
      }
    } else {
      return false;
    }
  }

  saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem('rgl-8', JSON.stringify({
        [key]: value
      }));
    }
  }

  getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
      } catch(e) {/*Ignore*/}
    }
    return ls[key];
  }

  addBowerComponent(item) {
    //console.log(item);
    console.log(this.state.existingComponents.components)
    console.log(item);
    var newItem = { "component" : {i: item, x: 1, y: 1, w: 1, h: 1, static: true}}
    this.state.existingComponents.components.push(newItem)
    //this.saveToLS('layout', this.state.existingComponents);
    return this.setState({
      existingComponents: this.state.existingComponents
    })
  }


  getExistingComponents() {
    debugger;
    $.get("/existing-components", function(data) {
      return this.setState({
        existingComponents: data
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


  getFragmentComponents() {
    $.get("/fragments", function(data) {
      return this.setState({
        fragmentComponents: data
      })
    }.bind(this))
  }

  saveToRemoteStorage(layout) {
    debugger;
    //var _this = this.this;
    var localStorageLayout = this.state.existingComponents;
    for(var i = 0; i < localStorageLayout.components.length; i++) {
      this.manipulateKeys(localStorageLayout.components[i].component, "i", "name", true);
      this.manipulateKeys(localStorageLayout.components[i].component, "y", "row", true);
      this.manipulateKeys(localStorageLayout.components[i].component, "x", "col", true);
      this.manipulateKeys(localStorageLayout.components[i].component, "w", "width", true);
      this.manipulateKeys(localStorageLayout.components[i].component, "h", "height", true);
      this.manipulateKeys(localStorageLayout.components[i].component, "static", false);
    }

    //var componentsContainer = {};
    //componentsContainer.components = [];
    //for(var i = 0; i < localStorageLayout.length; i++) {
    //  var component = { "component" : localStorageLayout[i] }
    //  componentsContainer.components.push(component)
    //}
    //console.log(componentsContainer);

    localStorageLayout = JSON.stringify(localStorageLayout);
    $.ajax({
      url: "/updateModules/" + "testingPage.json",
      method: "POST",
      data: localStorageLayout,
      contentType: "application/json"
    }).done(function(data) {
      console.log( "Data Loaded: " + data );
    })


  }



  componentDidMount() {
    //this.getBowerComponents();
    //this.getFragmentComponents();
    //this.getExistingComponents();
    //this.getModuleComponents();
  }

  render() {
    return (
      <div>
        <h1>The Component Container</h1>

        <ExistingComponents initExistingComponents={this.getExistingComponents.bind(this)} saveToRemoteStorage={this.saveToRemoteStorage.bind(this)} existingComponents={this.state.existingComponents} layout={this.state.layout} />
      </div>
    )
  }
}
