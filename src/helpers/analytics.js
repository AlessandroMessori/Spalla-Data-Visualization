export const getVotesPercentage = (votes, minVote) => {

  let percentages = []

  votes.map((question, i) => {

    percentages.push({goodVotesCount: 0})

    question.countVal.map(item => {
      const {value, count} = item
      if (value >= minVote) percentages[i].goodVotesCount += count
      return null
    })

    return question.goodVotesPercentage = Math.round(percentages[i].goodVotesCount * 100 / question.countTot)
  })

  return percentages
}

export const getStats = (votes) => {
  let min = 666
  let max = -666
  let na = 0
  let sum = 0
  let count = 0

  votes.map(vote => {
    if (vote === 0) {
      na++
    } else {
      if (vote < min) min = vote
      if (vote > max) max = vote
      sum += vote
      count++
    }
    return null
  })

  return {
    min,
    max,
    na,
    count,
    avg: (sum / count).toFixed()
  }
}


