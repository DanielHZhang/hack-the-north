import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import HeatDot from './heat-dot';
import {GOOGLE_API_KEY} from '../keys';
import {Col} from 'antd';
import Firebase from 'firebase';
import '@firebase/storage';
import tranData from '../simpleTranData.json';
// import file from '../tdfile.json';

const addressMap = {};

const heatmapOptions = {
  options: {
    radius: 20,
    opacity: 0.7,
    gradient: ['rgba(0, 255, 255, 0)', 'rgba(255, 0, 255, 1)', 'rgba(255, 255, 0, 2)'],
  },
  positions: [
    {
      lat: 43.5,
      lng: -80.6,
    },
  ],
};

const firebaseConfig = {
  apiKey: 'AIzaSyA7NJkHK-UA--JVDQtUj7hX9IXWiKYuw-I',
  authDomain: 'mapitude-bdcaa.firebaseapp.com',
  databaseURL: 'https://mapitude-bdcaa.firebaseio.com',
  projectId: 'mapitude-bdcaa',
  storageBucket: 'mapitude-bdcaa.appspot.com',
  messagingSenderId: '104504510528',
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firebaseStorage: undefined,
      transData: undefined,
      center: {
        lat: 43.7050628845,
        lng: -79.3491207954,
      },
      zoom: 14,
      data: [
        // {
        //   lat: '42.4653563',
        //   lng: '-81.5414864',
        // },
      ],
    };
  }

  componentDidMount() {
    const transArr = [];

    tranData.forEach((user) => {
      user.transactions.forEach((transaction) => {
        // LocationLatitude
        // LocationLongitude
        if (transaction.LocationLatitude && transaction.LocationLongitude) {
          addressMap[transaction.LocationStreet] = {
            lat: transaction.LocationLatitude.toString(),
            lng: transaction.LocationLongitude.toString(),
            merchantName: transaction.MerchantName,
            address: transaction.LocationStreet,
          };

          transArr.push({
            lat: transaction.LocationLatitude.toString(),
            lng: transaction.LocationLongitude.toString(),
          });
        }
      });
    });
    this.setState({data: transArr});
  }

  renderHeatDots() {
    const heatMapsArr = [];
    console.log(addressMap);
    let c = 0;
    for (const tranDetails in addressMap) {
      heatMapsArr.push(
        <HeatDot
          lat={addressMap[tranDetails].lat}
          lng={addressMap[tranDetails].lng}
          key={c}
          data={addressMap[tranDetails]}
        />
      );
      c++;
    }
    return heatMapsArr;
  }

  render() {
    heatmapOptions.positions = this.state.data;
    return (
      <Col span={19} className='mapContainer'>
        <div className='fullscreen'>
          <GoogleMapReact
            bootstrapURLKeys={{key: GOOGLE_API_KEY}}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            heatmapLibrary={true}
            heatmap={heatmapOptions}
          >
            {this.renderHeatDots()}
          </GoogleMapReact>
        </div>
      </Col>
    );
  }
}

export default Map;
