import React from 'react'
import {connect} from 'react-redux'
import {PageHeader, ButtonGroup, Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {Bar} from 'react-chartjs'
import Spinner from '../../components/Spinner'
import {changeVisualType} from '../../actions'
import {tableData, barData} from '../../selectors'
import './teacher.scss'

const mapStateToProps = (state) => ({
  loading: state.loadingState,
  teacherData: state.teacherData,
  visualType: state.visualType,
  questions: state.data.questions,
  //schoolData: state.data.goodVotes,
  tableData: tableData(state),
  barData: barData(state)
})

const mapDispatchToProps = (dispatch) => ({
  //loadTeacherData: (id) => dispatch(loadTeacherData(id)),
  changeVisualType: (visual) => dispatch(changeVisualType(visual))
})

class Teacher extends React.Component {

  componentDidMount() {
    //this.props.loadTeacherData(this.props.params.id)
  }

  render() {
    const {loading, visualType, tableData, barData} = this.props

    return (<section className="teacherSection">
      <PageHeader>{this.props.params.name}</PageHeader>
      {loading && <Spinner/>}
      {
        !loading &&
        <section>
          <ButtonGroup className='selector'>
            <Button active={visualType === 'chart'}
                    onClick={() => this.props.changeVisualType('chart')}>Grafico</Button>
            <Button active={visualType === 'table'}
                    onClick={() => this.props.changeVisualType('table')}>Tabella</Button>
          </ButtonGroup>
          <br/>
          {visualType === 'chart' &&
          <Bar data={barData} width='700' height='400'/>}
          {visualType === 'table' && <BootstrapTable className='dataTable' data={tableData} hover={true}>
            <TableHeaderColumn dataField="idDomanda" isKey={true} dataAlign="center" dataSort={true}>ID
              Domanda</TableHeaderColumn>
            <TableHeaderColumn dataField="goodVotesPercentage" dataAlign="center" dataSort={true}>Valore Voti
              Positivi</TableHeaderColumn>
            <TableHeaderColumn dataField="schoolPercentage" dataAlign="center" dataSort={true}>Media della
              Scuola</TableHeaderColumn>
            <TableHeaderColumn dataField="difference" dataAlign="center" dataSort={true}>Delta Docente
              Scuola</TableHeaderColumn>
          </BootstrapTable>}
        </section>
      }
    </section>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)
