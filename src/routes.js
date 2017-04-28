import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './containers/App'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Search from './containers/Search'
import Teacher from './containers/Teacher'
import OverView from './containers/Overview'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='/cerca/:type' component={Search}/>
    <Route path='/docenti/:id/:name' component={Teacher}/>
    <Route path='/panoramica' component={OverView}/>
    <Route path='*' component={NotFound}/>
  </Route>
)

export default routes
