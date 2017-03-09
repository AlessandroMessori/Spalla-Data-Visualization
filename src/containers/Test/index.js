import React from 'react'
import {connect} from 'react-redux'
import {PageHeader, FormControl, ButtonToolbar} from 'react-bootstrap'
import {textChange, getRequest} from '../../actions'
import './test.scss'

const mapStateToProps = (state) => {
  return {
    data: state.data,
    filters: state.filters,
    loadingState: state.loadingState
  }
}

const mapDispatchToProps = (dispatch) => ({
  textChange: (value, source) => dispatch(textChange(value, source)),
  getRequest: (url) => dispatch(getRequest(url))
});

class Test extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
  }


  render() {
    return (<section>
      <PageHeader>Pagina Di Testing</PageHeader>
      <hr/>
      <FormControl className='test-input' type='text' placeholder='ID Votazione'
                   onChange={(event) => this.props.textChange(event.target.value, 'id')}/>
      <FormControl className='test-input' type='text' placeholder='ID Docente'
                   onChange={(event) => this.props.textChange(event.target.value, 'idDocente')}/>
      <FormControl className='test-input' type='text' placeholder='ID Domanda'
                   onChange={(event) => this.props.textChange(event.target.value, 'idDomanda')}/>
      <FormControl className='test-input' type='text' placeholder='Nome Docente'
                   onChange={(event) => this.props.textChange(event.target.value, 'nomeDocente')}/>
      <FormControl className='test-input' type='text' placeholder='Cognome Docente'
                   onChange={(event) => this.props.textChange(event.target.value, 'cognomeDocente')}/>
      <FormControl className='test-input' type='text' placeholder='Materia Docente'
                   onChange={(event) => this.props.textChange(event.target.value, 'materia')}/>
      <FormControl className='test-input' type='text' placeholder='ID Classe'
                   onChange={(event) => this.props.textChange(event.target.value, 'idClasse')}/>
      <FormControl className='test-input' type='text' placeholder='ID Studente'
                   onChange={(event) => this.props.textChange(event.target.value, 'idStudente')}/>
      <ButtonToolbar>
        <button className="btn btn-primary btn-lg" onClick={() => this.props.getRequest(this.props.filters)}>Invia
        </button>
      </ButtonToolbar>
    </section>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
