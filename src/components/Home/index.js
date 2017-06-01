import React from 'react'
import TopicSelector from '../TopicSelector/'
import './index.scss'

const HomePage = () => {
  return (
    <section className='home-page'>
      <h1 className='page-header'>Votazioni Docenti Liceo Ariosto Spallanzani</h1>
      <section className='topic-section row'>
        <TopicSelector title='Panoramica' src='images/overview.ico' to='panoramica'/>
        <TopicSelector title='Docenti' src='images/teacher.png' to='cerca/docenti'/>
        <TopicSelector title='Domande Docenti' src='images/school.png' to='domande/docenti'/>
        <TopicSelector title='Domande Generali' src='images/question.png' to='domande/generali'/>
      </section>
    </section>
  )
}

export default HomePage
