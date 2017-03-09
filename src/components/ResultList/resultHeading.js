import React from 'react'
import {Panel} from 'react-bootstrap'


const ResultHeading = () => {
  return (<Panel className='row'>
      <strong className="col-md-2">ID Docente</strong>
      <strong className="col-md-2">Nome</strong>
      <strong className="col-md-2">Cognome</strong>
      <strong className="col-md-2">Materia</strong>
      <strong className="col-md-2">Voto</strong>
      <strong className="col-md-2">Classe</strong>
    </Panel>

  )
}

export default ResultHeading
