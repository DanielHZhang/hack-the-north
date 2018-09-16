import React, {PureComponent} from 'react';
import {Layout} from 'antd';
import Map from '../../components/map';
import SideBar from '../../components/sidebar';
import NavBar from '../../components/navbar';

const {Content} = Layout;

class Home extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <NavBar />
        <Layout>
          <SideBar />
          <Content>
            <Map />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
