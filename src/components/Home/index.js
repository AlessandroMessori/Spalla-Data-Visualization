import React from 'react'
import TopicSelector from '../TopicSelector/'
import './index.scss'

const HomePage = () => {
  return (
    <section className='home-page'>
      <h1 className='page-header'>Votazioni Docenti Liceo Ariosto Spallanzani</h1>
      <section className='topic-section row'>
        <h2 className='home-subtitle'>Che dati vuoi vedere?</h2>
        <TopicSelector title='Panoramica' src='images/overview.ico' to='panoramica'/>
        <TopicSelector title='Docenti' src='images/teacher.png' to='cerca/docenti'/>
        <TopicSelector title='Domande Generali' src='images/question.png' to='generali'/>
      </section>
    </section>
  )
}

export default HomePage
