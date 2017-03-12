import React from 'react'
import {connect} from 'react-redux'
import SearchBar from '../../components/SearchBar/'
import ClassSelector from '../../components/ClassSelector/'
import SearchResult from '../../components/SearchResult'
import Spinner from '../../components/Spinner'
import {filterChange, clearFilters, loadInitialData} from '../../actions'
import './searchPage.scss'

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    data: state.data,
    loading: state.loadingState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterChange: (value, source) => dispatch(filterChange(value, source)),
    clearFilters: () => dispatch(clearFilters()),
    loadInitialData: () => dispatch(loadInitialData())
  }
}

class Search extends React.Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (<section className="searchPage">
      <h1 className="page-header">Cerca {this.props.params.type}</h1>
      {
        this.props.loading && <Spinner/>
      }
      {
        !this.props.loading && (<section>
          <SearchBar value=''/>
          <ClassSelector options={this.props.data[1]}/>
          <button className="btn btn-default" onClick={this.props.clearFilters}>Pulisci Filtri</button>
          <SearchResult results={[this.props.data[0]]}/>
        </section>)
      }
    </section>)
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(Search)

