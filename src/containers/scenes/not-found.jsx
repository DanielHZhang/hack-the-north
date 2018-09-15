import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Row, Icon} from 'antd';

const {Content} = Layout;

export default class NotFound extends PureComponent {
  static defaultProps = {
    heading: 'Sorry, the page you are looking for isn\'t available.',
    sub: 'The link you followed may be broken, or the page may have been removed.',
  };

  render() {
    return (
      <Layout style={{padding: '3% 5%'}}>
        <Content style={{textAlign: 'center'}}>
          <Row type='flex' align='middle' justify='center'>
            <Icon type='exclamation-circle-o' style={{fontSize: '200px', marginBottom: '20px'}} />
            <div style={{fontSize: '20px'}}>
              <div>{this.props.heading}</div>
              <div>{this.props.sub}</div>
              <Link to='/'>Home</Link>
            </div>
          </Row>
        </Content>
      </Layout>
    );
  }
}
