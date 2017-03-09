import React from 'react'
import {connect} from 'react-redux'
import {PageHeader, FormControl, ButtonToolbar, Panel, Button} from 'react-bootstrap'
import ResultList from '../../components/ResultList'
import Spinner from '../../components/Spinner'
import {textChange, limitChange, getRequest} from '../../actions'
import './test.scss'

const mapStateToProps = (state) => {
  return {
    data: state.data,
    filters: state.filters,
    loadingState: state.loadingState,
    limit: state.limit
  }
}

const mapDispatchToProps = (dispatch) => ({
  textChange: (value, source) => dispatch(textChange(value, source)),
  limitChange: (limit) => dispatch(limitChange(limit)),
  getRequest: (where, limit) => dispatch(getRequest(where, limit))
});

class Test extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
  }


  render() {
    return (<section>
      <PageHeader>Pagina Di Testing</PageHeader>
      <Panel className='test-form'>
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
                     onChange={(event) => this.props.textChange(event.target.value, 'materiaDocente')}/>
        <FormControl className='test-input' type='text' placeholder='ID Classe'
                     onChange={(event) => this.props.textChange(event.target.value, 'idClasse')}/>
        <FormControl className='test-input' type='text' placeholder='ID Studente'
                     onChange={(event) => this.props.textChange(event.target.value, 'idStudente')}/>
        <FormControl className='test-input' type='text' placeholder='Voto'
                     onChange={(event) => this.props.textChange(event.target.value, 'voto')}/>
        <br/>
        <FormControl className='test-input' type='number' placeholder='Limita Risultati'
                     onChange={(event) => this.props.limitChange(event.target.value)}/>
        <ButtonToolbar>
          <Button bsStyle="primary" className="test-button"
                  onClick={() => this.props.getRequest(this.props.filters, this.props.limit)}>Invia
          </Button>
        </ButtonToolbar>
      </Panel>
      { (this.props.data.length <= 0) && (this.props.loadingState) && (<Spinner/>)}
      <ResultList results={this.props.data}/>
    </section>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
