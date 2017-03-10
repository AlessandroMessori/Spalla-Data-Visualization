import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import devToolsEnhancer from 'remote-redux-devtools'
import rootReducer from './reducers'
import routes from './routes'
import './shared/scss/base.scss'

const enhancers = compose(applyMiddleware(thunkMiddleware), devToolsEnhancer({
  hostname: 'localhost',
  port: 8000
}))

const store = createStore(
  rootReducer,
  enhancers
)

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes}
    />
  </Provider>,
  document.getElementById('root')
)

