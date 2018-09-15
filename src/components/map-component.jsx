import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Heatmap from './heatmap';

const GOOGLE_API_KEY = 'AIzaSyD_6GO3pjBsRu0xROPb8iQnlP04_xh4idA';

class Map extends Component {

  static defaultProps = {
    center: {
      lat: 43.4653563,
      lng: -80.5414864
    },
    zoom: 14
  };

  render() {
    return(
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Heatmap
            lat='43.4653563'
            lng='-80.5414864'
          />
          <Heatmap
            lat='42.4653563'
            lng='-81.5414864'
          />
        </GoogleMapReact>

      </div>
    );
  }
}

export default Map;