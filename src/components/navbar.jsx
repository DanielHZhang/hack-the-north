import React, {PureComponent} from 'react';
import {Menu, Row, Layout} from 'antd';

const {Header} = Layout;
const {Item} = Menu;

class NavBar extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Header className='nav-bar'>
        <Menu mode='horizontal' selectable={false} theme='light'>
          <Item>Mapitude</Item>
        </Menu>
      </Header>
    );
  }
}

export default NavBar;
