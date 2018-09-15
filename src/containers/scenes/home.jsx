import React, {PureComponent} from 'react';
import {Layout, Button, Menu} from 'antd';

const {Sider, Content, Header} = Layout;

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
        <Header>
          <Menu>
            <Menu.Item>Test</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={250} theme='light'>
            <Menu>
              <Menu.Item>Test</Menu.Item>
            </Menu>
          </Sider>
          <Content>
            <Button type='primary'>Test</Button>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
