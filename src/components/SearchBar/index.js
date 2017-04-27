import React from 'react'
import {FormControl} from 'react-bootstrap'
import './index.scss'

const SearchBar = (props) => {

  return (
    <div className='input-group search-bar'>
      <FormControl {...props} type='text' placeholder='Cerca' aria-describedby='sizing-addon2'/>
      <span className='input-group-addon' id='sizing-addon2'>
        <span className='glyphicon glyphicon-search'/>
      </span>
    </div>)

}

export default SearchBar
