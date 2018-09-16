import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import HeatDot from './heat-dot';
import {GOOGLE_API_KEY} from '../keys';
import {Col, Icon} from 'antd';
import Firebase from 'firebase';
// import '@firebase/storage';
// import tranData from '../simpleTranData.json';
import customerData from '../CustomerData.json';
import {connect} from 'react-redux';

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
      renderDots: true,
      renderMap: true,
    };
    this.defaultCenter = {
      lat: 43.7050628845,
      lng: -79.3491207954,
    };
    this.defaultZoom = 14;
    // this.addressMap = {};
    // this.clientData = customerData.customerList;
    // this.businessData = {};
  }

  // componentDidMount() {
  //   // Loop through all the data with the business address as the the key in the map.
  //   // Calculate average age, gender, income, etc and add it to the value in map.

  //   // Now map with each address associated with it's stats.

  //   const transArr = [];
  //   console.log(this.clientData);
  //   this.clientData.forEach((user) => {
  //     if (!user.transactions) {
  //       return;
  //     }
  //     user.transactions.forEach((transaction) => {
  //       if (transaction.locationLatitude && transaction.locationLongitude) {
  //         // const lat = transaction.locationLatitude.toString().substring(0, 6);
  //         // const long = transaction.locationLongitude.toString().substring(0, 6);
  //         // const key = lat.concat(long);
  //         const key = transaction.locationStreet;

  //         this.addressMap[key] = {
  //           lat: transaction.locationLatitude.toString(),
  //           lng: transaction.locationLongitude.toString(),
  //           merchantName: transaction.merchantName,
  //           address: transaction.locationStreet,
  //         };

  //         transArr.push({
  //           lat: transaction.locationLatitude.toString(),
  //           lng: transaction.locationLongitude.toString(),
  //         });
  //       }
  //     });
  //   });
  //   this.addressMap = Object.values(this.addressMap);
  //   this.setState({data: transArr});
  //   getAllStreets(this.clientData).forEach((street) => {
  //     if (!street) {
  //       return;
  //     }
  //     this.businessData[street] = {
  //       averageAge: getAverage(this.clientData, street, 'age'),
  //       averageIncome: getAverage(this.clientData, street, 'totalIncome'),
  //       genderDistribution: getGenderCount(this.clientData, street),
  //       relationshipDistribution: getRelationshipCount(this.clientData, street),
  //       numOfTransactions: getNumberOfTransactions(this.clientData, street),
  //       totalAmountSpent: getTotalAmountSpent(this.clientData, street),
  //       averageAmountSpent: getAverageAmountSpent(this.clientData, street),
  //     };
  //   });
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.fullData !== this.props.fullData) {
      console.log('?');
      // this.googleMap.current.heatmap = {...this.googleMap.current.heatmap, data: ...this.props.data};
      // this.googleMap.current.forceUpdate();
      this.setState({renderMap: false});
      setTimeout(() => {
        this.setState({renderMap: true});
        console.log('new render');
      }, 1);
    }
  }

  onMapChange = (event) => {
    this.setState({
      zoom: event.zoom,
      center: event.center,
    });
  }

  startRenderingDots = () => !this.state.renderDots && this.setState({renderDots: true});

  stopRenderingDots = () => this.state.renderDots && this.setState({renderDots: false});

  renderHeatDots() {
    if (!this.state.renderDots) {
      return null;
    }
    return this.props.locationData.map((data, i) => <HeatDot key={i} {...data} />);
  }

  render() {
    if (!this.props.fullData || !this.props.locationData) {
      return <Icon type='loading' />;
    }
    const heatmapOptions = {
      options: {
        radius: 40,
        opacity: 0.7,
        gradient: ['rgba(0, 255, 255, 0)', 'rgba(255, 0, 255, 1)', 'rgba(255, 255, 0, 2)'],
      },
      positions: this.props.fullData,
    };
    return (
      <Col className='map-container' onMouseUp={this.startRenderingDots}>
        <div className='map-wrapper fullscreen'>
          {this.state.renderMap ? <GoogleMapReact
            className='google-map'
            bootstrapURLKeys={{key: GOOGLE_API_KEY}}
            defaultCenter={this.defaultCenter}
            defaultZoom={this.defaultZoom}
            heatmapLibrary={true}
            heatmap={heatmapOptions}
            onDrag={this.stopRenderingDots}
            onChildMouseLeave={this.startRenderingDots}
            onZoomAnimationStart={this.stopRenderingDots}
            onZoomAnimationEnd={this.startRenderingDots}
            onChange={this.onMapChange}
          >
            {this.renderHeatDots()}
          </GoogleMapReact> : <Icon type='loading' />}
        </div>
      </Col>
    );
  }
}

const mapStateToProps = ({filter}) => {
  console.log('filter', filter);
  return {
    fullData: filter.heatMapFullData,
    locationData: filter.heatMapLocationData,
  };
};

export default connect(mapStateToProps)(Map);
