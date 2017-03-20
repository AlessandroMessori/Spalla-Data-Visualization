import React from 'react'
import {Link} from 'react-router'
import './searchResult.scss'

class SearchResult extends React.Component {

  constructor(props) {
    super(props)
    this.renderResult = this.renderResult.bind(this)
  }

  renderResult() {
    let results = []
    this.props.results.map(result => {
      const name = `${result.nome} ${result.cognome}`
      return results.push(<article key={name} className="panel panel-default">
        <Link to={`/docenti/${result.id}/${name}`} className="panel-body">{name}</Link>
      </article>)
    })
    return results
  }

  render() {
    return (<section className="searchResult">
      {this.renderResult()}
    </section>)
  }

}

export default SearchResult
