import React from 'react'
import {Link} from 'react-router'
import {PageHeader, Image} from 'react-bootstrap'
import pi from '../../assets/images/pi.jpg'
import './home.scss'

const Home = () => {
  return (<section>
    <PageHeader>Visualizzazione Valutazioni Docenti</PageHeader>
    <Image className="home-image" src={pi}/>
    <Link  className="home-link" to="test">Vai Alla Pagina Di Testing</Link>
  </section>)
}

export default Home
