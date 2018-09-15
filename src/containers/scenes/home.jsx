import React, {PureComponent} from 'react';
import {Row, Col} from 'antd';
import Map from '../../components/map-component';
import SideBar from '../../components/sidebar';
import NavBar from '../../components/navbar';

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
        <NavBar />
        <Row className='mapWidget'>
          <SideBar />
          <Col span={19} className='mapContainer'>
            <Map />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
