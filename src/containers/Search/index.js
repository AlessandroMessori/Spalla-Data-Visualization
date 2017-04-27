import React from 'react'
import {connect} from 'react-redux'
import {PageHeader, Button} from 'react-bootstrap'
import SearchBar from '../../components/SearchBar/'
import ClassSelector from '../../components/ClassSelector/'
import SearchResult from '../../components/SearchResult'
import QuestionList from '../../components/QuestionList'
import Spinner from '../../components/Spinner'
import {filterChange, clearFilters} from '../../actions'
import {currentTeachers} from '../../selectors'
import './index.scss'

const mapStateToProps = (state) => ({
  filters: state.filters,
  data: state.data,
  loading: state.loadingState,
  currentTeachers: currentTeachers(state)
})

const mapDispatchToProps = (dispatch) => ({
  filterChange: (value, source) => dispatch(filterChange(value, source)),
  clearFilters: () => dispatch(clearFilters())
})

class Search extends React.Component {


  render() {

    const {currentTeachers, loading, filters, data} = this.props
    const {filterChange, clearFilters} = this.props
    const {questions} = data
    const categories = (data.teachers) ? Array.from(new Set(data.teachers.map(item => item.tipo_materia))) : []
    const location = this.props.params.type

    return (<section className="searchPage">
      <PageHeader>{(location === 'docenti') ? 'Seleziona il Docente' : 'Seleziona la Domanda'}</PageHeader>
      {loading && <Spinner/>}
      {
        !loading &&
        <section>
          {location === 'docenti' && <section>
            <SearchBar value={filters.search}
                       onChange={(event) => filterChange(event.target.value, 'search')}/>
            <ClassSelector options={categories} value={filters.cls}
                           onChange={(event) => filterChange(event.target.value, 'cls')}/>
            <Button onClick={clearFilters}>Pulisci Filtri
            </Button>
          </section>
          }
          {location === 'docenti' && <SearchResult results={currentTeachers}/>}
          {location === 'domande' && <QuestionList questions={questions}/>}
        </section>
      }
    </section>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

