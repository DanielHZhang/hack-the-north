import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Popover, Divider} from 'antd';

class Heatmap extends Component {
  static propTypes = {
    $geoService: PropTypes.shape({getZoom: PropTypes.func}),
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  locationInfo = () => (
    <div className='businessData'>
      <div><span>Average Age:</span> {Math.round(this.props.averageAge)}</div>
      <Divider />
      <div> <span>Average Income:</span>  {Math.round(this.props.averageIncome)}</div>
      <Divider />
      <div>Female: {this.props.genderDistribution.female}</div>
      <Divider />
      <div>Male: {this.props.genderDistribution.male}</div>
      <Divider />
      <div>Married: {this.props.relationshipDistribution.married}</div>
      <Divider />
      <div>Single: {this.props.relationshipDistribution.single}</div>
      <Divider />
      <div>Num of Transactions: {this.props.numOfTransactions}</div>
      <Divider />
      <div>Total Amount spent: ${Math.round(this.props.totalAmountSpent)}</div>
      <Divider />
      <div>Average amount spent: ${Math.round(this.props.averageAmountSpent)}</div>
    </div>
  );

  render() {
    const zoom = this.props.$geoService.getZoom();
    const style = {
      width: `${2 * zoom}px`,
      height: `${2 * zoom}px`,
      transform: 'translateX(-15px)',
    };
    console.log(this.props);
    return (
      <Popover
        trigger='click'
        title={this.props.merchantName}
        // style={{transform: 'translateX(-5px)'}}
        content={this.locationInfo()}
      >
        <div className='dot' style={style} />
      </Popover>
    );
  }
}

export default Heatmap;
