import React, { Component } from 'react';
import { Route, Redirect} from 'react-router-dom';
import { isRegistratedUser } from '../services/AuthTokensApi';

class PrivateRoute extends Component {
  state = {
    haveAcces: false,
    loaded: false,
  }

  componentDidMount() {
    this.checkAcces();
  }

  checkAcces = () => {
    const { history } = this.props;
    let { haveAcces } = this.state;

    isRegistratedUser()
      .then(is_logged => {
        haveAcces = is_logged
        this.setState({
          haveAcces,
          loaded: true, 
        });
      })
      .catch(() => {
        history.push('/');
      });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { loaded, haveAcces } = this.state;
    if (!loaded) return null;
    return (
      <Route
        {...rest}
        render={props => {
          return haveAcces ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          );
        }}
      />
    );
  }
}

export default PrivateRoute;