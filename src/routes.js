import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/App'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Search from './containers/Search'
import Teacher from './containers/Teacher'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='/cerca/:type' component={Search}/>
    <Route path='/docenti/:id' component={Teacher}/>
    <Route path='*' component={NotFound}/>
  </Route>
)

export default routes
