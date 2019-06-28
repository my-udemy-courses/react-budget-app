import moment from 'moment'

// Get visible expenses => Filter Logic
export default (expenses, { text, sortBy, startDate, endDate, descending }) => {
    return expenses.filter(({ description, createdAt }) => {
        const createdAtMoment = moment(createdAt)
        const startDateMatch = startDate ? createdAtMoment.isSameOrAfter(startDate, 'day') : true
        const endDateMatch = endDate ? createdAtMoment.isSameOrBefore(endDate, 'day'): true
        const textMatch = description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            if (descending){
                return a.createdAt < b.createdAt ? 1 : -1
            } else {
                return a.createdAt < b.createdAt ? -1 : 1
            }
        } 
        else if (sortBy === 'amount') {
            if (descending) {
                return a.amount < b.amount ? 1 : -1
            } else {
                return a.amount < b.amount ? -1 : 1
            }
        }
    })
}
