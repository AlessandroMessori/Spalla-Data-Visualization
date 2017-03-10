import React from 'react'
import TopicSelector from '../TopicSelector/'
import './home.scss'

const HomePage = () => {
  return (
    <section className='home-page'>
      <h1 className='page-header'>Votazioni Docenti Liceo Ariosto Spallanzani</h1>
      <section className='topic-section row'>
        <h2>Che dati vuoi vedere?</h2>
        <TopicSelector title='Domande' src='images/question.png' to='cerca/domande'/>
        <TopicSelector title='Docenti' src='images/teacher.png' to='cerca/docenti'/>
      </section>
    </section>
  );
};

export default HomePage
