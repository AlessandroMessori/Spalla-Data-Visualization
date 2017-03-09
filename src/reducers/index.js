import {combineReducers} from 'redux'

const test = (state='test', action) => {
  switch (action.type) {
    default:
      return state
  }
}

const rootReducer = combineReducers({
  test
})

export default rootReducer
