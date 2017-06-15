import React from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory} from 'react-router'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import devToolsEnhancer from 'remote-redux-devtools'
import rootReducer from './reducers'
import routes from './routes'
import './shared/scss/base.scss'


const enhancers = compose(applyMiddleware(thunkMiddleware), devToolsEnhancer({
  hostname: 'localhost',
  port: 8000
}))

const reducers = combineReducers(rootReducer)

const store = createStore(
  reducers,
  enhancers
)

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={hashHistory}
      routes={routes}
    />
  </Provider>,
  document.getElementById('root')
)

