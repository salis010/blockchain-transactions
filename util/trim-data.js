const fns = require('date-fns')

const trimData = function (data) {

  const txs = data.txs

  //trim
  const trimmedTxs = []

  for(let i = 0; i < txs.length; i++) {
    const date = new Date(txs[i].confirmed)
    let dateGroup

    if(fns.isToday(date))
      dateGroup = "today"
    else if(fns.isThisWeek(date))
      dateGroup = "thisWeek"
    else if(fns.isThisMonth)
      dateGroup = "thisMonth"
    else if(fns.isThisYear)
      dateGroup = "thisYear"
    else
      dateGroup = "rest"

    const obj = Object.assign({}, {
      block_hash: txs[i].block_hash,
      date: date,
      dateGroup: dateGroup
    } )
      trimmedTxs.push(obj)
  }

  //sort
  trimmedTxs.sort(function(t1, t2){
      return t2.date - t1.date
  })


  //group by date
  const addressData = {
    "today": {txs: []},
    "thisWeek": {txs: []},
    "thisMonth": {txs: []},
    "thisYear": {txs: []},
    "rest": {txs: []},
  }

  for(let i = 0; i < trimmedTxs.length; i++) {

    if(trimmedTxs[i].dateGroup === "today")
      addressData.today.txs.push(trimmedTxs[i])
    else if(trimmedTxs[i].dateGroup === "thisWeek")
      addressData.thisWeek.txs.push(trimmedTxs[i])
    else if(trimmedTxs[i].dateGroup === "thisMonth")
      addressData.thisMonth.txs.push(trimmedTxs[i])
    else if(trimmedTxs[i].dateGroup === "thisYear")
      addressData.thisYear.txs.push(trimmedTxs[i])
    else
      addressData.rest.txs.push(trimmedTxs[i])
  }

  return addressData
}

module.exports = {
    trimData: trimData
}
