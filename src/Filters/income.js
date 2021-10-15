
const orderDate = (data, filterBy) => {
    data.sort((a,b) => {
        return new Date(b.date) - new Date(a.date)
    })

    if (filterBy === 'decreasing') {
        return data
    } else {
        return data.reverse()
    }
}


const orderAmount = (data, filterBy) => {
    data.sort((a,b) => { 
      return a.amount-b.amount
    })
    
    if (filterBy === 'decreasing') {
        return data
    } else {
        return data.reverse()
    }
}

const filterIncome = (filterBy, expenses) => {
    const filteredArray = []
    const filter1 = filterBy[0]
    const filter2 = filterBy[1]

    if (filter1 === 'date'){
        console.log(orderDate(expenses, filter2))
        return orderDate(expenses, filter2)
    } else if (filter1 === 'amount') {
        console.log(orderAmount(expenses, filter2))
        return orderAmount(expenses, filter2)
    } else {
        console.log(filteredArray)
        return filteredArray
    }
}





export default filterIncome