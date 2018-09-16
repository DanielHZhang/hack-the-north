import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import HeatDot from './heat-dot';
import {GOOGLE_API_KEY} from '../keys';
import {Col, Icon} from 'antd';
import Firebase from 'firebase';
// import '@firebase/storage';
// import tranData from '../simpleTranData.json';
import customerData from '../CustomerData.json';

const firebaseConfig = {
  apiKey: 'AIzaSyA7NJkHK-UA--JVDQtUj7hX9IXWiKYuw-I',
  authDomain: 'mapitude-bdcaa.firebaseapp.com',
  databaseURL: 'https://mapitude-bdcaa.firebaseio.com',
  projectId: 'mapitude-bdcaa',
  storageBucket: 'mapitude-bdcaa.appspot.com',
  messagingSenderId: '104504510528',
};

function getAllStreets(fullJson) {
  const streets = {};
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((t) => {
      if (streets[t.locationStreet]) {
        return;
      }
      streets[t.locationStreet] = t.locationStreet;
    });
  });
  return Object.values(streets);
}

function getAverage(fullJson, street, key) {
  const parameter = [];
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((t) => {
      if (t.locationStreet === street) {
        parameter.push(client[key]);
      }
    });
  });
  const total = parameter.reduce((acc, val) => acc + val, 0);
  return total / parameter.length;
}

function getGenderCount(fullJson, street) {
  const parameter = {female: 0, male: 0};
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((t) => {
      if (t.locationStreet === street) {
        if (client.gender === 'Female') {
          parameter.female += 1;
        } else {
          parameter.male += 1;
        }
      }
    });
  });
  return parameter;
}

function getRelationshipCount(fullJson, street) {
  const parameter = {single: 0, married: 0};
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((t) => {
      if (t.locationStreet === street) {
        if (client.relationshipStatus === 'Married') {
          parameter.married += 1;
        } else {
          parameter.single += 1;
        }
      }
    });
  });
  return parameter;
}

function getNumberOfTransactions(fullJson, street) {
  let parameter = 0;
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((t) => {
      if (t.locationStreet === street) {
        parameter++;
      }
    });
  });
  return parameter;
}

function getTotalAmountSpent(fullJson, street) {
  let parameter = 0;
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((t) => {
      if (t.locationStreet === street) {
        parameter += t.currencyAmount;
      }
    });
  });
  return parameter;
}

function getAverageAmountSpent(fullJson, street) {
  const parameter = [];
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((t) => {
      if (t.locationStreet === street) {
        parameter.push(t.currencyAmount);
      }
    });
  });
  const total = parameter.reduce((acc, val) => acc + val, 0);
  return total / parameter.length;
}

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
    this.clientData = customerData.customerList;
    this.businessData = {};
  }

  componentDidMount() {
    // Loop through all the data with the business address as the the key in the map.
    // Calculate average age, gender, income, etc and add it to the value in map.

    // Now map with each address associated with it's stats.

    const transArr = [];
    console.log(this.clientData);
    this.clientData.forEach((user) => {
      if (!user.transactions) {
        return;
      }
      user.transactions.forEach((transaction) => {
        if (transaction.locationLatitude && transaction.locationLongitude) {
          const lat = transaction.locationLatitude.toString().substring(0, 6);
          const long = transaction.locationLongitude.toString().substring(0, 6);
          const key = lat.concat(long);

          this.addressMap[key] = {
            lat: transaction.locationLatitude.toString(),
            lng: transaction.locationLongitude.toString(),
            merchantName: transaction.merchantName,
            address: transaction.locationStreet,
          };

          transArr.push({
            lat: transaction.locationLatitude.toString(),
            lng: transaction.locationLongitude.toString(),
          });
        }
      });
    });
    this.setState({data: transArr});
    getAllStreets(this.clientData).forEach((street) => {
      if (!street) {
        return;
      }
      this.businessData[street] = {
        averageAge: getAverage(this.clientData, street, 'age'),
        averageIncome: getAverage(this.clientData, street, 'totalIncome'),
        genderDistribution: getGenderCount(this.clientData, street),
        relationshipDistribution: getRelationshipCount(this.clientData, street),
        numOfTransactions: getNumberOfTransactions(this.clientData, street),
        totalAmountSpent: getTotalAmountSpent(this.clientData, street),
        averageAmountSpent: getAverageAmountSpent(this.clientData, street),
      };
    });
  }

  renderHeatDots() {
    return Object.values(this.addressMap).map((address, i) => (
      <HeatDot key={i} {...address} {...this.businessData[address.address]} />
    ));
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
