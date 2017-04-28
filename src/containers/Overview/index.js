import React from 'react'
import {connect} from 'react-redux'
import {PageHeader} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {overViewData} from '../../selectors'
import './index.scss'

const mapStateToProps = (state) => ({
  //questions: state.data.questions,
  data: overViewData(state)
})

const mapDispatchToProps = (dispatch) => ({})

class Teacher extends React.Component {
  render() {

    const {data} = this.props
    console.log(data)
    return (<section className="teacherSection">

      <PageHeader>Panoramica</PageHeader>
      <BootstrapTable className='dataTable' data={data} hover={true}>
        <TableHeaderColumn dataField="nomeDocente" isKey={true} dataAlign="center" dataSort={true}>Nome
          Docente</TableHeaderColumn>
        <TableHeaderColumn dataField="goodVotesPercentage" dataAlign="center" dataSort={true}>Valore Voti
          Positivi</TableHeaderColumn>
        <TableHeaderColumn dataField="difference" dataAlign="center" dataSort={true}>Delta Docente
          Scuola</TableHeaderColumn>
      </BootstrapTable>

    </section>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)
