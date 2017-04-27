import React from 'react'
import {Link} from 'react-router'
import './index.scss'

class QuestionList extends React.Component {

  constructor(props) {
    super(props)
    this.renderResult = this.renderResult.bind(this)
  }

  renderResult() {
    let results = []
    this.props.questions.map((result, i) => {
      return results.push(<article key={result} className="panel panel-default">
        <Link to={`domande/${i}`} className="panel-body">{result}</Link>
      </article>)
    })
    return results
  }

  render() {
    return (<section className="questionList">
      {this.renderResult()}
    </section>)
  }

}

export default QuestionList
