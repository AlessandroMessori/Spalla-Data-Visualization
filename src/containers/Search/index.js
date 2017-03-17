import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import SearchBar from '../../components/SearchBar/'
import ClassSelector from '../../components/ClassSelector/'
import SearchResult from '../../components/SearchResult'
import Spinner from '../../components/Spinner'
import {loadInitialData, filterChange, clearFilters} from '../../actions'
import {currentTeachers} from '../../selectors'
import './searchPage.scss'

const mapStateToProps = (state) => ({
  filters: state.filters,
  data: state.data,
  loading: state.loadingState,
  currentTeachers: currentTeachers(state)
})

const mapDispatchToProps = (dispatch) => ({
  filterChange: (value, source) => dispatch(filterChange(value, source)),
  clearFilters: () => dispatch(clearFilters()),
  loadInitialData: () => dispatch(loadInitialData())
})

class Search extends React.Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {

    const {currentTeachers, loading, filters, data}  = this.props
    const {filterChange, clearFilters} = this.props

    return (<section className="searchPage">
      <h1 className="page-header">Cerca {this.props.params.type}</h1>
      {loading && <Spinner/>}
      {
        !loading &&
        <section>
          <SearchBar value={filters.search}
                     onChange={(event) => filterChange(event.target.value, 'search')}/>
          <ClassSelector options={data.cls} defaultValue={filters.cls}
                         value={filters.cls}
                         onChange={(event) => filterChange(event.target.value, 'cls')}/>
          <Button onClick={clearFilters}>Pulisci Filtri
          </Button>
          <SearchResult results={currentTeachers}/>
        </section>
      }
    </section>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

