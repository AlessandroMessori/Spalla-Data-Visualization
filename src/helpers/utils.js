import React from 'react'
import includes from 'lodash/includes'

export const filterTeachersByString = (arr, string) => {
  let results = []

  arr && arr.map(teacher => (
      includes((`${teacher.nome} ${teacher.cognome}`).toLowerCase(), string.toLowerCase()) ?
        results.push(teacher) : null
    )
  )

  return results
}

export const dataFormat = (cell) => (<p>{cell}%</p>)

export const filterTeachersByCategory = (arr, category) => arr.filter(item => item.tipo_materia === category)

export const getCategoryByParam = (param) => {

  switch (param) {
    case 'Materia%20Scientifica':
      return 'scientific'
    case 'Letteratura':
      return 'literature'
    case 'Lingua':
      return 'languages'
    case 'Altro':
      return 'other'
    default:
      return null
  }
}
