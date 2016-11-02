import React from 'react';
import { render } from 'react-dom';
var ReactGridLayout = require('react-grid-layout');

export default class FragmentsList extends React.Component {

  constructor(props) {
    //return {
      super(props);
      this.state = {

        /*items: [0, 1, 2, 3, 4].map(function(i, key, list) {
          return {i: i.toString(), x: i * 2, y: 0, w: 2, h: 2, add: i === (list.length - 1).toString()};
        }),*/
        fragmentComponents: {}
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
        this.props.getFragmentComponents()
      //})
    //}
  }




  render() {
    console.log("Start frags")
    if(typeof(this.props.fragmentComponents) !== "undefined") {

      return (
        <div>
          <h1>Your Fragments</h1>
          {Object.keys(this.props.fragmentComponents).map((item) => {
            var componentItem = this.props.fragmentComponents[item].component;
            return (
              <div onClick={this.props.addNewComponent.bind(this, componentItem)} key={item}>
                {this.props.fragmentComponents[item].component}
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
