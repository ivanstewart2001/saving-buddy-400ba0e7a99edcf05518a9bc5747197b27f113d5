const orderAmount = (inputArray, filterBy) => {
    inputArray.sort((a,b) => { //Least to Greatest
      return a.amount-b.amount
    })
    
    if (filterBy === 'decreasing') {
        return inputArray
    } else {
        return inputArray.reverse()
    }
}

const orderDueDate = (inputArray, filterBy) => {
    inputArray.sort((a,b) => {
        return new Date(b.dueDate) - new Date(a.dueDate)
    })

    if (filterBy === 'decreasing') {
        return inputArray
    } else {
        return inputArray.reverse()
    }
}

const filterBills = (filterBy, bills) => {
    const filteredArray = []
    const filter1 = filterBy[0]
    const filter2 = filterBy[1]

    bills.map((bill) => {
        if (filter1 === 'paid') {
            if (bill.paid === 'yes') {
                filteredArray.push(bill)
            }
        } else if (filter1 === 'notPaid') {
            if (bill.paid === 'no') {
                filteredArray.push(bill)
            }
        } else if (filter1 === 'category') {
            if (filter2 === 'rent' && bill.category === 'Rent') {
                filteredArray.push(bill)
            } else if (filter2 === 'utilities' && bill.category === 'Utilities') {
                filteredArray.push(bill)
            } else if (filter2 === 'subscriptions' && bill.category === 'Subscriptions') {
                filteredArray.push(bill)
            } else if (filter2 === 'phone' && bill.category === 'Phone') {
                filteredArray.push(bill)
            }  else if (filter2 === 'other' && bill.category === 'Other') {
                filteredArray.push(bill)
            }
        }
    })

    if (filter1 === 'dueDate'){
        return orderDueDate(bills, filter2)
    } else if (filter1 === 'amount') {
        return orderAmount(bills, filter2)
    } else {
        return filteredArray
    }
}

export default filterBills