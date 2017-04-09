import React from 'react'
import {connect} from 'react-redux'
import {PageHeader, ButtonGroup, Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {Bar} from 'react-chartjs'
import Spinner from '../../components/Spinner'
import {loadTeacherData, changeVisualType} from '../../actions'
import './teacher.scss'

const mapStateToProps = (state) => ({
  loading: state.loadingState,
  teacherData: state.teacherData,
  visualType: state.visualType,
  questions: state.data.questions
})

const mapDispatchToProps = (dispatch) => ({
  loadTeacherData: (id) => dispatch(loadTeacherData(id)),
  changeVisualType: (visual) => dispatch(changeVisualType(visual))
})

class Teacher extends React.Component {

  componentDidMount() {
    this.props.loadTeacherData(this.props.params.id)
  }

  getBarData() {
    const {averages} = this.props.teacherData.stats
    const data = averages.map(item => item.goodVotePercentage)
    return ({
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [{
        label: '# of Votes',
        data: data,
        backgroundColor: [
          '#ff6384',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderWidth: 1
      }]
    })
  }

  render() {
    const {loading, teacherData, visualType} = this.props
    let averages = (teacherData.stats) ? teacherData.stats.averages : []
    return (<section className="teacherSection">
      <PageHeader>{this.props.params.name}</PageHeader>
      {loading && <Spinner/>}
      {
        !loading && teacherData.stats &&
        <section>
          <section className="statsSection">
            <h2>Valore Minimo: {teacherData.stats.min}%</h2>
            <h2>Valore Massimo: {teacherData.stats.max}%</h2>
            <h2>Valore Medio: {teacherData.stats.avg.toFixed(2)}%</h2>
          </section>
          <ButtonGroup className='selector'>
            <Button active={visualType === 'chart'}
                    onClick={() => this.props.changeVisualType('chart')}>Grafico</Button>
            <Button active={visualType === 'table'}
                    onClick={() => this.props.changeVisualType('table')}>Tabella</Button>
          </ButtonGroup>
          <br/>
          {visualType === 'chart' &&
          <Bar data={this.getBarData()} width='700' height='400'/>}
          {visualType === 'table' && <BootstrapTable className='dataTable' data={averages} hover={true}>
            <TableHeaderColumn dataField="idDomanda" isKey={true} dataAlign="center" dataSort={true}>ID
              Domanda</TableHeaderColumn>
            <TableHeaderColumn dataField="goodVotePercentage" dataAlign="center" dataSort={true}>Valore Voti
              Positivi</TableHeaderColumn>
          </BootstrapTable>}
        </section>
      }
    </section>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)
