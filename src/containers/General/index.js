import React from 'react'
import {connect} from 'react-redux'
import {PageHeader, Row, Col} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {generalData} from '../../selectors'
import Spinner from '../../components/Spinner'
import {getStats} from '../../helpers/analytics'
import {dataFormat} from '../../helpers/utils'
import './index.scss'

const mapStateToProps = (state) => ({
  data: generalData(state)
})

const mapDispatchToProps = (dispatch) => ({})

class General extends React.Component {
  render() {

    const {data} = this.props
    const stats = getStats(data.map(item => item.goodVotesPercentage))
    const {min, max, avg} = stats
    const {length} = data

    return (<section className="overViewSection">
      <PageHeader>Domande {window.location.href.split('/').pop()}</PageHeader>
      {length < 1 && <Spinner/>}
      {length > 0 &&
      <section>

        <Row className='stats-section'>
          <Col sm={4}><h2>Media Max: {max}%</h2></Col>
          <Col sm={4}><h2>Media Min: {min}%</h2></Col>
          <Col sm={4}><h2>Media Scuola: {avg}%</h2></Col>
        </Row>

        <br/>

        <BootstrapTable className='dataTable-overView' data={data} hover={true}>
          <TableHeaderColumn dataField="question" isKey={true} dataAlign="center"
                             dataSort={true}>Domanda</TableHeaderColumn>
          <TableHeaderColumn dataField="goodVotesPercentage" dataAlign="center" dataFormat={dataFormat} dataSort={true}>Valore
            Voti
            Positivi</TableHeaderColumn>
        </BootstrapTable>
      </section>
      }

    </section>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(General)
