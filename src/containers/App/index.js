import React from 'react'
import {connect} from 'react-redux'
import {loadInitialData} from '../../actions'
import './index.scss'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  loadInitialData: () => dispatch(loadInitialData())
})

class App extends React.Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (<div>{this.props.children}</div>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
