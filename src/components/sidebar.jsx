import React, {PureComponent} from 'react';
import {Col, Menu, Radio, Select} from 'antd';

const {Item} = Menu;
const {Group} = Radio;

class SideBar extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Col span={5} className='mapFilters'>
        <Group>
          <Radio className='radio-item' value={1}>Option</Radio>
          <Radio className='radio-item' value={2}>Option 2</Radio>
        </Group>
        <Select>
          <Select.Option key='cool'>Test</Select.Option>
        </Select>
        {/* <Menu>
          <Item>Test</Item>
        </Menu> */}
      </Col>
    );
  }
}

export default SideBar;
