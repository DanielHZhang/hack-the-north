import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Layout, Button, Row, Icon} from 'antd';
import {Trail, interpolate, animated} from 'react-spring';
import Particles from 'particlesjs';

class Landing extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      title: 'M A P I T U D E',
    };
    this.screenWidth = 0;
  }

  componentDidMount() {
    this.screenWidth = window.screen.width;
    setTimeout(() => this.setState({loaded: true}), 1000);
    Particles.init({
      selector: '#background',
      connectParticles: true,
      color: '#ffffff',
    });
  }

  renderTitle() {
    const split = this.state.title.split(' ');
    const from = {opacity: 0, x: 0, deg: 180};
    const to = {opacity: 1, x: 70, deg: 0};
    return (
      <Trail from={from} to={to} keys={split.map((e, i) => i)}>
        {split.map((letter, i) => ({opacity, x, deg}) => {
          let translateX;
          if (i === 1) {
            translateX = x * i + 6;
          }
          if (i === 2) {
            translateX = x * i + 5;
          }
          if (i === 3) {
            translateX = x * i - 10;
          }
          if (i > 3) {
            translateX = x * i - 15;
          }
          const style = {
            left: `${this.screenWidth / 2 - 330}px`,
            opacity,
            transform: `translate(${translateX}px) rotateY(${deg}deg)`,
          };
          return (
            <span key={i} style={style} className='letter'>
              {letter}
            </span>
          );
        })}
      </Trail>
    );
    // return split.map((letter, i) => <span key={i} className='letter'>{letter}</span>);
  }

  renderLoading() {
    if (this.state.loaded) {
      return (
        <>
          <Row className='header'>
            {this.renderTitle()}
            <span style={{visibility: 'hidden'}}>.</span>
          </Row>
          <Row className='sub' type='flex' justify='center'>
            <Button type='primary'>Get Started</Button>
          </Row>
        </>
      );
    }
    return <Icon type='loading' />;
  }

  render() {
    return (
      <Layout className='landing'>
        <canvas id='background' />
        <div style={{zIndex: 10}}>{this.renderLoading()}</div>
      </Layout>
    );
  }
}

export default Landing;
