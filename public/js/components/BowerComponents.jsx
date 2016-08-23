import React from 'react';
import { render } from 'react-dom';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class BowerComponentsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        bowerComponents: {}
    };
  }

  componentDidMount() {
    //this.setState({
      //bowerComponents: setTimeout(() => {
        $.get("/bower-components", function(data) {

          console.log(data)
          console.log(this)
          return this.setState({
            bowerComponents: data
          })
        }.bind(this))


      //})
    //})
  }

  getBowerComponents() {
      console.log("Hello bower components");
  }

  render() {
    var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
    return (
      <section>
        <div>TEST</div>

        <ResponsiveReactGridLayout className="layout" layout={layout} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}} cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
          <div key={'a'}>a</div>
          <div key={'b'}>b</div>
          <div key={'c'}>c</div>
          {Object.keys(this.state.bowerComponents).map((item) => {
            return (
              <div key={item}>{this.state.bowerComponents[item].component}</div>
            )
          })}
        </ResponsiveReactGridLayout>
      </section>
    )
  }
}
