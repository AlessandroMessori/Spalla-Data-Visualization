import includes from 'lodash/includes'

export const filterTeachersByString = (arr, string) => {
  let results = []

  arr.map(teacher => {
    if (includes((`${teacher.nome} ${teacher.cognome}`).toLowerCase(), string.toLowerCase()))
      results.push(teacher)
  })

  return results
}
