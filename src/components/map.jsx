import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import HeatDot from './heat-dot';
import {GOOGLE_API_KEY} from '../keys';
import {Col} from 'antd';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 43.4653563,
        lng: -80.5414864,
      },
      zoom: 14,
      data: [
        {
          lat: '43.4653563',
          lng: '-80.5414864',
        },
        {
          lat: '42.4653563',
          lng: '-81.5414864',
        },
      ],
    };
  }

  renderHeatDots() {
    return this.state.data.map((e, i) => <HeatDot key={i} {...e} />);
  }

  render() {
    return (
      <Col span={19} className='mapContainer'>
        <div className='fullscreen'>
          <GoogleMapReact
            bootstrapURLKeys={{key: GOOGLE_API_KEY}}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
            {this.renderHeatDots()}
          </GoogleMapReact>
        </div>
      </Col>
    );
  }
}

export default Map;

// const heatmapOptions = {
//   options: {
//     radius: 20,
//     opacity: 0.7,
//     gradient: ['rgba(0, 255, 255, 0)', 'rgba(255, 0, 255, 1)', 'rgba(255, 255, 0, 2)'],
//   },
//   positions: [
//     {
//       lat: 43.5,
//       lng: -80.6,
//     },
//   ],
// };
// heatmapLibrary={true}
// heatmap={heatmapOptions}
