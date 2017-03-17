import includes from 'lodash/includes'

export const filterTeachersByString = (arr, string) => {
  let results = []

  arr.map(teacher => (
      includes((`${teacher.nome} ${teacher.cognome}`).toLowerCase(), string.toLowerCase()) ?
        results.push(teacher) : null
    )
  )

  return results
}
