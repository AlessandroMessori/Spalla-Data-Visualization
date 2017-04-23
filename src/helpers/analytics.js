export const getVotesPercentage = (votes, minVote) => {

  let percentages = []

  votes.map((question, i) => {

    percentages.push({goodVotesCount: 0, percentage: 0})

    Object.keys(question.votazione).map(item => {
      const {value, count} = question.votazione[item]
      if (value >= minVote) percentages[i].goodVotesCount += count
      return null
    })

    return question.goodVotesPercentage = Math.round(percentages[i].goodVotesCount * 100 / question.countTot)
  })

  return percentages
}


