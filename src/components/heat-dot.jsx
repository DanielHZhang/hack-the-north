import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
      width: `${5 * zoom}px`,
      height: `${5 * zoom}px`,
    };

    return <div className='heat' style={style} />;
  }
}

export default Heatmap;
