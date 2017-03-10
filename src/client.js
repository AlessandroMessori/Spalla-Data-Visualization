import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import devToolsEnhancer from 'remote-redux-devtools'
import rootReducer from './reducers'
import routes from './routes'
import './shared/scss/base.scss'

const enhancers = compose(applyMiddleware(thunkMiddleware), devToolsEnhancer({
  hostname: 'localhost',
  port: 8000
}))

const reducers = combineReducers({
  ...rootReducer,
  routing: routerReducer
})

const store = createStore(
  reducers,
  enhancers
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
    />
  </Provider>,
  document.getElementById('root')
)

