import React from 'react'
import {PageHeader, FormControl, ButtonToolbar} from 'react-bootstrap'
import './test.scss'

class Test extends React.Component {

  render() {
    return (<section>
      <PageHeader>Pagina Di Testing</PageHeader>
      <hr/>
      <FormControl className='test-input' type='text' placeholder='ID Votazione'/>
      <FormControl className='test-input' type='text' placeholder='ID Docente'/>
      <FormControl className='test-input' type='text' placeholder='ID Domanda'/>
      <FormControl className='test-input' type='text' placeholder='Nome Docente'/>
      <FormControl className='test-input' type='text' placeholder='Cognome Docente'/>
      <FormControl className='test-input' type='text' placeholder='Materia Docente'/>
      <FormControl className='test-input' type='text' placeholder='ID Classe'/>
      <FormControl className='test-input' type='text' placeholder='ID Studende'/>
      <ButtonToolbar>
        <button className="btn btn-primary btn-lg">Invia</button>
      </ButtonToolbar>
    </section>)
  }

}

export default Test
