import React from 'react'
import {Panel} from 'react-bootstrap'
import ResultHeading from './resultHeading'
import './resultList.scss'

const ResultList = (props) => {
  const results = []

  if (!props.results.length) return null

  if (props.results.length === 0) return (<p>Nessun Risultato Trovato</p>)

  props.results.map(res => {
    const {idDocente, nomeDocente, cognomeDocente, materiaDocente, idClasse, voto} = res;
    return results.push(<Panel className='row'>
      <span className="col-md-2">{idDocente}</span>
      <span className="col-md-2">{nomeDocente}</span>
      <span className="col-md-2">{cognomeDocente}</span>
      <span className="col-md-2">{materiaDocente}</span>
      <span className="col-md-2">{voto}</span>
      <span className="col-md-2">{idClasse}</span>
    </Panel>)
  })

  return (<section className='result-section'>
    <h3>{props.results.length} Risultati</h3>
    <hr/>
    <ResultHeading/>
    {results}
  </section>)
}


export default ResultList
