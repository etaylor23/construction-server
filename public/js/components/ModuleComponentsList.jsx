import React from 'react';
import { render } from 'react-dom';
var ReactGridLayout = require('react-grid-layout');

export default class ModuleComponentsList extends React.Component {
  componentWillMount(props) {
    //return {
      //super(props);
      //this.setState({

        /*items: [0, 1, 2, 3, 4].map(function(i, key, list) {
          return {i: i.toString(), x: i * 2, y: 0, w: 2, h: 2, add: i === (list.length - 1).toString()};
        }),*/
debugger;
        this.props.getModuleComponents()
      //})
    //}
  }

  render() {
debugger;
    if(typeof(this.props.moduleComponents) !== "undefined") {

      return (
        <div>
          <h1>Your Modules</h1>
          {Object.keys(this.props.moduleComponents).map((item) => {
            var componentItem = this.props.moduleComponents[item].component;
            return (
              <div onClick={this.props.addNewComponent.bind(this, componentItem)} key={item}>
                {this.props.moduleComponents[item].component}
              </div>
            )
          })}
        </div>
      )
    } else {
      return null;
    }
  }
}
