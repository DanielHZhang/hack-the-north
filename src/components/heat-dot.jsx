import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Popover} from 'antd';

class Heatmap extends Component {
  static propTypes = {
    $geoService: PropTypes.shape({getZoom: PropTypes.func}),
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  locationInfo = <div>{this.props.address}</div>;

  render() {
    const zoom = this.props.$geoService.getZoom();
    const style = {
      width: `${2 * zoom}px`,
      height: `${2 * zoom}px`,
      transform: 'translateX(-15px)',
    };

    return (
      <Popover
        trigger='click'
        title={this.props.merchantName}
        // style={{transform: 'translateX(-5px)'}}
        content={this.locationInfo}
      >
        <div className='dot' style={style} />
      </Popover>
    );
  }
}

export default Heatmap;
