import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import Home from './containers/scenes/home';
import NotFound from './containers/scenes/not-found';

class App extends PureComponent {
  routes = [
    {
      path: '/',
      component: Home,
      exact: true,
      auth: false,
    },
    {
      path: '*',
      component: NotFound,
      exact: false,
      auth: false,
    },
  ];

  render() {
    return (
      <BrowserRouter>
        <Layout className='fullscreen' role='main'>
          <Switch>
            {this.routes.map(({component, path, exact}, index) => (
              <Route
                key={index}
                path={path}
                exact={exact}
                component={component}
              />
            ))}
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
