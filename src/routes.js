import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/App'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Test from './containers/Test'


const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='/test' component={Test}/>
    <Route path='*' component={NotFound}/>
  </Route>
)

export default routes
