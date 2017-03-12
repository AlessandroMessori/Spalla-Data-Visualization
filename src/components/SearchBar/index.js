import React from 'react'
import './searchBar.scss'

const SearchBar = (props) => {

  return (
    <div className='input-group search-bar'>
      <input type='text' className='form-control' onChange={props.onChange} value={props.value}
             placeholder='Cerca' aria-describedby='sizing-addon2'/>
      <span className='input-group-addon' id='sizing-addon2'>
        <span className='glyphicon glyphicon-search'/>
      </span>
    </div>)

}

export default SearchBar
