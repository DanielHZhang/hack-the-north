import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import HeatDot from './heat-dot';
import {GOOGLE_API_KEY} from '../keys';
import {Col, Icon} from 'antd';
import Firebase from 'firebase';
import '@firebase/storage';
import tranData from '../simpleTranData.json';

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
      data: [],
    };
    this.addressMap = {};
  }

  componentDidMount() {
    const transArr = [];
    tranData.forEach((user) => {
      user.transactions.forEach((transaction) => {
        if (transaction.LocationLatitude && transaction.LocationLongitude) {
          this.addressMap[transaction.LocationStreet] = {
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
    return Object.values(this.addressMap).map((address, i) => <HeatDot key={i} {...address} />);
  }

  render() {
    const heatmapOptions = {
      options: {
        radius: 40,
        opacity: 0.7,
        gradient: ['rgba(0, 255, 255, 0)', 'rgba(255, 0, 255, 1)', 'rgba(255, 255, 0, 2)'],
      },
      positions: this.state.data,
    };
    if (this.state.data.length === 0) {
      return <Icon type='loading' />;
    }
    return (
      <Col span={19} className='map-container'>
        <div className='map-wrapper fullscreen'>
          <GoogleMapReact
            className='google-map'
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
