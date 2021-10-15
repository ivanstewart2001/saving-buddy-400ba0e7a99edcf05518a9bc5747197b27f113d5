
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

const filterExpenses = (filterBy, expenses) => {
    const filteredArray = []
    const filter1 = filterBy[0]
    const filter2 = filterBy[1]

    expenses.map((expense) => {
        if (filter1 === 'category') {
            if (filter2 === 'rent' && expense.category === 'Rent') {
                filteredArray.push(expense)
            } else if (filter2 === 'food' && expense.category === 'Food') {
                filteredArray.push(expense)
            } else if (filter2 === 'groceries' && expense.category === 'Groceries') {
                filteredArray.push(expense)
            } else if (filter2 === 'shopping' && expense.category === 'Shopping') {
                filteredArray.push(expense)
            } else if (filter2 === 'auto' && expense.category === 'Auto') {
                filteredArray.push(expense)
            } else if (filter2 === 'transportation' && expense.category === 'Transport') {
                filteredArray.push(expense)
            } else if (filter2 === 'personal care' && expense.category === 'Personal Care') {
                filteredArray.push(expense)
            } else if (filter2 === 'health/fitness' && expense.category === 'Health/Fitness') {
                filteredArray.push(expense)
            } else if (filter2 === 'other' && expense.category === 'Other') {
                filteredArray.push(expense)
            }  
        }
    })

    if (filter1 === 'Date'){
        return orderDate(expenses, filter2)
    } else if (filter1 === 'amount') {
        return orderAmount(expenses, filter2)
    } else {
        return filteredArray
    }
}





export default filterExpenses 