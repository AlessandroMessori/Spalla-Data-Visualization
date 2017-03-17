import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import SearchBar from '../../components/SearchBar/'
import ClassSelector from '../../components/ClassSelector/'
import SearchResult from '../../components/SearchResult'
import Spinner from '../../components/Spinner'
import {loadInitialData, updateFilters, resetFilters} from '../../actions'
import './searchPage.scss'

const mapStateToProps = (state) => ({
  filters: state.filters,
  data: state.data,
  loading: state.loadingState,
  currentTeachers: state.currentTeachers
})

const mapDispatchToProps = (dispatch) => ({
  updateFilters: (filters, value, source, teachers) => dispatch(updateFilters(filters, value, source, teachers)),
  resetFilters: (teachers) => dispatch(resetFilters(teachers)),
  loadInitialData: () => dispatch(loadInitialData())
})

class Search extends React.Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (<section className="searchPage">
      <h1 className="page-header">Cerca {this.props.params.type}</h1>
      {this.props.loading && <Spinner/>}
      {
        !this.props.loading &&
        <section>
          <SearchBar value={this.props.filters.search}
                     onChange={(event) => this.props.updateFilters(this.props.filters, event.target.value, 'search', this.props.data.teachers)}/>
          <ClassSelector options={this.props.data.cls} defaultValue={this.props.filters.cls}
                         value={this.props.filters.cls}
                         onChange={(event) => this.props.updateFilters(this.props.filters, event.target.value, 'cls', this.props.data.teachers)}/>
          <Button onClick={() => this.props.resetFilters(this.props.data.teachers)}>Pulisci Filtri
          </Button>
          <SearchResult results={this.props.currentTeachers}/>
        </section>
      }
    </section>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

