import React, {Component} from 'react';

class Heatmap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    console.log('the props', this.props);
    return <div className='heat' />;
  }
}

export default Heatmap;
