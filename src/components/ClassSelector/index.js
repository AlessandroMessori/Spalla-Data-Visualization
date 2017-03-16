import React from 'react'
import {FormControl} from 'react-bootstrap'
import './classSelector.scss'

export default class ClassSelector extends React.Component {

  constructor(props) {
    super(props)
    this.getOptions = this.getOptions.bind(this)
  }

  render() {
    return (
      <FormControl componentClass="select" defaultValue={this.props.defaultValue}
                   value={this.props.value} onChange={this.props.onChange}>
        {this.getOptions(this.props.options)}
      </FormControl>)
  }

  getOptions(data) {
    let options = []
    data.map(item => options.push(<option key={item.id} value={item.id}>{item.label}</option>))
    return options
  }

}
