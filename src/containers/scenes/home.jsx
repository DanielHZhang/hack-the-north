import React, {PureComponent} from 'react';
import {Row, Col} from 'antd';
import Map from '../../components/map-component';

class Home extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Row className='headerRow'>
          <h1>Header stuff</h1>
        </Row>
        <Row className='mapWidget'>
          <Col span={5} className='mapFilters'>Tags</Col>
          <Col span={19} className='mapContainer'>
            <Map/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
