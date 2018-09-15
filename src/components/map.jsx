import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import HeatDot from './heat-dot';
import {GOOGLE_API_KEY} from '../keys';
import {Col} from 'antd';
import Firebase from 'firebase';
import '@firebase/storage';
import tranData from '../simpleTranData.json';
// import file from '../tdfile.json';

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

  componentDidMount() {
    console.log(tranData);
    // const obj = [];
    // // console.log(tdTransactionJSON);
    // tdTransactionJSON.map((cardObject, i) => {
    //   if (cardObject.Type == 'VISA' && obj.length < 25) {
    //     obj.push({
    //       balance: cardObject.Balance,
    //       customerName: cardObject.Cards[0].NameOnCard,
    //       customerId: cardObject.Cards[0].CustomerId,
    //       transactions: cardObject.Transactions.splice(1)
    //     });
    //   }
    // });
    // // console.log('final!', obj);
    // this.setState({transData: obj});
    // Firebase.initializeApp(firebaseConfig);
    // this.setState({firebaseStorage: Firebase.storage()});
  }

  renderHeatDots() {
    return this.state.data.map((e, i) => <HeatDot key={i} {...e} />);
  }

  render() {
    console.log(this.state.transData);
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
