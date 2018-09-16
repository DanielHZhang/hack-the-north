import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Col, Menu, Radio, Select, Row, Layout, Slider, Divider} from 'antd';
import {filterBy} from '../actions';
import {debounce} from '../reducers/utils';

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

  onAgeChange = debounce((event) => {
    this.props.filterBy('age', event);
  }, 200);

  onIncomeChange = debounce((event) => {
    console.log(event);
    this.props.filterBy('income', event);
  }, 200);

  onMartialChange = (event) => {
    // console.log(event);
    this.props.filterBy(event.target.value);
  };

  onGenderChange = (event) => {
    // console.log(event);
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
    const ageMarks = {0: 0, 120: 120};
    return (
      <Sider className='side-bar' width={250} theme='light'>
        <Row>
          <div style={{fontWeight: 500, marginBottom: '4px', fontSize: '16px'}}>Search by name:</div>
          <Select defaultValue='Everyone' showSearch={true} onSelect={this.onSelect}>
            {this.renderOptions(this.props.names)}
          </Select>
        </Row>
        <Divider style={{margin: '18px 0 10px 0'}} />
        <Row>
          <div style={{fontWeight: 500, marginBottom: '4px', fontSize: '16px'}}>Gender:</div>
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
        <Divider style={{margin: '18px 0 10px 0'}} />
        <Row>
          <div style={{fontWeight: 500, marginBottom: '4px', fontSize: '16px'}}>Marital status:</div>
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
        <Divider style={{margin: '18px 0 10px 0'}} />
        <Row>
          <div style={{fontWeight: 500, marginBottom: '4px', fontSize: '16px'}}>Annual income:</div>
          <Slider
            range={true}
            min={0}
            max={500000}
            defaultValue={[0, 500000]}
            marks={marks}
            onChange={this.onIncomeChange}
          />
        </Row>
        <Divider style={{margin: '18px 0 10px 0'}} />
        <Row>
          <div style={{fontWeight: 500, marginBottom: '4px', fontSize: '16px'}}>Age range:</div>
          <Slider
            range={true}
            min={0}
            max={120}
            defaultValue={[0, 120]}
            marks={ageMarks}
            onChange={this.onAgeChange}
          />
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
