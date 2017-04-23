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


