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
