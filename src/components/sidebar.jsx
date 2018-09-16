import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Col, Menu, Radio, Select, Row, Layout} from 'antd';
import {filterBy} from '../actions';

const {Sider} = Layout;
const {Item} = Menu;
const {Group} = Radio;
const {Option} = Select;

class SideBar extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  onGenderChange = (event) => {
    console.log(event);
    this.props.filterBy(event.target.value);
  };

  renderOptions(array) {
    return array.map((e) => <Option key={e}>{e.slice(37)}</Option>);
  }

  render() {
    return (
      <Sider className='side-bar' width={250} theme='light'>
        <Row>
          <Group onChange={this.onGenderChange}>
            Gender:
            <Radio className='radio-item' value='both'>
              All
            </Radio>
            <Radio className='radio-item' value='female'>
              Female
            </Radio>
            <Radio className='radio-item' value='male'>
              Male
            </Radio>
          </Group>
        </Row>
        <Row>
          Search by id:
          <Select defaultValue={this.props.ids[0]} showSearch={true}>
            {this.renderOptions(this.props.ids)}
          </Select>
        </Row>
      </Sider>
    );
  }
}

function mapStateToProps({ids}) {
  return {
    ids,
  };
}

export default connect(
  mapStateToProps,
  {filterBy}
)(SideBar);
