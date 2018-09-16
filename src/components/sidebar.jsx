import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Col, Menu, Radio, Select, Row, Layout, Slider, Divider} from 'antd';
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

  onMartialChange = (event) => {
    // console.log(event);
    this.props.filterBy(event.target.value);
  }

  onGenderChange = (event) => {
    console.log(event);
    this.props.filterBy(event.target.value);
  };

  renderOptions(array) {
    return array.map((e) => <Option key={e}>{e}</Option>).concat(<Option key='everyone'>Everyone</Option>);
  }

  onSelect = (name) => {
    if (name === 'everyone') {
      return this.props.filterBy('both');
    }
    // console.log(name);
    this.props.filterBy('name', name);
  };

  render() {
    const marks = {0: '$0', 500000: '$500k'};
    return (
      <Sider className='side-bar' width={250} theme='light'>
        <Row>
          <div style={{fontWeight: 500, marginBottom: '4px'}}>Search by name:</div>
          <Select defaultValue='Everyone' showSearch={true} onSelect={this.onSelect}>
            {this.renderOptions(this.props.names)}
          </Select>
        </Row>
        <Divider style={{margin: '12px 0 6px 0'}} />
        <Row>
          <div style={{fontWeight: 500, marginBottom: '4px'}}>Gender:</div>
          <Group onChange={this.onGenderChange} defaultValue='both'>
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
        <Divider style={{margin: '12px 0 6px 0'}} />
        <Row>
          <div style={{fontWeight: 500, marginBottom: '4px'}}>Marital status:</div>
          <Group onChange={this.onMartialChange} defaultValue='marital-both'>
            <Radio className='radio-item' value='marital-both'>
              All
            </Radio>
            <Radio className='radio-item' value='single'>
              Single
            </Radio>
            <Radio className='radio-item' value='married'>
              Married
            </Radio>
          </Group>
        </Row>
        <Divider style={{margin: '12px 0 6px 0'}} />
        <Row>
          <div style={{fontWeight: 500, marginBottom: '4px'}}>Annual income:</div>
          <Slider range={true} min={0} max={500000} marks={marks} />
        </Row>
        <Divider style={{margin: '12px 0 6px 0'}} />
        <Row>
          <div style={{fontWeight: 500, marginBottom: '4px'}}>Age range:</div>
          <Slider range={true} />
        </Row>
      </Sider>
    );
  }
}

function mapStateToProps({ids}) {
  return {
    names: ids,
  };
}

export default connect(
  mapStateToProps,
  {filterBy}
)(SideBar);
