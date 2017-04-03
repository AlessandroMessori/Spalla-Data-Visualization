export const getVotiDocenti = (idDocente, idDomanda, idClasse) => {
  const where = {
    idDocente,
    idDomanda,
    idClasse
  }

  return fetch(`http://localhost:4000/votazioni?where=${JSON.stringify(where)}`)
    .then(res => res.json())
}

export const getVotiGenerali = (idDomanda, idClasse) => {
  const where = {
    idDomanda,
    idClasse
  };

  return fetch(`http://localhost:4000/docenti?where=${JSON.stringify(where)}`)
    .then(res => res.json())
}

export const getAvg = (votes) => {
  let averages = []
  for (let i = 0; i <= 12; i++) averages.push({count: 0, total: 0})
  votes.map(vote => {
    averages[vote.idDomanda].count++
    averages[vote.idDomanda].total += vote.voto
    averages[vote.idDomanda].idDomanda = vote.idDomanda
    return vote
  })
  averages.map(item => {
    item.avg = parseFloat((item.total / item.count).toFixed(2))
    return item
  })
  return averages
}

export const getStats = (votazioni) => {
  let min = 666;
  let max = -666;
  let sum = 0;
  let votanti = 0;
  let na = 0;
  let averages = getAvg(votazioni)
  averages.splice(0, 1)
  const l = averages.length;

  for (let i = 0; i < l; i++) {
    const singolaVotazione = averages[i];
    const voto = singolaVotazione.avg;
    if (voto === -1) {
      na++;
    } else {
      if (voto < min) min = voto;
      if (voto > max) max = voto;
      sum += voto;
      votanti++;
    }
  }

  return {
    min,
    max,
    avg: sum / votanti,
    averages,
    votanti,
    na
  }
}
