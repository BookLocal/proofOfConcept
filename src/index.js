import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'
import { AragonApp } from '@aragon/ui'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import Profile from './user/layouts/profile/Profile'

// Redux Store
import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <AragonApp publicUrl="/">
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
            <Route path="profile" component={UserIsAuthenticated(Profile)} />
          </Route>
        </AragonApp>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
