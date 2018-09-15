import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {fitBounds} from 'google-map-react/utils';
import Heatmap from './heatmap';

const heatmapOptions = {
  options: {
    radius: 20,
    opacity: 0.7,
    gradient: [
      'rgba(0, 255, 255, 0)',
      'rgba(255, 0, 255, 1)',
      'rgba(255, 255, 0, 2)',
    ]
  },
  positions: [
    {
      lat: 43.5,
      lng: -80.6,
    },
  ],
};

const GOOGLE_API_KEY = 'AIzaSyD_6GO3pjBsRu0xROPb8iQnlP04_xh4idA';

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 43.4653563,
      lng: -80.5414864,
    },
    zoom: 14,
  };

  render() {
    return (
      <div style={{height: '100%', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: GOOGLE_API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          // heatmapLibrary={true}
          // heatmap={heatmapOptions}
        >
          <Heatmap lat='43.4653563' lng='-80.5414864' />
          <Heatmap lat='42.4653563' lng='-81.5414864' />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
