import React from 'react'
import {connect} from 'react-redux'
import {PageHeader, ButtonGroup, Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {Bar} from 'react-chartjs'
import Spinner from '../../components/Spinner'
import {loadTeacherData} from '../../actions'
import './teacher.scss'

const mapStateToProps = (state) => ({
  loading: state.loadingState,
  teacherData: state.teacherData
})

const mapDispatchToProps = (dispatch) => ({
  loadTeacherData: (id) => dispatch(loadTeacherData(id))
})

class Teacher extends React.Component {

  componentDidMount() {
    this.props.loadTeacherData(this.props.params.id)
  }

  getBarData() {
    const {averages} = this.props.teacherData.stats
    const data = averages.map(item => item.avg)
    return ({
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [{
        label: '# of Votes',
        data: data,
        backgroundColor: [
          'red',
          'rgba(54, 162, 235, 0.2)',
          'yellow',
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
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    })
  }

  render() {
    const {loading, teacherData} = this.props
    let averages = (teacherData.stats) ? teacherData.stats.averages : []
    return (<section className="teacherSection">
      <PageHeader>{this.props.params.name}</PageHeader>
      {loading && <Spinner/>}
      {
        !loading && teacherData.stats &&
        <section>
          <section className="statsSection">
            <h2>Media Minima: {teacherData.stats.min}</h2>
            <h2>Media Massima: {teacherData.stats.max}</h2>
            <h2>Media Totale: {teacherData.stats.avg.toFixed(2)}</h2>
          </section>
          <ButtonGroup className='selector'>
            <Button>Grafico</Button>
            <Button>Tabella</Button>
          </ButtonGroup>
          <br/>
          <Bar data={this.getBarData()} width='600' height='400'/>
          <BootstrapTable className='dataTable' data={averages} striped={true} hover={true}>
            <TableHeaderColumn dataField="idDomanda" isKey={true} dataAlign="center" dataSort={true}>ID
              Domanda</TableHeaderColumn>
            <TableHeaderColumn dataField="avg" dataAlign="center" dataSort={true}>Media
              Voti</TableHeaderColumn>
          </BootstrapTable>
        </section>
      }
    </section>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)
