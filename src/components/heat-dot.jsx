import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'antd';

class Heatmap extends Component {
  static propTypes = {
    $geoService: PropTypes.shape({getZoom: PropTypes.func}),
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('the props', this.props);
    const zoom = this.props.$geoService.getZoom();
    const style = {
      width: `${2 * zoom}px`,
      height: `${2 * zoom}px`,
    };

    return (
      <Tooltip title='test'>
        <div className='heat' style={style} onMouseEnter={() => console.log('test')} />
      </Tooltip>
    );
  }
}

export default Heatmap;
