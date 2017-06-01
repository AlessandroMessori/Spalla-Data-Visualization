import React from 'react'
import {Link} from 'react-router'
import './index.scss'

const TopicSelector = (props) => {
  return (
    <section className="topicSelector col-md-6">
      <Link to={props.to}>
        <h1>{props.title}</h1>
        <img src={props.src} alt={props.title}/>
      </Link>
    </section>
  )
}

export default TopicSelector
