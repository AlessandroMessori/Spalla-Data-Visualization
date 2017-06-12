import React from 'react'
import {connect} from 'react-redux'
import {PageHeader, ButtonGroup, Button, Row, Col, Glyphicon} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {Bar, Line} from 'react-chartjs'
import Spinner from '../../components/Spinner'
import {changeVisualType, loadTeacherData, questionChange} from '../../actions'
import {tableData, barData, lineData, teacherStats, currentQuestion} from '../../selectors'
import {dataFormat} from '../../helpers/utils'
import './index.scss'

const mapStateToProps = (state) => ({
  loading: state.loadingState,
  teacherData: state.teacherData,
  visualType: state.visualType,
  questions: state.data.questions,
  tableData: tableData(state),
  barData: barData(state),
  lineData: lineData(state),
  teacherStats: teacherStats(state),
  currentQuestion: currentQuestion(state)
})

const mapDispatchToProps = (dispatch) => ({
  loadTeacherData: (id) => dispatch(loadTeacherData(id)),
  changeVisualType: (visual) => dispatch(changeVisualType(visual)),
  questionChange: (inc) => dispatch(questionChange(inc))
})

class Teacher extends React.Component {


  render() {
    const {visualType, tableData, barData, lineData, teacherStats, questionChange, currentQuestion} = this.props
    const {max, min, avg} = teacherStats
    const {length} = tableData
    const questions = tableData.map(item => item.question)

    return (<section className="teacherSection">


      <PageHeader>{this.props.params.name}</PageHeader>
      {length < 1 && <Spinner />}
      {length > 0 &&
      <section>
        <Row className='stats-section'>
          <Col sm={4}><h2>Media Max: {max}%</h2></Col>
          <Col sm={4}><h2>Media Min: {min}%</h2></Col>
          <Col sm={4}><h2>Media Scuola: {avg}%</h2></Col>
        </Row>
        <ButtonGroup className='selector'>
          <Button active={visualType === 'bar'}
                  onClick={() => this.props.changeVisualType('bar')}>Colonne</Button>
          <Button active={visualType === 'line'}
                  onClick={() => this.props.changeVisualType('line')}>Punti</Button>
          <Button active={visualType === 'table'}
                  onClick={() => this.props.changeVisualType('table')}>Tabella</Button>
        </ButtonGroup>
        <br />
        {visualType === 'bar' &&
        <Bar data={barData} width='700' height='400'/>}
        {visualType === 'line' &&
        <section className="lineSection">
          <Line data={lineData.datasets} width='700' height='400'/>
          <Button onClick={() => questionChange(false)} className='incButton left'>
            <Glyphicon glyph='chevron-left'/>
          </Button>
          <Button onClick={() => (questionChange(true))} className='incButton right'>
            <Glyphicon glyph='chevron-right'/>
          </Button>
          <p>{questions[currentQuestion]}</p>
        </section>
        }
        {visualType === 'table' && <BootstrapTable className='dataTable' data={tableData} hover={true}>
          <TableHeaderColumn dataField="question" isKey={true} dataAlign="center"
                             dataSort={true}>Domanda</TableHeaderColumn>
          <TableHeaderColumn dataField="goodVotesPercentage" dataAlign="center" dataFormat={dataFormat} dataSort={true}>Valore
            Voti
            Positivi</TableHeaderColumn>
          <TableHeaderColumn dataField="schoolPercentage" dataAlign="center" dataFormat={dataFormat} dataSort={true}>Media
            della
            Scuola</TableHeaderColumn>
          <TableHeaderColumn dataField="difference" dataAlign="center" dataFormat={dataFormat} dataSort={true}>Delta
            Docente
            Scuola</TableHeaderColumn>
        </BootstrapTable>}
      </section>
      }
    </section>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)
