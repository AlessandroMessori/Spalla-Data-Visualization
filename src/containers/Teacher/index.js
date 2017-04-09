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
  questions: state.data.questions,
  schoolData: state.data.goodVotes
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
    const schoolAvg = (this.props.schoolData) ? this.props.schoolData.splice(0, 12) : []
    return ({
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
          label: '# of Votes',
          data: data,
          fillColor: "red",
          borderWidth: 1
        },
        {
          label: '# of Votes',
          data: schoolAvg,
          fillColor: "blue",
          borderWidth: 1
        }
      ]
    })
  }

  render() {
    const {loading, teacherData, visualType, schoolData} = this.props
    let averages = (teacherData.stats) ? teacherData.stats.averages : []
    const data = averages.map((item, i) => {
      if (schoolData) {
        console.log('ciaone')
        return {
          idDomanda: item.idDomanda,
          schoolPercentage: schoolData[i] + '%',
          difference: (item.goodVotePercentage - schoolData[i]).toFixed(2) + '%',
          goodVotePercentage: item.goodVotePercentage + '%',
        }
      }

      return item
    })

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
          {visualType === 'table' && <BootstrapTable className='dataTable' data={data} hover={true}>
            <TableHeaderColumn dataField="idDomanda" isKey={true} dataAlign="center" dataSort={true}>ID
              Domanda</TableHeaderColumn>
            <TableHeaderColumn dataField="goodVotePercentage" dataAlign="center" dataSort={true}>Valore Voti
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
