import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Popover, Divider, Row, Col} from 'antd';

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
      <Row type='flex' justify='space-between'>
        <Col className='bold'>Average customer age:</Col>
        <Col>{Math.round(this.props.averageAge)}</Col>
      </Row>
      <Divider />
      <Row type='flex' justify='space-between'>
        <Col className='bold'>Average customer income:</Col>
        <Col>${Math.round(this.props.averageIncome)}</Col>
      </Row>
      <Divider />
      <Row type='flex' justify='space-between'>
        <Col className='bold'>Total spent in establishment:</Col>
        <Col>${Math.round(this.props.totalAmountSpent)}</Col>
      </Row>
      <Divider />
      <Row type='flex' justify='space-between'>
        <Col className='bold'>Average spent per visit:</Col>
        <Col>${Math.round(this.props.averageAmountSpent)}</Col>
      </Row>
    </div>
  );

  render() {
    const zoom = this.props.$geoService.getZoom();
    const style = {
      width: `${2 * zoom}px`,
      height: `${2 * zoom}px`,
      transform: 'translate(-15px, -10px)',
    };
    return (
      <Popover
        overlayClassName='business-data-popover'
        trigger='click'
        title={this.props.merchantName}
        content={this.locationInfo()}
      >
        <div className='dot' style={style} />
      </Popover>
    );
  }
}

export default Heatmap;
