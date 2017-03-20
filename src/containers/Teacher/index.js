import React from 'react'
import {connect} from 'react-redux'
import {PageHeader} from 'react-bootstrap'
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

  render() {
    const {loading, teacherData} = this.props
    return (<section className="teacherSection">
      <PageHeader>{this.props.params.name}</PageHeader>
      {loading && <Spinner/>}
      {
        !loading && teacherData.stats &&
        <section>
          <h2>Voto Minimo: {teacherData.stats.min}</h2>
          <h2>Voto Massimo: {teacherData.stats.max}</h2>
          <h2>Media Voti: {teacherData.stats.avg.toFixed(2)}</h2>
        </section>
      }
    </section>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)
