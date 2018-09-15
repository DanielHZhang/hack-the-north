import React, {Component} from 'react';

class Heatmap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('the props', this.props);
    const zoom = this.props.$geoService.getZoom();
    return <div className='heat' style={{width: `${5 * zoom}px`, height: `${5 * zoom}px`}} />;
  }
}

export default Heatmap;
