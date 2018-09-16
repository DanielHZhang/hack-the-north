import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Layout, Button, Row, Icon, Col} from 'antd';
import {Trail, interpolate, animated} from 'react-spring';
import Particles from 'particlesjs';
import {Link} from 'react-router-dom';

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
    return <div>MAPITUDE</div>;
    // return split.map((letter, i) => <span key={i} className='letter'>{letter}</span>);
  }

  renderLoading() {
    if (this.state.loaded) {
      return (
        <>
          <div className='headerContainer'>
            <Row span={24} className='headerTitleContainer'>
              MAPITUDE
            </Row>
            <Row span={24} className='headerButtonContainer'>
              <Button type='primary' className='headerButton'>
                <Link to='/'>Get Started</Link>
              </Button>
            </Row>
          </div>
        </>
      );
    }
    return <Icon type='loading' />;
  }

  render() {
    return (
      <Layout className='landing'>
        <div className='fullscreen landingBackground' />
        <canvas id='background' />
        <div style={{zIndex: 10}}>{this.renderLoading()}</div>
      </Layout>
    );
  }
}

export default Landing;
