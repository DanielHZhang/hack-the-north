import React, {PureComponent} from 'react';
import {Menu, Row} from 'antd';

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
      <Row className='nav-bar'>
        <Menu mode='horizontal' selectable={false}>
          <Item>Mapitude</Item>
        </Menu>
      </Row>
    );
  }
}

export default NavBar;
