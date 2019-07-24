import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import { loginHelper } from './stitch/authenticate';
import { Growl } from 'primereact/growl';
import Posts from './components/Posts';
import {posts} from './stitch/mongodb';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isAuthenticated: false,
      authenticatedUser: null
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Growl ref={(el) => this.growl = el} />
          <Switch>
            <Route path="/" exact={true} render={props => <Login {...props} onAuthenticate={this.onAuthenticate} postsHandle={posts}/>} />
            <Route path="/posts" component={Posts}/>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }

  onAuthenticate = (userName, password, cb) => {
    loginHelper.authenticate(userName, password).then(authenticatedUser => {
      this.setState(prevState => ({
        isAuthenticated: true,
        authenticatedUser
      }), () => {
        this.showGrowl('success', 'Login Successful', 'Redirecting to Posts...');
        setTimeout(() => {
          cb();
        }, 1000)
      })
    }).catch(err => {
      this.showGrowl('error', `Login failed - ${err}`, 'Please check your credentials.');
    })
  }

  showGrowl(severity, summary, detail) {
    this.growl.show({ severity, summary , detail});
  }

}

export default App;
